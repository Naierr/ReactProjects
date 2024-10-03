import React,{useState} from "react";
// import { TrashIcon, EditIcon, ChevronRightIcon } from "@heroicons/react/solid";
interface Booking {
    id:number,
    name: string;
    age: number;
    email: string;
    phone: string;
}
function Card(props) {
    // useState hooks for the editing of the card info
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setName] = useState(props.booking.name);
  const [editedAge, setAge] = useState(props.booking.age);
  const [editedEmail,setEmail]=useState(props.booking.email);
  const [editedPhone,setPhone]=useState(props.booking.phone);

    function handleEdit(){
        setIsEditing(!isEditing);
    }

    function handleUpdate(){
        // On clicking save updates 
        let hasErrors = false; // Flag to track validation errors

        if (!editedName) {
          alert("Name is required");
          hasErrors = true;
        }
    
        if (!editedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editedEmail)) {
          alert("Please enter a valid email address");
          hasErrors = true;
        }
    
        if (editedAge && (parseInt(editedAge) < 0 || parseInt(editedAge) > 120)) {
          alert("Age must be between 0 and 120");
          hasErrors = true;
        }
        if(!editedAge){
            alert("Age is required");
            hasErrors=true;
          }
        if (hasErrors) {
            
            return;
           // Prevent form submission if validation fails
        }
        props.booking.name=editedName;
        props.booking.age=editedAge;
        props.booking.email=editedEmail;
        props.booking.phone=editedPhone;

        setIsEditing(false);
    }

    function handleDelete(index:number, keyNo:number) {
    props.onDelete(index, keyNo); // Use the destructured arguments
  }

  function handleRight(index:number, keyNo:number) {
    props.onRight(index, keyNo); // Use the destructured arguments, assuming `onRight` is intended
  }
//   console.log(props.booking.name);
  return (
    <div className="card flex-shrink-0 h-1/5 p-1 mt-0.5  mb-2 bg-white rounded-lg shadow-md">
        {isEditing ? (
        <div className="w-full items-start sm:w-auto h-10 text-xs">
          {/* Edit mode: Input fields for name, age, email, and phone */}
          <label className="text-black font-sans font-semibold justify-start text-xs" htmlFor="name">Edit the details and then save</label> 
          <input className="w-full h-1/2 text-black px-2 border rounded-md" 
                 type="text"
                 value={editedName} 
                 onChange={(e) => setName(e.target.value)}
                 placeholder="Enter name" />
          <input className="w-full h-1/2 text-black px-2 py-0.5 border rounded-md" 
                 type="number" 
                 value={editedAge} 
                 onChange={(e) => setAge(e.target.value)}
                 placeholder="Enter Age" />
          <input className="w-full h-1/2 text-black px-2 py-0.5 border rounded-md" 
                 type="text" 
                 value={editedEmail} 
                 onChange={(e) => setEmail(e.target.value)}
                 placeholder="Enter mail" />
          <input className="w-full h-1/2 text-black px-2 py-0.5 border rounded-md" 
                 type="number" 
                 value={editedPhone} 
                 onChange={(e) => setPhone(e.target.value)}
                 placeholder="Enter Phone" />
          <button className="text-black text-xs rounded-md bg-gradient-to-r from-blue-600 to-sky-500" onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <div className="px-1">
          {/* Name and age of the person */}
          <div className="flex justify-between items-center mt-1">
            <h2 className="text-black font-sans text-sm font-bold justify-start">{props.booking.name}</h2> {/* Removed h2 tag and styling for more compact display */}
            <p className="text-slate-400 justify-end text-xs">{props.booking.age} yo</p> {/* Reduced font size and text color */}
          </div>
          {/* Details of the person */}
          <div className="flex items-start flex-col justify-start mt-1">
            <p className="text-black text-xs">{props.booking.email}</p>
            <p className="text-black text-xs">{props.booking.phone}</p>
          </div>
          {/* Handling of the card actions */}
          <div className="flex justify-left items-center mt-1 mb-0">
            <button onClick={() => handleDelete(props.booking.id, props.keyNo)} className="mr-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:text-red-700 px-2 py-2 bg-red-100 items-center rounded-md w-1/6 h-8">
              {/* Delete Button */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="11 0 14 32" strokeWidth={1.5} stroke="currentColor" className="size-6 
 items-center px-0 text-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25
 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
            {/* Edit Button */}
            <button onClick={() => handleEdit()} className="mr-2  
 bg-gradient-to-r from-sky-500 to-blue-600 hover:text-yellow-700 px-2 py-2 bg-yellow-100 rounded-md w-1/6 h-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="11 0 14 32" strokeWidth={1.5} stroke="currentColor" className="size-6 text-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </button>
            {/* Right Button */}
            <button onClick={() => handleRight(props.booking.id, props.keyNo)} className="bg-gradient-to-r from-sky-500 to-blue-600 hover:text-green-700 px-2 py-2 bg-green-100 justify-center text-xs rounded-md w-1/6 h-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="11 0 14 30" strokeWidth={1.5} stroke="currentColor" className="size-6 text-black">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
            </svg>
            </button>
          </div>
        </div>
      )}</div>
  );
}

export default Card;
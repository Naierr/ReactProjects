import React, {useState,useEffect} from 'react';
import SubmitForm from './SubmitForm';
import Card from './Card';

function App() {
  interface Booking {
    id: number,
    name : string,
    age: number,
    phone:number,
    email:string
  };
  // The Unclaimed Ones
  const [bookings, setBookings] = useState<Booking[]>([]);
  // The first contacted ones
  const [contacted, setContacted] = useState<Booking[]>([]);
  // The preparing work offer ones
  const [prepared, setPrepared] = useState<Booking[]>([]);
  // The sent to therapists ones
  const [therapists, setTherapists] = useState<Booking[]>([]);
  // The unique id for each booking
  const [index,setIndex]=useState(0);
  // The loading of data in the first render
  const [load,setLoad]=useState(false);
  
  
  // localStorage.clear();
  
  function saveCards() {
    localStorage.setItem('bookings', JSON.stringify(bookings));
    localStorage.setItem('contacted', JSON.stringify(contacted));
    localStorage.setItem('prepared', JSON.stringify(prepared));
    localStorage.setItem('therapists', JSON.stringify(therapists));
    localStorage.setItem('index',index.toString());
  };
  function loadCards () {
    const storedBookings = localStorage.getItem('bookings');
    const storedContacted = localStorage.getItem('contacted');
    const storedPrepared = localStorage.getItem('prepared');
    const storedTherapists = localStorage.getItem('therapists');
    const storedIndex = localStorage.getItem('index');

    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
    if (storedContacted) {
      setContacted(JSON.parse(storedContacted));
    }
    if (storedPrepared) {
      setPrepared(JSON.parse(storedPrepared));
    }
    if (storedTherapists) {
      setTherapists(JSON.parse(storedTherapists));
    }
    if(storedIndex){
      setIndex(parseInt(storedIndex));
    }
  };

  function handleSubmitForm(formData: { title: string; name: string; age: string; phone: string; email: string }) {
    
    const newBooking = {
      id: index,
      name: formData.name,
      age: Number(formData.age),  // Convert here if needed
      phone: Number(formData.phone),  // Convert here if needed
      email: formData.email,
    };
    setIndex(index+1);
    setBookings((prevBookings) => [...prevBookings, newBooking]);
  }

  function deleteBooking(index:number, keyNo:number) {
    if (window.confirm("Are you sure you want to delete this booking?")){
    console.log(index,keyNo);
    if (keyNo === 1) {
      setBookings(bookings.filter((booking:Booking) => booking.id !== index));
      saveCards();
    } else if (keyNo === 2) {
      setContacted(contacted.filter((booking:Booking) => booking.id !== index));
      saveCards();
    } else if (keyNo === 3) {
      setPrepared(prepared.filter((booking:Booking) => booking.id !== index));
      saveCards();
    } else {
      setTherapists(therapists.filter((booking:Booking) => booking.id !== index));
      saveCards();
    }
    saveCards();
  }
  else{
    console.log("They're not cancelling");
  }
  }

  function rightSwitch(index:number, keyNo:number) {
    
    const element = bookings.find((booking:Booking) => booking.id === index);
    const element2 = contacted.find((booking:Booking) => booking.id === index);
    const element3 = prepared.find((booking:Booking) => booking.id === index);
    console.log(index,keyNo);
    if (keyNo === 1) {
      if(!element){
        return;
      }
      setContacted((prevBookings) => [...prevBookings, element]);
      // Deleting the old location card so no duplicates exists
      setBookings(bookings.filter((booking:Booking) => booking.id !== index));
      saveCards();

    } else if (keyNo === 2) {
      if(!element2){
        return;
      }
      setPrepared((prevBookings) => [...prevBookings, element2]);
      // Deleting the old location card so no duplicates exists
      setContacted(contacted.filter((booking:Booking) => booking.id !== index));
      saveCards();

    } else if (keyNo === 3) {
      if(!element3){
        return;
      }
      setTherapists((prevBookings) => [...prevBookings, element3]);
      // Deleting the old location card so no duplicates exists
      setPrepared(prepared.filter((booking:Booking) => booking.id !== index));
      saveCards();


    }
    else{
      // No need to delete when pressing right at the end just get an alert that you cannot move more right
      alert("Cannot move right, If you wish to remove the booking press on the delete button");
      return;
    }

    

  }
  function leftSwitch(index:number, keyNo:number) {
    const element2 = contacted.find((booking:Booking) => booking.id === index);
    const element3 = prepared.find((booking:Booking) => booking.id === index);
    const element4= therapists.find((booking:Booking) => booking.id === index);
    
    console.log(index,keyNo);
    if (keyNo === 4) {
      if(!element4){
        return;
      }
      setPrepared((prevBookings) => [...prevBookings, element4]);
      // Deleting the old location card so no duplicates exists
      setTherapists(therapists.filter((booking:Booking) => booking.id !== index));
      saveCards();
    } else if (keyNo === 3) {
      if(!element3){
        return;
      }
      setContacted((prevBookings) => [...prevBookings, element3])
      // Deleting the old location card so no duplicates exists
      setPrepared(prepared.filter((booking:Booking) => booking.id !== index));
      saveCards();
    } else if (keyNo === 2) {
      if(!element2){
        return;
      }
      setBookings((prevBookings) => [...prevBookings, element2])
      // Deleting the old location card so no duplicates exists
      setContacted(contacted.filter((booking:Booking) => booking.id !== index));
      saveCards();
    }
    else{
      alert("Cannot move left, If you wish to remove the booking press on the delete button");
      return;
    }

  }

  function createCard(booking:Booking, keyNo:number) {
    return (
      <Card
        key={booking.id}
        booking={booking}
        keyNo={keyNo}
        onDelete={deleteBooking}
        onRight={rightSwitch}
        onLeft={leftSwitch}
      />
    );
    saveCards();
  }
  if(!load){
    loadCards();
    setLoad(true);
  }
  useEffect(() => {
      saveCards();

  },[setTimeout(() => {
    
  }, 1000)]);

  return (
    <div className="bg-sky-100 font-sans min-h-screen p-5">
      <header className="flex flex-col items-center justify-center text-2xl text-white mb-8">
        <b className='text-black'>Kanban Board</b>
      </header>

      <div className="flex flex-row text-white">
        {/* Form Section */}
        <SubmitForm onSubmit={handleSubmitForm} />

        {/* Kanban Board Section */}
        <div className="flex flex-col w-full text-center">
          <div className="flex flex-row h-full justify-between gap-2">
            {/* Unclaimed */}
            <div className="flex-1 border mr-2 border-blue-300 rounded-lg ">
              <div className="flex justify-between items-center bg-sky-100 mb-0">
                <b className="ml-2 text-black text-sm mt-2">Unclaimed</b>
                <b className="mr-2 text-black text-sm">{bookings.length}</b>
              </div>
              <div className="bg-sky-100 h-[600px] scrollbar-thin overflow-auto p-1 mt-0">
                {bookings.map((booking) => createCard(booking, 1))}
              </div>
            </div>
            {/* First Contacted */}
            <div className="flex-1 border mr-1 bg-sky-200 rounded-lg border-blue-300">
              <div className="flex justify-between items-center mb-0">
                <b className="ml-2 text-black text-sm mt-2">First Contact</b>
                <b className="mr-2 text-black text-sm">{contacted.length}</b>
              </div>
              <div className=" p-1 h-[600px] overflow-y-auto scrollbar-thin mt-0">
                {contacted.map((booking) => createCard(booking, 2))}
              </div>
            </div>
            {/* Preparing work offer */}
            <div className="flex-1 border mr-1 bg-sky-200 rounded-lg border-blue-300">
              <div className="flex justify-between items-center mb-0">
                <b className="ml-2 text-black text-sm mt-2">Preparing Work Offer</b>
                <b className="mr-2 text-black text-sm">{prepared.length}</b>
              </div>
              <div className=" p-1 h-[600px] scrollbar-thin overflow-auto  mt-0">
                {prepared.map((booking) => createCard(booking, 3))}
              </div>
            </div>
            {/* Sent to Therapists */}
            <div className="flex-1 overflow-hidden border rounded-lg bg-sky-200 border-blue-300">
              <div className="flex justify-between items-center   mb-0">
                <b className="ml-2 text-black text-sm mt-2">Sent to Therapists</b>
                <b className="mr-2 text-black text-sm">{therapists.length}</b>
              </div>
              <div className=" p-1 h-[600px] overflow-y-auto scrollbar-thin mt-0">
                {therapists.map((booking) => createCard(booking, 4))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // loadCards();
}

export default App;
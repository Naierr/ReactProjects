import React, { useState } from "react";

interface SubmitFormProps {
  onSubmit: (formData: { title: string; name: string; age: string; email: string; phone: string }) => void;
}

function SubmitForm (props : SubmitFormProps) {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit(e : React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    let hasErrors = false; // Flag to track validation errors

    if (!title) {
      alert("Title is required");
      hasErrors = true;
    }

    if (!name) {
      alert("Name is required");
      hasErrors = true;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address");
      hasErrors = true;
    }
    if(!age){
      alert("Age is required");
      hasErrors=true;
    }
    if (age && (parseInt(age) < 0 || parseInt(age) > 120)) {
      alert("Age must be between 0 and 120");
      hasErrors = true;
    }

    if (hasErrors) {
      return; // Prevent form submission if validation fails
    }

    props.onSubmit({ title, name, age, email, phone });
  };

  return (
    <form onSubmit={handleSubmit}className="flex rounded-lg bg-sky-400 mt-2 mb-2 px-2 py-2 border-blue-300 font-sans text-black flex-col gap-4 m-8">
      <b>Form</b>
      <div>
        <label className="text-black font-sans" htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="ml-1 p-1 text-blaack border rounded-md"
        />
      </div>
      <div>
        <label className="text-black" htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          className="ml-1 p-1 text-black border rounded-md"
        />
      </div>
      <div>
        <label className="text-black" htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="ml-1 p-1 text-black border rounded-md"
        />
      </div>
      <div>
        <label className="text-black" htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          className="ml-1 p-1 text-black border rounded-md"
        />
      </div>
      <div>
        <label className="text-black" htmlFor="phone">Phone:</label>
        <input
          type="number"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          name="phone"
          className="ml-1 p-1 text-black border rounded-md"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md mt-4">
        Submit
      </button>
    </form>
  );
};

export default SubmitForm;
import React, { useState,useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import SubmitForm from './SubmitForm';
import Card from './Card';

function App() {
  // The Unclaimed Ones
  const [bookings, setBookings] = useState([]);
  // The first contacted ones
  const [contacted, setContacted] = useState([]);
  // The preparing work offer ones
  const [prepared, setPrepared] = useState([]);
  // The sent to therapists ones
  const [therapists, setTherapists] = useState([]);
  
  function saveCards() {
    localStorage.setItem('bookings', JSON.stringify(bookings));
    localStorage.setItem('contacted', JSON.stringify(contacted));
    localStorage.setItem('prepared', JSON.stringify(prepared));
    localStorage.setItem('therapists', JSON.stringify(therapists));
  };
  function loadCards () {
    const storedBookings = localStorage.getItem('bookings');
    const storedContacted = localStorage.getItem('contacted');
    const storedPrepared = localStorage.getItem('prepared');
    const storedTherapists = localStorage.getItem('therapists');

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
  };

  function handleSubmitForm(event) {
    const id = uuidv4();
    console.log(event);

    const newBooking = {
      id,
      name: event.name,
      age: event.age,
      phone: event.phone,
      email: event.email,
    };
    setBookings((prevBookings) => [...prevBookings, newBooking]);
    saveCards();
  }

  function deleteBooking(index:number, keyNo:number) {
    console.log(index,keyNo);
    if (keyNo === 1) {
      setBookings(bookings.filter((booking) => booking.id !== index));
    } else if (keyNo === 2) {
      setContacted(contacted.filter((booking) => booking.id !== index));
    } else if (keyNo === 3) {
      setPrepared(prepared.filter((booking) => booking.id !== index));
    } else {
      setTherapists(therapists.filter((booking) => booking.id !== index));
    }
    saveCards();
  }

  function rightSwitch(index:number, keyNo:number) {
    const element = bookings.find((booking) => booking.id === index);
    const element2 = contacted.find((booking) => booking.id === index);
    const element3 = prepared.find((booking) => booking.id === index);
    
    console.log(index,keyNo);
    if (keyNo === 1) {
      if(!element){
        return;
      }
      setContacted((prevBookings) => [...prevBookings, element]);
    } else if (keyNo === 2) {
      if(!element2){
        return;
      }
      setPrepared((prevBookings) => [...prevBookings, element2]);
    } else if (keyNo === 3) {
      if(!element3){
        return;
      }
      setTherapists((prevBookings) => [...prevBookings, element3]);
    }
    deleteBooking(index,keyNo);
    saveCards();

  }

  function createCard(booking, keyNo) {
    return (
      <Card
        key={booking.id}
        booking={booking}
        keyNo={keyNo}
        onDelete={deleteBooking}
        onRight={rightSwitch}
      />
    );
  }
  useEffect(() => {
    loadCards();

    const saveInterval = setInterval(() => {
      saveCards();
    }, 1000);

    return () => clearInterval(saveInterval);
  }, []);

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
            <div className="flex-1 border border-blue-300 rounded-lg ">
              <div className="flex justify-between items-center bg-sky-100 mb-0">
                <b className="ml-2 text-black text-sm mt-2">Unclaimed</b>
                <b className="mr-2 text-black text-sm">{bookings.length}</b>
              </div>
              <div className="bg-sky-100 h-[600px] scrollbar-thin overflow-auto p-1 mt-0">
                {bookings.map((booking) => createCard(booking, 1))}
              </div>
            </div>
            {/* First Contacted */}
            <div className="flex-1 border bg-sky-200 rounded-lg border-blue-300">
              <div className="flex justify-between items-center mb-0">
                <b className="ml-2 text-black text-sm mt-2">First Contact</b>
                <b className="mr-2 text-black text-sm">{contacted.length}</b>
              </div>
              <div className=" p-1 h-[300px] overflow-y-auto scrollbar-thin mt-0">
                {contacted.map((booking) => createCard(booking, 2))}
              </div>
            </div>
            {/* Preparing work offer */}
            <div className="flex-1 border bg-sky-200 rounded-lg border-blue-300">
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
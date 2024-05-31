'use client'

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";




export default function EventsPage() {

  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      setLoading(true)
      console.log("http://localhost:3001/api/events");
      const res = await axios.get("http://localhost:3001/api/events")
      

      setEvents(res.data)
      setLoading(false)
      console.log(res.data)

      
    } catch (err) {
      console.log('Error', err);
      setLoading(false);
      toast.error('Something goes wrong!!');
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])
  
  
    return (
    <div className=" bg-slate-950 flex flex-col">
      <h1 className="text-center my-12 font-semibold font-mono text-5xl"> Events List  </h1>
      <div className="grid grid-cols-3 p-9 gap-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          events.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`} className="bg-slate-900 p-9 rounded shadow">
              <img src={event.imageURL} alt={event.eventName} className="w-50 h-45 p-8 object-fill" />
              <div className="p-7 justify-center ">
                <h2 className="font-bold">{event.eventName}</h2>
                <p>{event.eventDescription}</p>
                <p>{event.eventLocation}</p>
                <p>{new Date(event.eventDate).toLocaleDateString()}</p>
                <p>{event.eventTime}</p>
                <p>Tickets available: {event.availableTickets}</p>
                <p>Price: {event.eventPrice}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
      

  
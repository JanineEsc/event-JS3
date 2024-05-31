'use client';

import { Button } from "@/components/ui/button";
import { auth } from "@/firebase/config";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [book, setBook] = useState(false);
  const [loading, setLoading] = useState(true);
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/events/${id}`);
        setEvent(res.data);
        console.log(res.data);
        setBook(res.data.users && res.data.users.includes(userId));
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id, userId]);

  const bookEvent = async () => {
    const url = `http://localhost:3001/api/events/${id}`;
    const data = { user: userId, cancel: book };
  
    try {
      const response = await axios.patch(url, data);
      console.log('Response:', response);
  
      if (response.status === 200) {
        setBook(!book);
        const res = await axios.get(`http://localhost:3001/api/events/${id}`);
        setEvent(res.data);
      } else {
        console.error('Unexpected status code:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-900 h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="bg-slate-900 h-screen flex justify-center items-center">
        <p>Event not found</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-slate-900 h-screen text-white pt-20">
        <div className="w-1/3 mx-auto bg-gray-950 p-10 items-center rounded-lg shadow-md">
          <h1 className="text-center font-mono text-4xl py-4">{event.eventName}</h1>
          <img src={event.imageURL} alt={event.eventName} className="w-48 h-48 object-cover rounded-md mb-5 mx-auto"/>
          <p><strong>Name:</strong> {event.eventName}</p>
          <p>{new Date(event.eventDate).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {event.eventTime}</p>
          <p><strong>Location:</strong> {event.eventLocation}</p>
          <p><strong>Price:</strong> ${event.eventPrice}</p>
          <p><strong>Description:</strong> {event.eventDescription}</p>
          <Button className="mt-3 mr-2" onClick={bookEvent}>
          {book ? 'Unbook' : 'Book Now'}
        </Button>
        {event.availableTickets === 0 && 
          <Button className="bg-red-500 mt-2 text-white" disabled >
            No Tickets Left
          </Button>
        }
        </div>
      </div>
    </>
  );
}

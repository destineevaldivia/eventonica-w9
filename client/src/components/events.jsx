import { useState, useEffect } from "react";
import EventCard from "./event";
import FormEvent from './form';
import CardGroup from 'react-bootstrap/CardGroup';

function Events() {
  const [events, setEvents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [eventToUpdate, setEventToUpdate] = useState(null);
    
//GET request function that fetches events data from my DB
    const getRequest = () => {
      fetch(("http://localhost:8080/api/events"))
      .then((response) => response.json())
      .then(eventsData => {
        setEvents(eventsData); //update the `events` state with the fetched data
        console.log('Events fetched...', eventsData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
//POST request function 
    const handlePostRequest = (data) => {
        fetch('http://localhost:8080/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .then((newEvent) => {
        console.log("event posted", newEvent)
        setEvents([...events, newEvent])
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
    };
//DELETE request function 
    const handleDeleteRequest = (id) => {
      fetch(`http://localhost:8080/api/events/${id}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json'},
      })
      .then((response) => {
        if(response.status === 204) {
          getRequest() 
        } 
      })
      .catch((error) => {
        console.error("Error deleting events:", error);
      });
    };
    
//PUT request function 
    const handleUpdate = (id, updateData) => {
      fetch(`http://localhost:8080/api/events/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      })
      .then((response) => response.json())
      .then((updatedEvent) => {
        console.log("Event updated:", updatedEvent);
        // update the local state with the updated event
        setEvents((prevEvents) => 
          prevEvents.map((event) => 
            event.id === updatedEvent.id ? updatedEvent : event
          )
        );
        setIsEditing(false);
        setEventToUpdate(null);
    })
      .catch((error) => {
        console.log("Error updating event:", error);
      });
  };

  useEffect(() => { 
    getRequest() 
  }, []);

  return (
    <>
    <div>
    <CardGroup className="Events">
            {events.map(event => (
            <EventCard key={event.id} event={event} onDelete={handleDeleteRequest}/>
            ))}
    </CardGroup>
    </div>

    <div>
          <FormEvent 
          edit={handleUpdate} 
          event={eventToUpdate} 
          editMode={isEditing} 
          submit={handlePostRequest}
          />  
    </div>
    </>
  );
}

export default Events;
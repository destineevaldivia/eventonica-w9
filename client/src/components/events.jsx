import { useState, useEffect } from "react";
import EventCard from "./event";
import FormEvent from './form';
import CardGroup from 'react-bootstrap/CardGroup';

//This functional component called Events, manages a piece of state ('events')
function Events() {
    //state mangement
    const [events, setEvents] = useState([]);
    
    //GET request function that fetches events data from my DB
    const getRequest = () => {
      fetch("http://localhost:8080/api/events")
      //then method chain handles the response from the server, converts the data to JSON
      .then((response) => response.json())
      .then(events => {
        //setEvents function is called to update the `events` state with the fetched data
        setEvents(events); 
        console.log('Events fetched...', events);
        });
    }
    //POST request function 
    const handlePostRequest = (data) => {
        fetch('http://localhost:8080/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .then((newEvent) => {
        console.log("inside post", newEvent)
        setEvents([...events, newEvent])
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
    };
    //DELETE request function 
    const handleDeleteRequest = (id) => {
      //console.log("From the events list", id);
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
        console.error("Fetch error:", error);
      });
    };
    
    //FINISH PUT request function 
    const handlePutRequest = (id, updateData) => {
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
    })
      .catch((error) => {
        console.log("Error updating event:", error);
      });
  };


  useEffect(() => { getRequest() }, []);

  return (
    <>
    <div>
    <CardGroup className="Events">
            {events.map(event =>
            <EventCard key={event.id} event={event} onDelete={handleDeleteRequest}/>
            )}
    </CardGroup>
    </div>
    <div>
        <FormEvent submit={handlePostRequest}/>
    </div>

    <div>
        <FormEvent edit={handlePutRequest}/>
    </div>
    </>
  );
}

export default Events;
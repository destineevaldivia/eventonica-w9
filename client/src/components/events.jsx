import { useState, useEffect } from "react";
import EventCard from "./event";
import FormEvent from './form';
import CardGroup from 'react-bootstrap/CardGroup';

//This functional component called Events, manages a piece of state ('events')
function Events() {
    //state mangement
    const [events, setEvents] = useState([]);
    
    //A JS Function that makes a GET request and fetch events data from my DB
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

    const handlePostRequest = (data) => {
      return fetch('http://localhost:8080/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      });
      .then((response) => {return response.json()})
      .then((data) => {
        console.log(data)
        setEvents([...events, data])
      })
    }

  useEffect(() => { getRequest() }, []);

  return (
    <>
    <div>
    <CardGroup className="Events">
            {events.map(event =>
            <EventCard key={event.id} title={event.title} location={event.location} time={event.eventtime}/>
            )}
    </CardGroup>
    </div>
    <div>
        <FormEvent submit={handlePostRequest}/>
    </div>
    </>
  );
}

export default Events;
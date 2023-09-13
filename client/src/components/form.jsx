import { useState, useRef } from "react";

const FormEvent = () => {
    //const [event, setEvent] = useState({title: "", location:"", eventdate:""})
    const userTitle = useRef()
    const userLocation = useRef()
    //const userEventDate = new Date().now();

    const handleSubmit = (e) => {
        e.preventDefault();
        

    }
    return (
        <form onSubmit={handleSubmit}>
           <h3>Please register your Event below</h3>
           <label for="title">Event Title: </label>
           <input type="text" name="title" required placeholder="Title of your Event" ref={userTitle}/> 

           <label for="location">Event Location: </label>
           <input type="text" name="location" required placeholder="Where it will take place" ref={userLocation}/> 

           <label for="eventdate">Event Title: </label>
           <input type="date" name="eventdate" required placeholder="Date of your Event" ref={userTitle}/> 

           <button type="submit">Submit</button>
        </form>
    )
}

export default FormEvent;
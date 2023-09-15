import './form.css';
import { useState, useEffect, useRef } from "react";

const FormEvent = ({ event, submit, edit }) => {

    const [formData, setFormData]  = useState(event || { title: '', location: '', eventdate: ''});
    const userTitle = useRef(formData.title);
    const userLocation = useRef(formData.location);
    const userEventDate = useRef(formData.eventdate);

    const handleSubmit = (e) => {
        e.preventDefault();
       const userEvent = {
            title: userTitle.current?.value, 
            location: userLocation?.current.value, 
            eventdate:  userEventDate?.current.value, 
        }; 

        if (event && event.id) {
            // Call the edit function for editing an event
            edit(event.id, userEvent);
        } else {
            // Call the submit function for creating a new event
            submit(userEvent);
        }
    };
    const editMode = event && event.id; // Determine edit mode based on the presence of event.id
    return (
        <form onSubmit={handleSubmit}>
           <h3 className="formTitle">{editMode ? "Edit Event" : "Add a new event: "}</h3>

        <div className="form">
            <label htmlFor="title">Event Title: </label>
            <input 
                type="text" 
                name="title" 
                required 
                placeholder="Title of your Event" 
                ref={userTitle}
                defaultValue={editMode ? event.title : ""}
                /> 

            <label htmlFor="location">Event Location: </label>
            <input 
                type="text" 
                name="location" 
                required 
                placeholder="Where it will take place" 
                ref={userLocation}
                defaultValue={editMode ? event.location : ""}
                /> 

            <label htmlFor="eventdate">Event Date: </label>
            <input 
                type="date" 
                name="eventdate" 
                required 
                placeholder="Date of your Event" 
                ref={userEventDate}
                defaultValue={
                    editMode ? event.eventdate : ""}  
                    // ***check that eventdate is a date string
                /> 
        </div>
            <button type="submit">
                {editMode ? "Update" : "Submit"}
            </button>
        </form>
    );
}

export default FormEvent;
import './form.css';
import { useRef } from "react";

const FormEvent = (props) => {
    //const [ event, setEvent ] = useState({title: "", location:"", eventdate:""})
    const userTitle = useRef()
    const userLocation = useRef()
    const userEventDate = useRef()

    const handleSubmit = (e) => {
        e.preventDefault();
       const userEvent = {
            title: userTitle.current?.value, 
            location: userLocation?.current.value, 
            eventdate:  userEventDate?.current.value, // ?? could be new Date()
        }; 

        if (props.editMode) {
            // Call the edit function for editing an event
            props.edit(props.eventId, userEvent);
        } else {
            // Call the submit function for creating a new event
            props.submit(userEvent);
        }
    //    console.log("inside in the component", userEvent);
    //    props.submit(userEvent)
    };
    
    return (
        <form onSubmit={handleSubmit}>
            {/* conditionally render the form based on whether the form is in edit mode or create mode
            ternary -- condition ? if True : if False */}
           <h3 className="formTitle">{props.editMode ? "Edit Event" : "Add a new event: "}</h3>

        <div className="form">
            <label htmlFor="title">Event Title: </label>
            <input 
                type="text" 
                name="title" 
                required 
                placeholder="Title of your Event" 
                ref={userTitle}
                defaultValue={props.editMode ? props.event.title : ""}
                /> 

            <label htmlFor="location">Event Location: </label>
            <input 
                type="text" 
                name="location" 
                required 
                placeholder="Where it will take place" 
                ref={userLocation}
                defaultValue={props.editMode ? props.event.location : ""}
                /> 

            <label htmlFor="eventdate">Event Date: </label>
            <input 
                type="date" 
                name="eventdate" 
                required 
                placeholder="Date of your Event" 
                ref={userEventDate}
                defaultValue={
                    props.editMode ? props.event.eventdate : ""}  
                    // ***check that eventdate is a date string
                /> 
        </div>
            <button type="submit">
                {props.editMode ? "Update" : "Submit"}
            </button>
        </form>
    );
}

export default FormEvent;
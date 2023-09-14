import './form.css';
import { useRef } from "react";

const FormEvent = (props) => {
    //const [ event, setEvent ] = useState({title: "", location:"", eventdate:""})

    const userTitle = useRef()
    const userLocation = useRef()

    const handleSubmit = (e) => {
        e.preventDefault();
       const userEvent = {title: userTitle.current?.value, location: userLocation?.current.value, eventdate: new Date()}
       console.log("inside in the component", userEvent);
       //setEvent(userEvent);
       props.submit(userEvent)
    }
    return (
        
        <form onSubmit={handleSubmit}>
           <h3 className="formTitle">Add a new event:</h3>

        <div className="form">
            <label htmlFor="title">Event Title: </label>
            <input type="text" name="title" required placeholder="Title of your Event" ref={userTitle}/> 

            <label htmlFor="location">Event Location: </label>
            <input type="text" name="location" required placeholder="Where it will take place" ref={userLocation}/> 

            <label htmlFor="eventdate">Event Title: </label>
            {/* <input type="date" name="eventdate" required placeholder="Date of your Event" ref={userEventDate}/>  */}
        </div>
            <button type="submit">Submit</button>
        </form>

    )
}

export default FormEvent;
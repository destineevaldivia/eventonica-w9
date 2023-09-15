import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import moment from 'moment';


const EventCard = (props) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = () => {
        const idToDelete = props.event.id; ///???what does this access
        confirmAlert({
            title: 'Confirm to Delete Event',
            message: `Are you sure to delete this event: ${props.event.title}?`,
            buttons: [
              {
                label: 'Yes',
                onClick: () => props.onDelete(idToDelete)
              },
              {
                label: 'No',
                onClick: () => console.log('Click No')
              },
              {
                label: 'Maybe?',
                onClick: () => console.log('Click Maybe')
              },
            ],
          });
        };

        const handleEdit = () => {
            setIsEditing(true);
        };

        const handleUpdate = () => {
        // Implement your logic for handling the edit operation.
        // You can open a modal or navigate to an edit page.
        return <div> Edit mode goes here </div>  
        }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title> {props.event.title} </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Date: {!props.event.eventdate ? "TBD" :moment(props.event.eventdate).format('MMMM Do, YYYY')}</Card.Subtitle>
                
                <Card.Text> Location: {props.event.location} </Card.Text>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={handleEdit}>Edit</button>
            </Card.Body>
        </Card>
    );
};

export default EventCard; 
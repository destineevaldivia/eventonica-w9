import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import moment from 'moment';
import Modal from 'react-modal';
import FormEvent from './form';


const EventCard = ({ event, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false); //

    const handleDelete = () => {
        const idToDelete = event.id; ///???what does this access
        confirmAlert({
            title: 'Confirm to Delete Event',
            message: `Are you sure to delete this event: ${event.title}?`,
            buttons: [
              {
                label: 'Yes',
                onClick: () => onDelete(idToDelete)
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
            setModalIsOpen(true); //Open the modal when editing
        };

        const handleUpdate = () => {
        // logic for handling the edit operation by opening modal
        console.log('Edit button clicked for event', event);  
        // Perform any updates you need with the updatedData
        // Close the modal when done
        setModalIsOpen(false);
        setIsEditing(false);
        };
        //Function to close the modal
        const closeModal = () => {
            setIsEditing(false);
            setModalIsOpen(false);
        };

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title> {event.title} </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Date: 
                {!event.eventdate ? "TBD" :moment(event.eventdate).format('MMMM Do, YYYY')}
                </Card.Subtitle>
                
                <Card.Text> Location: {event.location} </Card.Text>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={handleEdit}>Edit</button>

                {/* Modal for editing*/}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Edit Event Modal"
                >
                    <FormEvent 
                    edit={handleUpdate} 
                    event={event} 
                    editMode={isEditing}
                    />
                    
                    <button onClick={closeModal}>Close Modal </button>
                </Modal>
            </Card.Body>
        </Card>
    );
};

export default EventCard; 
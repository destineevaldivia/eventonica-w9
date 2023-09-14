import './App.css';
import Events from './components/events';
import FormEvent from './components/form';
import  { useState, useEffect } from 'react';

function App() {

  const [events, setEvents] = useState([]);

  const handlePostRequest = async (data) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    const request = await fetch('http://localhost:8080/api/events', requestOptions);
    const response = await request.json();
    setEvents([...events, response]);
  }

  return (
    <div className="App">
    <h1>Techtonica 2023 H2 events</h1>
  <Events />
  <FormEvent submit={handlePostRequest}/>
  </div>

  )
  
}

export default App

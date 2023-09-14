const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const db = require('./db/db-connection.js'); 

const app = express();
const PORT = 8080;

// Configuring cors middleware
app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define root route
app.get("/", (req, res) => {
    res.json("Hello Techtonica 2023 H2 to your Server for Eventonica!");
  });

// Defines the route handler for incoming GET request to this URL
app.get('/api/events', async (req, res) =>{
    // Real connection with the DB eventonica
    try {
        // retrieving the data from db query and storing it in const variable, `events`
        const { rows: events } = await db.query('SELECT * FROM events');
        console.log("in the server", events)
        // send events data as a JSON reponse to the client
        res.send(events);

    } catch(error){
        console.log(error);
        return res.status(400).json({error});

    }  
})
//Defines the route handler for incoming POST request to this URL
app.post('/api/events', async (req, res) => {

    /*INSERT INTO events (title, location, eventdate) VALUES ('Last Friday at Techtonica', 'Online', '2023-12-22');*/
    try {
        const { title, location, eventdate } = req.body;
        //fxn syntax = await db.query("the sql query", [title, location, eventdate])
        const result = await db.query(
            "INSERT INTO events (title, location, eventdate) VALUES ($1, $2, $3) RETURNING *",
            [title, location, eventdate]  
        );
        let dbResponse = result.rows[0];
        console.log(dbResponse)
        res.json(dbResponse);
    } catch(error) {
        console.log(error);
        return res.status(400).json({error})
    }
})

//Defines the route handler for incoming DELETE request to this URL
app.delete('/api/events:id', async (req, res) => {
    //TODO- make this delete req work
    try {
        const eventId = req.params.id;
        const deleteOperation = await db.query("DELETE FROM events WHERE id=$1", [eventId]);
        console.log(deleteOperation);
        res.status(204).end()
    } catch (error) {
        console.log(error);
        return res.status(400).json({error})
    }
})

////Defines the route handler for incoming PUT request to this URL


//listen on PORT 8080, start up server and run
app.listen(PORT, () => console.log(`Hola! Server running on Port http://localhost:${PORT}`));


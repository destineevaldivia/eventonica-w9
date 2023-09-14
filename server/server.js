//This is the minimal express server. 
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

// //creates an endpoint for the route `/`
app.get("/", (req, res) => {
    res.json("Hello Techtonica 2023 H2 to your Server for Eventonica!");
  });

//Defines the route handler for incoming GET request to this URL
app.get('/api/events', async (req, res) =>{

    //real connection with the DB eventonica
    try{
        //DataBase query retrieving data from `events` table and storing it in the events variable
        const { rows: events } = await db.query('SELECT * FROM events');
        console.log("in the server", events)
        //send events data as a JSON reponse to the client
        res.send(events);

    } catch(error){
        console.log(error);
        return res.status(400).json({error});

    }  
})

app.post('/api/events', async (req, res) => {
    // const userData = req.body;
    // console.log('In the server line 44', userData)

    /*INSERT INTO events (title, location, eventdate) VALUES ('Last Friday at Techtonica', 'Online', '2023-12-22');*/
    try {
        const userData = req.body;
        const { title, location, eventdate } = req.body;
        //fxn syntax = await db.query("the sql query", [title, location, eventdate])
        const { rows } = await db.query(
            "INSERT INTO events (title, location, eventdate) VALUES ($1, $2, $3)"
            [title, location, eventdate]
        );
        console.log("In the server", rows[0])
        res.send(rows[0]);
   
    } catch(error){
        console.log(error);
        return res.status(400).json({error})
    }
})

//listen on PORT 8080, start up server and run
app.listen(PORT, () => console.log(`Hola! Server running on Port http://localhost:${PORT}`));


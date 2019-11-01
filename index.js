const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database/connection');

const app = express();
const port = process.env.PORT || 3000;

const updateRoute = require('./routes/updateflight');
const deleteRoute = require('./routes/deleteflight');
const postRoute = require('./routes/createflight');
const people = require('./routes/people');
const flight = require('./routes/flight');
const flightSchedule = require('./routes/flight_schedule');



// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/updateflight", updateRoute);
app.use("/deleteflight", deleteRoute);
app.use("/createflight", postRoute);
app.use("/people", people);
app.use("/flight", flight);
app.use("/flight_schedule", flightSchedule);

// server status
app.get('/health', (req, res) => {
    res.send('Server is healthy');
})

app.get('/home', (req, res) => {
    console.log('inside home...');
    res.send('Home');
})

// TODO: authentication for extra marks

// TODO: setup routes after designing tables

app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});

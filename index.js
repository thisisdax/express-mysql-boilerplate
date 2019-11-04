const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./auth/authenticate');

const app = express();
const port = process.env.PORT || 3000;

const updateRoute = require('./routes/updateflight');
const deleteRoute = require('./routes/deleteflight');
const postRoute = require('./routes/createflight');
const people = require('./routes/people');
const flight = require('./routes/flight');
const booking = require('./routes/booking');
const flightSchedule = require('./routes/flight_schedule');
const login = require('./routes/login');


// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/login", login);
app.use("/people", people);
app.use("/flight", flight);
app.use("/flight_schedule", flightSchedule);
app.use("/updateflight", updateRoute);
app.use("/deleteflight", deleteRoute);
app.use("/createflight", postRoute);
app.use("/booking", auth.middleware, booking);
app.use("/admin", auth.middleware);

// server status
app.get('/health', (req, res) => {
    res.send('Server is healthy');
})

app.get('/home', (req, res) => {
    console.log('inside home...');
    res.send('Home');
})

app.post('/verify', (req, res) => {
    console.log(req);
    console.log(auth.verify(req.body.token));
    res.send(auth.verify(req.body.token));
})

// TODO: authentication for extra marks

// TODO: setup routes after designing tables

app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});

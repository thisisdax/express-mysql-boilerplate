const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./auth/authenticate');

const app = express();
const port = process.env.PORT || 3000;

const admin = require('./routes/admin');
const people = require('./routes/people');
const flight = require('./routes/flight');
const booking = require('./routes/booking');
const flightSchedule = require('./routes/flight_schedule');
const login = require('./routes/login');
const signup = require('./routes/signup');
const popular = require('./routes/popularflight');
const profitable = require('./routes/profitableflight');

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/login", login);
app.use("/signup", signup);
app.use("/people", people);
app.use("/flight", flight);
app.use("/flight_schedule", flightSchedule);
app.use("/popular", popular);
app.use("/profitable", profitable);
app.use("/booking", auth.middleware, booking);
app.use("/admin", auth.middlewareAdmin, admin);

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

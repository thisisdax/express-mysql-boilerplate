const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database/connection');

const app = express();
const port = process.env.PORT || 3000;
const peopleRoute = require('./routes/people');


// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/people", peopleRoute);

// server status
app.get('/health', (req, res) => {
    res.send('Server is healthy');
})

app.get('/home', (req, res) => {
    console.log('hehe');
    res.send('Home');
})

// TODO: authentication for extra marks

// TODO: setup routes after designing tables

app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});

const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../database/connection')

var sql = "INSERT INTO flight (flight_id, aircraft_id) VALUES (?, ?)";

Router.post('/', function(req, res){
    var flight_id = req.body.flight_id;
    var aircraft_id = req.body.aircraft_id;
    res.send("Successfully insert aircraft_id: " + aircraft_id);
    console.log("Successfully insert" + aircraft_id);
    mysqlConnection.query(sql, [flight_id, aircraft_id], function (err, data) {
        if(err) throw err;
        console.log("1 record inserted");
    });
});
    
module.exports = Router;
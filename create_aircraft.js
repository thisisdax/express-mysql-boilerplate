const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../database/connection')
//
var sql = "INSERT INTO aircraft (aircraft_id, model, manufacturer,capacity) VALUES (?, ?, ?, ?)";

Router.post('/', function(req, res){
    var model= req.body.model;
    var aircraft_id = req.body.aircraft_id;
    var manufacturer= req.body.manufacturer;
    var capacity= req.body.capacity;
    res.send("Successfully insert aircraft_id: " + aircraft_id);
    console.log("Successfully insert" + aircraft_id);
    mysqlConnection.query(sql, [aircraft_id, model, manufacturer,capacity], function (err, data) {
        if(err) throw err;
        console.log("1 record inserted");
    });
});
    
module.exports = Router;
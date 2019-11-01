const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../database/connection');

var sql = "DELETE FROM aircraft WHERE aircraft_id = (?)";

Router.post('/', function(req, res){
    var flight_id = req.body.aircraft_id;
    res.send("Successfully deleted aircraft_id: " + aircraft_id);
    console.log("Successfully deleted" + aircraft_id);
    mysqlConnection.query(sql, aircraft_id, function (err, data) {
        if(err) throw err;
        console.log("1 record deleted");
    });
});
    
module.exports = Router;
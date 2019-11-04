const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../database/connection');
/**
 * update existing flight_id by changing the aircraft_id
 */
var sql = "UPDATE flight SET aircraft_id = (?) WHERE flight_id = (?)";

Router.post('/', function(req, res){
    var aircraft_id = req.body.aircraft_id;
    var flight_id = req.body.flight_id;
    res.send("Successfully updated flight_id: " + flight_id);
    console.log("Successfully updated" + flight_id);
    mysqlConnection.query(sql, [aircraft_id, flight_id], function (err, data) {
        if(err) throw err;
        console.log("1 record updated");
    });
});
    
module.exports = Router;

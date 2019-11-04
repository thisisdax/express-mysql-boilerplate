const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../database/connection');

var sql = "DELETE FROM flight WHERE flight_id = (?)";

Router.post('/', function(req, res){
    var flight_id = req.body.flight_id;
    res.send("Successfully deleted flight_id: " + flight_id);
    console.log("Successfully deleted" + flight_id);
    mysqlConnection.query(sql, flight_id, function (err, data) {
        if(err) throw err;
        console.log("1 record deleted");
    });
});
    
module.exports = Router;
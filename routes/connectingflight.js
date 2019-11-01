const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../database/connection')

/**
 * finding flights that will return 2 flights with window period within 2 hours
 */

var sql = "select * from (select s1.schedule_id first_flight, s2.schedule_id second_flight, TIMESTAMPDIFF(HOUR, s2.depart_datetime, s1.arrival_datetime) AS diff FROM test.schedule s1, test.schedule s2 WHERE  s1.depart_airport = (?) AND s2.arrival_airport = (?) and s1.arrival_airport = s2.depart_airport) as R where diff < (?)";

Router.post('/', function(req, res){
    var depart_airport = req.body.depart_airport;
    var arrival_airport = req.body.arrival_airport;
    var time = req.body.time;
    res.send("Successfully found first flight: " + first_flight + " and the second flight: " + second_flight);
    mysqlConnection.query(sql, [depart_airport, arrival_airport, time], function (err, data) {
        if(err) throw err;
        console.log("Done :)");
    });
});
    
module.exports = Router;
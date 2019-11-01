const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../database/connection')

/**
 * top 10 most popular destination
 */
var sql = "select arrival_airport, count(*) as counts from booking b, flightschedule fs, schedule s, flight f where b.flight_schedule_id = fs.flight_schedule_id and fs.schedule_id = s.schedule_id and fs.flight_id = f.flight_id group by arrival_airport order by counts desc limit 10";

Router.get("/", (req,res)=>{
    mysqlConnection.query(sql, (err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else {
            console.log(err);
        }
    })
});

    
module.exports = Router;
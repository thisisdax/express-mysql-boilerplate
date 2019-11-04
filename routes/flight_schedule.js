const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../database/connection');

Router.get("/availability", (req,res)=>{
  console.log('originalUrl: ', req.originalUrl);
  console.log('qs: ', req.query);
  console.log('params: ', req.params);
  console.log("=====");
  // query for records that are today(1 year ago) onwards, do not return past records i.e. yesterday onwards
    mysqlConnection.query(
      `select * from availability a, flightschedule fs, schedule s
      where a.flight_schedule_id = fs.flight_schedule_id
      and a.availability = 1
      and fs.schedule_id = s.schedule_id
      and fs.flight_schedule_id = a.flight_schedule_id
      and depart_datetime >= CURRENT_DATE() - 365`,
      (err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else {
            console.log(err);
        }
    })
});

// // GET AVAILABILITY OF FLIGHT
Router.get("/availability", (req,res)=>{
  console.log('originalUrl: ', req.originalUrl);
  console.log('qs: ', req.query);
  console.log('params: ', req.params);
  console.log("=====");
  // e.g. http://localhost:3000/flight_schedule/availability/Indonesia-Indonesia/2019-08-15
    mysqlConnection.query(
      `select * from schedule s
      where s.depart_airport like '${req.query.from}'
      and s.arrival_airport like '${req.query.to}'
      and s.depart_datetime >= '${req.query.date}';`,
      (err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else {
            console.log(err);
        }
    })
});

// GET AVAILABILITY OF FLIGHT
Router.get("/availability/:scheduleId", (req,res)=>{
  console.log('originalUrl: ', req.originalUrl);
  console.log('qs: ', req.query);
  console.log('params: ', req.params);
  console.log("=====");
  // e.g. http://localhost:3000/flight_schedule/availability/258629177
    mysqlConnection.query(
      `select * from availability a, flightschedule fs
      where a.flight_schedule_id = fs.flight_schedule_id
      and a.availability = 0 and fs.schedule_id LIKE '${req.params.scheduleId}'`,
      (err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else {
            console.log(err);
        }
    })
});

// GET DETAILS OF FLIGHT
Router.get("/details/:scheduleId", (req,res)=>{
  console.log('originalUrl: ', req.originalUrl);
  console.log('qs: ', req.query);
  console.log('params: ', req.params);
  console.log("=====");
  // e.g. http://localhost:3000/flight_schedule/details/258629177
    mysqlConnection.query(
      `select * from schedule s where s.schedule_id = ${req.params.scheduleId}`,
      (err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else {
            console.log(err);
        }
    })
});

module.exports = Router;
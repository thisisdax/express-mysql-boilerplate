const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../database/connection')

// GET LIST OF FLIGHT INFO (Flight ID)
Router.get("/info", (req,res)=>{
  console.log('originalUrl: ', req.originalUrl);
  console.log('qs: ', req.query);
  console.log('params: ', req.params);
  console.log("=====");
  // e.g. http://localhost:3000/flight/info
    mysqlConnection.query(
      `select * from flight`,
      (err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else {
            console.log(err);
        }
    })
});

// GET DETAILS OF FLIGHT (Aircraft ID)
// TODO : Need to rewrite this SQL to query something that we can use for our use case
Router.get("/info/:flightId", (req,res)=>{
  console.log('originalUrl: ', req.originalUrl);
  console.log('qs: ', req.query);
  console.log('params: ', req.params);
  console.log("=====");
  // e.g. http://localhost:3000/flight/info/19VDE3F37EE513887
    mysqlConnection.query(
      `select * from flight f where f.flight_id LIKE '${req.params.flightId}'`,
      (err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else {
            console.log(err);
        }
    })
});

Router.get("/explore", (req, res) => {
  console.log('originalUrl: ', req.originalUrl);
  console.log('qs: ', req.query);
  console.log('params: ', req.params);
  console.log("=====");
  if (!!req.query.from && !!req.query.to) {
    mysqlConnection.query(
      `select s.*, fs.flight_schedule_id, concat(s.schedule_id, fs.flight_schedule_id) as primary_key
      from schedule s, flightschedule fs
      where fs.schedule_id = s.schedule_id
      and s.depart_datetime > DATE_SUB(NOW(),INTERVAL 10 YEAR)
      and s.depart_airport LIKE '%${req.query.from}%'
      and s.arrival_airport LIKE '%${req.query.to}%'
      order by s.price asc
      limit 100`,
      (err, rows, fields)=>{
        if(!err){
          res.send(rows);
        }
        else {
          res.send([]);
          console.log(err);
        }
    })
  } else if (!!req.query.from) {
    mysqlConnection.query(
      `select s.*, fs.flight_schedule_id, concat(s.schedule_id, fs.flight_schedule_id) as primary_key
      from schedule s, flightschedule fs
      where fs.schedule_id = s.schedule_id
      and s.depart_datetime > DATE_SUB(NOW(),INTERVAL 10 YEAR)
      and s.depart_airport LIKE '%${req.query.from}%'
      order by s.price asc
      limit 100`,
      (err, rows, fields)=>{
        if(!err){
          res.send(rows);
        }
        else {
          res.send([]);
          console.log(err);
        }
    })
  } else if (!!req.query.to) {
    mysqlConnection.query(
      `select s.*, fs.flight_schedule_id, concat(s.schedule_id, fs.flight_schedule_id) as primary_key
      from schedule s, flightschedule fs
      where fs.schedule_id = s.schedule_id
      and s.depart_datetime > DATE_SUB(NOW(),INTERVAL 10 YEAR)
      and s.arrival_airport LIKE '%${req.query.to}%'
      order by s.price asc
      limit 100`,
      (err, rows, fields)=>{
        if(!err){
          res.send(rows);
        }
        else {
          res.send([]);
          console.log(err);
        }
    })
  } else {
    mysqlConnection.query(
    `select s.*, fs.flight_schedule_id, concat(s.schedule_id, fs.flight_schedule_id) as primary_key
    from schedule s, flightschedule fs
    where fs.schedule_id = s.schedule_id
    and s.depart_datetime > DATE_SUB(NOW(),INTERVAL 10 YEAR)
    order by s.price asc
    limit 100`,
    (err, rows, fields)=>{
      if(!err){
        console.log(rows);
        res.send({rows, fields});
      }
      else {
        res.send([]);
        console.log(err);
      }
    })
  }
});

Router.get("/explore/details", (req, res) => {
  mysqlConnection.query(
    `select
      s.schedule_id,
      s.arrival_airport,
      s.arrival_datetime,
      s.depart_airport,
      s.depart_datetime,
      s.price,
      fs.flight_schedule_id,
      fs.flight_id,
      f.aircraft_id
    from schedule s, flightschedule fs, flight f, aircraft a
    where s.schedule_id = fs.schedule_id
    and fs.flight_id = f.flight_id
    and f.aircraft_id = a.aircraft_id
    and fs.flight_schedule_id = ${req.query.flight_schedule_id}
    and s.schedule_id = ${req.query.schedule_id}`,
    (err, rows, fields)=>{
      if(!err){
        res.send(rows);
      }
      else {
        res.send([]);
        console.log(err);
      }
    }
  )
});

Router.get("/explore/details/seats", (req, res) => {
  mysqlConnection.query(
    `select * from availability av, flightschedule fs
    where av.flight_schedule_id = fs.flight_schedule_id
    and fs.flight_schedule_id = ${req.query.flight_schedule_id}`,
    (err, rows, fields)=>{
      if(!err){
        res.send(rows);
      }
      else {
        res.send([]);
        console.log(err);
      }
    }
  )
});

module.exports = Router;
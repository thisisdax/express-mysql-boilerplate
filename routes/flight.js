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

module.exports = Router;
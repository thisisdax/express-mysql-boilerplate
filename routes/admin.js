const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../database/connection');
/**
 * update existing flight_id by changing the aircraft_id
 */

Router.get('/searchflight', function(req, res) {
  console.log(req.query);
  if (!!req.query.aircraft_id && !!req.query.flight_id) {
    mysqlConnection.query(`select * from flight f where f.aircraft_id LIKE '%${req.query.aircraft_id}%' and f.flight_id LIKE '%${req.query.flight_id}%'`, (err, rows, fields) => {
      res.send({rows, fields});
    })
  } else if (!!req.query.flight_id) {
    mysqlConnection.query(`select * from flight f where f.flight_id LIKE '%${req.query.flight_id}%'`, (err, rows, fields) => {
      res.send({rows, fields});
    })
  } else if (!!req.query.aircraft_id) {
    mysqlConnection.query(`select * from flight f where f.aircraft_id LIKE '%${req.query.aircraft_id}%'`, (err, rows, fields) => {
      res.send({rows, fields});
    })
  } else {
    mysqlConnection.query(`select * from flight f limit 100`, (err, rows, fields) => {
      res.send({rows, fields});
    })
  }
})

var sqlUpdate = "UPDATE flight SET aircraft_id = (?) WHERE flight_id = (?)";

Router.put('/updateflight', function(req, res){
    var aircraft_id = req.body.aircraft_id;
    var flight_id = req.body.flight_id;
    
    mysqlConnection.query(sqlUpdate, [aircraft_id, flight_id], function (err, data) {
      if(err) {
        res.send(err);
      }
      res.send("Successfully updated flight_id: " + flight_id);
      console.log("Successfully updated" + flight_id);
      console.log("1 record updated");
    });
});

var sqlDelete = "DELETE FROM flight WHERE flight_id = (?) and aircraft_id = (?)";

Router.delete('/deleteflight', function(req, res){
    var flight_id = req.body.flight_id;
    var aircraft_id = req.body.aircraft_id;

    mysqlConnection.query(sqlDelete, [flight_id, aircraft_id], function (err, data) {
      if(err) {
        res.send(err);
      }
      res.send("Successfully deleted flight_id: " + flight_id);
      console.log("Successfully deleted" + flight_id);
      console.log("1 record deleted");
    });
});

var sqlCreate = "INSERT INTO flight (flight_id, aircraft_id) VALUES (?, ?)";

Router.post('/createflight', function(req, res){
    var flight_id = req.body.flight_id;
    var aircraft_id = req.body.aircraft_id;
    mysqlConnection.query(`select * from flight f where f.flight_id = '${req.body.flight_id}'`, (err, rows, fields) => {
      if (rows.length === 0) {
        mysqlConnection.query(sqlCreate, [flight_id, aircraft_id], function (err, data) {
          if(err) {
            res.send(err);
          }
          res.send("Successfully insert aircraft_id: " + aircraft_id);
          console.log("Successfully insert" + aircraft_id);
        });
      } else {
        res.send('Unable to create. Record already exists!');
      }
    })

    
});
    
module.exports = Router;

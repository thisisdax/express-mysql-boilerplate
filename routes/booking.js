const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../database/connection')

Router.get("/list", (req,res)=>{
  console.log('originalUrl: ', req.originalUrl);
  console.log('qs: ', req.query);
  console.log('params: ', req.params);
  console.log("=====");
  mysqlConnection.query(
    `select s.*, b.seat_id, fs.flight_schedule_id, concat(s.schedule_id, fs.flight_schedule_id) as primary_key from booking b, flightschedule fs, schedule s
    where b.flight_schedule_id = fs.flight_schedule_id
    and s.schedule_id = fs.schedule_id
    and nric_id = '${req.user.nric_id}'`,
    (err, rows, fields)=>{
      if(!err){
        res.send({rows, fields});
      }
      else {
        console.log(err);
      }
  })
});

Router.post("/add", (req,res)=> {
  console.log('originalUrl: ', req.originalUrl);
  console.log('qs: ', req.query);
  console.log('params: ', req.params);
  console.log("=====");
  mysqlConnection.beginTransaction((err)=>{
    if (err) throw err;
    mysqlConnection.query(`insert into booking (nric_id, flight_schedule_id, seat_id) values ('${req.user.nric_id}', '${req.body.flight_schedule_id}', '${req.body.seat_id}');`,
    (err1) => {
      if (err1) {
        return mysqlConnection.rollback(() => {
          throw err1;
        })
      };
      mysqlConnection.query(`update availability a set a.availability = 0 where a.flight_schedule_id = '${req.body.flight_schedule_id}' and a.seat_id = '${req.body.seat_id}';`,
      (err2) => {
        if (err2) {
          return mysqlConnection.rollback(() => {
            throw err2;
          })
        };
        mysqlConnection.commit((err3, rows, fields) => {
          if (err3) {
            return mysqlConnection.rollback(() => {
              throw err3;
            });
          }
          res.send(rows);
        });
      }
      )
    })
  })
});

module.exports = Router;
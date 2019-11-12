const express = require('express');
const Router = express.Router();
const auth = require('../auth/authenticate');
const mysqlConnection = require('../database/connection')

// TODO: change to post too
Router.post("/", (req,res)=>{
  console.log('originalUrl: ', req.originalUrl);
  console.log('body: ', req.body);
  console.log('qs: ', req.query);
  console.log('params: ', req.params);
  console.log("=====");
  try {
    const { nric_id, name, email, password } = req.body;
    mysqlConnection.query(
      `select * from user where nric_id = (?)`, [nric_id],
      (err, rows, fields)=>{
        if (err) {
          res.send(err);
          return;
        }
        if (nric_id.length === 0) {
          res.send('Please enter NRIC');
          console.log('No NRIC');
          return;
        }
        if(rows.length > 0) {
          res.send('NRIC has been taken!');
          return;
        } else {
          mysqlConnection.query(
            `insert into user (nric_id, name, email, password) values (?, ?, ?, ?)`,
            [nric_id, name, email, password],
            (err, rows, fields)=>{
              if(!err){
                res.send('ok');
                return;
              } else {
                res.status(403).send('Verification Error');
                return;
              }
            }
          );
        }
      }
    )
  } catch (error) {
      res.status(400).send(error)
      return;
  }
});

module.exports = Router;
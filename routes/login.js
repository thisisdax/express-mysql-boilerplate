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
    // TODO: change querystring to body instead
    const { email, password } = req.body;
    mysqlConnection.query(
      `select * from user where email like '${email}' and password like '${password}'`,
      (err, rows, fields)=>{
        if(!err){
          if (rows.length > 0) {
            const user = {...rows[0]}
            delete user.password;
            const token = auth.sign(user);
            console.log('happening');
            res.json({token});
          } else {
            res.status(403).send('Verification Error');
          }
        }
        else {
          res.status(403).send(err);
        }
    })
  } catch (error) {
      res.status(400).send(error)
  }
});

module.exports = Router;
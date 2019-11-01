const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../database/connection')

Router.get("/", (req,res)=>{
    mysqlConnection.query("SELECT * from user", (err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else {
            console.log(err);
        }
    })
});

module.exports = Router;
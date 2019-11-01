const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../database/connection');
/**
 * update model, manufacturer and capacity 
 */
var sql = "UPDATE aircraft SET model = (?) AND manufacturer = (?) AND capacity = (?) where aircraft_id = (?)";


Router.post('/', function(req, res){
    var model= req.body.model;
    var aircraft_id = req.body.aircraft_id;
    var manufacturer= req.body.manufacturer;
    var capacity= req.body.capacity;

    res.send("Successfully updated model: " + model);
    res.send("Successfully updated manufacturer " + manufacturer);
    res.send("Successfully updated capacity " + capacity);
    console.log("Successfully updated" + aircraft_id);
    mysqlConnection.query(sql, [aircraft_id, model,manufacturer,capacity], function (err, data) {
        if(err) throw err;
        console.log("1 record updated");
    });
});
    
module.exports = Router;
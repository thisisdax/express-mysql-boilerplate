const express = require('express');
const Router = express.Router();
const mysqlConnection = require('../database/connection')

/* ?? is this how to get data from user input?
<form method="post" action="/user_data">
    <input type="nric_id" name="user_nric">
    <input type="name" name="user_name">
    <input type="passport" value="passort_no">
    <input type="country_code" name="cntry_code">
    <input type="email_address" name="email">
    <input type="phone_number" value="phone_no">
    <input type="type" name="type_of">
    <input type="password" value="user_password">
</form>
*/

app.post('/user_data,function(req,res){
    var tmp = req.body.nric_id;
    var tmp1 = req.body.name;
    var tmp2 = req.body.passport;
    var tmp3 = req.body.country_code;
    var tmp4 = req.body.email_address;
    var tmp5 = req.body.phone_number;
    var tmp6 = req.body.type;
    var tmp7 = req.body.password;

    console.log(tmp)  
    console.log(tmp1)
    console.log(tmp2)  
    console.log(tmp3) 
    console.log(tmp4)  
    console.log(tmp5) 
    console.log(tmp6)  
    console.log(tmp7) 
});

Router.get("/", (req,res)=>{
    var sql = "insert into users values ('tmp','tmp1',tmp2,'tmp3,'tmp4','tmp5','tmp6','tmp7')";
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
'use strict'

var express = require('express'),
router = express.Router(),
cors = require('cors'),
expressSanitizer = require('express-sanitizer'),
user = require('../models/txtportalModel.js');
var jwt = require('jsonwebtoken');
var key = "bGS6lzFqvvSQ8ALbOxatm7/Vk7mLQyzqaS34Q4oR1ew=";

router.post("/save/dev",function(req,res){
    var User = new user(req.body);
    User.save(function(err,result){
        if (err){
            res.status(500).send({ error: err });
         }else{
         res.status(200).send({ data: result });
         }
    });
});

router.post("/login",function(req,res){
    var data = req.body;
    user.findOne( { username: data.username } , function(err,user){
        if (err){
            res.status(500).send({ error: err });
         }else{
            user.comparePassword(data.password, function(err,isMatch){
                if(err){
                    res.status(500).send({ error: err });
                }else{
                    var token = jwt.sign({ username: data.username, password: user.password}, key, {expiresIn: 60});
                    res.status(200).send({ data: token});
                }
            })
         }
    });
});

router.post("/verifyToken",function(req,res){
    var token = req.headers.token;
    // verify a token symmetric
    jwt.verify(token, key, function(err, decoded) {
        if(err){
            res.status(500).send({ error: err });
        }else{
            res.status(200).send({ data: decoded});
        }
        
    });
   
  
});


module.exports = router;
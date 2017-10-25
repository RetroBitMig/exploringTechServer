'use strict'

var express = require('express'),
router = express.Router(),
cors = require('cors'),
expressSanitizer = require('express-sanitizer'),
Subscriber = require('../models/subscriberModel.js');


router.post("/test",function(req,res){
    var data ={
        result: "sucess"
    }
    res.sendStatus(200).send({data:data})
});

module.exports = router;
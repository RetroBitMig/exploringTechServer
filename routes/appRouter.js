'use strict'

var express = require('express'),
router = express.Router(),
cors = require('cors'),
App = require('../models/txtAppModel.js');


router.post("/saveApp",function(req,res){
    console.log("saving ap");
    var app = new App(req.body);
    app.save(function(err,result){
        if (err){
            console.log(err);
            res.status(500).send({ error: err });
         }else{
            res.status(200).send({ data: result });
         }
    });
});

// router.get("/findBlogs", function(req,res){
//     Blog.find().sort({ date: -1 }).exec(function(err, result){
//         if (err){
//             res.status(500).send({ error: err });
//          }else{
//             res.status(200).send({ data: result });
//          }
//     })
// })

module.exports = router;
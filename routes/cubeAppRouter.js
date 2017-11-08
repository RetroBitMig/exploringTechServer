'use strict'

var express = require('express'),
    router = express.Router(),
    cors = require('cors'),
    ObjectID = require('mongodb').ObjectID,
    App = require('../models/cubeAppModel.js');

// multer
var multer = require('multer');
var upload = multer();
var fs = require('fs');

// DROPBOX SDK
var Dropbox = require('dropbox');
var dbx = new Dropbox({ accessToken: process.env.DROPBOX_KEY });



    
// save app data name-email-etc
router.post("/saveApp", function (req, res) {
    var app = new App(req.body);
    app.save(function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send({
                error: err
            });
        } else {
            res.status(200).send({
                data: result
            });
        }
    });
});
// save picture to aws buckets
router.post("/uploadProfilePic", upload.single('pic'), function (req, res) {
    if (!req.file) {
        return res.status(403).send('Expected image file').end();
    }
    var file = req.file;
    var path = '/cubeAppPictures/' + file.originalname;
    dbx.filesUpload({ path: path, contents:file.buffer, autorename: true})
    .then( response => {
        dbx.sharingCreateSharedLink({ path: path })
            .then( response => {
                console.log(response);
                res.status(200).json({
                    data: response.url
                });
            })
            .catch( err => {
                console.log(err);
                res.status(500).send({
                    error: err
                });
            })
    })
    .catch( err => {
        console.log(err);
        res.status(500).send({
            error: err
        });
    })
})
// change user to signed in true
router.post("/updateUserStatus-SignIn", function (req, res) {
    var id = ObjectID(req.body._id);
    App.findOneAndUpdate({
        _id: id
    }, {
        signed_in: true
    }).exec(function (err, result) {
        if (err) {
            res.status(500).send({
                error: err
            });
        } else {
            res.status(200).json({
                data: result
            });
        }
    })

})
// change user to signed in false
router.post("/updateUserStatus-SignOut", function (req, res) {
    var id = ObjectID(req.body._id);
    App.findOneAndUpdate({
        _id: id
    }, {
        signed_in: false
    }).exec(function (err, result) {
        if (err) {
            res.status(500).send({
                error: err
            });
        } else {
            res.status(200).json({
                data: result
            });
        }
    })

})
// find all users that are not signed in
router.get("/findSignedOut", function (req, res) {
    App.find(
        { signed_in: false}
    ).sort({
        first_name: -1
    }).exec(function (err, result) {
        if (err) {
            res.status(500).send({
                error: err
            });
        } else {

            if (result.length == 0) {
                res.status(500).send("No Apps Found")
            } else {
                res.status(200).json({
                    data: result
                });
            }

        }
    })
})
// find all users that are signed in
router.get("/findSignedIn", function (req, res) {
    App.find(
        { signed_in: true}
    ).sort({
        first_name: -1
    }).exec(function (err, result) {
        if (err) {
            res.status(500).send({
                error: err
            });
        } else {

            if (result.length == 0) {
                res.status(500).send("No Apps Found")
            } else {
                res.status(200).json({
                    data: result
                });
            }

        }
    })
})

router.get('/test', function(req,res){
    console.log(req.body);

})
module.exports = router;
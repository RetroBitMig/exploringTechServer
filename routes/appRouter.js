'use strict'
// HACKATHON MOBILE APP
var express = require('express'),
    router = express.Router(),
    cors = require('cors'),
    App = require('../models/txtAppModel.js'),
    excel = require('node-excel-export');


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


router.get("/getApps", function (req, res) {
    App.find({}, function (err, data) {
        if (err) {
            console.log(err);
        }else{
            sendExcel(data)
        }
    })

    // create and send excel sheet
    function sendExcel(dataset){
        console.log(dataset);
            // You can define styles as json object 
    // More info: https://github.com/protobi/js-xlsx#cell-styles 
    const styles = {
        headerDark: {
            fill: {
                fgColor: {
                    rgb: 'FF000000'
                }
            },
            font: {
                color: {
                    rgb: 'FFFFFFFF'
                },
                sz: 14,
                bold: true,
                underline: true
            }
        },
        cellPink: {
            fill: {
                fgColor: {
                    rgb: 'FFFFCCFF'
                }
            }
        },
        cellGreen: {
            fill: {
                fgColor: {
                    rgb: 'FF00FF00'
                }
            }
        }
    }
    //Here you specify the export structure 
    const specification = {
        first_name: { // <- the key should match the actual data key 
            displayName: 'First Name', // <- Here you specify the column header 
            headerStyle: styles.headerDark, // styles for header
            width: 120 // <- width in pixels 
        }
    }


    // The data set should have the following shape (Array of Objects) 
    // The order of the keys is irrelevant, it is also irrelevant if the 
    // dataset contains more fields as the report is build based on the 
    // specification provided above. But you should have all the fields 
    // that are listed in the report specification 
    // const dataset = [{
    //     customer_name: 'IBM'
    // }]



    // Create the excel report. 
    // This function will return Buffer 
    const report = excel.buildExport(
        [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report 
            {
                name: 'Report', // <- Specify sheet name (optional) 
                specification: specification, // <- Report specification
                data: dataset // <-- Report data 
            }
        ]
    );

    // You can then return this straight 
    res.attachment('report.xlsx'); // This is sails.js specific (in general you need to set headers) 
    res.send(report);
    }

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
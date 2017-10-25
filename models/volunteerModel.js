'use strict'

var validator = require('validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var volunteerSchema = new Schema({
    fullname: { type: String, lowercase:true,required:true },
    email: {type: String, validate: [validator.isEmail, 'invalid email'],required:true},
    phoneNumber: {type:String,required:true},
    hearAboutTxt: {type: String, lowercase:true,required:true},
    howToHelp: {type: String, lowercase:true,required:true},
    experience: {type: String, lowercase:true,required:true},
    volunteerInspiration: {type: String, lowercase:true,required:true},
    comments: {type: String, lowercase:true,required:true},
    date: { type: Date, default: Date.now,required:true}
},
{
    collection: 'exploringTechVolunteers'
}
);


module.exports = mongoose.model('Volunteer', volunteerSchema);
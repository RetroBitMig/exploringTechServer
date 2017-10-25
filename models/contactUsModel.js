'use strict'

var validator = require('validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var contactSchema = new Schema({
    fullname: { type: String, lowercase:true,required:true},
    email: {type: String, validate: [validator.isEmail, 'invalid email'],required:true},
    phoneNumber: {type:String,required:true},
    subject: {type: String, lowercase:true,required:true},
    comments: {type: String, lowercase:true,required:true},
    date: { type: Date, default: Date.now,required:true}
},
{
    collection: 'exploringTechContacts'
}
);


module.exports = mongoose.model('Contact', contactSchema);
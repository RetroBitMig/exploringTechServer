'use strict'

var validator = require('validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var subscriberSchema = new Schema({
    email: {type: String, validate: [validator.isEmail, 'invalid email'],required:true},
    date: { type: Date, default: Date.now,required:true}
},
{
    collection: 'exploringTechSubscriber'
}
);


module.exports = mongoose.model('subscriber', subscriberSchema);
'use strict'

var validator = require('validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId

var signedInSchema = new Schema({
    first_name: { type: String, required:true},
    last_name: { type: String, required:true},
    key: { type: String, required: true},
    sign_out_date: { type: Date},
    sign_in_date: { type: Date, default: Date.now , required:true}
},
{
    collection: 'exploringTechSignInRecords'
}
);


module.exports = mongoose.model('SignInApp', signedInSchema);
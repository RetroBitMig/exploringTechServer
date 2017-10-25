'use strict'

var validator = require('validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId

var cubeAppSchema = new Schema({
    first_name: { type: String, required:true},
    last_name: { type: String, required:true},
    email: { type: String, required: true},
    phone_number: { type: Number, required: true},
    school: { type: String, required:true},
    local_img_url: { type: String, require:true},
    web_img_url: { type: String, required: true},
    current_img_src: { type: String, default: "assets/imgs/placeholder.png",required: true},
    image_name: { type: String, required: true},
    signed_in: { type: Boolean, required: true},
    date: { type: Date, default: Date.now , required:true}
},
{
    collection: 'exploringTechCubeApp'
}
);


module.exports = mongoose.model('CubeApp', cubeAppSchema);
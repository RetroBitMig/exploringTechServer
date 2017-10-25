'use strict'

var validator = require('validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var blogsSchema = new Schema({
    title: { type: String, lowercase:true, required:true },
    imgURL: {type: String, required:true},
    author: {type: String, lowercase:true, required:true},
    content: {type: String, lowercase:true, required:true},
    discussionId: { type: String, default: new mongoose.Types.ObjectId(), required:true, unique:true},
    date: { type: Date, default: Date.now , required:true}
},
{
    collection: 'exploringTechBlogs'
}
);


module.exports = mongoose.model('Blogs', blogsSchema);
'use strict'

var validator = require('validator');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId

var commentSchema = new Schema({
    discussionId: { type: String, required:true, unique: false},
    parentId: { type: String, required:true, unique:true},
    parent: { type: Boolean, required: true},
    slug: { type: String, required: true},
    full_slug: { type: String, required: true},
    author: {
        name: { type: String, required:true }
    },
    replies: { type: Number, default: 0, required:true},
    content: { type: String, required:true},
    date: { type: Date, default: Date.now , required:true}
},
{
    collection: 'exploringTechComments'
}
);


module.exports = mongoose.model('Comments', commentSchema);
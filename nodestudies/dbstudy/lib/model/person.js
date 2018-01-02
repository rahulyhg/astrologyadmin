var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var person = new Schema({
    title: {type:String, default: "Person"},
    personData:[{type: ObjectId, ref:'Sign'}]
});

module.exports = mongoose.model('Person', person);
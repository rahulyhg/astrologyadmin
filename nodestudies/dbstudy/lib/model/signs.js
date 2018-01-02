var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sign = new Schema({
    signName: String,
    signDescription: String
});

module.exports = mongoose.model('Sign', sign);
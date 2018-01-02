var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var house = new Schema({
    houseName: String,
    houseDescription: String
});

module.exports = mongoose.model('House', house);
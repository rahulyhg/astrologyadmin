var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var planet = new Schema({
    planetName: String,
    planetDescription: String
});

module.exports = mongoose.model('Planet', planet);
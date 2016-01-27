'use strict';

var mongoose = require('mongoose');

var clientSchema = new mongoose.Schema({
	creationDate: {type: Date, default:Date.now, required: true},
  locations: [String],
	height: {type: Number, required: true},
  weight: {type: Number, required: true},
	playingAge: {type: Number, required: true},
  apparence: {type: String, required: true},
	eyeColour: {type: String, required: true},
  hairColour: {type: String, required: true},
  hairLenght: {type: String, required: true},
  agent: {type: String, required: true},
  other: {type: String, required: true}
});

module.exports = mongoose.model('Client', clientSchema);
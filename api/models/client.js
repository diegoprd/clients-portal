'use strict';

var mongoose = require('mongoose');

var linkSchema = new mongoose.Schema({
    name: String,
    url: String
});

var trainingSchema = new mongoose.Schema({
    from: Number,
    to: Number,
    degree: String,
    institute: String
});

var creditSchema = new mongoose.Schema({
  type: String,
  role: String,
  productionName: String,
  company: String,
  director: String
});

var clientSchema = new mongoose.Schema({
	creationDate: {type: Date, default:Date.now},
  height: {type: Number},
  weight: {type: Number},
  firstName: {type: String},
  lastName: {type: String},
  playingAge: {type: Number},
  appearance: {type: String},
  eyeColour: {type: String},
  hairColour: {type: String},
  hairLenght: {type: String},
  agent: {type: String},
  gender: {type: String},
  international: {type: Boolean},
  other: {type: String},
  links: [linkSchema],
  training: [trainingSchema],
  credits: [creditSchema],
  locations: [String],
  images: [String],
  dialects: [String],
  languages: [String],
  music: [String],
  dance: [String],
  performances: [String],
  sports: [String],
  otherSkills: [String]
});

module.exports = mongoose.model('Client', clientSchema);
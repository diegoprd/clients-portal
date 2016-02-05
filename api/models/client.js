'use strict';

var mongoose = require('mongoose');

var linkSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true }
});

var trainingSchema = new mongoose.Schema({
    from: { type: Number, required: true },
    to: { type: Number, required: true },
    degree: { type: String, required: true },
    institute: { type: String, required: true }
});

var creditSchema = new mongoose.Schema({
  type: { type: String, required: true },
  role: { type: String, required: true },
  productionName: { type: String, required: true },
  company: String,
  director: String
});

var clientSchema = new mongoose.Schema({
	creationDate: {type: Date, default:Date.now},
  height: {type: Number},
  weight: {type: Number},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  playingAge: {type: Number},
  appearance: {type: String},
  eyeColour: {type: String},
  hairColour: {type: String},
  hairLenght: {type: String},
  agent: { type: String, required: true },
  gender: { type: String, required: true },
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
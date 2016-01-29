'use strict';

var _ = require('lodash');
var errors = require('../config/errors.json');

var buildError = function(type, message) {

  var errorObj = errors[type];

  if (!errorObj) {
    return errors.noErrorType;
  }

  if (!message) {
    console.log(errorObj.message);
    return errorObj;
  }

  console.log(message);
  return _.assign(errorObj, {
      message: message
    });
};

module.exports.error = buildError;

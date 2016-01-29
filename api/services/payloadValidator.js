'use strict';

var _ = require('lodash');
var validateSchema = require('jsonschema').validate;
var errorsService = require('./errorsHandler');
var errorType = 'payload';

var validate = function(payload, schema, cb) {

  var error = null;

  var schemaValidationResult = validateSchema(payload, schema);

  if (!schemaValidationResult.valid) {
    error = errorsService.error(errorType, _.first(schemaValidationResult.errors).stack);
  }

  if (!cb) {
    return {
      error: error,
      src: payload
    };
  }

  cb(error, payload);
};

module.exports.validate = validate;

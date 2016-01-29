'use strict';

var _ = require('lodash');
var defaults = require('./default');



var config = {
  development: {
  },
  test: {
  },
  production: {
  }
};

module.exports = _.assign(defaults, config[process.env.NODE_ENV || 'development']);
'use strict';

var _ = require('lodash');

var defaultValues = {
  admin: {
    userName: 'admin',
    displayName: 'Admin'
  },
  mainCategories: [
    {
      value: 'female',
      title: 'Female',
      property: 'gender'
    },
    {
      value: 'male',
      title: 'Male',
      property: 'gender'
    },
    {
      value: 'kid',
      title: 'Kids',
      property: 'gender'
    },
    {
      code: true,
      title: 'International',
      property: 'international'
    }
  ]
};

var config = {
  development: {
  },
  test: {
  },
  production: {
  }
};

module.exports = _.assign(defaultValues, config[process.env.NODE_ENV || 'development']);
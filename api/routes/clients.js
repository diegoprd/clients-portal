'use strict'

var _ = require('lodash');
var Client = require('../models/client');
var payloadValidator = require('../services/payloadValidator');
var schemas = {
  clients: require('../config/payloadSchema.json'),
  search: require('../config/searchPayloadSchema.json')
};
// var forceArray = require('forceArray');

var _createMongoCriteria = function(req, res, next) {

  var improvedCriteria = _.map(req.body, function(v, k) {

    if (_.isEmpty(v)) {
      return;
    }

    var result = {};

    if (!_.isArray(v)) {
      result[k] = v;
      return result;
    }

    //This is needed to improve the search and support search by multiple values
    //inside the arrays.
    result[k] = {$in: v};
    return result;

  });

  req.criteria = _.reduce(improvedCriteria, function(result, current) {
      return _.assign(result, current);
  });

  next();
};

var _validatePayload = function(req, res, next) {
  var payload = req.body;

  var schemaToUse = /clients/.test(req.url) ? 'clients' : 'search';

  console.log('The payloadSchema to use is:', schemaToUse);

  var validator = payloadValidator.validate(payload, schemas[schemaToUse]);

  if (validator.error) {
    res.statusCode = 422;
    res.send(validator.error);
    return;
  }

  next();
};

var _findClient = function(req, res, next) {
  //Retrieve the client entity
  Client.findById(req.params.id, function(err, client) {

    if (err || _.isNull(client)) {
      res.statusCode = 404;
      res.end("Client Not found");
    }

    req.client = client;

    next();

  });
};

module.exports = function(app) {

  app.post('/search', _validatePayload, _createMongoCriteria, function(req, res, next) {

    console.log('The criteria to be used is : ', req.criteria);

    Client.find(req.criteria, function(err, clients) {
      if (err) next(err);

      res.send(clients);
    });

  });

  //Creating a new client
  app.post('/clients', _validatePayload, function(req, res, next) {

    Client.create(new Client(req.body), function(err, client) {
      if (err) next(err);

      res.send(200, client);
    });

  });

  //Updating existent client
  app.put('/clients/:id', _validatePayload, _findClient, function(req, res, next) {

    _.extend(req.client, req.body);

    req.client.save( function(err, savedItem) {
      if (err) next(err);

      res.send(200, savedItem);
    });

  });

  app.delete('/clients/:id', _findClient, function(req, res, next) {

    req.client.remove( function(err, deletedItem) {
      if (err) next(err);

      res.send(200, deletedItem);
    });

  });

};

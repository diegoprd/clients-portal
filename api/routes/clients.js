'use strict'

var _ = require('lodash');
var Client = require('../models/client');

var _findClient = function(req, res, next) {
  //Retrieve the client entity
  Client.findById(req.params.id, function(err, client) {

      if (err || _.isNull(client) || (!req.user.userId === innovatorId.userId || !req.user.userId === engineerId.userId)) {
        res.statusCode = 404;
        res.end("Client Not found");
      }

      req.client = client;
      next();
  });
};

module.exports = function(app) {

  app.get('/clients', function(req, res, next) {

    var criteria = req.body.criteria;

    var validator = {valid: true};

    if (!validator.valid) {
      res.statusCode = 422;
      res.send(validator.errors);
      return;
    }

    Client.find(criteria, function(err, clients) {
      if (err) next(err);

      res.send(clients);
    });

  });

  //Creating a new client
  app.post('/clients', function(req, res, next) {
    var clientProperties = {
      creationDate: new Date().getTime(),
      title: req.body.title,
      fullDescription: req.body.fullDescription,
      mvpDescription: req.body.mvpDescription,
      status: 'PENDING_APPROVAL',
      innovatorId: req.user.userId
    };

    var validator = {valid: true};

    if (!validator.valid) {
      res.statusCode = 422;
      res.send(validator.errors);
      return;
    }

    Client.create(new Client(clientProperties), function(err, client) {
      if (err) next(err);

      res.send(200, client);
    });

  });

  //Updating existent client
  app.put('/clients/:id', _findClient, function(req, res, next) {

    //picking properties from request params
    var clientProperties = {
      title: req.body.title,
      fullDescription: req.body.fullDescription,
      mvpDescription: req.body.mvpDescription,
      status: req.body.status,
      engineerId: req.user.engineerId
    };

    var validator = {valid: true};

    if (!validator.valid) {
      res.statusCode = 422;
      res.send(validator.errors);
      return;
    }

    _.extend(req.client, clientProperties);

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

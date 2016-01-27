var _ = require('lodash');
var Client = require('../models/client');
var User = require('../models/user');
var clientValidator = require('../validators/clientValidator');
var criteriaValidator = require('../validators/criteriaValidator');

module.exports = function(app) {

  app.get('/clients', _generateCriteria, function(req, res, next) {

    var criteria = req.criteria;

    var validator = criteriaValidator.validate(criteria);

    if(validator.valid){

      Client.find(criteria, function(err, clients) {
        if (err) next(err);

        res.send(clients);
      });

    } else {
      res.statusCode = 422;
      res.send(validator.errors);
    }
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

    var validator = clientValidator.validate(clientProperties);

    if (validator.valid) {

      Client.create(new Client(clientProperties), function(err, client) {
        if (err) next(err);

        res.send(200, client);
      });
    } else {
      console.log(validator.errors);
      res.statusCode = 422;
      res.send(validator.errors);
    }
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

    var validator = clientValidator.validate(clientProperties);

    if (validator.valid) {

      _.extend(req.client, clientProperties);

      req.client.save( function(err, savedItem) {
        if (err) next(err);

        res.send(200, savedItem);
      });
    } else {
      console.log(validator.errors);
      res.statusCode = 422;
      res.send(validator.errors);
    }

  });

  app.delete('/clients/:id', _findClient, function(req, res, next) {

    req.client.remove( function(err, deletedItem) {
      if (err) next(err);

      res.send(200, deletedItem);
    });

  });

};

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

var _generateCriteria = function(req, res, next) {

  var criteria = {};

  //Retrieve the client entity
  User.findById(req.user.userId, function(err, user) {

      if (err || _.isNull(user)) {
        res.statusCode = 404;
        res.end("User Not found");
      }

      if(user.type === 'INNOVATOR'){
        criteria.innovatorId = req.user.userId;
      }

      req.criteria = criteria;
      next();
  });
};

'use strict';

var config = require('../config/config');
var randtoken = require('rand-token');

var _authenticate = function(req, res, next) {

  if (req.body.username !== req.body.password) {
    return res.send(404, [{message:'Authentication failed, double check your credentials'}]);
  }

  if (req.body.username !== config.admin.userName) {
    return res.send(404, [{message:'Authentication failed, double check your credentials'}]);
  }

  //Retriving full name for displaying purposes
  res.json(
    {
      fullname: config.admin.displayName,
      token: randtoken.generate(16)
    }
  );

};

module.exports = function(app) {

  //Registers the new user (engineer or innovator) and signs it in.
	// app.post('/signup', function(req, res, next) {
 //    if (req.body.username && req.body.password && req.body.fullname) {
 //      //picking params
 //      var userProperties = {
 //        fullname: req.body.fullname,
 //        username: req.body.username,
 //        password: req.body.password,
 //        type: req.body.type,
 //        status: req.body.status
 //      };

 //      var validator = userValidator.validate(userProperties);

 //      if (validator.valid) {
 //        User.create(new User(userProperties), function(err, user) {
 //          if (err) next(err);

 //          next();
 //        });
 //      } else {
 //        console.log(validator.errors);
 //        res.statusCode = 422;
 //        res.send(validator.errors);
 //      }
 //    } else {
 //      var message = 'All fields are mandatory to signup (username, password and fullname)';
 //      return res.send(401, [{message: message}]);
 //    }
 //  },_authenticate);

	app.post('/signin', function(req, res, next) {

    if (!req.body.username || !req.body.password) {
      return res.send(401, [{message: 'Username and Password are both mandatory fields'}]);
    }
    _authenticate(req,res,next);

  });

};

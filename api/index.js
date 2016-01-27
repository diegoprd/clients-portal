var express = require('express');
var bodyParser = require('body-parser')
var _ = require('lodash');
var glob = require('glob');
var routesPath = __dirname + '/routes/';
var app = module.exports = express();

//Initializing API Express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//Initializing API Routes
//(Dynamically loading all entry points in all
//the .JS files inside routes folder)
_.each(glob.sync(routesPath + '*.js'), function(file) {

  var route = file.substr(0, file.indexOf('.'));
  console.log('Adding route:' + route);
  require(route)(app);

});

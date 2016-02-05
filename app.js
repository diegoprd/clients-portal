'use strict';

var express = require('express');
var morgan = require('morgan');
var apiServer = require('./api');
var mongoose = require('mongoose');
var cors = require('cors');

//Initializing Main mondo db
var mongoUri = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL || 'mongodb://localhost/clients_portal_app';
mongoose.connect(mongoUri);

//Initializing Main Express
var app = express();
app.use(morgan('combined'));
app.use(cors());

//Including the API and webapp as a middleware
app.use('/api', apiServer);

var port = process.env.PORT || 8012;
app.listen(port);
console.log('Starting - Clients Portal - on port: ' + port);

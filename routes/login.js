var express = require('express');
var app = express();
var path = require('path');

var loginRouter = express.Router();

loginRouter.use(function(req, res, next) {
	console.log(req.method, 'login' + req.url);
	next();
});

// show the form (GET http://localhost:3000/login)
loginRouter.get('/', function(req, res) {
	res.send('This is the login form');
});

// process the form (POST http://localhost:3000/login)
loginRouter.post('/', function(req, res) {
	console.log('processing...');
	res.send('Processing the login form');
});

module.exports = loginRouter;
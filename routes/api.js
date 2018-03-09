var express = require('express');
var app = express();
var path = require('path');

// ROUTES FOR OUR API
// =============================

// get an instance of the express router
var apiRouter = express.Router();

// middleware to use for all requests
apiRouter.use(function(req, res, next) {
	// do logging
	console.log('Somebody just came to our app!');

	// we'll add more to the middleware in Chapter 10
	// this is where we will authenticate users

	next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working
// accessed at GET http://localhost:8080/api
apiRouter.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

module.exports = apiRouter;
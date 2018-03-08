var express = require('express');
var app = express();
var path = require('path');

// create routes for the admin section

// get an instance of the router
var adminRouter = express.Router();

// route middleware that will happen on every request
adminRouter.use(function(req, res, next) {
	// log each request to the console
	console.log(req.method, req.url);
	// continue doing what we were doing and go to the route
	next();
});

// route middleware to valide :name
adminRouter.param('name', function(req, res, next, name) {
	// do validation on name here
	// blah blah validation
	// log something so we know its working
	console.log('doing name validation on ' + name);
	//once validation is done save the new item in the req
	req.name = name;
	//go to the next thing
	next(); 
})

// admin main page, the dashboard (http://localhost:3000/admin)
adminRouter.get('/', function(req, res) {
	res.send('I am the dashborad!');
});

// users page (http://localhost:3000/users)
adminRouter.get('/users', function(req, res) {
	res.send('I show all the users!');
});

adminRouter.get('/users/:name', function(req, res) {
	res.send('Hello ' + req.name + '!');
});

// posts page (http://localhost:3000/posts)
adminRouter.get('/posts', function(req, res) {
	res.send('I show all the posts!');
});

module.exports = adminRouter;
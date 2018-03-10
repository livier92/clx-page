var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser'); // get body-parser
var User = require('../app/models/user');
var jwt = require('jsonwebtoken');

var superSecret = 'ilovescotchscotchyscotchscotch';

// ROUTES FOR OUR API
// =============================

// get an instance of the express router
var apiRouter = express.Router();

// route for authenticating users
apiRouter.post('/authenticate', function(req, res) {
	// find the user
	// select the name username and password explicitly
	User.findOne({
		username: req.body.username
	}).select('name username password').exec(function(err, user) {
		if(err) {
			throw err;
		}

		// no user with the username was found
		if(!user) {
			res.json({
				success: false,
				message: 'Authentication failed. User not found'
			});
		} else if(user) {
			// check if password matches
			var validPassword = user.comparePassword(req.body.password);
			if(!validPassword) {
				res.json({
					success: false,
					message: 'Authentication failed. Wrong password'
				});
			} else {
				// if user is found and password is right
				// create a token
				var token = jwt.sign({
					name: user.name,
					username: user.username
				}, superSecret, {
					expiresIn: '24h' // expires in 24 hours
				});

				// return the information including token as JSON
				res.json({
					success: true,
					message: 'Enjoy your token',
					token: token
				});
			} 
		}
	});
});

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

// on routes that end in /users
// ----------------------------------------------------

apiRouter.route('/users')
	
	// create a user (accessed at POST http://localhost:3000/api/users)
	.post(function(req, res) {
		//create a new instance of the User model
		var user = new User();

		// console.log(req.body);

		// set the users information (comes from the request)
		user.name = req.body.name;
		user.username = req.body.username;
		user.password = req.body.password;

		// save the user and check for error
		user.save(function(err) {
			if(err) {
				//duplicate entry
				if(err.code == 11000) {
					return res.json({success:false, 
						message:'A user with that username already exists'});
				}
				else {
					return res.send(err);
				}
			}

			//return a message
			res.json({message: 'User created!'});
		});
	})

	// get all the users (accessed at GET http://localhost:3000/api/users)
	.get(function(req, res) {
		User.find(function(err, users) {
			if(err) {
				res.send(err);
			}

			//return the users
			res.json(users);
		});
	});

apiRouter.route('/users/:user_id')

	//get the user with that id
	// (accessed at GET http://localhost:3000/api/users/:user_id)
	.get(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if(err) {
				res.send(err);
			}

			// return the user
			res.json(user);
		});
	})

	// update the user with this id
	// (accessed at GET http://localhost:3000/api/users/:user_id)
	.put(function(req, res) {
		// use our model to find the user we want
		User.findById(req.params.user_id, function(err, user) {
			if(err) {
				res.send(err);
			}

			if(req.body.name) {
				user.name = req.body.name;
			}
			if(req.body.username) {
				user.username = req.body.username;
			}
			if(req.body.password) {
				user.password = req.body.password;
			}

			//save the user
			user.save(function(err) {
				if(err){
					res.send(err);
				}

				// return a json
				res.json({message: 'User updated!'});
			});
		})

	})

	// delete the user with this id
	// (accessed at GET http://localhost:3000/api/users/:user_id)

	.delete(function(req, res) {
		User.remove({
			_id: req.params.user_id
		}, function(err, user) {
			if(err) {
				return res.send(err);
			}

			res.json({message:'Successfully deleted!'});
		});
	});

module.exports = apiRouter;
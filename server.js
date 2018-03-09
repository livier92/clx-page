// BASE SETUP
// ======================================

// CALL THE PACKAGES --------------------
var express = require('express');
var app = express();
var bodyParser = require('body-parser'); // get body-parser
var morgan = require('morgan'); // used to see requests
var mongoose = require('mongoose'); // for working w/ our database
var port = process.env.PORT || 3000; // set the port for our app
var apiRoutes = require('./routes/api');

// connect to our database (hosted on mongoLab)
mongoose.connect('mongodb://localhost:27017/db_name');
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// APP CONFIGURATION ---------------------
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

// log all requests to the console
app.use(morgan('dev'));

// basic route for the home page
app.get('/', function(req, res) {
	res.send('Welcome to the home page!');
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
 app.use('/api', apiRoutes);

// START THE SERVER
// ===============================
app.listen(port);
console.log('Magic happens on port ' + port);
//load the express package and create our app
var express = require('express');
var app = express();
var path = require('path');
var adminRoutes = require('./routes/admin');

// send our index.html file to the user for the home page
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

// apply the routes to our application
app.use('/admin', adminRoutes);

// start the server
app.listen(3000);
console.log('3000 is the magic port!');
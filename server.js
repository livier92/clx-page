//load the express package and create our app
var express = require('express');
var app = express();
var path = require('path');

// set the public folder to serve public assets
app.use(express.static(__dirname + '/public'));

// send our index.html file to the user for the home page
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

// start the server (http://localhost:3000)
app.listen(3000);
console.log('3000 is the magic port!');
var express = require('express');
var app = express();

app.get('/cities', function(request, response) {
	var cities = '<ul><li>Caspiana</li><li>Indigo</li><li>Paradise</li>';
	response.send(cities);
});

app.get('/locations', function(request, response) {
	response.redirect(301, '/cities');
});

app.listen(3001, function() {
	console.log('Running Express');
});


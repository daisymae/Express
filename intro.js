var express = require('express');
var app = express();

app.get('/locations', function(request, response) {
	var cities = '<ul><li>Caspiana</li><li>Indigo</li><li>Paradise</li>';
	response.send(cities);
});

app.listen(3001, function() {
	console.log('Running Express');
});


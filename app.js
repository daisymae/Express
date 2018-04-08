var express = require('express');
var app = express();

// new logger middleware
var logger = require('./logger');
// order matters. need this use before the get
app.use(logger);

//app.get('/', function(request, response) {
// __dirname points to the directory of the currently executing script
//	response.sendFile(__dirname + '/public/index.html');
//});

// add middleware to the application stack
// this sets up static file location to public
// and replaces the get/sendFile above
app.use(express.static('public'));

// put our /cities endpoint back in to show 
// dynamic updates using jquery
app.get('/cities', function (request, response) {
  var cities = ['Caspiana', 'Indigo', 'Paradise'];
  response.send(cities);
});

app.listen(3000);

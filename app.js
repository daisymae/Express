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

var cities = {
  'Lotopia': 'Rough and mountainous',
  'Caspiana': 'Sky-top island',
  'Indigo': 'Vibrant and thriving',
  'Paradise': 'Lush, green plantation',
  'Flotilla': 'Bustling urban oasis'
};

// new dynamic route to return the city information for the city requested
app.get('/cities/:name', function (request, response) {
  var cityInfo;
  // retrieve the name parameter from the request
  var cityName = parseCityName(request.params.name);
  cityInfo = cities[cityName];
  if (cityInfo) {
    response.json(cityInfo);
  } else {
    response.status(404).json("City not found");
  }
});

// put our /cities endpoint back in to show 
// dynamic updates using jquery
app.get('/cities', function (request, response) {
  if (request.query.search) {
    return response.json(citySearch(request.query.search));
  } else {
    return response.json(cities);
  }
});


// handle all cases and modify to match the case needed (upper case first letter)
function parseCityName(name) {
  var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
  return parsedName;
}

function citySearch(keyword) {
  var regexp = RegExp(keyword, 'i');
  var result = cities.filter(function (city) {
    return city.match(regexp);
  });

  return result;
}

app.listen(3000);

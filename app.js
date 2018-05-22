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

app.param('year', function (request, response, next) {
  if (isYearFormat(request.params.year)) {
    next();
  } else {
    response.status(400).json('Invalid Format for Year');
  }
});

// handle all 'name' parameters the same way
// update: handled in router.route.all now
// app.param('name', function (request, response, next) {
//   var parsedName = parseCityName(request.params.name);
//   request.cityName = parsedName;
//   next();
// });


var citiesYear = {
  5000: 'Lotopia',
  5100: 'Caspiana',
  5105: 'Indigo',
  6000: 'Paradise',
  7000: 'Flotilla'
};

function isYearFormat(value) {
  var regexp = RegExp(/^d{4}$/);
  return regexp.test(value);
}

app.get('/cities/year/:year', function (request, response) {
  var year = request.params.year;
  var city = citiesYear[year];

  if (!city) {
    response.status(404).json("No City found for given year");
  } else {
    response.json("In " + year + ", " + city + " is created.");
  }
});

// new dynamic route to return the city information for the city requested
// app.get('/cities/:name', function (request, response) {
//   var cityInfo;
//   // retrieve the name parameter from the request
//   var cityName = parseCityName(request.params.name);
//   cityInfo = cities[cityName];
//   if (cityInfo) {
//     response.json(cityInfo);
//   } else {
//     response.status(404).json("City not found");
//   }
// });

// put our /cities endpoint back in to show 
// dynamic updates using jquery
// app.get('/cities', function (request, response) {
//   if (request.query.search) {
//     return response.json(citySearch(request.query.search));
//   } else {
//     return response.json(cities);
//   }
// });

// section 4: POST & DELETE
// app.post('/cities', parseUrlencoded, function (request, response) {
//   var newCity = request.body;
//   if (newCity.description.length > 4) {
//     var city = createCity(newCity.name, newCity.description);
//     // alternative to the 2-line approach above:
//     // var city = createCity(request.body.name, request.body.description);

//     response.status(201).json(city);
//   } else {
//     response.status(400).json("Invalid City");
//   }
// });


// app.delete('/cities/:name', function (request, response) {
//   if (cities[request.cityName]) {
//     delete cities[request.cityName];
//     response.sendStatus(200);
//   } else {
//     response.sendStatus(404);
//   }
// });

var cities = require('./routes/cities');
// ideally want router in it's own file to de-clutter app.js.
app.use('/cities', cities);
app.listen(3000);

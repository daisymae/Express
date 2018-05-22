$(function () {

  $.get('/cities', appendToList);

  $('form').on('submit', function(event) {
    event.preventDefault();
    var form = $(this);
    var cityData = form.serialize();
    console.log('cityData from form: ' + cityData);

    $.ajax({
      type: 'POST', url: '/cities', data: cityData
    }).done(function(cityName) {
      console.log('cityName: ' + cityName);
      console.log('appendingToList: ' + [cityName]);
      appendToList([cityName]);
      form.trigger('reset');
    });
  });

  function appendToList(cities) {
    var list = [];
    var content, city;
    console.table('cities: ' + cities);
    for (var i in cities) {
      console.log('i: ' + i);
      console.log('cities[i]: ' + cities[i]);
      // 'i' is the index of the array unless it is a 
      // newly added city
      if(i == 0) {
        city = cities[i];
      } else {
        city = i;
      }
      content = '<a href="/cities/'+city+'">'+city+'</a> ' +
      '<a href="#" data-block="'+city+'"><img src="del.png" height="16" width="16"></a>';
      console.log('content to push onto list: ' + content);
      list.push($('<li>', {
        html: content
      }));
    }
    $('.city-list').append(list);
    $('.city-list').on('click', '[data-block]', function(event) {
      if(!confirm('Are you sure ? ')) {
        return false;
      }

      console.log('event: ' + JSON.stringify(event));
      console.log('event.currentTarget: ' + event.currentTarget);
      var target = $(event.currentTarget);

      $.ajax({
        type: 'DELETE', url: '/cities/' + target.data('city')
      }).done(function() {

      });
    });
  }
});

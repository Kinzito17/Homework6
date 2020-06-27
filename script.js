var APIKey = "f6e39c7c29177ac5b7d29eb353796094";

$(document).ready(function () {
  currentWeather("Austin");

  //allows enter key to be pressed for search function
  $('#city-input').keypress(function (e) {
    if (e.which == 13) {
      $('#search-btn').click();
      $('#city-input').val("");
    }
  });

  //search button creates list item and appends to ul
  $("#search-btn").on("click", function (event) {
    event.preventDefault();
    var searchCity = $("#city-input").val();
    $("ul").append("<li>" + searchCity + "</li>");
    $("li").addClass("list-group-item");
    $('#city-input').val("");
    currentWeather(searchCity);
  });

  //clear button to remove recently searched list
  $("#clear-btn").click(function (event) {
    event.preventDefault();
    $("ul").empty();
  });


  //query for current weather
  function currentWeather(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
    $.ajax({
      url: queryURL,
      method: "GET"

      }).then(function (response) {
        var date = new Date(response.dt * 1000);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var temp = response.main.temp;
        var humidity = response.main.humidity;
        var wind = response.wind.speed;
        var lon = response.coord.lon;
        var lat = response.coord.lat;
        // var uvIndex = 
        var icon = response.weather[0].icon;
        var iconpic = "https://openweathermap.org/img/w/" + icon + ".png";
        $('#weathericon').attr('src', iconpic);
        $(".city").text(response.name + " " + "(" + month + "/" + day + "/" + year + ") ");
        $("#weathericon").text(iconpic)
        $(".temp").text("Temperature: " + temp + "°F");
        $(".humidity").text("Humidity: " + humidity + "%");
        $(".wind").text("Wind Speed: " + wind + " MPH");


    //query for uv index    
    var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=f6e39c7c29177ac5b7d29eb353796094&lat=" + lat + "&lon=" + lon;
    $.ajax({
      url: uvURL,
      method: "GET"
      
      }).then(function (uvresp) {
        var uvindex = uvresp.value;
        $(".uvIndex").text("UV Index: " + uvindex);

        //changes background color based on value
        if (uvindex <= 3) {
          $(".uvIndex").addClass("low");
        }
        else if (uvindex >= 3 || uvindex <= 6) {
          $(".uvIndex").removeClass("low");
          $(".uvIndex").addClass("med");
        }
        else if (uvindex >= 6 || uvindex <= 8) {
          $(".uvIndex").removeClass("low");
          $(".uvIndex").removeClass("med");
          $(".uvIndex").addClass("med-high");
        }
        else {
          $(".uvIndex").removeClass("low");
          $(".uvIndex").removeClass("med");
          $(".uvIndex").removeClass("med-high");
          $(".uvIndex").addClass("danger");
        }
      });

      var latlon = $(lat + "&lon=" + lon).text();
      forecastWeather(latlon)
    });
  };

  function forecastWeather(coord) {
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coord + "&exclude=hourly,minutely&units=imperial&appid=" + APIKey;
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"

    }).then(function (response) {

      for (var i = 0; i < response.list.length; i++) {

      }
    });

  };
});

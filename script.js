var APIKey = "f6e39c7c29177ac5b7d29eb353796094";

$(document).ready(function () {

  var useCity = localStorage.getItem("city-input");
  currentWeather("Austin");
  currentWeather(useCity);
  


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
    $("ul").append("<li>" + searchCity + "</li>").attr("type", "button");
    $("button").addClass("list-group-item listCity");
    var storeCity = $("#city-input").val();
    localStorage.setItem("city-input", storeCity);
    $('#city-input').val("");
    currentWeather(searchCity);
  });

  // allows user to click previous searched city from that session
  // $("li").on("click", function (event) {
  //   event.preventDefault();
  //   var listCity = $("li").val();
  //   // $('#city-input').val("");
  //   currentWeather(listCity);
  // });

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
      var icon = response.weather[0].icon;
      var iconpic = "https://openweathermap.org/img/w/" + icon + ".png";
      $('#weathericon').attr('src', iconpic);
      $(".city").text(response.name + " " + "(" + month + "/" + day + "/" + year + ") ");
      $("#weathericon").text(iconpic)
      $(".temp").text("Temperature: " + Math.floor(temp) + "°F");
      $(".humidity").text("Humidity: " + humidity + "%");
      $(".wind").text("Wind Speed: " + wind + " MPH");

      //query for uv index    
      var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=f6e39c7c29177ac5b7d29eb353796094&lat=" + lat + "&lon=" + lon;
      $.ajax({
        url: uvURL,
        method: "GET"

      }).then(function (uvresp) {
        var uvIndex = uvresp.value;
        $(".uvindex").text("UV Index: " + uvIndex);
        // $(".uvColor").text(uvindex);
        // $("p").addClass("uvColor in");

        //changes background color based on value
        if (uvIndex <= 3) {
          $(".uvColor").addClass("low");
        }
        else if (uvIndex >= 3 || uvIndex <= 6) {
          $(".uvColor").removeClass("low");
          $(".uvColor").addClass("med");
        }
        else if (uvIndex >= 6 || uvIndex <= 8) {
          $(".uvColor").removeClass("low");
          $(".uvColor").removeClass("med");
          $(".uvColor").addClass("med-high");
        }
        else {
          $(".uvColor").removeClass("low");
          $(".uvColor").removeClass("med");
          $(".uvColor").removeClass("med-high");
          $(".uvColor").addClass("danger");
        }
      });

      let latlon = lat + "&lon=" + lon;
      forecastWeather(latlon)
    });
  };

  //query for 5 day forecast
  function forecastWeather(latlon) {
    var foreURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latlon + "&exclude=hourly,minutely&units=imperial&appid=" + APIKey;
    console.log(foreURL);

    $.ajax({
      url: foreURL,
      method: "GET"

    }).then(function (response) {
      console.log(response);

      for (var i = 1; i < 6; i++) {

        var icon = response.daily[i].weather[0].icon;
        var iconPic = "https://openweathermap.org/img/w/" + icon + ".png";  

        var foreCastCard = $("<div>").addClass("card foreCastCard");
        $(".forecast").append(foreCastCard);

        var cardTitle = $("<h5>").addClass("card-title").text(moment(response.daily[i].dt, "X").format("MMM Do"));
        $(foreCastCard).append(cardTitle);

        var cardImg = $("<img>").attr("src", iconPic).addClass("cardImg");
        $(foreCastCard).append(cardImg);

        var cardBody = $("<div>").addClass("card-body");
        $(foreCastCard).append(cardBody);

        $(cardBody).append($("<p>").addClass("card-text").text("Temp: " + Math.floor(response.daily[i].temp.day) + "°F"));
        $(cardBody).append($("<p>").addClass("card-text").text("Humidity: " + response.daily[i].humidity + "%"));


      }

    });

  };

});

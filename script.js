var APIKey = "f6e39c7c29177ac5b7d29eb353796094";
var APIKey1 = "50c75374b0165d598243e090b05e751b";
var clearEl = document.getElementById("clear-btn");

// function currentWeather() {

//     var city = $("city-input").text();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Austin&units=imperial&appid=" + APIKey;
    console.log(queryURL);
         $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            console.log(response);
            var date = new Date(response.dt*1000);
            console.log(date)
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            var temp = response.main.temp;
            var humidity = response.main.humidity;
            var wind = response.wind.speed;
            var icon = response.weather[0].icon;
            var iconpic = "https://openweathermap.org/img/w/" + icon + ".png";
            console.log(iconpic)
            $('#weathericon').attr('src', iconpic);
            // var icon = response.weather.icon;
            // var uvIndex = 
            console.log(temp, humidity, wind);
            $(".city").text(response.name + " " + "(" + month + "/" + day + "/" + year +") ");
            $("#weathericon").text(iconpic)
            $(".temp").text("Temperature: " + temp + "°F");
            $(".humidity").text("Humidity: " + humidity + "%");
            $(".wind").text("Wind Speed: " + wind + " MPH");
          });

    var queryURL1 = "https://api.openweathermap.org/data/2.5/forecast/daily?q=Austin&units=imperial&cnt=7&appid=" + APIKey;
    console.log(queryURL1);
         $.ajax({
            url: queryURL1,
            method: "GET"
          }).then(function(response) {
              console.log(response);

        });

        //clear search history
        clearEl.addEventListener("click",function() {
            searchHistory = [];
            renderSearchHistory();
        })

        // }

        // var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;




        
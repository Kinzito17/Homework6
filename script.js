var APIKey = "f6e39c7c29177ac5b7d29eb353796094";
var APIKey1 = "50c75374b0165d598243e090b05e751b";

$(document).ready(function() {

  //allows enter key to be pressed for search function
  $('#city-input').keypress(function(e){
    if(e.which == 13){
        $('#search-btn').click();/
    }
});

  //search button creates list item and appends to ul
  $("#search-btn").on("click", function (event) {
    event.preventDefault();
    var searchCity = $("#city-input").val();
    $("ul").append("<li>" + searchCity + "</li>");
    $("li").addClass("list-group-item");


  //clear button to remove recently searched list
  $("#clear-btn").click(function (event) {
    event.preventDefault();
    $("ul").empty();
    // localStorage.clear();
  });


  
  //query to api with subsequent 
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&units=imperial&appid=" + APIKey;
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    var date = new Date(response.dt * 1000);
    console.log(date)
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var temp = response.main.temp;
    var humidity = response.main.humidity;
    var wind = response.wind.speed;
    // var uvIndex = 
    var icon = response.weather[0].icon;
    var iconpic = "https://openweathermap.org/img/w/" + icon + ".png";
    console.log(iconpic)
    $('#weathericon').attr('src', iconpic);
    console.log(temp, humidity, wind);
    $(".city").text(response.name + " " + "(" + month + "/" + day + "/" + year + ") ");
    $("#weathericon").text(iconpic)
    $(".temp").text("Temperature: " + temp + "°F");
    $(".humidity").text("Humidity: " + humidity + "%");
    $(".wind").text("Wind Speed: " + wind + " MPH");
  });
  

});

});

// var queryURL1 = "https://api.openweathermap.org/data/2.5/forecast/daily?q="  + searchCity + "&units=imperial&appid=" + APIKey;
// console.log(queryURL1);
// $.ajax({
//   url: queryURL1,
//   method: "GET"
// }).then(function (response) {
//   console.log(response);

// });

// var value = $(this).siblings(".list-group-item").val();
// var city = $(this).parent().attr("id");
// localStorage.setItem(city, value);
// console.log(value, city)








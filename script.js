// This is our API key
var APIKey = "ef15f534b4f0a302dde4da4732bdb088";

// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
  "q=Bujumbura,Burundi&units=imperial&appid=" + APIKey;

// AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET"
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {
   
    console.log(response)
    var currentCard = $('#card-current');
     // Show City name and Current Date with icon
    currentCard.append("<h1>" + response.name + moment().format(" M/D/YYYY ") + "<img src='http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png'>"  + "</h1>")
    // Show temperature
    currentCard.append("<p>" + "Temperature: " + response.main.temp + "</p>")
    // Show Humidity
    currentCard.append("<p>" + "Humidity: " + response.main.humidity + "</p>")
    // show wind speed
    currentCard.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>")
 
 $.ajax({
    url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&exclude={part}&appid=" + APIKey,
    method: "GET"
  })
  .then(function(oneCall){
    console.log(oneCall)
    // UV index
    currentCard.append("<p>" + "UV Index: " + oneCall.current.uvi + "</p>")
  })

});
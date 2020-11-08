
var searchBtn = $('#search');
var input = $('#input');

$(searchBtn).on("click", function(event) {
event.preventDefault()

// This is our API key
var APIKey = "ef15f534b4f0a302dde4da4732bdb088";

// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
  "q=" + input.val() + "&units=imperial&appid=" + APIKey;


// AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {
   
    console.log(response)
    var currentCard = $('#current');
    currentCard.empty();
     // Show City name and Current Date with icon
    currentCard.append("<h1>" + response.name + moment().format(" M/D/YYYY ") + "<img src='http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png'>"  + "</h1>")
    // Show temperature
    currentCard.append("<p>" + "Temperature: " + response.main.temp + "</p>")
    // Show Humidity
    currentCard.append("<p>" + "Humidity: " + response.main.humidity + "</p>")
    // show wind speed
    currentCard.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>")
 
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&units=imperial&appid=" + APIKey,
    method: "GET"
    })
  .then(function(oneCall){
    console.log(oneCall)
    // UV index
    currentCard.append("<p>" + "UV Index: " + oneCall.current.uvi + "</p>")
  

  var forecast = $('#forecast');
  forecast.empty();
  for (let i = 1; i < 6; i++) {
    let forecastCard = $("<div class='card'>");
    forecastCard.append("<h3>" + moment(oneCall.daily[i].dt * 1000).format("M/D/YYYY") + "</h3>")
    forecastCard.append("<img src='http://openweathermap.org/img/wn/" + oneCall.daily[i].weather[0].icon + "@2x.png'>")
    forecastCard.append("<p>" + "Temperature: " + oneCall.daily[i].temp.day + "</p>")
    forecastCard.append("<p>" + "Humidity: " + oneCall.daily[i].humidity  + "</p>")
    forecast.append(forecastCard)
    }
  })

  if (!historyArray.includes(response.name)) {
    historyArray.push(response.name)
    var searchHistory = $('#search-list');
    searchHistory.append("<li class='list-group-item'>" + response.name + "</li>")
    localStorage.setItem("history", JSON.stringify(historyArray));   
  } 

  });
});

var receive = localStorage.getItem("history") 
if (receive) {
  var historyArray = JSON.parse(receive)

} else {
  var historyArray = []
}


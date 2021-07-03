// The user can type a city into a form and click the "Search" button and be presented with the current and future conditions for the city
    //Need button click event listener
// The city is then added to local Storage as part of a cities array
    //Need local storage for cities array
// The current weather conditions for the city should include the city, date, icon representing the weather conditions, temperature, humidity, wind speed and UV index
    // APIs for current weather - Current Weather Data, Solar Radiation API (might need one call API instead now), icon one(?)
// For the UV index, a color is also presented representing favorable, moderate, or severe
    //Need if statement
// Future weather conditions should also appear for that city
    // APIs for future - 5 Day / 3 Hour Forecast
// For the 5 day forecast, the following should be included: date, icon representing weather conditions, temperature, wind speed and humidity
    // Bootstrap card layout can be used here
// User should be able to click on the city in search history and the data should pull back again for that city
    // Get items from local storage

var cityFormEl = document.getElementById('exampleInputCity');
var apiKey = 'be12c130488a49e9f35617a382464679';
var searchButton = document.getElementById('searchButton');
var cityLabel= document.querySelector('#city');
var tempLabel = document.querySelector('#temp');
var windLabel = document.querySelector('#wind');
var humidityLabel = document.querySelector('#humidity');

var formSubmitHandler = function (event) {
    event.preventDefault();

    // var city = cityFormEl.nodeValue.trim();

    // if (city) {
    //     getCurrentWeather(city);


    // }
};

var getCurrentWeather = function() {
    event.preventDefault();
    // var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=austin&appid=be12c130488a49e9f35617a382464679';

    var citySearched = cityFormEl.value.trim();
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + citySearched + '&appid=' + apiKey;

    var today = moment();

    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                // for (var i = 0; i < data.length; i++) {
                    cityLabel.textContent = data.name;
                    $("#date").text(today.format("dddd, MMM Do, YYYY"));
                    var temp = parseInt(data.main.temp);
                    temp = Math.round((temp - 273.15) * 9/5 + 32);
                    tempLabel.textContent = "Temp: " + temp + "°F"; 
                    windLabel.textContent = "Wind: " + data.wind.speed + " MPH";
                    humidityLabel.textContent = "Humidity: " + data.main.humidity + " %";
                // }
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch (function (error) {
        alert('Unable to connect to Weather API' + error);
    });
}


searchButton.addEventListener('click', getCurrentWeather);
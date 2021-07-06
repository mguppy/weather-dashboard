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
var iconLabel = document.querySelector('#icon');
var tempLabel = document.querySelector('#temp');
var windLabel = document.querySelector('#wind');
var humidityLabel = document.querySelector('#humidity');
var heatindexLabel = document.querySelector('#index');
var lat = 0;
var lon = 0;
var pastCity = document.querySelector('#past-city');
var citiesArr = [];
var pastCityButtonsArr = document.getElementsByClassName('past-city-button');
var pastCityOne = document.getElementById("past-city-one");
var pastCityTwo = document.getElementById("past-city-two");


function getCurrentWeather () {
    event.preventDefault();

    var citySearched = cityFormEl.value.trim();
    //Add city search to cities array
    citiesArr.push(citySearched);
    //Change text in button to last city searched
    for (var i = 0; i < pastCityButtonsArr.length; i++) {

        if (citiesArr.length>i)
        {
        pastCityButtonsArr[i].textContent=citiesArr[citiesArr.length-1-i];;
        window.localStorage.setItem(i, citiesArr[citiesArr.length-1-i]);
        }
    }

    var currentweatherapiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + citySearched + '&appid=' + apiKey;

    var today = moment();

    fetch(currentweatherapiUrl)
    .then(function (response) {
        if (response.ok) {
            
            response.json().then(function(data) {
                    console.log(response)
                    cityLabel.textContent = data.name;
                    $("#date").text(today.format("dddd, MMM Do, YYYY"));
                    var icon = data.weather.icon;
                    console.log(icon)
                    iconLabel.textContent = 'http://openweathermap.org/img/wn/10d@2x.png';
                    var temp = parseInt(data.main.temp);
                    temp = Math.round((temp - 273.15) * 9/5 + 32);
                    tempLabel.textContent = "Temp: " + temp + "°F"; 
                    windLabel.textContent = "Wind: " + data.wind.speed + " MPH";
                    humidityLabel.textContent = "Humidity: " + data.main.humidity + " %";
                    lat = data.coord.lat;
                    lon = data.coord.lon;
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch (function (error) {
        alert('Unable to connect to Weather API' + error);
    });

    var heatindexapiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely&appid=be12c130488a49e9f35617a382464679';

    fetch(heatindexapiUrl)
    .then(function (response) {
        if (response.ok) {
            
            response.json().then(function(data) {
                
                var heatIndex = parseInt(data.current.feels_like);
                heatIndex = Math.round((heatIndex - 273.15) * 9/5 + 32);
                heatindexLabel.textContent = "Heat Index: " + heatIndex + "°F";
                if (heatIndex> 90) {
                    heatindexLabel.style.backgroundColor = "red";
                } else if (heatIndex > 70) {
                    heatindexLabel.style.backgroundColor = "orange";
                } else {
                    heatindexLabel.style.backgroundColor = "green";
                }
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch (function (error) {
        alert('Unable to connect to Weather API' + error);
    });
    getFiveDayWeather();
}

function getFiveDayWeather () {
    var citySearched = cityFormEl.value.trim();

    var fivedayweatherapiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+ citySearched + '&appid=be12c130488a49e9f35617a382464679';

    fetch(fivedayweatherapiUrl)
    .then(function (response) {
        if (response.ok) {
            
            response.json().then(function(data) {
                console.log(data);
                var dayDateArr = document.getElementsByClassName("day-date");
                for (var i = 0; i < data.list.length; i=i+8) {
                var unix_timestamp = data.list[i].dt;
                var milliseconds = unix_timestamp * 1000;
                var newDate = new Date(milliseconds);
                document.getElementsByClassName("day-date")[i/8].textContent = "Date: " + newDate;
                var temp = parseInt(data.list[i].main.temp);
                temp = Math.round((temp - 273.15) * 9/5 + 32);
                document.getElementsByClassName("five-day-temp")[i/8].textContent = "Temp: " + temp + "°F";
                document.getElementsByClassName("five-day-wind")[i/8].textContent = "Wind: " + data.list[i].wind.speed + " MPH";
                document.getElementsByClassName("five-day-humidity")[i/8].textContent = "Humidity: " + data.list[i].main.humidity + "%";
                }
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch (function (error) {
        alert('Unable to connect to Weather API' + error);
    });

}

function getPastCity(cityButton) {
    var pastCity = document.getElementById(cityButton).innerText;
    cityFormEl.value = pastCity;
    getCurrentWeather();
}

searchButton.addEventListener('click', getCurrentWeather);
pastCityOne.addEventListener('click', function() { getPastCity("past-city-one"); } );
pastCityTwo.addEventListener('click', function() { getPastCity("past-city-two"); } );


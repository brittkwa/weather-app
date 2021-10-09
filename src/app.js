let monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let apiKey = "d08a8db058f41bd0c4453c6e70dcebee";
let city = "";
let lat = "";
let lon = "";
let tempHigh = "";
let tempLow = "";
let tempNow = "";
let icon = "";
let apiURLCity = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
let apiURLOneCall= `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
let apiURLCoords =`api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
const axios = require('axios');

//accepting (if applicable) the geolocation information
let locationButton = document.querySelector("#cLocationBtn").addEventListener("click", function getCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(coordsGLocation);
  
})

//changes the position object to latitude and longitude 
function coordsGLocation(position){
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  getWeather();
}

//retrieves the current weather for the selected coords through an API call
function getWeather(){
  let response = axios.get(apiURLCoords);
  processWeather(response);
}

//processes the info from response to variables
function processWeather(response){
  tempHigh = response.temp_max;
  tempLow = response.temp_min;
  tempNow = response.temp;
  icon = response.icon;
  console.log(response);
  console.log("hi");
  
}


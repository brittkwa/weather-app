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

getDates();
let apiKey = "d08a8db058f41bd0c4453c6e70dcebee";
let city = "Washington DC";
let lat = "";
let lon = "";
let icon = "";
let units = "";
let weatherDescription = "";
let apiURLCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
let apiURLOneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
let apiURLCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
let apiIconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
let windSpeed = "";
let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", searchToCoords);
getCoords();
let convertUnitsBtn = document.getElementById("convertUnitsBtn");
convertUnitsBtn.addEventListener("click", convertUnits);

//initiates the weather info grab from startup with default location
function getCoords() {
  apiURLCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  axios.get(apiURLCity).then(logLocation);
}

//accepting (if applicable) the geolocation information
let locationButton = document
  .querySelector("#cLocationBtn")
  .addEventListener("click", function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(coordsLocationVar);
  });

//takes the search input and uses that to get the API results which have the coords
function searchToCoords(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-input").value;
  apiURLCity = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}`;
  axios.get(apiURLCity).then(logLocation);
}

//logs the api response to console and sets longitude and latitude variables, runs getWeather
function logLocation(response) {
  lat = response.data.coord.lat;
  lon = response.data.coord.lon;
  getWeather();
}

//gets the current date and dates for the 7 day forecast
function getDates() {
  let currentDate = new Date();

  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let monthString = monthNames[currentDate.getMonth()];
  let dayNum = currentDate.getDate();
  let weekdayStr = weekday[currentDate.getDay()];
  let dateString = weekdayStr + ", " + monthString + " " + dayNum;
  let timeStr = hours + ":" + minutes;

  document.getElementById("currentTime").innerHTML = timeStr;
  document.getElementById("currentDate").innerHTML = dateString;

  for (let i = 1; i <= 6; i++) {
    const date = new Date();
    let dayNum = date.getDate() + i;
    date.setDate(dayNum);

    let weekdayStr = weekday[date.getDay()];
    let upcomingDateString = weekdayStr + ", " + dayNum;

    let upcomingDateId = document.querySelector(`#date${i} .date`);

    upcomingDateId.innerHTML = upcomingDateString;
  }
}

//changes the position object to latitude and longitude
function coordsLocationVar(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  apiURLCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  getWeather();
}

//retrieves the current weather for the selected coords through an API call
function getWeather() {
  apiURLCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  let forecastAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiURLCoords).then(logWeatherResponse);
  axios.get(forecastAPI).then(logForecastResponse);
}

//logs the API response and launches processForecast function
function logForecastResponse(response) {
  console.log(response);
  processForecast(response.data);
}
//logs the API response and launches processCurrentWeather function
function logWeatherResponse(response) {
  console.log(response.data);
  processCurrentWeather(response.data);
}

//processes the info from response to variables
function processCurrentWeather(response) {
  tempHigh = response.main.temp_max;
  tempLow = response.main.temp_min;
  tempNow = response.main.temp;
  windSpeed = response.wind.speed;
  icon = response.weather[0].icon;
  let location = response.name;
  let locationTxt = document.getElementById("location-text");

  locationTxt.innerHTML = location;
  weatherDescription = response.weather[0].description;

  apiIconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  changeCurrentWeather();
}

//changes the innerHTML to the proper current (today) weather
function changeCurrentWeather() {
  let cTempHigh = document.getElementById("currentHigh");
  let cTempLow = document.getElementById("currentLow");
  let cTempNow = document.getElementById("currentTemp");
  let wDescription = document.getElementById("weather-description");
  let cWind = document.getElementById("currentWind");

  cWind.innerHTML = windSpeed;
  cTempLow.innerHTML = tempLow;
  cTempHigh.innerHTML = tempHigh;
  cTempNow.innerHTML = tempNow;
  document.getElementById("icon1").src = apiIconURL;
  wDescription.innerHTML = weatherDescription;
  console.log(apiIconURL);
}

//converts the temperature's units of measurements
function convertUnits() {
  convertCurrentWeather();
  convertForecast();

  let units2 = document.getElementById("units2");
  let units1 = document.getElementById("units");

  let currentUnits = units1.textContent.innerHTML;
  let newUnits = null;
  let oldUnits = null;
  console.log(units1.textContent);
  if (currentUnits === "Fahrenheit") {
    let oldUnits = "Fahrenheit";
    let newUnits = "Celsius";
  } else {
    let oldUnits = "Celsius";
    let newUnits = "Fahrenheit";
  }

  let tempUnits2 = units1.innerHTML;
  units1.innerHTML = units2.innerHTML;
  units2.innerHTML = tempUnits2;
}

//calculates conversions
function conversionCalc(temp) {
  let units1 = document.getElementById("units");
  let newTemp = null;

  if (units1.innerHTML === "Celsius") {
    //convert from C to F
    console.log("converting from C to F");
    newTemp = temp * 1.8 + 32;
  } else if (units1.innerHTML === "Fahrenheit") {
    //convert from F to C
    console.log("converting from F to C");
    newTemp = (temp - 32) / 1.8;
  }
  return newTemp;
}

//converts current weather's units
function convertCurrentWeather() {
  let cTempHigh = document.getElementById("currentHigh");
  let cTempLow = document.getElementById("currentLow");
  let cTempNow = document.getElementById("currentTemp");
  let units = document.getElementById("units");

  let tempNow = conversionCalc(cTempNow.innerHTML);
  cTempNow.innerHTML = tempNow.toFixed(2);

  let tempHigh = conversionCalc(cTempHigh.innerHTML);
  cTempHigh.innerHTML = tempHigh.toFixed(2);

  let tempLow = conversionCalc(cTempLow.innerHTML);
  cTempLow.innerHTML = tempLow.toFixed(2);
}

//edits the innerHTML of each day with its forecast info
function processForecast(response) {
  for (let i = 1; i < 7; i++) {
    let r = response.daily[i];
    let fHigh = document.querySelector(`#date${i} .tempHigh`);
    let fLow = document.querySelector(`#date${i} .tempLow`);
    let fWind = document.querySelector(`#date${i} .windSpeed`);
    let high = r.temp.max;
    let low = r.temp.min;
    let windSpeed = r.wind_speed;
    fWind.innerHTML = windSpeed;
    fHigh.innerHTML = high;
    fLow.innerHTML = low;
    let iconID = `icon${i + 1}`;

    let icon = r.weather[0].icon;
    let iconImg = document.querySelector(`#icon${i + 1}`);
    apiIconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    document.getElementById(iconID).src = apiIconURL;
  }
}

//converts the units in forecast
function convertForecast() {
  for (let i = 1; i <= 6; i++) {
    let high = document.querySelector(`#date${i} .tempHigh`);
    let low = document.querySelector(`#date${i} .tempLow`);

    let newHigh = conversionCalc(high.innerHTML);
    let newLow = conversionCalc(low.innerHTML);

    high.innerHTML = newHigh.toFixed(2);
    low.innerHTML = newLow.toFixed(2);
  }
}

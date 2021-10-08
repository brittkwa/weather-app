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
let city = "Washington";
let apiKey = "d08a8db058f41bd0c4453c6e70dcebee";

getDates();
getForecast();

let currentLocationButton = document.querySelector("#cLocationBtn");
currentLocationButton.addEventListener("click", toCurrent);

let convertButton = document.querySelector("#convertButton");
convertButton.addEventListener("click", convert);

let form = document.querySelector("form");
form.addEventListener("submit", changeCity);

function toCurrent() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function logResponse(response) {
  console.log(response);
  cityChangeTxt(response);
  changeCurrentWeather(response);

}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`;
}


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
    let date = new Date();
    let dayNum = date.getDate() + i;
    date.setDate(dayNum);
    let weekdayStr = weekday[date.getDay()];
    let upcomingDateString = weekdayStr + ", " + dayNum;
    let upcomingDateId = document.querySelector("p#date" + i + " .date");
    upcomingDateId.innerHTML = upcomingDateString;

  }
}

function getLat(city){
  let cityApiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  let response = axios.get(cityApiURL)
  let lat = response.lat;
}

function getForecast(lon, lat) {
  let tempHigh = "";
  let tempLow = "";
  axios.get(apiURL).then(getCoords);
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
  let response = axios.get(apiURL);
  for (let i = 1; i<=6; i++){
    let tempHighId = document.querySelector("p#date" + i + " .tempHigh");
    let tempLowId = document.querySelector("p#date" + i + " .tempLow");
    tempHighId.innerHTML = tempHigh;
    tempLowId.innerHTML = tempLow;
  }
}

function convert() {
  let scale = findScale();
  conversionCalc(scale);
  //changeText();
}

function findScale() {
  let scale = document.querySelector("#conScale").textContent;
  return scale;
}

function conversionCalc(scale) {
  let temp = document.querySelector("#conTemp").textContent;
  let tempBtn = document.querySelector("#conTemp");
  let scaleBtn = document.querySelector("#conScale");
  let newTemp = "";
  let newScale = "";
  if (scale === "Celsius") {
    //convert to F
    newScale = "Fahrenheit";
    newTemp = temp * 1.8 + 32;
  } else if (scale === "Fahrenheit") {
    //convert to C
    newTemp = (temp - 32) / 1.8;
    newScale = "Celsius";
  }
  tempBtn.innerHTML = newTemp.toFixed(2);
  scaleBtn.innerHTML = newScale;
}

function changeCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-input");
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&units=imperial&appid=${apiKey}`;
  console.log(apiURL);
  axios.get(apiURL).then(logResponse);
}
function cityChangeTxt(response) {
  let cityTxt = document.querySelector("#location-text");
  cityTxt.innerHTML = response.data.name;
}

function changeIcon(response, i){

  let icon = document.querySelector("icon" + i)

}
function changeCurrentWeather(response) {
  let currentTemp = document.querySelector("#conTemp");
  let currentLow = document.querySelector("#currentLow");
  let currentHigh = document.querySelector("#currentHigh");
  if (response.data != null){
    currentTemp.innerHTML = response.data.main.temp;
    currentLow.innerHTML = response.data.main.temp_min;
    currentHigh.innerHTML = response.data.main.temp_max;
  } else {
    
  }
}

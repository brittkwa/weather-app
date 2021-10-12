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
let city = "";
let lat = "";
let lon = "";
let tempHigh = "";
let tempLow = "";
let tempNow = "";
let icon = "";
let apiURLCity = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
let apiURLOneCall= `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
let apiURLCoords =`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
let apiIconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

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

    let upcomingDateId = document.querySelector("p#date" + i + " .date");
    let tempHighId = document.querySelector("p#date" + i + " .tempHigh");
    let tempLowId = document.querySelector("p#date" + i + " .tempLow");

    upcomingDateId.innerHTML = upcomingDateString;

  }
}


//accepting (if applicable) the geolocation information
  let locationButton = document.querySelector("#cLocationBtn").addEventListener("click", function getCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(coordsLocationVar);
  
})

//changes the position object to latitude and longitude 
function coordsLocationVar(position){
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  apiURLCoords =`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  console.log(lat);
  console.log(lon);
  getWeather();
}

//retrieves the current weather for the selected coords through an API call
function getWeather(){
  axios.get(apiURLCoords).then(logResponse);
}

function logResponse(response){
  console.log(response.data);
  processCurrentWeather(response.data);
}
//processes the info from response to variables
function processCurrentWeather(response){
  tempHigh = response.main.temp_max;
  tempLow = response.main.temp_min;
  tempNow = response.main.temp;
  icon = response.weather.icon;
  apiIconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  changeCurrentWeather();
}

function changeCurrentWeather(){
  let cTempHigh = document.getElementById("currentHigh");
  let cTempLow = document.getElementById("currentLow");
  let cTempNow = document.getElementById("currentTemp");
  let icon1 = document.querySelector(".icon1");
  cTempLow.innerHTML = tempLow;
  cTempHigh.innerHTML = tempHigh;
  cTempNow.innerHTML = tempNow;
  icon1.innerHTML = apiIconURL;
  
}


/*let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

// code here
let city = prompt("Enter a city");
city = city.trim();
city = city.toLowerCase();
if (weather[city] !== undefined) {
  let humid = weather[city].humidity;
  let temperature = weather[city].temp;
  let celsiusTemp = Math.round(temperature);
  let fahrenheitTemp = Math.round(1.8 * temperature + 32);

  alert(
    `It is currently ${celsiusTemp}°C (${fahrenheitTemp}°F) in ${city} with a humidity of ${humid}%`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
}
*/

/*function convertTempInC(event) {
  event.preventDefault();
  let temperCelius = document.querySelector("#temp");
  temperCelius.innerHTML = `17`;
  //alert("hello");
}
let pressC = document.querySelector("#celsius");
pressC.addEventListener("click", convertTempInC);

function convertTempInF(event) {
  event.preventDefault();
  let temperFahrenheit = document.querySelector("#temp");
  temperFahrenheit.innerHTML = `66`;
}
let pressF = document.querySelector("#fahrenheit");
pressF.addEventListener("click", convertTempInF);
*/

let now = new Date();
let dayOfWeek = now.getDay();
let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let realDay = week[dayOfWeek];
let hour = now.getHours();
if (hour < 10) {
  hour = "0" + hour;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}
let placeChangeDay = document.querySelector("#realDateNow");
placeChangeDay.innerHTML = `${realDay} ${hour}:${minutes} `;

function showDataUserDisplay(response) {
  curentTemperature = response.data.main.temp;
  document.querySelector("#temp").innerHTML = Math.round(curentTemperature);
  let curentTemperatureMax = Math.round(response.data.main.temp_max);
  document.querySelector("#tempMax").innerHTML = curentTemperatureMax;
  let curentTemperatureMin = Math.round(response.data.main.temp_min);
  document.querySelector("#tempMin").innerHTML = curentTemperatureMin;
  let curentUserCity = response.data.name;
  document.querySelector("#cityNow").innerHTML = curentUserCity;
  let humidity = Math.round(response.data.main.humidity);
  document.querySelector("#humidity").innerHTML = humidity;
  let wind = Math.round(response.data.wind.speed);
  document.querySelector("#wind").innerHTML = wind;
  let clouds = response.data.weather[0].description;
  document.querySelector("#clouds").innerHTML = clouds;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCityFirstPage(city) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showDataUserDisplay);
  //console.log(apiUrl);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enterCity").value;
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showDataUserDisplay);
}
let newCity = document.querySelector("#seach-form");
newCity.addEventListener("submit", changeCity);

function userPosition(position) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiFromCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiFromCoords).then(showDataUserDisplay);
}
function displayDataUser(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(userPosition);
}

function showFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  console.log(tempElement.innerHTML);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperFahrenheit = (curentTemperature * 9) / 5 + 32;

  tempElement.innerHTML = Math.round(temperFahrenheit);
}

function showCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  tempElement.innerHTML = Math.round(curentTemperature);
}

let curentTemperature = null;

let userButton = document.querySelector("#userGeoposition");
userButton.addEventListener("click", displayDataUser);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

searchCityFirstPage("Kyiv");

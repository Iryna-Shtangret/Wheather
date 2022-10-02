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

function formatDay(dataInTime) {
  let data = new Date(dataInTime * 1000);
  let day = data.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  forecast = response.data.daily;
  let elementsOfDays = document.querySelector("#weatherFor5days");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (arrayAllData, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `           
              <div class="col position">
                <div class="day-of-week">${formatDay(
                  arrayAllData.dt
                )}</div>                          
                <div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    arrayAllData.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="50%"
                />
                </div>
                
                <span class="date-temp-of-week">${Math.round(
                  arrayAllData.temp.max
                )}° <span class="date-temp-of-week-min">${Math.round(
          arrayAllData.temp.min
        )}°</span></span>
              </div>     
            `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  elementsOfDays.innerHTML = forecastHTML;
}

function dataFor5Days(coordinates) {
  let apiKey = "f81614abe2395d5dfecd45b9298041de";
  let apiUrl = ` https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric `;
  axios.get(apiUrl).then(displayForecast);
}

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
  dataFor5Days(response.data.coord);
}

function searchCityFirstPage(city) {
  let apiKey = "f81614abe2395d5dfecd45b9298041de";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showDataUserDisplay);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enterCity").value;
  let apiKey = "f81614abe2395d5dfecd45b9298041de";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showDataUserDisplay);
}
let newCity = document.querySelector("#seach-form");
newCity.addEventListener("submit", changeCity);

function userPosition(position) {
  let apiKey = "f81614abe2395d5dfecd45b9298041de";
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

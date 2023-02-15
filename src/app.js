function fromatDate(timestamp) {
  //calculate the date
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  celsiusTemp = Math.round(response.data.main.temp);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = fromatDate(response.data.dt * 1000);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function search(city) {
  let apikey = "d1a86552de255334f6117b348c4519bd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  console.log(cityInputElement);
  search(cityInputElement.value);
  //search("new york");
}
//let form = document.querySelector("#searchform");
//form.addEventListener("sumbit", handleSubmit);

function displayFahTemp(event) {
  event.preventDefault();
  let fahTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahTemp);
  celsiuslink.classList.remove("active");
  farhlink.classList.add("active");
}

function displaycelsuisTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = celsiusTemp;
  celsiuslink.classList.add("active");
  farhlink.classList.remove("active");
}
let celsiusTemp = null;
let form = document.querySelector("#searchform");
form.addEventListener("submit", handleSubmit);
let farhlink = document.querySelector("#faren-link");
farhlink.addEventListener("click", displayFahTemp);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", displaycelsuisTemp);
search("new york");

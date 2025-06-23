const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const search = document.querySelector("input");

const button = document.querySelector(".button");

//* Get country name with the help of the country code.
function getcountryname(countrycode) {
  return new Intl.DisplayNames([countrycode], { type: "region" }).of(
    countrycode
  ); //! The (of) method is then used to get the country name from the country code.
}
let hour;
//todo- Create a new instance of Intl.DateTimeFormat.
function getdate(){
const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
  hour: "numeric",
  minute: "numeric",
};
const formatter = new Intl.DateTimeFormat("en-US", options);

// Format a specific date
  const date = new Date();
  const formattedDate = formatter.format(date);
  hour = date.getHours()
  return formattedDate;
}

async function checkweather(city) {
  try {
    const responce = await fetch(apiurl + city + `&appid=${WEATHER_KEY}`);

    if (responce.status == 404) {
      alert("Invalid City Name");
    } 
    else {
      var data = await responce.json();
      console.log(data);
      displayWeather(data);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function displayWeather(data) {
  document.querySelector(".city").innerHTML = `${data.name}, ${getcountryname(data.sys.country)}`;

  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";

  document.querySelector(".date").innerHTML = getdate();

  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";

  document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

  if (data.weather[0].main == "Clouds") {
    document.querySelector(".weather-icons").src = "images/clouds.png";
  } else if (data.weather[0].main == "Clear") {
    document.querySelector(".weather-icons").src = (hour > 19) ? "images/moonn.png" : "images/sun (1).png";
  } else if (data.weather[0].main == "Rain") {
    document.querySelector(".weather-icons").src = "images/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    document.querySelector(".weather-icons").src = "images/drizzlee.png";
  } else if (data.weather[0].main == "Haze") {
    document.querySelector(".weather-icons").src = (hour > 19) ? "images/hazee.png" : "images/haze.png";
  } else if (data.weather[0].main == "Snow") {
    document.querySelector(".weather-icons").src = "images/snoww.png";
  } else if (data.weather[0].main == "Wind") {
    document.querySelector(".weather-icons").src = "images/wind.png";
  } else if (data.weather[0].main == "Thunderstorm") {
    document.querySelector(".weather-icons").src = "images/storm.png";
  } else if (data.weather[0].main == "Fog") {
    document.querySelector(".weather-icons").src = "images/fog.png";
  } else if (data.weather[0].main == "Mist") {
    document.querySelector(".weather-icons").src = "images/mist.png";
  }
}

button.addEventListener("click", () => {
  checkweather(search.value);
});

checkweather("lucknow");

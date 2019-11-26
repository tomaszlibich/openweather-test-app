import { weatherLoader } from "./weather-loader";
import { forecastHandler } from "./forecast-handler";

const updateForecast = forecastWrapper => forecast => {
  forecast.forEach((day, index) => {
    forecastWrapper.appendChild(forecastHandler.getDayComponent(day, index));
  });
};

const loadWeatherForCity = event => {
  const cityName = event.target.value;
  const forecastWrapper = document.getElementById("forecast");

  if (forecastWrapper) {
    forecastWrapper.innerHTML = "";
  }

  if (!cityName) {
    return;
  }

  weatherLoader.load(cityName, updateForecast(forecastWrapper));
};

const attachEventHandlers = () => {
  const dropdown = document.getElementById("citySelector");

  dropdown.addEventListener("change", loadWeatherForCity);
};

attachEventHandlers();

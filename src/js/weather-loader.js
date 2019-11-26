import axios from "axios";

const apiAddress = "http://api.openweathermap.org/data/2.5/forecast";
const apiKey = "db3ec05a2fc068a4021f90e34793c8c5"; //coming from external config, e.g. env variables
const getApiUrl = cityName => {
  return `${apiAddress}?q=${cityName}&units=metric&cnt=5&appid=${apiKey}`;
};

const extractForecastData = day => {
  const { weather, main, wind } = day;
  const { description, icon } = weather[0];

  return {
    temp: main.temp,
    icon,
    wind: wind.speed,
    description
  };
};

const load = (cityName, onSuccess) => {
  axios
    .get(getApiUrl(cityName))
    .then(response => {
      const { data } = response;
      const forecast = data.list.map(extractForecastData);

      onSuccess(forecast);
    })
    .catch(error => {
      console.error("Oops, something went wrong:", error);
    });
};

export const weatherLoader = { load };

import moment from "moment";

const formatDayItem = (key, info) => {
  const element = document.createElement(key === "icon" ? "img" : "span");
  const arg = key === "icon" ? "src" : "innerHTML";
  const value = {
    temp: `${parseInt(info)} &deg; C`,
    wind: `wind: ${info} mps`,
    icon: `http://openweathermap.org/img/w/${info}.png`,
    description: info
  };

  element[arg] = value[key];

  return element;
};

const prepareForecastItemsList = () => {
  const list = document.createElement("ul");
  const classes = ["card", "animated", "fadeIn", "forecast-items"];

  classes.forEach(classname => {
    list.classList.add(classname);
  });

  return list;
};

const getDateTimeRow = index => {
  const datetime = document.createElement("li");
  const date = moment().add(index, "days");

  datetime.innerHTML =
    index < 2 ? date.calendar().split(" ")[0] : date.format("dddd");

  datetime.classList.add("datetime");

  return datetime;
};

const addForecastItems = (day, list) => {
  const items = {};

  Object.keys(day).forEach(key => {
    items[key] = document.createElement("li");
    items[key].classList.add(`forecast-item-${key}`);
    items[key].appendChild(formatDayItem(key, day[key]));

    list.appendChild(items[key]);
  });
};

const getDayComponent = (day, index) => {
  const list = prepareForecastItemsList();

  list.appendChild(getDateTimeRow(index));

  addForecastItems(day, list);

  return list;
};

export const forecastHandler = { getDayComponent };

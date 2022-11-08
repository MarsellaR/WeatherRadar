import React from "react";
import "./ForecastWeather.css";

const forecastWeather = ({ forecastData }) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const findDates = forecastData.list.map((item) => item.dt_txt.slice(0, 10));
  const filteredDates = forecastData.list.filter(
    ({ dt_txt }, index) => !findDates.includes(dt_txt.slice(0, 10), index + 1)
  );

  return (
    <div className="forecast-info">
      {filteredDates.slice(1).map((item) => {
        return (
          <div className="single-forecast" key={item.dt}>
            <p className="weekday">
              {weekday[new Date(item.dt_txt.slice(0, 10)).getDay()]}
            </p>
            <img
              className="img"
              src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
              alt="icon"
            />
            <div className="max-min">
              {" "}
              {Math.round(item.main.temp_max)}°/
              {Math.round(item.main.temp_min)}°
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default forecastWeather;

import React from "react";
import "./HourlyForecast.css";

function hourlyForecast({ forecastData }) {
  return (
    <div className="hourly-info">
      {forecastData.list.slice(0, 5).map((item) => {
        return (
          <div className="single-forecast" key={item.dt}>
            <div className="time">{item.dt_txt.slice(11, 16)} </div>
            <img
              className="icons"
              src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
              alt="icon"
            />
            <div className="main-temp">{`${Math.round(item.main.temp)}°C`}</div>
          </div>
        );
      })}
    </div>
  );
}

export default hourlyForecast;

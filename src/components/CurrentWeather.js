import React from "react";
import "./CurrentWeather.css";
const Weather = ({ weatherData, city }) => {
  const date = new Date();

  return (
    <div className="weather-card">
      <div className="city-name">
        {weatherData.name}{" "}
        <sup className="notranslate">{weatherData.sys.country}</sup>
      </div>
      <div className="weather-info">
        {" "}
        <div className="localDateAndTime">
          {" "}
          <div> {date.toLocaleDateString()}</div>
          <div> {date.toLocaleTimeString()}</div>
        </div>
        <div className="weather-icon">
          <div className="image">
            <img
              src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              alt="icon"
            />
          </div>
          <div className="temprature">
            {Math.round(weatherData.main.temp)}°C
          </div>
          <div className="description">
            {weatherData.weather[0].description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;

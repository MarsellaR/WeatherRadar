import React from "react";
import "./Higlight.css";

const Higlight = ({ currentWeather }) => {
  const unix = currentWeather.sys.sunrise;
  const unix2 = currentWeather.sys.sunset;
  const humadity = Math.round(currentWeather.main.humidity);
  const sunrise = new Date(unix * 1000);
  const sunset = new Date(unix2 * 10000);
  const style = {
    content: {
      backgroundColor: "#fafafa",
      color: "#d35400",
      marginLeft: "0",
      fontSize: "15px",
      padding: "0",
    },
  };
  const humadityLevel = () => {
    return humadity <= 55
      ? "Normal"
      : humadity > 55 && humadity < 65
      ? "Average"
      : "Unhealty";
  };
  return (
    <div className="higlight-info">
      {<h1>Today's Higlights</h1>}
      <div className="container-info">
        <div className="temp-info">
          <div className="higlight-title">
            {" "}
            <i className="fa-solid fa-snowflake"></i>
            {<div>Feels like</div>}
          </div>

          <div className="degree">
            {Math.round(currentWeather.main.feels_like)}°C
          </div>
        </div>
        <div className="temp-info">
          <div className="higlight-title">
            <i className="fa-solid fa-temperature-low"></i>
            {<p className="temprature-title">Max/min temprature</p>}
          </div>
          <div className="degree">
            {Math.round(currentWeather.main.temp_max)}°C /
            {Math.round(currentWeather.main.temp_min)}°C
          </div>
        </div>
        <div className="temp-info">
          <div className="higlight-title">
            <i className="fa-solid fa-wind"></i>
            {<div>Wind Status</div>}
          </div>
          <div className="degree">
            {Math.round(currentWeather.wind.speed)}
            <span className="km">km/h</span>
          </div>
        </div>

        <div className="temp-info">
          <div className="higlight-title">
            <i className="fa-solid fa-cloud-showers-water"></i>
            {<p>Humidity</p>}
          </div>
          <div className="degree">
            {humadity}{" "}
            <sup style={style.content} className="percentage">
              {" "}
              %
            </sup>
            <div className="humidity-level">{humadityLevel()}</div>
          </div>
        </div>
        <div className="temp-info">
          <div className="higlight-title">
            <i className="fa-solid fa-eye-low-vision"></i>
            {<div>Visibility</div>}
          </div>
          <div className="degree">
            {Math.round(currentWeather.visibility) / 1000}{" "}
            <span className="km">km</span>
          </div>
        </div>
        <div className="temp-info">
          <div className="higlight-title">
            <i className="fa-solid fa-cloud-sun"></i>
            {<div>Sunrise & Sunset</div>}
          </div>
          {
            <div className="degree">
              <div> {sunrise.toLocaleTimeString("en-IN")}</div>
              <div> {sunset.toLocaleTimeString("en-IN")}</div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};
export default Higlight;

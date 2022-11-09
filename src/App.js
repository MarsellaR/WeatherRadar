import React, { useEffect, useState } from "react";
import "./App.css";
import Wrapper from "./components/Wrapper";
import Search from "./components/Search";
import CurrentWeather from "./components/CurrentWeather";
import ForecastWeather from "./components/ForecastWeather";
import HourlyForecast from "./components/HourlyForecast";
import Higlight from "./components/Higlight";
import { weather, weather_key } from "./api";

function App() {
  const [city, setCity] = useState([]);
  const [currentWeather, setCurrentWeather] = useState();
  const [forecastWeather, setForecastWeather] = useState();
  const [isToday, setIsToday] = useState(false);
  const [isWeek, setIsWeek] = useState(false);
  const [locator, setLocator] = useState("");

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocator(position.coords);
    });
  };

  useEffect(() => {
    const fetchData = () => {
      setLocator("");
      if (city.length > 0) {
        const currentWeather = fetch(
          `${weather}/weather?lat=${city[0]?.latitude}&lon=${city[0]?.longitude}&appid=${weather_key}&units=metric`
        );

        const forecastWeather = fetch(
          `${weather}/forecast?lat=${city[0]?.latitude}&lon=${city[0]?.longitude}&appid=${weather_key}&units=metric`
        );
        Promise.all([currentWeather, forecastWeather])
          .then(async (response) => {
            const weatherResponse = await response[0].json();
            const forecastResponse = await response[1].json();
            setCurrentWeather(weatherResponse);
            setForecastWeather(forecastResponse);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
      if (locator !== "") {
        setCity("");
        const currentWeather2 = fetch(
          `${weather}/weather?lat=${locator?.latitude}&lon=${locator?.longitude}&appid=${weather_key}&units=metric`
        );

        const forecastWeather2 = fetch(
          `${weather}/forecast?lat=${locator?.latitude}&lon=${locator?.longitude}&appid=${weather_key}&units=metric`
        );
        Promise.all([currentWeather2, forecastWeather2])
          .then(async (response) => {
            const weatherResponse2 = await response[0].json();
            const forecastResponse2 = await response[1].json();
            setCurrentWeather(weatherResponse2);
            setForecastWeather(forecastResponse2);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    };
    fetchData();
  }, [city, locator]);

  const todayClicked = (event) => {
    setIsToday((current) => !current);
    setIsWeek(false);
  };
  const weekClicked = (event) => {
    if (currentWeather) {
      setIsWeek((current) => !current);
      setIsToday(false);
    }
  };

  function displayWeather() {
    return isToday && forecastWeather ? (
      <HourlyForecast forecastData={forecastWeather} />
    ) : isWeek && forecastWeather ? (
      <ForecastWeather forecastData={forecastWeather} />
    ) : (
      ""
    );
  }
  return (
    <Wrapper>
      <Search
        setData={setCity}
        city={city}
        weather={currentWeather}
        forecastData={forecastWeather}
        isToday={todayClicked}
        isWeek={weekClicked}
        locator={getLocation}
      />
      <div className="wrapper">
        <div className="container">
          {currentWeather && (
            <CurrentWeather weatherData={currentWeather} city={city} />
          )}
          <div className="weather-display">
            {displayWeather()}
            {currentWeather && <Higlight currentWeather={currentWeather} />}
          </div>
        </div>
        <div className="container2">
          {displayWeather()}
          {currentWeather && (
            <CurrentWeather weatherData={currentWeather} city={city} />
          )}
          <div className="weather-display">
            {currentWeather && <Higlight currentWeather={currentWeather} />}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default App;

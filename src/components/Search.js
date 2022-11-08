import React, { useState } from "react";
import { url, options } from "../api";
import "./Search.css";
function Search({ setData, isToday, isWeek, locator }) {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hoverHourly, setHoverHourly] = useState(false);
  const [hoverWeek, setHoverWeek] = useState(false);

  const SearchCity = (inputValue) => {
    fetch(`${url}/cities?namePrefix=${inputValue}`, options)
      .then((response) => response.json())
      .then((response) => {
        let responseData = response.data.filter((item) => {
          return item.name.toUpperCase() === inputValue.toUpperCase()
            ? item
            : "";
        });
        if (responseData.length > 0) {
          setData(responseData);
          setErrorMessage("");
        } else {
          return setErrorMessage("No results found");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      return SearchCity(inputValue);
    }
  };
  const hoverElement = () => {
    setHoverHourly((current) => !current);
    setHoverWeek(false);
  };
  const hoverElement2 = () => {
    setHoverWeek((current) => !current);
    setHoverHourly(false);
  };
  return (
    <div className="search-container">
      <div className="city-display">
        <div className="search-icon">
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={() => SearchCity(inputValue)}
          ></i>
          <input
            type="text"
            placeholder="Search for a city"
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <i className="fa-solid fa-location-dot" onClick={locator}></i>
        </div>

        <div className="buttons">
          <div
            onClick={() => {
              isToday();
              hoverElement();
            }}
            className={`btn ${hoverHourly ? "border" : ""}`}
          >
            Hourly
          </div>
          <div
            onClick={() => {
              isWeek();
              hoverElement2();
            }}
            className={`btn ${hoverWeek ? "border" : ""}`}
          >
            Week
          </div>
        </div>
        <p className="error-message"> {errorMessage}</p>
        <div className="btns">
          <button
            onClick={() => {
              isToday();
              hoverElement();
            }}
            className={hoverHourly ? "btns-background" : ""}
          >
            Hourly
          </button>
          <button
            onClick={() => {
              isWeek();
              hoverElement2();
            }}
            className={hoverWeek ? "btns-background" : ""}
          >
            {" "}
            Week
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;

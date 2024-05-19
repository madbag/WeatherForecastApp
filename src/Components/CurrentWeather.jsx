import React, { useState, useEffect } from "react";

const CurrentWeather = ({ data }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  return (
    <div className="flex flex-col grid-rows-1 grid-cols-2 gap-4 mt-4">
      <h2 className="text-xl font-medium flex flex-col justify-start">
        {data.city}
        <span className="text-xs"> {formattedDate}</span>
      </h2>

      <div className="gap-9 flex flex-row ">
        <div className="left">
          <h2 className="text-5xl font-bold">{Math.round(data.main.temp)}°C</h2>
          <h4 className="mt-2">
            {data.weather[0].description
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </h4>{" "}
          <img
            alt="weather"
            className="h-22 w-20"
            src={`icons/${data.weather[0].icon}.png`}
          />
        </div>

        <div className="right">
          <div className="mt-1">
            <h5 className="font-bold">Details</h5>
          </div>

          <div className="parameter-row">
            <span className="parameter-label">Feels like: </span>
            <span className="font-bold">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>

          <div className="parameter-row">
            <span className="parameter-label">Max Temp: </span>
            <span className="font-bold">
              {Math.round(data.main.temp_max)}°C
            </span>
          </div>

          <div className="parameter-row">
            <span className="parameter-label">Min Temp: </span>
            <span className="font-bold">
              {Math.round(data.main.temp_min)}°C
            </span>
          </div>

          <div className="parameter-row">
            <span className="parameter-label">Wind: </span>
            <span className="font-bold">{Math.round(data.wind.speed)} m/s</span>
          </div>

          <div className="parameter-row">
            <span className="parameter-label">Humidity: </span>
            <span className="font-bold">
              {Math.round(data.main.humidity)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;

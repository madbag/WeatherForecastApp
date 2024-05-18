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

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="flex flex-col items-center grid-rows-1 grid-cols-2 gap-8 mt-4">
      <h2 className="text-xl font-medium">
        {data.city} - {formattedDate} {formattedTime}
      </h2>
      <div className="flex flex-row gap-11">
        <div className="left">
          <h2 className="font-bold">{Math.round(data.main.temp)}°C</h2>
          <h4>
            {data.weather[0].description
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </h4>{" "}
          <img
            alt="weather"
            className="h-24"
            src={`icons/${data.weather[0].icon}.png`}
          />
        </div>

        <div className="right">
          <div className="parameter-row">
            <h5 className="font-bold">Details</h5>
          </div>

          <div className="parameter-row">
            <span className="parameter-label">Feels like: </span>
            <span className="parameter-label">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>

          <div className="parameter-row">
            <span className="parameter-label">Max Temp: </span>
            <span className="parameter-label">
              {Math.round(data.main.temp_max)}°C
            </span>
          </div>

          <div className="parameter-row">
            <span className="parameter-label">Min Temp: </span>
            <span className="parameter-label">
              {Math.round(data.main.temp_min)}°C
            </span>
          </div>

          <div className="parameter-row">
            <span className="parameter-label">Wind: </span>
            <span className="parameter-label">
              {Math.round(data.wind.speed)}m/s
            </span>
          </div>

          <div className="parameter-row">
            <span className="parameter-label">Humidity: </span>
            <span className="parameter-label">
              {Math.round(data.main.humidity)}m/s
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;

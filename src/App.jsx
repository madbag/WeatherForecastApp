import { useState, useCallback } from "react";
import axios from "axios";
import CurrentWeather from "./Components/CurrentWeather.jsx";
import Search from "./Components/Search.jsx";
import "./index.css";

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API;

// collapses the 3-hour interval /forecast entries into one entry per day,
// preferring the midday (12:00) reading for the icon/description, and
// skips today since CurrentWeather already covers it
const buildDailyForecast = (list) => {
  const days = {};

  list.forEach((entry) => {
    const date = entry.dt_txt.split(" ")[0];
    const isMidday = entry.dt_txt.endsWith("12:00:00");

    if (!days[date]) {
      days[date] = {
        date,
        tempMin: entry.main.temp_min,
        tempMax: entry.main.temp_max,
        icon: entry.weather[0].icon,
        description: entry.weather[0].description,
      };
    } else {
      days[date].tempMin = Math.min(days[date].tempMin, entry.main.temp_min);
      days[date].tempMax = Math.max(days[date].tempMax, entry.main.temp_max);
    }

    if (isMidday) {
      days[date].icon = entry.weather[0].icon;
      days[date].description = entry.weather[0].description;
    }
  });

  const today = new Date().toISOString().split("T")[0];
  return Object.values(days)
    .filter((day) => day.date !== today)
    .slice(0, 5);
};

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const handleOnSearchChange = useCallback((searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const params = { lat, lon, appid: WEATHER_API_KEY, units: "metric" };

    axios
      .get(`${WEATHER_API_URL}/weather`, { params })
      .then((response) => {
        const weatherResponse = response.data;
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        // console.log(weatherResponse);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`${WEATHER_API_URL}/forecast`, { params })
      .then((response) => {
        setForecast(buildDailyForecast(response.data.list));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // Empty dependency array means this function is memoized once

  const handleTitleClick = () => {
    window.location.reload();
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between bg-auto"
      style={{
        backgroundImage: "url('/clouds_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col justify-center items-center flex-grow p-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-3 text-center">
            <a href="#" className="text-white" onClick={handleTitleClick}>
              AI Weather Forecast
            </a>
          </h1>
        </div>

        <div className="flex justify-items-center items-center w-full max-w-[500px] px-3 m-3 p-3 sm:m-6 sm:p-4 rounded-lg bg-white bg-opacity-20 backdrop-blur-lg ">
          <div className="ai-container">
            <Search onSearchChange={handleOnSearchChange} />
            {currentWeather && (
              <CurrentWeather data={currentWeather} forecast={forecast} />
            )}
          </div>
        </div>

        <div className="text-white mb-3 sm:text-center">
          <p className="text-center">
            <a
              href="https://github.com/madbag/WeatherForecastApp"
              target="_blank"
              rel="noreferrer"
              className="text-white-700 font-medium italic"
            >
              A project
            </a>{" "}
            by{" "}
            <a
              href="https://www.linkedin.com/in/madhushreeb/"
              target="_blank"
              rel="noreferrer"
              className="text-white-700 font-medium italic"
            >
              Madhushree 
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

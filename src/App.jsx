// import { WEATHER_API_KEY, WEATHER_API_URL } from "./Api.jsx";
import { useState } from "react";

import CurrentWeather from "./Components/CurrentWeather.jsx";
import Search from "./Components/Search.jsx";
import "./index.css";

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API;

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  console.log(currentWeather);

  return (
    <div className="h-screen bg-[#0d1829] flex justify-center items-center">
      <div className="w-7/12 flex flex-col justify-items-center items-center p-7 bg-white rounded-lg">
        <div className="max-w-4xl mt-4">
          <Search onSearchChange={handleOnSearchChange} />
        </div>

        <div>
          {currentWeather && <CurrentWeather data={currentWeather} />}
        </div>

        <div className="text-black mt-4">
          <p className="text-center">
            <a
              href="https://github.com/madbag/WeatherForecastApp"
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 font-medium"
            >
              💻 Open-source code{" "}
            </a>
            by{" "}
            <a
              href="https://www.linkedin.com/in/madhushreeb/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 font-medium"
            >
              Madhushree 🙋🏻‍♀️
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

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

  // console.log(currentWeather);

  return (
    <div
      className="h-screen max-h-full flex flex-col justify-between bg-auto"
      style={{
        backgroundImage: "url('/clouds_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex-grow flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-white mt-9 text-center">
          AI Weather Forecast
        </h1>
        <div className="flex justify-items-center items-center m-7 p-8 rounded-lg bg-white bg-opacity-20 backdrop-blur-sm">
          <div className="max-w-xl w-full">
            <Search onSearchChange={handleOnSearchChange} />
            {currentWeather && <CurrentWeather data={currentWeather} />}
          </div>
        </div>
        <div className="text-white m-6 sm:text-center">
          <p className="text-center">
            <a
              href="https://github.com/madbag/WeatherForecastApp"
              target="_blank"
              rel="noreferrer"
              className="text-white-700 font-medium "
            >
              💻 Open-source code
            </a>{" "}
            by{" "}
            <a
              href="https://www.linkedin.com/in/madhushreeb/"
              target="_blank"
              rel="noreferrer"
              className="text-white-700 font-medium"
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

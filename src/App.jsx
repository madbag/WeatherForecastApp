import { useState, useRef, useCallback } from "react";
import axios from "axios";
import CurrentWeather from "./Components/CurrentWeather.jsx";
import Search from "./Components/Search.jsx";
import "./index.css";

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API;

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  const handleOnSearchChange = useCallback((searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    axios
      .get(`${WEATHER_API_URL}/weather`, {
        params: {
          lat: lat,
          lon: lon,
          appid: WEATHER_API_KEY,
          units: "metric",
        },
      })
      .then((response) => {
        const weatherResponse = response.data;
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // Empty dependency array means this function is memoized once

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Error attempting to play audio:", error);
      });
    }
    setIsPlaying(!isPlaying);
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
      <audio ref={audioRef} src="/weather_app.mp3" loop></audio>

      <div className="flex flex-col justify-center items-center flex-grow p-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-3 text-center">
            AI Weather Forecast
          </h1>
          <button
            className="text-white text-lg items-center"
            onClick={toggleMusic}
          >
            {isPlaying ? " 🔇" : " 🔊"}
          </button>
        </div>

        <div className="flex justify-items-center items-center m-6 p-9 rounded-lg bg-white bg-opacity-20 backdrop-blur-lg">
          <div className="max-w-xl w-full">
            <Search onSearchChange={handleOnSearchChange} />
            {currentWeather && <CurrentWeather data={currentWeather} />}
          </div>
        </div>

        <div className="text-white mb-3 sm:text-center">
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

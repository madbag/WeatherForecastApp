import "./App.css";
import CurrentWeather from "./Components/CurrentWeather/CurrentWeather.jsx";
import Search from "./Components/search/Search.jsx";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./Api.jsx";
import { useState } from "react";

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
    <div className="container">
      <h1>Weather Forecast</h1>
      <div>
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
      </div>
    </div>
  );
}

export default App;

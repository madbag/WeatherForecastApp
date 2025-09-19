import { useCallback } from "react";
import CurrentWeather from "./Components/CurrentWeather";
import Search from "./Components/Search";
import { useWeather } from "./hooks/useWeather";
import "./index.css";

function App() {
  const { data: currentWeather, loading, error, getWeather } = useWeather();

  const handleOnSearchChange = useCallback(
    (searchData) => {
      const [lat, lon] = searchData.value.split(" ");
      getWeather(lat, lon, searchData.label);
    },
    [getWeather]
  );

  return (
    <div
      className="min-h-screen flex flex-col bg-cover"
      style={{ backgroundImage: "url('/clouds_bg.jpg')" }}
    >
      <div className="flex flex-col items-center justify-center flex-grow p-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mt-3">
          AI Weather Forecast
        </h1>
        <div className="m-6 p-4 rounded-lg bg-white bg-opacity-20 backdrop-blur-lg">
          <Search onSearchChange={handleOnSearchChange} />
          {loading && <p>Loading weather...</p>}
          {error && <p>{error}</p>}
          {currentWeather && <CurrentWeather data={currentWeather} />}
        </div>
      </div>
    </div>
  );
}

export default App;

import PropTypes from "prop-types";
import Forecast from "./Forecast.jsx";

export default function CurrentWeather({ data, forecast }) {
  if (
    !data ||
    !data.main ||
    !data.weather ||
    !Array.isArray(data.weather) ||
    data.weather.length === 0 ||
    !data.wind
  ) {
    return <div>Loading...</div>;
  }
  console.log("currentWeather data:", data);

  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  console.log(data);
  return (
    <div className="flex flex-col gap-4 mt-4">
      <h2 className="text-xl font-medium flex flex-col justify-start items-center text-center sm:items-start sm:text-left">
        {data.city}
        <span className="text-xs"> {formattedDate}</span>
      </h2>

      <div className="gap-4 sm:gap-9 flex flex-col items-center text-center sm:items-start sm:text-left sm:flex-row">
        <div className="left">
          <h2 className="text-4xl sm:text-5xl font-bold">
            {Math.round(data.main.temp)}°C
          </h2>
          <h4 className="capitalize text-sm">{data.weather[0].description}</h4>
          <img
            alt="weather"
            className="h-16 w-16 sm:h-24 sm:w-24"
            src={`icons/${data.weather[0].icon}.png`}
          />
        </div>

        <div className="flex flex-row gap-6 text-left sm:contents">
          <div className="right text-sm">
            <div className="mt-1">
              <h5 className="font-bold">Details</h5>
            </div>

            <div className="flex flex-col gap-1">
              <div>
                <span>Feels like: </span>
                <span className="font-bold">
                  {Math.round(data.main.feels_like)}°C
                </span>
              </div>

              <div>
                <span>Max Temp: </span>
                <span className="font-bold">
                  {Math.round(data.main.temp_max)}°C
                </span>
              </div>

              <div>
                <span>Min Temp: </span>
                <span className="font-bold">
                  {Math.round(data.main.temp_min)}°C
                </span>
              </div>

              <div>
                <span>Wind: </span>
                <span className="font-bold">
                  {Math.round(data.wind.speed)} m/s
                </span>
              </div>

              <div>
                <span>Humidity: </span>
                <span className="font-bold">
                  {Math.round(data.main.humidity)}%
                </span>
              </div>
            </div>
          </div>

          <Forecast data={forecast} />
        </div>
      </div>
    </div>
  );
}

CurrentWeather.propTypes = {
  forecast: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      tempMin: PropTypes.number.isRequired,
      tempMax: PropTypes.number.isRequired,
    })
  ),
  data: PropTypes.shape({
    city: PropTypes.string.isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      feels_like: PropTypes.number.isRequired,
      temp_min: PropTypes.number.isRequired,
      temp_max: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
    }).isRequired,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      })
    ).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

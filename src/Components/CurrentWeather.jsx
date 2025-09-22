import PropTypes from "prop-types";

export default function CurrentWeather({ data }) {
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
      <h2 className="text-xl font-medium flex flex-col justify-start">
        {data.city}
        <span className="text-xs"> {formattedDate}</span>
      </h2>

      <div className="gap-9 flex flex-row ">
        <div className="left">
          <h2 className="text-5xl font-bold">{Math.round(data.main.temp)}°C</h2>
          <h4 className="capitalize">{data.weather[0].description}</h4>{" "}
          <img
            alt="weather"
            className="h-24 w-24"
            src={`icons/${data.weather[0].icon}.png`}
          />
        </div>

        <div className="right">
          <div className="mt-1">
            <h5 className="font-bold">Details</h5>
          </div>

          <div>
            <span>Feels like: </span>
            <span className="font-bold sm:text-sm">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>

          <div>
            <span>Max Temp: </span>
            <span className="font-bold sm:text-sm">
              {Math.round(data.main.temp_max)}°C
            </span>
          </div>

          <div>
            <span>Min Temp: </span>
            <span className="font-bold sm:text-sm">
              {Math.round(data.main.temp_min)}°C
            </span>
          </div>

          <div>
            <span>Wind: </span>
            <span className="font-bold sm:text-sm">
              {Math.round(data.wind.speed)} m/s
            </span>
          </div>

          <div>
            <span>Humidity: </span>
            <span className="font-bold sm:text-sm">
              {Math.round(data.main.humidity)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

CurrentWeather.propTypes = {
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

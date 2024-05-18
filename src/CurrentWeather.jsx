
const CurrentWeather = ({ data }) => {
  return (
    <div className = "grid grid-flow-row grid-rows-1 grid-cols-2 gap-8">
      <h2>{data.city}</h2>
      <div className="left">
        <h2 className="temperature">{Math.round(data.main.temp)}°C</h2>
        <h4>{data.weather[0].description}</h4>
        <img alt="weather" src={`icons/${data.weather[0].icon}.png`} />
      </div>

      <div className="right">
        <div className="parameter-row">
          <h5 className="parameter-label">Details</h5>
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
      </div>
    </div>
  );
};

export default CurrentWeather;

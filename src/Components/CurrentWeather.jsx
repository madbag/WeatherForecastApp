const CurrentWeather = ({ data }) => {
  return (
    <div className="weatherData">
      <div className="row px-2">
        <h5>{data.weather[0].description}</h5>
        <img alt="weather" src={`icons/${data.weather[0].icon}.png`} />
      </div>

      <div className="bottom">
        <p className="temperature">{Math.round(data.main.temp)}°C</p>

        <div className="details">
          <div className="parameter-row">
            <h5 className="parameter-label">Details</h5>
          </div>

          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-label">
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>

          <div className="parameter-row">
            <span className="parameter-label">Max Temp</span>
            <span className="parameter-label">
              {Math.round(data.main.temp_max)}°C
            </span>
          </div>

          <div className="parameter-row">
            <span className="parameter-label">Min Temp</span>
            <span className="parameter-label">
              {Math.round(data.main.temp_min)}°C
            </span>
          </div>

          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-label">
              {Math.round(data.wind.speed)}m/s
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;

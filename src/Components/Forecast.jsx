import PropTypes from "prop-types";

export default function Forecast({ data }) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="text-sm">
      <h5 className="font-bold mt-1">5-Day Forecast</h5>
      <div className="flex flex-col gap-1">
        {data.map((day) => (
          <div key={day.date} className="flex items-center gap-2">
            <span className="w-8">
              {new Date(day.date).toLocaleDateString(undefined, {
                weekday: "short",
              })}
            </span>
            <span className="font-bold">{Math.round(day.tempMax)}°</span>
            <span>{Math.round(day.tempMin)}°</span>
          </div>
        ))}
      </div>
    </div>
  );
}

Forecast.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      tempMin: PropTypes.number.isRequired,
      tempMax: PropTypes.number.isRequired,
    })
  ),
};

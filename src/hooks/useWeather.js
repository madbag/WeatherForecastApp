import { useState } from "react";
import { fetchWeather } from "../api/weatherApi";

export const useWeather = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeather = async (lat, lon, city) => {
    setLoading(true);
    setError(null);
    try {
      const weatherData = await fetchWeather(lat, lon);
      setData({ city, ...weatherData });
    } catch (err) {
      setError("Failed to fetch weather.");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, getWeather };
};

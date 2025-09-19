import axios from "axios";

export const fetchWeather = async (lat, lon) => {
  const response = await axios.get(`/api/weather`, {
    params: { lat, lon },
  });
  return response.data;
};

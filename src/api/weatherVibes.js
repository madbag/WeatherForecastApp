import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getWeatherVibes = async (city) => {
  const response = await axios.post(
    BACKEND_URL,
    { text: city },
    { headers: { "Content-Type": "application/json" } }
  );
  return response.data.message;
};

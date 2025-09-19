import axios from "axios";

export const fetchChatGPTWeatherVibes = async (text) => {
  const response = await axios.post("/api/ai-weather", { text });
  return response.data.message;
};

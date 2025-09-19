import { useState } from "react";
import { fetchChatGPTWeatherVibes } from "../api/chatgptApi";

export const useChatGPT = () => {
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAnswer = async (text) => {
    setLoading(true);
    setError(null);
    try {
<<<<<<< Updated upstream
      const response = await axios.post(
        "https://ai-weather-forecast.onrender.com/",
        { text },
        { headers: { "Content-Type": "application/json" } }
      );
      setChatGPTAnswer(response.data.message.content);
=======
      const vibes = await fetchChatGPTWeatherVibes(text);
      setAnswer(vibes);
>>>>>>> Stashed changes
    } catch (err) {
      console.error("ChatGPT fetch error:", err);
      setError("AI Weather Vibes is currently unavailable.");
    } finally {
      setLoading(false);
    }
  };

  return { answer, loading, error, getAnswer };
};

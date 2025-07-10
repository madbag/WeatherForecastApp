import { useState } from "react";
import axios from "axios";

export const useChatGPT = () => {
  const [chatGPTAnswer, setChatGPTAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getChatGPTAnswer = async (text) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://ai-weather-forecast.onrender.com",
        { text },
        { headers: { "Content-Type": "application/json" } }
      );
      setChatGPTAnswer(response.data.message.content);
    } catch (err) {
      console.error("ChatGPT fetch error:", err);
      setError("AI Weather Vibes is currently unavailable.");
    } finally {
      setLoading(false);
    }
  };

  return { chatGPTAnswer, loading, error, getChatGPTAnswer };
};

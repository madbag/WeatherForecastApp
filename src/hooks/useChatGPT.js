import { useState } from "react";
import axios from "axios";

export const useChatGPT = (endpoint = "https://weatherappbe-ddvo.onrender.com") => {
  const [chatGPTAnswer, setChatGPTAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getChatGPTAnswer = async (text) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        endpoint,
        { city: text },
        { headers: { "Content-Type": "application/json" } }
      );
      setChatGPTAnswer(response.data.response);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          "AI Weather Vibes is currently unavailable."
      );
    } finally {
      setLoading(false);
    }
  };
  const reset = () => setChatGPTAnswer(null);
  return { chatGPTAnswer, loading, error, getChatGPTAnswer, reset };
};

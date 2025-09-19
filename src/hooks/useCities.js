import { useCallback } from "react";
import { fetchCities } from "../api/geoApi";

// this hook just wraps fetchCities for reuse + memoization
export const useCities = () => {
  const loadOptions = useCallback(async (inputValue) => {
    try {
      const options = await fetchCities(inputValue);
      return { options };
    } catch (error) {
      console.error("Error fetching cities:", error);
      return { options: [] };
    }
  }, []);

  return { loadOptions };
};

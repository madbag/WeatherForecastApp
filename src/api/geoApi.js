import axios from "axios";

export const fetchCities = async (inputValue) => {
  const response = await axios.get(`/api/cities`, {
    params: { namePrefix: inputValue },
  });
  return response.data.data.map((city) => ({
    value: `${city.latitude} ${city.longitude}`,
    label: `${city.name}, ${city.country}`,
  }));
};

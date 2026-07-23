import axios from "axios";

const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

const geoApiOptions = {
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

// searches for cities matching namePrefix; pass a CancelToken so callers can
// abort a stale request when the user keeps typing
export const searchCities = async (namePrefix, cancelToken) => {
  const response = await axios.get(`${GEO_API_URL}/cities`, {
    ...geoApiOptions,
    params: { minPopulation: 10000, namePrefix },
    cancelToken,
  });

  return response.data.data.map((city) => ({
    value: `${city.latitude} ${city.longitude}`,
    label: `${city.name}, ${city.country}`,
  }));
};

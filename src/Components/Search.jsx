import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import axios from "axios";
import { useChatGPT } from "../hooks/useChatGPT";
import PropTypes from "prop-types";

const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API,
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "white",
    color: "black",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "gray" : "white",
    color: "black",
    "&:hover": {
      backgroundColor: "lightgray",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black",
  }),
};

export default function Search({ onSearchChange }) {
  const [search, setSearch] = useState(null);
  const {
    chatGPTAnswer,
    loading: chatGPTLoading,
    error,
    getChatGPTAnswer,
  } = useChatGPT();

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
    getChatGPTAnswer(searchData);
  };

  const loadOptions = async (inputValue) => {
    try {
      const response = await axios.get(
        `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${inputValue}`,
        geoApiOptions
      );
      return {
        options: response.data.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.country}`,
        })),
      };
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  return (
    <div>
      <div>
        <AsyncPaginate
          styles={customStyles}
          placeholder="Search for a city"
          debounceTimeout={400}
          value={search}
          onChange={handleOnChange}
          loadOptions={loadOptions}
        />

        {!chatGPTLoading && chatGPTAnswer && (
          <div className="mt-6 max-w-xl sm:text-xs text-white-700">
            <h4 className="text-xl font-medium text-black">Weather Vibes :</h4>
            <p className="text-base text-black">{chatGPTAnswer}</p>
            <hr className="border-t border-gray-300 mt-4"></hr>
          </div>
        )}

        {chatGPTLoading && (
          <div className="mt-6 text-xl leading-8 text-gray-700">
            <p className="text-base font-medium">Weather Vibes Loading... ⏳</p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-6 text-black-700 font-medium sm:text-sm">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

Search.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
};

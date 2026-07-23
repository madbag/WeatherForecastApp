import { AsyncPaginate } from "react-select-async-paginate";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { searchCities } from "../api/geoApi";
import { getWeatherVibes } from "../api/weatherVibes";
import { customStyles } from "./Search.styles";

const STORAGE_KEY = "weatherApp:selectedCity";

const readStoredCity = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(readStoredCity);
  const [chatGPTAnswer, setChatGPTAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelTokenRef = useRef(null);

  //updates the search state and provides with searchData
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(searchData));
    onSearchChange(searchData);
    setChatGPTAnswer(null);
    setLoading(true);
  };

  //on a page reload, restore whichever city was last selected instead of
  //starting from a blank search and no weather
  useEffect(() => {
    if (search) {
      onSearchChange(search);
      fetchWeatherVibes(search.label);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //clears the selected city from the box as soon as the user starts typing
  //again, so the previous city doesn't linger while searching for a new one
  const handleInputChange = (_inputValue, { action }) => {
    if (action === "input-change" && search) {
      setSearch(null);
    }
  };

  //clears the selected city as soon as the box is focused, so clicking in
  //hides the previous city right away instead of waiting for a keystroke
  const handleFocus = () => {
    if (search) {
      setSearch(null);
    }
  };

  //get answer from Chat GPT
  const fetchWeatherVibes = async (text) => {
    setError(null);
    try {
      const message = await getWeatherVibes(text);
      setChatGPTAnswer(message);
    } catch (err) {
      console.error("Error fetching ChatGPT answer:", err);
      setError("Sorry, AI Weather Vibes is currently unavailable. 😓");
    } finally {
      setLoading(false);
    }
  };

  //fetches cities based on the user input; cancels any request still
  //in flight from a previous keystroke so stale results can't race in late
  const loadOptions = async (inputValue) => {
    cancelTokenRef.current?.cancel();
    const source = axios.CancelToken.source();
    cancelTokenRef.current = source;

    try {
      const options = await searchCities(inputValue, source.token);
      return { options };
    } catch (err) {
      if (!axios.isCancel(err)) {
        console.error("Error fetching cities:", err);
      }
      return { options: [] };
    }
  };

  return (
    <div>
      <div>
        <AsyncPaginate
          styles={customStyles}
          placeholder="Search for a city"
          debounceTimeout={600} //milliseconds
          cacheOptions
          value={search}
          onChange={(searchData) => {
            handleOnChange(searchData);
            fetchWeatherVibes(searchData.label); // Fetch ChatGPT answer when city is selected
          }}
          onInputChange={handleInputChange}
          onFocus={handleFocus}
          loadOptions={loadOptions}
        />

        {!loading && chatGPTAnswer && (
          <div className="mt-6 max-w-xl sm:text-xs text-white-700">
            <h4 className="text-xl font-medium text-black">Weather Vibes :</h4>
            <p className="text-base text-black">{chatGPTAnswer}</p>
            <hr className="border-t border-gray-300 mt-4"></hr>
          </div>
        )}

        {loading && (
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
};
Search.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
};

export default Search;

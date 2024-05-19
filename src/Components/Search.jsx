import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";

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

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const [chatGPTAnswer, setChatGPTAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  //updates the search state and provides with searchData
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
    setChatGPTAnswer(null);
    setLoading(true);
  };

  //get answer from Chat GPT
  const getChatGPTAnswer = async (text) => {
    try {
      const response = await fetch("http://localhost:8000/", {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      // console.log(data)
      setChatGPTAnswer(data.message.content);
    } catch (error) {
      console.error("Error fetching ChatGPT answer:", error);
    } finally {
      setLoading(false);
    }
  };

  //fetches cities based on the user input
  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.country}`,
            };
          }),
        };
      }) //map this to get the format we need for ASYNCPAGINATE
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div>
        <AsyncPaginate
          styles={customStyles}
          placeholder="Search for a city"
          debounceTimeout={600} //milliseconds
          value={search}
          onChange={(searchData) => {
            handleOnChange(searchData);
            getChatGPTAnswer(searchData.label); // Fetch ChatGPT answer when city is selected
          }}
          loadOptions={loadOptions}
        />

        {!loading && chatGPTAnswer && (
          <div className="mt-6 max-w-xl sm:text-xs text-black-700">
            <h4 className="text-xl font-medium">Weather Vibes :</h4>
            <p className="lg:text-base">{chatGPTAnswer}</p>
            <hr className="border-t border-gray-300 mt-4"></hr>
          </div>
        )}

        {loading && (
          <div className="mt-6 text-xl leading-8 text-gray-700">
            <p className="text-base font-medium">Weather Vibes Loading... ⏳</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;

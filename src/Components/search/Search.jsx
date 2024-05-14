import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { GEO_API_URL, geoApiOptions } from "../../Api.jsx";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const [text, setText] = useState("");

  const getCompletion = async() => {
    const response = await fetch('http://localhost:8000/', {
      method: 'POST',
      body: JSON.stringify({text: text}), 
      headers: {'Content-Type': 'application/json'}
  })
  const data = await response.json()
  console.log(data)
  }

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        //console.log(response)
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
      <AsyncPaginate
        placeholder="Search for a city"
        debounceTimeout={600} //milliseconds
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
      <p>{getCompletion()}</p>
    </div>
  );
};

export default Search;

import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { GEO_API_URL, geoApiOptions } from "../../Api.jsx"

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = (inputValue) => {
    return fetch(
      //filter out big cities & inputValue in the search change
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        //console.log(response)
        return {
          //object
          options: response.data.map((city) => {
            return {
              //array of objects
              value: `${city.latitude} ${city.longitude}`, //the weather api needs lat&lon hence, needs to be store
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
    </div>
  );
};

export default Search;

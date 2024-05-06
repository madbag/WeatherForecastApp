import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";


const Search = ({onSearchChange}) => {
  
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = (inputValue) => {
    return 
  }

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

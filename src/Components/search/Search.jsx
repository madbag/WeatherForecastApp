import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { GEO_API_URL, geoApiOptions } from "../../Api.jsx";

const Search = ({ onSearchChange }) => { 
  const [search, setSearch] = useState(null);
  const [chatGPTAnswer, setChatGPTAnswer] = useState(null);
 
//sends value of the text
  const getCompletion = async() => {
    const response = await fetch('http://localhost:8000/', {
      method: 'POST',
      body: JSON.stringify({text: text}), 
      headers: {'Content-Type': 'application/json'}
  })
  const data = await response.json()
  console.log(data)
  }

  //updates the search state and provides with searchData
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
    setChatGPTAnswer(null);
  };

  //get answer from Chat GPT
  const getChatGPTAnswer = async (city) => {
    try {
      const response = await fetch('http://localhost:8000/', {
        method: 'POST',
        body: JSON.stringify({ text: city }), // Send selected city as text
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch ChatGPT answer');
      }
      const data = await response.json();
      setChatGPTAnswer(data); // Set ChatGPT answer
    } catch (error) {
      console.error('Error fetching ChatGPT answer:', error);
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
{/* a dropdown input field that asynchronously loads options based on the input  */}
      <AsyncPaginate
        placeholder="Search for a city"
        debounceTimeout={600} //milliseconds
        value={search}
        onChange={(searchData) => {
          handleOnChange(searchData);
          getChatGPTAnswer(searchData.label); // Fetch ChatGPT answer when city is selected
        }}
        loadOptions={loadOptions}
      />
      {chatGPTAnswer && (
        <div>
          <p>{chatGPTAnswer}</p>
        </div>
      )}
    </div>
  );
};

export default Search;

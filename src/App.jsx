import "./App.css";
import Search from "./Components/Search";

function App() {
  const handleOnSearchChange = (searchData) => {
    console.log(searchData);    
  }

  return (
    <div className="container">
      <h1>Weather Forecast</h1>
      <div>
        <Search onSearchChange={handleOnSearchChange}/>
      </div>
    </div>
  );
}

export default App;

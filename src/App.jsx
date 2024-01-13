import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import axios from 'axios'

function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [recentlySearched, setRecentlySearched] = useState([]);

  const [locationList, setLocationList] = useState([]);

  // const API_KEY = 'LPnA3vnyFVKtV3LfoWIKW1aA4SyIThGK';
  const API_KEY = 'r9tfoAs2nc1HyiAW3v7AOfNtuCqrlYNe';


  const getLocationKey = async (locationString) => {
    console.log("Get Location key of:", locationString);
    
    try {
      const response = await axios.get(`https://dataservice.accuweather.com/locations/v1/search?q=${locationString}&apikey=${API_KEY}`);
      
      const newLocationList = response.data.map(data => ({ ...data }));
      
      setLocationList(newLocationList);

      console.log("Here's The Location List:", newLocationList);
    } catch (error) {
      console.log("Error Fetching Location ID!", error);
    }
  }

  // Fetch Weather
  const getWeatherData = async (locationId) => {
    try {
      console.log("Get Weather data of:",locationId );
      const response = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationId}?apikey=${API_KEY}&details=true`);
      console.log("Weather Data Received:", response.data);
      setCurrentWeather(response.data)
    } catch (error) {
      console.log("Error Fetching Weather at the Moment!", error);
      return;
    }
  }

  return (
    <div className="app">
      <Header getLocationKey={getLocationKey} getWeatherData={getWeatherData} locationList={locationList} />
      <Dashboard currentWeather={currentWeather} />
    </div>
  )
}

export default App

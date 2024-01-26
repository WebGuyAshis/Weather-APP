import { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import axios from "axios";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherNow, setWeatherNow] = useState(null);
  const [recentlySearched, setRecentlySearched] = useState([]);

  const [locationList, setLocationList] = useState([]);

  const [userLocation, setLocationData] = useState(null);

  // const API_KEY = 'LPnA3vnyFVKtV3LfoWIKW1aA4SyIThGK';
  const API_KEY = "r9tfoAs2nc1HyiAW3v7AOfNtuCqrlYNe";

  const [locationKey, setLocationKey] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserLocation = async () => {
      console.log("Getting User Location!");
      try {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              const locationResponse = await fetch(
                `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${latitude},${longitude}`
              );
              const locationData = await locationResponse.json();
              console.log("Location Data:", locationData);
              setLocationData(locationData.LocalizedName);
              setLocationKey(locationData.Key);
            },
            (error) => {
              console.error("Error getting location:", error.message);
              setError(
                "Error getting your location. Please try again or check your browser settings."
              );
            }
          );
        } else {
          console.log("Geolocation is not supported in your browser.");
          setError("Geolocation is not supported in your browser.");
        }
      } catch (error) {
        console.error("Error:", error.message);
        setError("Error fetching location data from AccuWeather API.");
      }
    };

    getUserLocation();
  }, []);

  const getLocationKey = async (locationString) => {
    console.log("Get Location key of:", locationString);

    try {
      const response = await axios.get(
        `https://dataservice.accuweather.com/locations/v1/search?q=${locationString}&apikey=${API_KEY}`
      );

      const newLocationList = response.data.map((data) => ({ ...data }));

      setLocationList(newLocationList);

      console.log("Here's The Location List:", newLocationList);
    } catch (error) {
      console.log("Error Fetching Location ID!", error);
    }
  };

  // Fetch Weather
  const getWeatherData = async (locationId, locationName) => {
    try {
      console.log("Get Weather data of:", locationId, locationName);
      const response = await axios.get(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationId}?apikey=${API_KEY}&details=true`
      );
      console.log("Weather Data Received:", response.data);
      let data = { ...response.data };
      data.place = locationName;
      setCurrentWeather(data);
    } catch (error) {
      console.log("Error Fetching Weather at the Moment!", error);
      return;
    }
  };

  const getCurrentWeather = async (locationKey) => {
    try {
      console.log("Fetching One Hour Data:", locationKey);
      const response = await axios.get(
        `https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${locationKey}/?apikey=${API_KEY}&details=true`
      );
      console.log("Data Recieved!", response.data[0]);
      setWeatherNow(response.data[0]);
    } catch (error) {
      console.log("Error Fetching Weather!", error);
      return null;
    }
  };

  return (
    <div className="app">
      <Header
        getLocationKey={getLocationKey}
        getWeatherData={getWeatherData}
        locationList={locationList}
        getCurrentWeather={getCurrentWeather}
      />
      <Dashboard
        getLocationKey={getLocationKey}
        getWeatherData={getWeatherData}
        locationList={locationList}
        currentWeather={currentWeather}
        userLocation={userLocation}
        getCurrentWeather={getCurrentWeather}
        weatherNow={weatherNow}
      />
    </div>
  );
}

export default App;

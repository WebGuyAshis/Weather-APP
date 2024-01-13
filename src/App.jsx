import './App.css'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import axios from 'axios'

function App() {

  // For Location Key
  const getLocationKey = async(locationString) => {
    const API_KEY = 'LPnA3vnyFVKtV3LfoWIKW1aA4SyIThGK';

    try {
      const response = await axios.get(`GET http://dataservice.accuweather.com/locations/v1/search?q=${locationString}&apikey=${API_KEY};`);
      console.log("Heres The Location String:", response);
    } catch (error) {
        console.log("Error Fetching Location ID!", error);
        return;
    }
  }

  return (
    <div className="app">
      <Header getLocationKey={getLocationKey} />
      <Dashboard />
    </div>
  )
}

export default App

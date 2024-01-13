import { useEffect, useState } from 'react';
import '../assets/css/dashboard.css'
import sunnyImg from '../assets/images/sunny.png'
import Days from './Days';
const Dashboard = ({currentWeather}) => {
    const storedWeatherData = localStorage.getItem("weatherData");
    const initialSavedWeatherData = storedWeatherData ? JSON.parse(storedWeatherData) : null;
    
    const [savedWeatherData, setSavedWeatherData] = useState(initialSavedWeatherData);
    const [importantWeatherData, setImportantWeatherData] = useState(null);
    
    // Function to convert Fahrenheit to Celsius
    const convertToFahrenheit = (fahrenheit) => {
      return parseInt(Math.round(((fahrenheit - 32) * 5) / 9));
    };
    
    // Function to format date as "13th Jan"
    const formatDate = (dateString) => {
      const dateObject = new Date(dateString);
      const day = dateObject.getDate();
      const month = dateObject.toLocaleString('en-us', { month: 'short' });
      return `${day}${day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th'} ${month}`;
    };
    
    useEffect(() => {
      // Populate importantWeatherData with data from savedWeatherData
      if (savedWeatherData) {
        const importantData = savedWeatherData.DailyForecasts.map(day => ({
          date: formatDate(day.Date),
          sunrise: day.Sun.Rise,
          sunset: day.Sun.Set,
          minTempCelsius: convertToFahrenheit(day.Temperature.Minimum.Value),
          maxTempCelsius: convertToFahrenheit(day.Temperature.Maximum.Value),
          minTempFahrenheit: day.Temperature.Minimum.Value,
          maxTempFahrenheit: day.Temperature.Maximum.Value,
          humidity: day.Day.RelativeHumidity.Average,
          airQuality: day.AirAndPollen.find(item => item.Name === 'AirQuality').Value,
          uvIndex: day.AirAndPollen.find(item => item.Name === 'UVIndex').Value,
          windSpeed: day.Day.Wind.Speed.Value,
          windDirection: day.Day.Wind.Direction.English,
        }));
    
        console.log("Important Data:", importantData);
        setImportantWeatherData(importantData);
      }


    }, [savedWeatherData]);
    
    useEffect(() => {
        console.log("Usefffect Running");
      if (currentWeather && savedWeatherData !== currentWeather) {
        // Check if saved WeatherData is not present in localStorage or if currentWeather is different and non-empty
        if (!savedWeatherData || Object.keys(currentWeather).length > 0) {
          localStorage.setItem("weatherData", JSON.stringify(currentWeather));
          setSavedWeatherData(currentWeather);
        }
      }
    }, [currentWeather, savedWeatherData]);
    
    return (
        <div className="dashboard-container">
            {/* Left Side of Dashboard */}
            <div className="left-dashboard">
                <div className="todays-weather">
                    {/* <div className="scroller">
                        ...
                    </div> */}

                    <img src={sunnyImg} alt="" className="weather-img" />
                    <p className='today-date'>
                        Today, {importantWeatherData ? importantWeatherData[0].date: "Loading..."}
                    </p>
                    <p className='weather-condition'>Sunny</p>
                    <h1 className='temperature'>
                        {importantWeatherData ? importantWeatherData[0].minTempCelsius: "..."}&#176;/
                        {importantWeatherData ? importantWeatherData[0].maxTempCelsius: "..."}&#176;</h1>

                </div>

                <ul className="recently-viewed-list">
                    <li className="recent-viewed-item">
                        Recently
                    </li>
                    <li className="recent-viewed-item">
                        Recently
                    </li>
                </ul>
            </div>
            {/* Right side */}
            <div className="right-dashboard">
                <div className="week-view">
                    <h3>5 Days Forecast</h3>
                    <ul className="days-list">
                        {importantWeatherData && importantWeatherData.map((day, index)=>{
                            return(
                                <Days key={index} day={day}/>
                            )
                        })}
                    </ul>
                </div>

                <div className="weather-data">
                    <h3>Today's Highlights</h3>
                    <div className="weather-data-widgets">
                        <div className="widget-blocks">
                            <div className="widgets">
                                <h4>UV Index</h4>
                                <h1>{importantWeatherData && importantWeatherData[0].uvIndex}</h1>
                            </div>
                            <div className="widgets">
                                <h4>Humidity</h4>
                                <h1>{importantWeatherData && importantWeatherData[0].humidity}</h1>

                            </div>
                            <div className="widgets">
                                <h4>Air Quality</h4>
                                <h1>{importantWeatherData && importantWeatherData[0].airQuality}</h1>

                            </div>

                            <div className="widgets">
                                <h4>Wind Status</h4>
                                <span><b>{importantWeatherData && importantWeatherData[0].windSpeed}</b></span>
                                <span>mi/h</span>
                                <p>D: {importantWeatherData && importantWeatherData[0].windDirection}</p>
                            </div>
                        </div>

                        <div className="sunrise-sunset">
                            <h4>Sunrise & Sunset</h4>

                            {/* Bookmarked Data */}
                            <div className="my-sunset-sunrise">
                                <h4>
                                    {/* Location Icon */}
                                    Kolkata
                                </h4>
                                {/* Sunrise SUnset Data */}
                                <div className="my-sunset-sunrise-data">
                                    <div className="sunrise">
                                        <img src="" alt="" className="sunrise-img" />
                                        <div className="sunrise-data">
                                            <p>Sunrise</p>
                                            <h5>4:40AM</h5>
                                        </div>
                                    </div>
                                    <div className="sunset">
                                        <img src="" alt="" className="sunrise-img" />
                                        <div className="sunrise-data">
                                            <p>Sunrise</p>
                                            <h5>4:40AM</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <ul className="nearby-records">
                                <li className='nearby-records-data'>
                                    <span>
                                        {/* Location Icon */}
                                        California
                                    </span>

                                    <span>
                                        {/* Surise Icon */}
                                        5:00 AM
                                    </span>

                                    <span>
                                        {/* Sunset Icon */}
                                        7:00pm
                                    </span>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
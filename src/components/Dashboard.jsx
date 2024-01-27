import { useEffect, useState } from "react";
import "../assets/css/dashboard.css";
import Days from "./Days";
import PopupBox from "./PopupBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

import sunnyImg from "../assets/images/sunny.png";
import sunnyHaze from "../assets/images/hazySun.png";
import sunCloudy from "../assets/images/sunClouds.png";
import sunRain from "../assets/images/sunnyRain.png";
import rainImg from "../assets/images/rainCloudy.png";
import thunderstormImg from "../assets/images/thunderstorm.png";
import moonImg from "../assets/images/Moon.png";
import moonCloudy from "../assets/images/cloudyMoon.png";
import snowImg from "../assets/images/cloudySnow.png";

const Dashboard = ({
    getLocationKey,
    getWeatherData,
    locationList,
    currentWeather,
    userLocation,
    getCurrentWeather,
    weatherNow,
}) => {
    const storedWeatherData = localStorage.getItem("weatherData");
    const initialSavedWeatherData = storedWeatherData
        ? JSON.parse(storedWeatherData)
        : null;

    const [savedWeatherData, setSavedWeatherData] = useState(
        initialSavedWeatherData
    );
    const [importantWeatherData, setImportantWeatherData] = useState(null);
    const [closePopup, setClosePopup] = useState(true);

    // Function to convert Fahrenheit to Celsius
    const convertToCelcius = (fahrenheit) => {
        return parseInt(Math.round(((fahrenheit - 32) * 5) / 9));
    };

    // Function to format date as "13th Jan"
    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);
        const day = dateObject.getDate();
        const month = dateObject.toLocaleString("en-us", { month: "short" });
        return `${day}${day % 10 === 1 && day !== 11
            ? "st"
            : day % 10 === 2 && day !== 12
                ? "nd"
                : day % 10 === 3 && day !== 13
                    ? "rd"
                    : "th"
            } ${month}`;
    };
    function formatTime(timeString) {
        const dateObject = new Date(timeString);
        return dateObject.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    }
    useEffect(() => {
        // Populate importantWeatherData with data from savedWeatherData
        if (savedWeatherData) {
            const importantData = savedWeatherData.DailyForecasts.map((day) => ({
                place: savedWeatherData.place,
                date: formatDate(day.Date),
                sunrise: formatTime(day.Sun.Rise),
                sunset: formatTime(day.Sun.Set),
                minTempCelsius: convertToCelcius(day.Temperature.Minimum.Value),
                maxTempCelsius: convertToCelcius(day.Temperature.Maximum.Value),
                minTempFahrenheit: day.Temperature.Minimum.Value,
                maxTempFahrenheit: day.Temperature.Maximum.Value,
                humidity: day.Day.RelativeHumidity.Average,
                // airQuality: day.AirAndPollen.find(item => item.Name === 'AirQuality').Value,
                hoursOfSun: day.HoursOfSun,
                uvIndex: day.AirAndPollen.find((item) => item.Name === "UVIndex").Value,
                windSpeed: day.Day.Wind.Speed.Value,
                windDirection: day.Day.Wind.Direction.English,
                dayDesc: day.Day.LongPhrase,
                nightDesc: day.Night.LongPhrase,
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
    const [weatherImg, setWeatherImg] = useState(null);
    useEffect(() => {
        if (weatherNow) {
            let iconPhrase = weatherNow.IconPhrase.toLowerCase();

            if (iconPhrase.includes("sunny")) {
                setWeatherImg(sunnyImg);
            } else if (
                iconPhrase.includes("moon") ||
                iconPhrase.includes("moonlight")
            ) {
                setWeatherImg(moonImg);
            } else if (iconPhrase.includes("cloudy")) {
                setWeatherImg(sunCloudy);
            } else if (iconPhrase.includes("haze") || iconPhrase.includes("hazy")) {
                // Set the hazy sun image
                setWeatherImg(sunnyHaze);
            } else if (
                iconPhrase.includes("rain") ||
                iconPhrase.includes("showers")
            ) {
                // Set the rain image
                setWeatherImg(sunRain);
            } else if (iconPhrase.includes("thunderstorm")) {
                // Set the thunderstorm image
                setWeatherImg(thunderstormImg);
            } else if (iconPhrase.includes("snow")) {
                // Set the snow image
                setWeatherImg(snowImg);
            } else {
                // Default image if no match
                setWeatherImg(sunnyImg);
            }
        }
    }, [weatherNow]);

    return (
        <div className="dashboard-container">
            {closePopup && (
                <PopupBox
                    getLocationKey={getLocationKey}
                    getWeatherData={getWeatherData}
                    locationList={locationList}
                    setClosePopup={setClosePopup}
                    userLocation={userLocation}
                    getCurrentWeather={getCurrentWeather}
                />
            )}

            {/* Left Side of Dashboard */}
            <div className="left-dashboard">
                <div className="todays-weather">
                    {/* <div className="scroller">
                        ...
                    </div> */}
                    <h2 className="todays-weather-heading">
                        <span>
                            <FontAwesomeIcon icon={faLocationDot} />
                        </span>
                        {importantWeatherData && importantWeatherData[0].place}
                    </h2>
                    <img
                        src={weatherImg ? weatherImg : sunnyImg}
                        alt=""
                        className="weather-img"
                    />
                    <p className="today-date">
                        Today,{" "}
                        {importantWeatherData ? importantWeatherData[0].date : "Fetching..."}
                    </p>
                    <p className="weather-condition">
                        {weatherNow ? weatherNow.IconPhrase : "Fetching..."}
                    </p>
                    {weatherNow
                        ? (<h1 className="temperature">{convertToCelcius(weatherNow.Temperature.Value)}°C</h1>)
                        : (<span>Fetching...</span>)}
                </div>

                <div className="todays-desc">
                    <h3>Description</h3>
                    <div className="description-data">
                        <div className="day-desc-data">
                            <h4>Day</h4>
                            <p>
                                {importantWeatherData ? importantWeatherData[0].dayDesc : "Fetching..."}
                            </p>
                        </div>

                        <div className="night-dec-data">
                            <h4>Night</h4>
                            <p>
                                {importantWeatherData
                                    ? importantWeatherData[0].nightDesc
                                    : "Fetching..."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Right side */}

            <div className="right-dashboard">
                <div className="week-view">
                    <h3>5 Days Forecast</h3>
                    <ul className="days-list">
                        {importantWeatherData &&
                            importantWeatherData.map((day, index) => {
                                return <Days key={index} day={day} />;
                            })}
                    </ul>
                </div>

                <div className="weather-data">
                    <h3>Today's Highlights</h3>
                    <div className="weather-data-widgets">
                        <div className="widget-blocks">
                            <div className="widgets">
                                <h4>UV Index</h4>
                                {importantWeatherData ? (<h1>{importantWeatherData[0].uvIndex}</h1>) : (<span>Fetching...</span>)}
                            </div>
                            <div className="widgets">
                                <h4> Humidity</h4>
                                {weatherNow ? (
                                    <h1>{weatherNow.RelativeHumidity}%</h1>
                                ) : (
                                    <span>Fetching...</span>
                                )}
                            </div>
                            <div className="widgets">
                                <h4>Hours Of Sun</h4>
                                <span>
                                    <b>
                                        {importantWeatherData && importantWeatherData[0].hoursOfSun}
                                    </b>
                                </span>
                                <span>
                                    <strong>hours</strong>
                                </span>
                            </div>

                            <div className="widgets">
                                <h4>Wind Status</h4>
                                <span>
                                    {weatherNow ? (
                                        <b>{weatherNow.Wind.Speed.Value}</b>
                                    ) : (
                                        "Fetching..."
                                    )}
                                </span>
                                <span>
                                    <strong>
                                        {" "}
                                        {weatherNow ? weatherNow.Wind.Speed.Unit : "Fetching..."}
                                    </strong>
                                </span>
                                <p>
                                    D:
                                    {weatherNow
                                        ? weatherNow.Wind.Direction.English
                                        : "Fetching..."}
                                </p>
                            </div>
                        </div>

                        <div className="sunrise-sunset">
                            <h4>Sunrise & Sunset</h4>

                            {/* Bookmarked Data */}
                            <div className="my-sunset-sunrise">
                                <h4>
                                    {/* Location Icon */}
                                    {importantWeatherData && importantWeatherData[0].place}
                                </h4>
                                {/* Sunrise SUnset Data */}
                                <div className="my-sunset-sunrise-data">
                                    <div className="sunrise">
                                        <img src="" alt="" className="sunrise-img" />
                                        <div className="sunrise-data">
                                            <p>Sunrise</p>
                                            {importantWeatherData ? (
                                                <h5>{importantWeatherData[0].sunrise}</h5>
                                            ) : (
                                                <span>Fetching...</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="sunset">
                                        <img src="" alt="" className="sunrise-img" />
                                        <div className="sunrise-data">
                                            <p>Sunset</p>
                                            {importantWeatherData ? (
                                                <h5>{importantWeatherData[0].sunset}</h5>
                                            ) : (
                                                <span>Fetching...</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <ul className="additional-records">
                                <li className="additional-data">
                                    <strong>RealFeel Temperature : </strong>
                                    <span>
                                        {" "}
                                        {weatherNow
                                            ? `${convertToCelcius(
                                                weatherNow.RealFeelTemperature.Value
                                            )}°C`
                                            : "Fetching..."}
                                    </span>
                                </li>

                                <li className="additional-data">
                                    <strong>Snow Probability : </strong>
                                    <span>
                                        {weatherNow ? weatherNow.SnowProbability : "Fetching..."}
                                    </span>
                                </li>

                                <li className="additional-data">
                                    <strong>Rain Probability : </strong>
                                    <span>
                                        {" "}
                                        {weatherNow ? weatherNow.RainProbability : "Fetching..."}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

import '../assets/css/days.css'
import sunnyImg from "../assets/images/sunny.png";
import sunnyHaze from '../assets/images/hazySun.png';
import sunCloudy from '../assets/images/sunClouds.png'
import sunRain from '../assets/images/sunnyRain.png'
import rainImg from '../assets/images/rainCloudy.png'
import thunderstormImg from '../assets/images/thunderstorm.png'
import moonImg from '../assets/images/Moon.png'
import moonCloudy from '../assets/images/cloudyMoon.png'
import snowImg from '../assets/images/cloudySnow.png'
import { useState, useEffect } from 'react';

const Days = ({day})=>{
    const [weatherImg, setWeatherImg] = useState(null)
    useEffect(() => {
        if (day) {
            let iconPhrase = day.dayDesc.toLowerCase();

            if (iconPhrase.includes("sunny")) {
                setWeatherImg(sunnyImg);
            }else if (iconPhrase.includes("cloudy") && iconPhrase.includes("moon"))  {
                setWeatherImg(moonCloudy);
            } else if (iconPhrase.includes("moon") || iconPhrase.includes("moonlight")) {
                setWeatherImg(moonImg);
            } else if (iconPhrase.includes("cloudy")) {
                setWeatherImg(sunCloudy);
            } else if (iconPhrase.includes("haze") || iconPhrase.includes("hazy")) {
                // Set the hazy sun image
                setWeatherImg(sunnyHaze);
            } else if (iconPhrase.includes("rain") || iconPhrase.includes("showers")) {
                // Set the rain image
                setWeatherImg(rainImg);
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
    }, [day]);
    return(
        <div className="days-container">
            <img src={weatherImg && weatherImg} alt="" className='weather-day-img' />
            <h4 style={{textAlign:"center"}}>{day.date}</h4>
            <p>{day.maxTempCelsius}&#176;/{day.minTempCelsius}&#176;</p>
        </div>
    )
}

export default Days;

import '../assets/css/popupbox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faL, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Search from 'antd/es/input/Search';
const PopupBox = ({ getLocationKey, getWeatherData, locationList, setClosePopup, userLocation }) => {

    const [suggestions, setSuggestions] = useState(false);
    let delaySearch;
    const handleLocationSearch = (e) => {
        const searchValue = e.target.value;
        clearInterval(delaySearch);

        delaySearch = setTimeout(() => {
            if (searchValue !== "") {
                setSuggestions(true);
            } else {
                setSuggestions(false)
            }
            console.log(searchValue);
            getLocationKey(searchValue)
        }, 1000)
    }

    useEffect(() => {
        // Perform actions when locationList is updated
        if (locationList.length > 0) {
            console.log("Location List Of 0", locationList);
            getWeatherData(locationList[0].Key, userLocation);
            setClosePopup(false);
        }
    }, [locationList]);

    return (
        <div className="popup-container">
            <div className="popup-box">
                {/* Close Box Btn */}
                <div className="close-popup-box" onClick={() => { setClosePopup(false) }}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                <label htmlFor="popup-input">
                    <h1>
                        City forecast adventure starts now!
                        <br />
                        Type your city for the forecast. ☀️🌧️
                    </h1>
                </label>
                <h3 style={{ textAlign: "center", color: "grey" }}>Your Location: {userLocation ? userLocation : "Detecting your location..."} </h3>
                <h3 className='detect-loc'>Continue with the detected Location? <button onClick={()=>{
                    getLocationKey(userLocation);
                }} >Yes</button></h3>
                <div className="popup-input-container">
                    <input type="text" id='popup-input' onChange={handleLocationSearch} />
                    {/* <button>Search</button> */}

                    {/* <ul className="popup-list-suggestion">

                    </ul> */}
                    {suggestions && (
                        <ul className="popup-list-suggestion">
                            {locationList.length > 0 ? (
                                locationList.map((location, index) => (
                                    <li key={index} className='popup-list-suggestion-items' onClick={() => {
                                        setClosePopup(false)
                                        setSuggestions(false)
                                        getWeatherData(location.Key, location.LocalizedName);
                                    }}>{location.LocalizedName}, {location.AdministrativeArea.LocalizedName}, {location.Country.EnglishName}</li>
                                ))
                            ) : (
                                <li className="search-results-items">
                                    Loading...
                                </li>
                            )}
                        </ul>
                    )}


                </div>
            </div>
        </div>
    )
}

export default PopupBox;
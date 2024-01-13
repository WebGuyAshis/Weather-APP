import { useState } from 'react'
import '../assets/css/header.css'
import { Switch } from 'antd'
const Header = () => {

    // State for Temperature Format
    const [isCelcius, setIsCelcius] = useState(true)
    // Day Night Mode
    const [isNightMode, setIsNightMode] = useState(false)

    // Handling Day/ Night Mode
    const handleNightMode = () => {
        setIsNightMode(!isNightMode)
    }

    // Handling celcius and Fahrenheit 
    const handleCelciusFahre = (format) => {
        if (format === "Celcius") {
            setIsCelcius(true)
        } else {
            setIsCelcius(false)
        }
    }

    return (
        <div className="header-container">
            <div className="input-container">
                <button>S</button>
                <input type="text" placeholder="Search" />
            </div>

            <div className='right-side-header'>
                <div className="cel-fah-btns">
                    <div className={`fah-btn ${isCelcius ? 'active-format' : ''}`} onClick={() => { handleCelciusFahre("Celcius") }}>
                        C
                    </div>
                    <div className={`cel-btn ${isCelcius ? '' : 'active-format'}`}
                        onClick={() => { handleCelciusFahre("Fahrenheit") }}>
                        F
                    </div>

                </div>

                {/* Toggler */}
                <Switch checkedChildren="Day" unCheckedChildren="Night" onChange={handleNightMode} />
            </div>
        </div>
    )
}

export default Header;
import '../assets/css/days.css'
import sunnyImg from '../assets/images/sunny.png'

const Days = ({day})=>{
    return(
        <div className="days-container">
            <img src={sunnyImg} alt="" className='weather-day-img' />
            <p>{day.date}</p>
            <p>{day.maxTempCelsius}&#176;/{day.minTempCelsius}&#176;</p>
        </div>
    )
}

export default Days;

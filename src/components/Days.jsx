import '../assets/css/days.css'
import sunnyImg from '../assets/images/sunny.png'

const Days = ()=>{
    return(
        <div className="days-container">
            <img src={sunnyImg} alt="" className='weather-day-img' />
            <p>Mon</p>
            <p>17&#176;</p>
        </div>
    )
}

export default Days;

import '../assets/css/dashboard.css'
import sunnyImg from '../assets/images/sunny.png'
import Days from './Days';
const Dashboard = () => {
    return (
        <div className="dashboard-container">
            {/* Left Side of Dashboard */}
            <div className="left-dashboard">
                <div className="todays-weather">
                    <div className="scroller">
                        ...
                    </div>

                    <img src={sunnyImg} alt="" className="weather-img" />
                    <p className='today-date'>
                        Today, 13th Jan
                    </p>
                    <p className='weather-condition'>Sunny</p>
                    <h1 className='temperature'>36&#176;</h1>
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
                    <h3>Week</h3>
                    <ul className="days-list">
                        <Days />
                    </ul>
                </div>

                <div className="weather-data">
                    <h3>Today's Highlights</h3>
                    <div className="weather-data-widgets">
                        <div className="widget-blocks">
                            <div className="widgets">
                                <h4>UV Index</h4>
                            </div>
                            <div className="widgets">
                                <h4>Humidity</h4>
                            </div>
                            <div className="widgets">
                                <h4>Air Quality</h4>

                            </div>

                            <div className="widgets">
                                <h4>Wind Status</h4>

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
import { useState, useEffect } from 'react';
import '../src/assets/css/connectionChecker.css'
import offlineImg from '../src/assets/images/no-internet.png'
const ConnectionChecker = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    const checkConnection = () => {
        setIsOnline(navigator.onLine);
    };

    useEffect(() => {
        const intervalId = setInterval(checkConnection, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div>
            {isOnline ? (
                <p className='user-online'>Online</p>
            ) : (
                <div className='user-offline'>
                    <div className="offline-data">
                        <img src={offlineImg} alt="offIcon" />

                        <div>
                            <h3>No Internet Connection</h3>
                            <p>Please Check your Internet Connection and Try Again!</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConnectionChecker;

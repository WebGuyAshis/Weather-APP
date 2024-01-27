import { useState, useEffect } from 'react';
import '../src/assets/css/connectionChecker.css'
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
        <p>Online</p>
      ) : (
        <p style={{ color: 'red' }}>Offline - Please check your internet connection</p>
      )}
    </div>
  );
};

export default ConnectionChecker;

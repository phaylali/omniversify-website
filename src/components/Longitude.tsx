
import { useState, useEffect } from 'react';

function ISSLongitude() {
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    async function getISSLongitude() {
      try {
        const response = await fetch('http://api.open-notify.org/iss-now.json');
        const data = await response.json();
        setLongitude(data.iss_position.longitude);
      } catch (error) {
        console.error(error);
      }
    }

    getISSLongitude();
    const intervalId = setInterval(() => {
      getISSLongitude();
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {longitude ? (
        <p>Lng: {longitude}</p>
      ) : (
        <p>Lng: Computing...</p>
      )}
    </div>
  );
}

export default ISSLongitude;
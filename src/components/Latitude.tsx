
import { useState, useEffect } from 'react';

function ISSLatitude() {
  const [latitude, setLatitude] = useState(null);

  useEffect(() => {
    async function getISSLatitude() {
      try {
        const response = await fetch('http://api.open-notify.org/iss-now.json');
        const data = await response.json();
        setLatitude(data.iss_position.latitude);
      } catch (error) {
        console.error(error);
      }
    }


    getISSLatitude();
    const intervalId = setInterval(() => {
      getISSLatitude();
    }, 1000);

    return () => clearInterval(intervalId);


  }, []);

  return (
    <div>
      {latitude ? (
        <p>Lat: {latitude}</p>
      ) : (
        <p>Lat: Computing...</p>
      )}
    </div>
  );
}

export default ISSLatitude;
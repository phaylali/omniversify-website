import { useState, useEffect } from "react";

function Speed()  {
  const [speed, setSpeed] = useState(null);
  useEffect(() => {
    async function getSpeed() {
      try {
        const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
        const data = await response.json();
        setSpeed(data.velocity);
      } catch (error) {
        console.error(error);
      }
    }

    

    getSpeed();
    const intervalId = setInterval(() => {
      getSpeed();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  
  const speedo = new String(speed).substring(0,8) 
  return (
    
    <div>
   
      {speed ? (
        <p>Spd: {speedo} km/h</p>
      ) : (
        <p>Spd: Computing...</p>
      )}
    </div>
  );
};

export default Speed;
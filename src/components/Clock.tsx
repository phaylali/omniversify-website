import { useState, useEffect } from 'react';
import moment from 'moment';


function Clock() {
  const [currentTime, setCurrentTime] = useState(
    moment(new Date().toUTCString()).format("hh:mm:ss")
    
);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(moment(new Date().toUTCString()).format("hh:mm:ss"));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      Time: {currentTime}
    </div>
  );
}

export default Clock;
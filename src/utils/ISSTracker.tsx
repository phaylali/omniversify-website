import React, { useState, useEffect } from 'react';

export function useISSData() {
  const [latitude, setLatitude] = useState('0');
  const [longitude, setLongitude] = useState('0');
  const [speed, setSpeed] = useState('0');
  const [utcTime, setUtcTime] = useState('');

  useEffect(() => {
    const fetchISSData = async () => {
      try {
        const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
        const data = await response.json();
        setLatitude(data.latitude.toFixed(4));
        setLongitude(data.longitude.toFixed(4));
        setSpeed(data.velocity.toFixed(2));
        
        // Format UTC time to HH:MM:SS
        const now = new Date();
        setUtcTime(now.toUTCString().split(' ')[4]);
      } catch (error) {
        console.error('Error fetching ISS data:', error);
      }
    };

    fetchISSData();
    const interval = setInterval(fetchISSData, 1000);

    return () => clearInterval(interval);
  }, []);

  return { latitude, longitude, speed, utcTime };
}

export function ISSDataProvider({ children }: { children: React.ReactNode }) {
  const { latitude, longitude, speed, utcTime } = useISSData();

  useEffect(() => {
    const event = new CustomEvent('iss-data-update', {
      detail: { latitude, longitude, speed, utcTime }
    });
    document.dispatchEvent(event);
  }, [latitude, longitude, speed, utcTime]);

  return <>{children}</>;
}
import { useState, useEffect } from "react";


function HealthBar() {
  const [health, setHealth] = useState(100);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHealth((prevHealth) => prevHealth - 1);
    }, 500); // Update health every minute

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex justify-between w-full">
      {health > 0 ? (
        <>
          <div
            className={`bg-teal-300 h-6 transition-width duration-500 flex items-center`}
            style={{ width: `${health}%` }}
          ></div>
          <h1 className="  text-center  text-black text-lg h-6 text-bold absolute ml-2 mb-2 pt-0">
            {health}%
          </h1>
        </>
      ) : (<div className="center-items  items-center self-center text-teal-300">
        <center><h2 className="center-item">YDK F ZEB!</h2></center>
        <center><p>GO TOUCH SOME GRASS.</p></center>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><img src="https://i.ytimg.com/vi/4H6ng8fdvB8/maxresdefault.jpg" alt="HOW TO TOUCH GRASS" /></a>
      </div>
        
      )}
      
    </div>
  );
}

export default HealthBar;

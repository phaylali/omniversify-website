


import { useState, useEffect } from "react";

function HealthBar() {
  const [health, setHealth] = useState(100);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHealth((prevHealth) => prevHealth - 1);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const createStrips = () => {
    const strips = [];
    for (let i = 0; i < health; i++) {
      strips.push(
        <div
          key={i}
          className="h-6 w-[0.4%] bg-teal-300 mr-[1px] transform skew-x-[-15deg]"
        ></div>
      );
    }
    return strips;
  };

  return (
    <div className="flex justify-between w-full">
      {health > 0 ? (
        <>
          <div className="flex w-full transform skew-x-[-15deg]">
            {createStrips()}
          </div>
          
        </>
      ) : (
        <div className="center-items items-center self-center text-teal-300">
          <center><h2 className="center-item">YDK F ZEB!</h2></center>
          <center><p>GO TOUCH SOME GRASS.</p></center>
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
            <img src="https://i.ytimg.com/vi/4H6ng8fdvB8/maxresdefault.jpg" alt="HOW TO TOUCH GRASS" />
          </a>
        </div>
      )}
    </div>
  );
}

export default HealthBar;

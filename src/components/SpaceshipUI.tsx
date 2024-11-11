import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface SpaceshipStats {
  health: number;
  speed: number;
  latitude: number;
  longitude: number;
  altitude: number;
  fuel: number;
  oxygen: number;
  energy: number;
  temperature: number;
}

const planets = [
    { name: 'Mars', distance: '225M KM', temp: '-63°C', atmosphere: 'Thin CO2' },
    { name: 'Venus', distance: '38M KM', temp: '462°C', atmosphere: 'Dense CO2' },
    { name: 'Jupiter', distance: '628M KM', temp: '-110°C', atmosphere: 'H2/He' },
    { name: 'Saturn', distance: '1.2B KM', temp: '-140°C', atmosphere: 'H2/He' },
    { name: 'Neptune', distance: '4.3B KM', temp: '-214°C', atmosphere: 'H2/He/CH4' },
    { name: 'Mercury', distance: '77.3M KM', temp: '167°C', atmosphere: 'Minimal' },
    { name: 'Uranus', distance: '2.9B KM', temp: '-195°C', atmosphere: 'H2/He/CH4' },
    { name: 'Pluto', distance: '5.9B KM', temp: '-230°C', atmosphere: 'Thin N2' },
    { name: 'Europa', distance: '628.3M KM', temp: '-160°C', atmosphere: 'Trace O2' },
    { name: 'Titan', distance: '1.2B KM', temp: '-179°C', atmosphere: 'N2/CH4' },
    { name: 'Io', distance: '628.3M KM', temp: '-130°C', atmosphere: 'SO2' },
    { name: 'Ganymede', distance: '628.3M KM', temp: '-160°C', atmosphere: 'Thin O2' }
  ];
  

export default function SpaceshipUI() {
  const [radarDot, setRadarDot] = useState({ x: 0, y: 0, visible: false });
  const [scanAngle, setScanAngle] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanAngle((prev) => (prev + 1) % 360);
    }, 11.11); // 4 seconds for full rotation (4000ms / 360deg)

    return () => clearInterval(scanInterval);
  }, []);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!radarDot.visible && Math.random() > 0.999) { // Only 0.1% chance now
      const angle = (scanAngle + 10) * (Math.PI / 180);
      const radius = Math.random() * 0.8;
      const x = Math.cos(angle) * radius * 100;
      const y = Math.sin(angle) * radius * 100;
      
      setRadarDot({ x, y, visible: true });
      if (!isMuted) {
        audioRef.current?.play();
      }
  
      setTimeout(() => {
        setRadarDot(prev => ({ ...prev, visible: false }));
      }, 2000);
    }
  }, [scanAngle]);

  const [stats, setStats] = useState<SpaceshipStats>({
    health: 100,
    speed: 25000,
    latitude: 0,
    longitude: 0,
    altitude: 350000,
    fuel: 85,
    oxygen: 98,
    energy: 92,
    temperature: 23,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        latitude: prev.latitude + (Math.random() - 0.5) * 0.1,
        longitude: prev.longitude + (Math.random() - 0.5) * 0.1,
        speed: 25000 + Math.random() * 1000,
        altitude: 350000 + Math.random() * 1000,
        temperature: 23 + (Math.random() - 0.5),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-10 p-4 min-h-screen font-mono text-teal-400 flex flex-col gap-4">
      {/* Top Section */}
      <div className="grid grid-cols-3 gap-4">
        <div className="border border-teal-400 bg-black/30 backdrop-blur-sm rounded-lg p-4">
          <div className="flex flex-col h-full justify-between">
            <h3 className="text-lg">NAVIGATION</h3>
            <div className="space-y-2">
              <p>LAT: {stats.latitude.toFixed(6)}°</p>
              <p>LONG: {stats.longitude.toFixed(6)}°</p>
              <p>ALT: {stats.altitude.toFixed(0)} KM</p>
            </div>
          </div>
        </div>

        <div className="border border-teal-400 bg-black/30 backdrop-blur-sm rounded-lg p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold">STARSHIP CONTROL</h1>
            <p className="text-sm">SYSTEM STATUS: OPERATIONAL</p>
            <div className="mt-2 text-xl">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        <div className="border border-teal-400 bg-black/30 backdrop-blur-sm rounded-lg p-4">
          <div className="flex flex-col h-full justify-between">
            <h3 className="text-lg">VITALS</h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm">OXYGEN</p>
                <div className="w-full h-2 bg-black/30 rounded">
                  <div
                    className="h-full bg-teal-400/50 rounded"
                    style={{ width: `${stats.oxygen}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <p className="text-sm">ENERGY</p>
                <div className="w-full h-2 bg-black/30 rounded">
                  <div
                    className="h-full bg-teal-400/50 rounded"
                    style={{ width: `${stats.energy}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <p className="text-sm">
                  TEMP: {stats.temperature.toFixed(1)}°C
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hull Integrity Bar */}
      <div className="border border-teal-400 bg-black/30 backdrop-blur-sm rounded-lg p-2">
        <div className="flex justify-between text-sm mb-1">
          <span>HULL INTEGRITY</span>
          <span>{stats.health}%</span>
        </div>
        <div className="w-full h-2 border border-teal-400 rounded">
          <div
            className="h-full bg-teal-400/50 transition-all duration-300"
            style={{ width: `${stats.health}%` }}
          ></div>
        </div>
      </div>
      {/* Futuristic Title Strip */}
      <div className="relative h-16 border-y border-teal-400 bg-black/30 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 flex items-center">
          <div className="animate-cyber-slide whitespace-nowrap">
            <span className="text-4xl font-bold tracking-widest font-orbitron">
              OMNIVERSIFY
            </span>
          </div>
        </div>
      </div>
      {/* Center Section Split */}
      <div className="flex-1 flex gap-4 items-center justify-between h-[400px]">
        {/* Radar System */}
        <div className="h-full w-[400px] border border-teal-400 bg-black/30 backdrop-blur-sm rounded-lg p-4">
        
          <div className="relative h-full aspect-square">
          <div className="absolute top-2 right-2 z-10">
  <button 
    onClick={() => setIsMuted(!isMuted)} 
    className="text-teal-400 hover:text-teal-300 transition-colors"
  >
    {isMuted ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
      </svg>
    )}
  </button>
</div>
            {/* Radar Circle with overflow hidden */}
            <div className="absolute inset-8 rounded-full border border-teal-400/50 overflow-hidden">
              <div
                className="absolute inset-0 rounded-full border border-teal-400/30"
                style={{ transform: "scale(0.75)" }}
              ></div>
              <div
                className="absolute inset-0 rounded-full border border-teal-400/20"
                style={{ transform: "scale(0.5)" }}
              ></div>
              <div
                className="absolute inset-0 rounded-full border border-teal-400/10"
                style={{ transform: "scale(0.25)" }}
              ></div>
              {/* Scanning Line */}

              {/* Existing circles */}

              {/* Scanning Line with controlled rotation */}
              <div
                className="absolute w-full h-0.5 bg-teal-400/50 top-1/2 left-0 origin-center"
                style={{ transform: `rotate(${scanAngle}deg)` }}
              />

              {radarDot.visible && (
                <div 
                className="absolute w-2 h-2 bg-red-500 rounded-full animate-pulse transition-opacity duration-500"
                style={{
                  left: `${50 + radarDot.x}%`,
                  top: `${50 + radarDot.y}%`,
                  transform: 'translate(-50%, -50%)',
                  opacity: radarDot.visible ? 1 : 0
                }}
              />
              )}

              <audio ref={audioRef} src="/src/sounds/beep.mp3" />
            </div>

            {/* Latitude Ruler */}
            <div className="absolute left-0 top-8 bottom-8 w-8 flex flex-col justify-between text-sm">
              <span>90°N</span>
              <span>45°N</span>
              <span>0°</span>
              <span>45°S</span>
              <span>90°S</span>
            </div>

            {/* Longitude Ruler */}
            <div className="absolute left-8 right-8 bottom-0 h-8 flex justify-between text-sm">
              <span>180°W</span>
              <span>90°W</span>
              <span>0°</span>
              <span>90°E</span>
              <span>180°E</span>
            </div>
          </div>
        </div>

        {/* Planet Swiper - Now takes right half */}
        <div className="flex-1">
          <Swiper
            direction={"vertical"}
            mousewheel={true}
            navigation={true}
            modules={[Mousewheel, Navigation]}
            className="w-full h-[400px]"
          >
            {planets.map((planet, index) => (
              <SwiperSlide key={index}>
                <div className="h-full w-full bg-black/30 backdrop-blur-sm border border-teal-400 rounded-lg p-8">
                  <div className="flex gap-8 h-full">
                    <div className="w-1/2 flex items-center justify-center">
                      <div className="w-48 h-48 rounded-full bg-teal-400/20 animate-pulse flex items-center justify-center">
                        <span className="text-4xl">{planet.name}</span>
                      </div>
                    </div>
                    <div className="w-1/2 flex flex-col justify-center space-y-6">
                      <h2 className="text-3xl font-bold">{planet.name}</h2>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm opacity-70">DISTANCE</p>
                          <p className="text-xl">{planet.distance}</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-70">TEMPERATURE</p>
                          <p className="text-xl">{planet.temp}</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-70">ATMOSPHERE</p>
                          <p className="text-xl">{planet.atmosphere}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-4 gap-4">
        <div className="border border-teal-400 bg-black/30 backdrop-blur-sm rounded-lg p-4">
          <h3 className="text-lg mb-2">VELOCITY</h3>
          <p className="text-2xl">{stats.speed.toFixed(0)}</p>
          <p className="text-sm">KM/H</p>
        </div>

        <div className="border border-teal-400 bg-black/30 backdrop-blur-sm rounded-lg p-4">
          <h3 className="text-lg mb-2">FUEL</h3>
          <div className="w-full h-4 bg-black/30 rounded mb-2">
            <div
              className="h-full bg-teal-400/50 rounded"
              style={{ width: `${stats.fuel}%` }}
            ></div>
          </div>
          <p className="text-sm">{stats.fuel}% REMAINING</p>
        </div>

        <div className="border border-teal-400 bg-black/30 backdrop-blur-sm rounded-lg p-4">
          <h3 className="text-lg mb-2">SHIELD</h3>
          <p className="text-xl">ACTIVE</p>
          <p className="text-sm">FULL COVERAGE</p>
        </div>

        <div className="border border-teal-400 bg-black/30 backdrop-blur-sm rounded-lg p-4">
          <h3 className="text-lg mb-2">WEAPONS</h3>
          <p className="text-xl">ARMED</p>
          <p className="text-sm">ALL SYSTEMS GO</p>
        </div>
      </div>
    </div>
  );
}

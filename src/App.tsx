/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { useState } from 'react';
import { SpaceTheme, SeasonTheme, ColorMode } from './types';
import { ThreeCanvas } from './components/ThreeCanvas';
import { RacetrackGate } from './components/RacetrackGate';
import { DisciplineDashboard } from './components/DisciplineDashboard';
import { AnimatePresence, motion } from 'motion/react';

// pre-calculate weather particle metadata for optimum rendering performance
const RAIN_DROPS = Array.from({ length: 45 }).map((_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 2}s`,
  duration: `${0.8 + Math.random() * 1.2}s`,
  opacity: 0.15 + Math.random() * 0.4,
  height: `${15 + Math.random() * 25}px`,
}));

const SNOW_FLAKES = Array.from({ length: 40 }).map((_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 8}s`,
  duration: `${6 + Math.random() * 10}s`,
  opacity: 0.25 + Math.random() * 0.6,
  size: `${4 + Math.random() * 6}px`,
  blur: Math.random() > 0.6 ? 'blur-[0.5px]' : '',
}));

const SUN_MOTES = Array.from({ length: 18 }).map((_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: `${Math.random() * 4}s`,
  duration: `${10 + Math.random() * 15}s`,
  opacity: 0.08 + Math.random() * 0.22,
  size: `${10 + Math.random() * 30}px`,
}));

export default function App() {
  // Navigation states: 'LOCKED' (racetrack boarding page) | 'ACTIVE' (cozy home page desktop)
  const [sessionState, setSessionState] = useState<'LOCKED' | 'ACTIVE'>('LOCKED');

  // Shared cozy physical settings
  const [theme, setTheme] = useState<SpaceTheme>('RELAXING_MIND');
  const [isLampOn, setIsLampOn] = useState(true);
  const [lampColor, setLampColor] = useState('GOLD'); // 'GOLD' | 'RED' | 'EMERALD' | 'VIOLET' | 'OCEAN' | 'SUNSET'
  const [lampBrightness, setLampBrightness] = useState(80); // 10 to 100

  // Stats activity clicks tracker to cause sparkles flutter in three.js canvas
  const [activityTicks, setActivityTicks] = useState(0);

  // Seasons variables matching user requirements
  const [season, setSeason] = useState<SeasonTheme>('RAINY');

  const handleRegisterActivity = () => {
    setActivityTicks((ticks) => ticks + 1);
  };

  const handleUnlockSequence = () => {
    // Jump background immediately to match user preset intent
    setTheme('RELAXING_MIND');
    setSessionState('ACTIVE');
  };

  const handleReturnGate = () => {
    setSessionState('LOCKED');
  };

  // Seasons wallpapers imagery on custom leaves
    const getSeasonWallpaper = () => {
    switch (season) {
      case 'SUMMER':
        // Sunlight warm glazed tropical foliage
        return 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1920&q=80';
      case 'NIGHT':
        // Deep midnight neon leaf canopy
        return 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=1920&q=80';
      case 'WINTER':
        // Frost or snow-dusted leaves
        return 'https://images.unsplash.com/photo-1512413313926-509a1303dec5?auto=format&fit=crop&w=1920&q=80';
      case 'RAINY':
      default:
        // Rain droplets on monstera leaves
        return 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1920&q=80';
    }
  };

  return (
    <div className="relative w-screen h-screen transition-colors duration-700 overflow-hidden flex flex-col items-center justify-center select-none font-sans bg-[#f1f5f9]">
      
      {/* INJECT ANIMATION KEYFRAMES SAFELY VIA CORE JSX STYLES */}
      <style>{`
        @keyframes customRainFall {
          0% { transform: translateY(-120vh) translateX(-10px); }
          100% { transform: translateY(120vh) translateX(10px); }
        }
        @keyframes customSnowDrift {
          0% { transform: translateY(-10vh) translateX(0px) rotate(0deg); }
          50% { transform: translateY(50vh) translateX(20px) rotate(180deg); }
          100% { transform: translateY(110vh) translateX(-15px) rotate(360deg); }
        }
        @keyframes customSunlightSweep {
          0% { transform: translateY(-5%) rotate(-3deg) scale(1.0); opacity: 0.15; }
          50% { transform: translateY(2%) rotate(3deg) scale(1.05); opacity: 0.35; }
          100% { transform: translateY(-5%) rotate(-3deg) scale(1.0); opacity: 0.15; }
        }
        @keyframes customMoteDrift {
          0% { transform: translateY(10px) translateX(0px); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: translateY(-40px) translateX(15px); opacity: 0; }
        }
        @keyframes customMoonlightPulse {
          0% { opacity: 0.2; }
          50% { opacity: 0.45; }
          100% { opacity: 0.2; }
        }
        .anim-rain-drop {
          animation: customRainFall linear infinite;
        }
        .anim-snow-flake {
          animation: customSnowDrift ease-in-out infinite;
        }
        .anim-sun-mote {
          animation: customMoteDrift ease-in-out infinite;
        }
      `}</style>

      {/* THREEJS 3D CANVAS IN BACKGROUND OF ALL COGNITIVE MODULATORS */}
      <ThreeCanvas 
        theme={theme}
        isLampOn={isLampOn}
        activityIntensity={activityTicks}
        lampColor={lampColor}
        lampBrightness={lampBrightness}
      />

      {/* STUNNING LEAF WALLPAPER BACKGROUND (DYNAMICS TO THE 4 SEASONS & LIGHT THEME) */}
      <AnimatePresence mode="wait">
        {theme === 'COZY_DESK' && (
          <motion.div
            key={`leaf_${season}`}
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1.0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            {/* The primary chosen seasonal foliage leaf wallpaper */}
            <img 
              src={getSeasonWallpaper()} 
              alt={`${season} Season Leaf Wallpaper`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover scale-102 transition-all duration-1000 ease-out brightness-[1.0] contrast-[1.05] saturate-[1.2]"
            />
            
            {/* Organic Vignette Mask styled perfectly for Noon (LIGHT) Theme */}
            <div className="absolute inset-0 bg-radial from-transparent via-[#f8fafc]/20 to-[#f1f5f9]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f1f5f9] via-transparent to-transparent opacity-60" />

            {/* 1. SUMMER SEASON SUNLIGHT WEATHER EFFECT */}
            {season === 'SUMMER' && (
              <div className="absolute inset-0 overflow-hidden mix-blend-screen pointer-events-none">
                {/* Sunlight Beams sweeping slowly */}
                <div 
                  style={{ animation: 'customSunlightSweep 14s ease-in-out infinite' }}
                  className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-gradient-to-br from-amber-300/25 via-yellow-200/5 to-transparent blur-3xl transform origin-top-left" 
                />
                <div 
                  style={{ animation: 'customSunlightSweep 19s ease-in-out infinite 2s' }}
                  className="absolute -top-1/3 left-1/4 w-[120%] h-[120%] bg-gradient-to-b from-yellow-300/15 via-amber-400/5 to-transparent blur-3xl transform origin-top" 
                />
                
                {/* Sun Dust Motes floating */}
                {SUN_MOTES.map((mote) => (
                  <div
                    key={mote.id}
                    className="absolute bg-gradient-to-r from-amber-300 to-yellow-100 rounded-full anim-sun-mote blur-[2px]"
                    style={{
                      left: mote.left,
                      top: mote.top,
                      width: mote.size,
                      height: mote.size,
                      animationDuration: mote.duration,
                      animationDelay: mote.delay,
                      opacity: mote.opacity,
                    }}
                  />
                ))}
              </div>
            )}

            {/* 2. NIGHT SEASON MOONLIGHT OPTION */}
            {season === 'NIGHT' && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Moonlight soft beam */}
                <div 
                  style={{ animation: 'customMoonlightPulse 10s ease-in-out infinite' }}
                  className="absolute -right-10 -top-10 w-96 h-96 rounded-full bg-cyan-200/10 blur-3xl" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#020617]/50 via-transparent to-transparent" />
                
                {/* Soft twinkling stars or nighttime dust sparkles */}
                {SNOW_FLAKES.slice(0, 15).map((star) => (
                  <div
                    key={`star_${star.id}`}
                    className="absolute bg-cyan-200/75 rounded-full animate-pulse blur-[1px]"
                    style={{
                      left: star.left,
                      top: `${Math.random() * 80}%`,
                      width: '2px',
                      height: '2px',
                      animationDuration: `${2 + Math.random() * 3}s`,
                    }}
                  />
                ))}
              </div>
            )}

            {/* 3. RAINY SEASON WEATHER EFFECT (RAIN DROPLETS SLIDING) */}
            {season === 'RAINY' && (
              <div className="absolute inset-0 overflow-hidden mix-blend-screen pointer-events-none">
                {RAIN_DROPS.map((drop) => (
                  <div
                    key={drop.id}
                    className="absolute bg-gradient-to-b from-blue-300/40 via-neutral-100/30 to-transparent w-[1.5px] anim-rain-drop"
                    style={{
                      left: drop.left,
                      top: '-10%',
                      height: drop.height,
                      animationDuration: drop.duration,
                      animationDelay: drop.delay,
                      opacity: drop.opacity,
                    }}
                  />
                ))}
              </div>
            )}

            {/* 4. WINTER SEASON SNOWFALL WEATHER EFFECT */}
            {season === 'WINTER' && (
              <div className="absolute inset-0 overflow-hidden mix-blend-screen pointer-events-none">
                {SNOW_FLAKES.map((flake) => (
                  <div
                    key={flake.id}
                    className={`absolute bg-white rounded-full anim-snow-flake ${flake.blur}`}
                    style={{
                      left: flake.left,
                      top: '-5%',
                      width: flake.size,
                      height: flake.size,
                      animationDuration: flake.duration,
                      animationDelay: flake.delay,
                      opacity: flake.opacity,
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {theme === 'RELAXING_MIND' && (
          <motion.div
            key="relaxing_mind_background"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1.0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
          >
            {/* Serene Zen garden and majestic misty nature scene */}
            <img 
              src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1920&q=80" 
              alt="Serene Zen Forest Pathway"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover scale-102 transition-all duration-1000 ease-out brightness-[1.0] contrast-[1.05] saturate-[1.15]"
            />
            
            {/* Ambient Soft Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#f1f5f9]/25 via-[#f1f5f9]/10 to-[#f1f5f9]/40" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#f8fafc]/15 to-[#f1f5f9]/50" />

            {/* CURSIVE SOOTHING TEXT: "A quiet mind is a creative mind." */}
            <div className="absolute top-[18%] left-0 right-0 flex justify-center px-4 w-full text-center">
              <h2 className="font-script text-3xl sm:text-4xl md:text-[54px] tracking-widest font-normal italic drop-shadow-[0_2px_12px_rgba(255,255,255,0.8)] max-w-xl mx-auto leading-normal select-none pointer-events-none text-slate-805/85">
                A quiet mind is a creative mind.
              </h2>
            </div>
            
            {/* Live peaceful rain matching user selected season */}
            {season === 'RAINY' && (
              <div className="absolute inset-0 overflow-hidden mix-blend-screen pointer-events-none opacity-40">
                {RAIN_DROPS.slice(0, 30).map((drop) => (
                  <div
                    key={`relax_rain_${drop.id}`}
                    className="absolute bg-gradient-to-b from-blue-300/40 via-neutral-100/30 to-transparent w-[1px] anim-rain-drop"
                    style={{
                      left: drop.left,
                      top: '-10%',
                      height: drop.height,
                      animationDuration: drop.duration,
                      animationDelay: drop.delay,
                      opacity: drop.opacity,
                    }}
                  />
                ))}
              </div>
            )}
            
            {/* Spark simulation / evening firefly simulation */}
            {(season === 'NIGHT' || season === 'WINTER') && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-55">
                {SNOW_FLAKES.slice(0, 15).map((spark) => (
                  <div
                    key={`relax_spark_${spark.id}`}
                    className="absolute bg-amber-200 rounded-full anim-snow-flake"
                    style={{
                      left: spark.left,
                      top: '-5%',
                      width: '2.5px',
                      height: '2.5px',
                      animationDuration: `${4 + Math.random() * 4}s`,
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {sessionState === 'LOCKED' ? (
          <motion.div
            key="racetrack_gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-30 flex flex-col"
          >
            <RacetrackGate onUnlock={handleUnlockSequence} />
          </motion.div>
        ) : (
          <motion.div
            key="discipline_dashboard"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex flex-col justify-between"
          >
            <DisciplineDashboard 
              theme={theme}
              setTheme={setTheme}
              isLampOn={isLampOn}
              setIsLampOn={setIsLampOn}
              lampColor={lampColor}
              setLampColor={setLampColor}
              lampBrightness={lampBrightness}
              setLampBrightness={setLampBrightness}
              onTickActivity={handleRegisterActivity}
              onExit={handleReturnGate}
              season={season}
              setSeason={setSeason}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* AMBIENT SHADOW OVERLAYS FOR COZY ROOM EDGES */}
      <div className="absolute inset-0 pointer-events-none transition-colors duration-700 z-0 bg-radial from-transparent via-transparent to-[#f1f5f9]/25" />
    </div>
  );
}

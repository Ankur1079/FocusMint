/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Wind, Brain, Volume2, Sparkles } from 'lucide-react';
import { audio } from '../utils/audio';

interface RacetrackGateProps {
  onUnlock: () => void;
}

export const RacetrackGate: React.FC<RacetrackGateProps> = ({ onUnlock }) => {
  const [isEngaging, setIsEngaging] = useState(false);

  const handleLaunch = () => {
    setIsEngaging(true);
    audio.playConfirm();
    
    // Gentle transition into the relaxing sanctuary
    setTimeout(() => {
      onUnlock();
    }, 1100);
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#070b13]/85 backdrop-blur-[6px] text-white overflow-hidden p-4 sm:p-6 select-none font-sans">
      {/* Calm Zen stars / nebula mesh background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Drifting warm aurora / healing mist container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <motion.div 
          animate={{ x: [-150, 150, -150], y: [-40, 40, -40], opacity: [0.12, 0.4, 0.12] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -left-40 w-[800px] h-[600px] rounded-full bg-gradient-radial from-teal-900/20 via-transparent to-transparent blur-3xl pointer-events-none"
        />
        <motion.div 
          animate={{ x: [150, -150, 150], y: [40, -40, 40], opacity: [0.1, 0.32, 0.1] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-40 -right-40 w-[800px] h-[600px] rounded-full bg-gradient-radial from-emerald-950/15 via-transparent to-transparent blur-3xl pointer-events-none"
        />

        {/* Ambient drift particles / fireflies */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: `${10 + i * 15}%`, y: '110%', opacity: 0 }}
            animate={{ 
              y: '-10%', 
              opacity: [0, 0.4, 0.9, 0.4, 0],
              x: [`${10 + i * 15}%`, `${15 + i * 15}%`, `${8 + i * 15}%`]
            }}
            transition={{ 
              duration: 8 + i * 2, 
              repeat: Infinity, 
              delay: i * 1.5, 
              ease: 'easeInOut' 
            }}
            className="absolute rounded-full bg-emerald-400/40 blur-[1px]"
            style={{ width: `${3 + i}px`, height: `${3 + i}px` }}
          />
        ))}
      </div>

      {/* Main Core aesthetic Card block */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="relative max-w-xl w-full flex flex-col items-center text-center p-8 sm:p-12 z-10"
      >
        {/* Mindfulness indicators */}
        <div className="flex items-center gap-1 mb-8 font-mono text-[9px] tracking-[0.25em] text-emerald-400 uppercase font-black">
          <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-pulse mr-1" />
          COGNITIVE CALM SANCTUARY // READY
        </div>
 
        {/* Calligraphy Quote */}
        <div className="relative mb-6 select-none">
          <motion.h1 
            initial={{ scale: 0.98 }}
            animate={{ scale: 1.02 }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="font-script text-[3.8rem] sm:text-[5.5rem] text-slate-100 font-light leading-none select-none drop-shadow-md z-10 block pr-2"
          >
            A quiet mind is a creative mind.
          </motion.h1>
          <div className="absolute -inset-x-2 -bottom-2 h-[1px] bg-gradient-to-r from-transparent via-slate-600/40 to-transparent shadow-sm" />
        </div>

        {/* Explanation / subtitle */}
        <p className="text-xs font-mono font-medium tracking-[0.2em] text-slate-400 max-w-sm mb-12 uppercase leading-relaxed select-none">
          Unwind, breathe, and challenge your synapses with cognitive games.
        </p>

        {/* Enter sanctuary action button */}
        <div className="relative pointer-events-auto">
          <motion.button
            id="btn-racetrack-engage"
            onClick={handleLaunch}
            disabled={isEngaging}
            whileHover={{ scale: 1.02, letterSpacing: '0.4em' }}
            whileTap={{ scale: 0.98 }}
            className={`px-8 py-4.5 rounded-xl font-mono text-xs font-bold tracking-[0.3em] uppercase bg-gradient-to-r from-zinc-900 via-emerald-950/40 to-slate-900 text-emerald-400 border border-emerald-500/20 cursor-pointer shadow-xl transition-all duration-300 relative overflow-hidden flex items-center justify-center gap-3 w-64 sm:w-72 ${isEngaging ? 'brightness-125 saturate-150 shadow-emerald-500/10' : ''}`}
          >
            <Brain className={`w-4 h-4 text-emerald-450 ${isEngaging ? 'animate-pulse' : ''}`} />
            <span>{isEngaging ? 'TUNING WAVES...' : 'ENTER SANCTUARY'}</span>

            {/* Glowing neon green background shimmer lines */}
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-teal-500 via-emerald-400 to-sky-400 animate-pulse" />
          </motion.button>
          
          {/* Subtle outer orbit ring */}
          <div className="absolute -inset-2 border border-emerald-500/5 rounded-2xl -z-10 animate-pulse pointer-events-none" />
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono mt-12 uppercase tracking-widest leading-none">
          <Volume2 className="w-3.5 h-3.5 text-slate-400" /> Web Audio Engine Active
        </div>
      </motion.div>
      
      {/* Minimal Footer Credits */}
      <footer className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-[9px] font-mono text-slate-600 tracking-wider">
        <span>RELAXING MIND SANCTUARY</span>
        <span>COGNITIVE BALANCE // SYNERGY</span>
      </footer>
    </div>
  );
};

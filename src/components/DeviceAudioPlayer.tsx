/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Music, 
  FolderOpen, 
  Play, 
  Pause, 
  Square, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Check, 
  FileAudio,
  Sparkles
} from 'lucide-react';
import { ColorMode } from '../types';

interface DeviceAudioPlayerProps {
  colorMode: ColorMode;
  panelBg: string;
  subPanelBg: string;
  listInnerBg: string;
  inputBg: string;
}

interface AudioPreset {
  name: string;
  url: string;
  category: string;
  desc: string;
}

const PRESETS: AudioPreset[] = [
  {
    name: "Golden Sunrise Focus Lofi",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    category: "LOFI BEATS",
    desc: "Warm synth arpeggios paired with acoustic grooves for deep productivity."
  },
  {
    name: "Cybernetic Rain Forest Ambient",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    category: "SYNTH FOREST",
    desc: "Cosmic soundscapes and soft atmospheric electronic flows."
  },
  {
    name: "Classic Deep Study Chords",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    category: "ACOUSTIC",
    desc: "Gentle rhythmic focus triggers for intense mathematical tasks."
  }
];

export const DeviceAudioPlayer: React.FC<DeviceAudioPlayerProps> = ({
  colorMode,
  panelBg,
  subPanelBg,
  listInnerBg,
  inputBg,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [trackName, setTrackName] = useState<string>("Retro mixtape.mp3");
  const [trackSourceType, setTrackSourceType] = useState<"DEVICE" | "PRESET" | "NONE">("NONE");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [activePresetIndex, setActivePresetIndex] = useState<number | null>(null);

  // Simulated visualizer heights
  const [visualizerHeights, setVisualizerHeights] = useState<number[]>(Array(16).fill(15));

  // Initialize Audio Object on mount
  useEffect(() => {
    const audio = new Audio();
    audio.crossOrigin = "anonymous"; // Safe mode for stream analysis
    audioRef.current = audio;

    const onPlayEvent = () => setIsPlaying(true);
    const onPauseEvent = () => setIsPlaying(false);
    const onTimeUpdateEvent = () => setCurrentTime(audio.currentTime);
    const onDurationChangeEvent = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const onLoadedMetadataEvent = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const onEndedEvent = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('play', onPlayEvent);
    audio.addEventListener('pause', onPauseEvent);
    audio.addEventListener('timeupdate', onTimeUpdateEvent);
    audio.addEventListener('durationchange', onDurationChangeEvent);
    audio.addEventListener('loadedmetadata', onLoadedMetadataEvent);
    audio.addEventListener('ended', onEndedEvent);

    return () => {
      audio.pause();
      audio.removeEventListener('play', onPlayEvent);
      audio.removeEventListener('pause', onPauseEvent);
      audio.removeEventListener('timeupdate', onTimeUpdateEvent);
      audio.removeEventListener('durationchange', onDurationChangeEvent);
      audio.removeEventListener('loadedmetadata', onLoadedMetadataEvent);
      audio.removeEventListener('ended', onEndedEvent);
    };
  }, []);

  // Update audio properties
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  // Audio Equalizer Visualizer animation loop
  useEffect(() => {
    let animationFrameId: number;

    const updateVisualizer = () => {
      if (isPlaying) {
        // Procedural frequencies based on actual playtime to make it look responsive
        setVisualizerHeights(prev => prev.map((_, index) => {
          const factor = Math.sin((currentTime * 4) + index * 0.8) * 0.4 + 0.6;
          const randomJolt = Math.random() * 0.4;
          const finalHeight = Math.min(100, Math.max(10, Math.floor((factor + randomJolt) * 95)));
          return finalHeight;
        }));
      } else {
        // Slow peaceful breathing visualizer when paused
        setVisualizerHeights(prev => prev.map((h) => {
          const target = 15 + Math.sin(Date.now() / 600) * 4;
          return h > target ? Math.max(target, h - 3) : Math.min(target, h + 1);
        }));
      }
      animationFrameId = requestAnimationFrame(updateVisualizer);
    };

    animationFrameId = requestAnimationFrame(updateVisualizer);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, currentTime]);

  // Format seconds to text (mm:ss)
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleDeviceFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !audioRef.current) return;

    // Pause current audio
    audioRef.current.pause();

    const fileUrl = URL.createObjectURL(file);
    audioRef.current.src = fileUrl;
    setTrackName(file.name);
    setTrackSourceType("DEVICE");
    setActivePresetIndex(null);
    setCurrentTime(0);
    
    // Play the new audio
    audioRef.current.play().catch(err => console.warn('Autoplay failed:', err));
  };

  const loadPreset = (preset: AudioPreset, index: number) => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.src = preset.url;
    setTrackName(preset.name);
    setTrackSourceType("PRESET");
    setActivePresetIndex(index);
    setCurrentTime(0);

    // Play the preset stream
    audioRef.current.play().catch(err => console.warn('Autoplay of preset failed:', err));
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Re-trigger play (ensure source exists, fallback to default preset if blank)
      if (!audioRef.current.src) {
        loadPreset(PRESETS[0], 0);
      } else {
        audioRef.current.play().catch(err => console.warn('Playback failed:', err));
      }
    }
  };

  const handleStop = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!audioRef.current) return;
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  const handleSkipBackward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
  };

  const handleSkipForward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
  };

  return (
    <div className={`${panelBg} rounded-2xl p-4 sm:p-5 flex flex-col gap-4 relative overflow-hidden transition-all duration-300 mt-4`}>
      {/* Decorative Vintage audio banner accent */}
      <div className="absolute top-0 right-0 p-1.5 border-b border-l text-[8px] font-mono tracking-widest uppercase bg-teal-500/10 border-teal-500/20 text-teal-600 font-extrabold flex items-center gap-1">
        <Sparkles className="w-2.5 h-2.5 text-teal-500 animate-pulse" /> DUAL CHANNEL DIRECT DRIVE RECORDER
      </div>

      <div className="flex flex-col md:flex-row gap-5 items-stretch">
        
        {/* PHYSICAL 80S RETRO TAPE CASSETTE */}
        <div className={`w-full md:w-80 rounded-xl relative p-4 flex flex-col justify-between border select-none overflow-hidden h-44 ${subPanelBg}`}>
          {/* Subtle metallic reflection */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rotate-45 pointer-events-none -translate-y-8 translate-x-8 blur-md" />

          {/* Cassette Top notches */}
          <div className="flex justify-between px-6 -mt-4 text-[7px] font-mono opacity-50">
            <span>A</span>
            <span>STEREO REC</span>
            <span>B</span>
          </div>

          <div className="bg-amber-400 text-zinc-950 px-2 py-0.5 rounded text-[8px] font-mono uppercase font-bold tracking-wider text-center mt-1 truncate">
            {trackSourceType === "NONE" 
              ? "DEVICE PLAYER : CHOOSE SOURCE" 
              : `${trackSourceType === "DEVICE" ? "DEVICE FILE" : "PRESET MIX"} : ${trackName}`}
          </div>

          {/* DUAL SPINNING REELS AREA */}
          <div className="flex justify-center items-center gap-10 my-2 relative">
            
            {/* Spinning Reel Left */}
            <div className="relative">
              <motion.div 
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className={`w-14 h-14 rounded-full border-4 border-dashed relative flex items-center justify-center ${colorMode === 'LIGHT' ? 'border-zinc-300 bg-white/40' : 'border-zinc-700 bg-black/40'}`}
              >
                {/* Visual spokes */}
                <div className="absolute inset-0 border-t-2 border-b-2 border-zinc-500/40 rounded-full" />
                <div className="absolute inset-x-0 w-full h-0.5 bg-zinc-500/40 top-1/2 -translate-y-1/2" />
                <div className="w-4 h-4 rounded-full bg-zinc-650/40 border-2 border-zinc-400/40" />
              </motion.div>
              <div className="absolute inset-0 m-auto w-1 h-1 bg-zinc-900 rounded-full" />
            </div>

            {/* Tape remaining window (connecting the two reels) */}
            <div className={`h-8 w-20 border rounded relative flex items-center justify-center overflow-hidden ${colorMode === 'LIGHT' ? 'bg-slate-100/50 border-slate-300' : 'bg-black/30 border-white/5'}`}>
              <span className="text-[7.5px] font-mono text-zinc-500 font-bold tracking-widest absolute top-0.5 text-center">TAPE</span>
              
              {/* Simulated brown magnet strip */}
              <div className="h-2 w-full bg-amber-950/80 absolute bottom-1 flex items-center justify-center">
                <span className={`h-0.5 ${isPlaying ? 'bg-amber-400 w-16 animate-pulse' : 'bg-transparent w-0'}`} />
              </div>
            </div>

            {/* Spinning Reel Right */}
            <div className="relative">
              <motion.div 
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className={`w-14 h-14 rounded-full border-4 border-dashed relative flex items-center justify-center ${colorMode === 'LIGHT' ? 'border-zinc-300 bg-white/40' : 'border-zinc-700 bg-black/40'}`}
              >
                {/* Visual spokes */}
                <div className="absolute inset-0 border-t-2 border-b-2 border-zinc-500/40 rounded-full" />
                <div className="absolute inset-x-0 w-full h-0.5 bg-zinc-500/40 top-1/2 -translate-y-1/2" />
                <div className="w-4 h-4 rounded-full bg-zinc-650/40 border-2 border-zinc-400/40" />
              </motion.div>
              <div className="absolute inset-0 m-auto w-1 h-1 bg-zinc-900 rounded-full" />
            </div>
            
          </div>

          {/* LED Signal Lamps */}
          <div className="flex justify-between items-center px-2 text-[7.5px] font-mono">
            <div className="flex gap-1.5 items-center">
              <span className={`h-1.5 w-1.5 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-emerald-900'}`} />
              <span className="text-zinc-500">PLAY</span>
            </div>
            
            <span className="text-zinc-500 tracking-[0.1em] font-bold">120μS CRO2 CHROME</span>

            <div className="flex gap-1.5 items-center">
              <span className="text-zinc-500 text-right">STNDBY</span>
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            </div>
          </div>

        </div>

        {/* TRACK DETAIL CONTENT & EQUALIZER VISUALIZER */}
        <div className="flex-grow flex flex-col justify-between">
          
          <div className="flex items-start justify-between flex-wrap gap-2">
            <div>
              <span className="text-[9px] font-mono text-teal-600 uppercase font-black select-none tracking-widest">DEVICE AUDIO HUB</span>
              <h4 className={`text-md font-sans font-bold leading-tight uppercase ${colorMode === 'LIGHT' ? 'text-zinc-900' : 'text-zinc-100'}`}>
                {trackSourceType === "NONE" ? "No Soundtrack Loaded" : trackName}
              </h4>
              <p className="text-[9.5px] font-mono text-zinc-550 leading-relaxed max-w-sm mt-1">
                Select your own focus audio tracks or MP3 recordings directly from your device storage, or use our pre-configured lo-fi focus synth presets.
              </p>
            </div>

            {/* EXPLICIT DEVICE UPLOAD BUTTON */}
            <div className="flex flex-col gap-1.5 items-end">
              <input 
                ref={fileInputRef}
                type="file" 
                accept="audio/*" 
                onChange={handleDeviceFileChange}
                className="hidden" 
              />
              <button
                id="btn-select-audio-device"
                onClick={() => fileInputRef.current?.click()}
                className={`px-3.5 py-1.5 rounded-lg text-[10px] font-bold font-mono active:scale-95 transition-all flex items-center gap-1.5 shadow-md cursor-pointer ${
                  colorMode === 'LIGHT'
                    ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20'
                    : 'bg-teal-500/20 hover:bg-teal-500/35 text-teal-350 border border-teal-500/35 shadow-teal-500/5'
                }`}
              >
                <FolderOpen className={`w-3.5 h-3.5 ${colorMode === 'LIGHT' ? 'text-white' : 'text-teal-400'}`} />
                <span>SELECT AUDIO FROM DEVICE</span>
              </button>
              <span className="text-[8px] font-mono text-zinc-500 uppercase">Supports FLAC, MP3, WAV, M4A</span>
            </div>
          </div>

          {/* DYNAMIC EQUALIZER SPREAD */}
          <div className={`p-2.5 rounded-xl border flex items-end justify-between h-14 my-2.5 ${subPanelBg}`}>
            {visualizerHeights.map((h, i) => (
              <div 
                key={i} 
                className="w-2.5 sm:w-3.5 rounded-t-sm transition-all duration-75 relative bg-teal-500/10"
                style={{ height: '100%' }}
              >
                <motion.div 
                  animate={{ height: `${h}%` }}
                  transition={{ ease: "easeInOut", duration: 0.1 }}
                  className="rounded-t-sm w-full absolute bottom-0 bg-gradient-to-t from-teal-500/30 via-emerald-500/70 to-amber-400"
                />
              </div>
            ))}
          </div>

          {/* INTERACTIVE TRACK SEEKER & TIMER CONTROL */}
          <div className="space-y-1 select-none">
            
            {/* Seeker slider input */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-zinc-500 tabular-nums">
                {formatTime(currentTime)}
              </span>
              
              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                className="flex-grow h-1 bg-zinc-300 dark:bg-zinc-800 rounded-lg outline-none accent-teal-500 cursor-pointer"
              />

              <span className="text-[10px] font-mono text-zinc-500 tabular-nums">
                {formatTime(duration)}
              </span>
            </div>

            {/* SYSTEM CASSETTE BUTTONS & VOLUME CONTROLS */}
            <div className="flex flex-wrap justify-between items-center gap-3 pt-1">
              
              {/* Transport Buttons */}
              <div className="flex items-center gap-1">
                {/* Skip back 10s */}
                <button
                  onClick={handleSkipBackward}
                  className={`p-1.5 rounded border transition-colors ${colorMode === 'LIGHT' ? 'bg-zinc-200 border-zinc-300 text-zinc-700 hover:text-black hover:bg-zinc-300' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
                  title="Rewind 10 Seconds"
                >
                  <SkipBack className="w-3.5 h-3.5" />
                </button>

                {/* Main Play / Pause */}
                <button
                  onClick={togglePlayPause}
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-mono tracking-widest uppercase font-extrabold flex items-center gap-1.5 transition-colors shadow ${isPlaying ? 'bg-amber-400 text-zinc-950 border border-amber-300 hover:bg-amber-400/90' : 'bg-teal-600 hover:bg-teal-700 text-white'}`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3 h-3 fill-zinc-950" />
                      <span>PAUSE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 fill-white text-white" />
                      <span>PLAY</span>
                    </>
                  )}
                </button>

                {/* Stop */}
                <button
                  onClick={handleStop}
                  className={`p-1.5 rounded border transition-colors ${colorMode === 'LIGHT' ? 'bg-zinc-200 border-zinc-300 text-zinc-700 hover:text-black hover:bg-zinc-300' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
                  title="Stop Record"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                </button>

                {/* Skip forward 10s */}
                <button
                  onClick={handleSkipForward}
                  className={`p-1.5 rounded border transition-colors ${colorMode === 'LIGHT' ? 'bg-zinc-200 border-zinc-300 text-zinc-700 hover:text-black hover:bg-zinc-300' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
                  title="Fast Forward 10 Seconds"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Volume & Mute Deck */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`text-zinc-500 hover:text-teal-600 transition-colors`}
                  title={isMuted ? "Unmute Deck" : "Mute Deck"}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-rose-500" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-teal-600" />
                  )}
                </button>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(Number(e.target.value));
                    setIsMuted(false);
                  }}
                  className="w-16 h-1 bg-zinc-300 dark:bg-zinc-800 rounded-lg outline-none accent-teal-500 cursor-pointer"
                  title="Output Volume"
                />
                
                <span className="text-[9px] font-mono text-zinc-500 w-6 text-right tabular-nums">
                  {isMuted ? "0" : volume}%
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* BUILT-IN PRODUCTIVITY SOUNDTRACK PRESETS BOX */}
      <div className={`mt-3 pt-3 border-t flex flex-col gap-2 ${colorMode === 'LIGHT' ? 'border-zinc-200' : 'border-zinc-900'}`}>
        <span className="text-[8px] font-mono text-zinc-500 tracking-wider uppercase font-black">
          FAST LOADING HIGH-PRODUCTIVITY SOUNDTRACK PRESETS
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {PRESETS.map((pst, idx) => {
            const isActive = activePresetIndex === idx && trackSourceType === "PRESET";
            return (
              <div
                key={idx}
                onClick={() => loadPreset(pst, idx)}
                className={`p-2 rounded-xl cursor-pointer transition-all border text-left flex flex-col justify-between group min-h-[56px] select-none ${
                  isActive 
                  ? 'border-teal-500 bg-teal-500/5 ring-1 ring-teal-500/30' 
                  : `${listInnerBg} hover:border-zinc-600`
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-[7.5px] font-mono px-1 py-0.2 rounded font-extrabold uppercase ${
                    isActive ? 'bg-teal-500 text-white' : 'bg-teal-500/10 text-teal-600'
                  }`}>
                    {pst.category}
                  </span>
                  {isActive && <Check className="w-3 h-3 text-teal-500" />}
                </div>

                <div className="mt-1">
                  <h5 className={`text-[10px] font-bold truncate leading-tight uppercase ${
                    isActive ? 'text-teal-600 dark:text-teal-400' : `${colorMode === 'LIGHT' ? 'text-zinc-800' : 'text-zinc-300'} group-hover:text-teal-500`
                  }`}>
                    {pst.name}
                  </h5>
                  <p className="text-[8px] font-mono text-zinc-500 leading-tight line-clamp-1 mt-0.5">
                    {pst.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

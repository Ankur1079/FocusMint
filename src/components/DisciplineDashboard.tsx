/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Volume2, 
  VolumeX, 
  CheckSquare, 
  Plus, 
  Trash2, 
  Coffee, 
  BookOpen, 
  Flame, 
  Check, 
  RotateCcw, 
  Play, 
  Pause, 
  Sun, 
  Moon, 
  Sparkles,
  Music,
  Wind,
  Heart,
  Cat,
  Brain,
  Clock,
  Edit2,
  Gamepad2,
  ChevronRight
} from 'lucide-react';
import { DailyTask, SpaceTheme, StickyNote, BookInfo, SeasonTheme, ColorMode, LAMP_COLORS } from '../types';
import { audio } from '../utils/audio';
import { DeviceAudioPlayer } from './DeviceAudioPlayer';
import { RelaxingMindGames } from './RelaxingMindGames';

interface DisciplineDashboardProps {
  theme: SpaceTheme;
  setTheme: (theme: SpaceTheme) => void;
  isLampOn: boolean;
  setIsLampOn: (isOn: boolean) => void;
  lampColor: string;
  setLampColor: (color: string) => void;
  lampBrightness: number;
  setLampBrightness: (brightness: number) => void;
  onTickActivity: () => void;
  onExit: () => void;
  season: SeasonTheme;
  setSeason: (season: SeasonTheme) => void;
}

// Curated focus book summaries
const CLASSIC_BOOKS: BookInfo[] = [
  {
    id: 'mindset',
    title: 'Mindset',
    author: 'Carol S. Dweck',
    bannerColor: 'from-blue-600 to-indigo-800',
    summary: 'Embracing challenges and viewing failures not as evidence of intelligence but as a heartening springboard for growth is paramount.',
    tactics: [
      'Praise effort expended, not fixed talent',
      'Choose challenging hurdles over comfort zones',
      'Transform setbacks into calibration routines'
    ]
  },
  {
    id: 'atomic_habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    bannerColor: 'from-amber-600 to-red-800',
    summary: 'Small, easy daily improvements compound over time into incredible results through systemized habit environments.',
    tactics: [
      'Practice the 1% daily improvement rule',
      'Use the Two-Minute Rule to beat inertia',
      'Optimize environmental cues for good habits'
    ]
  },
  {
    id: 'five_am_club',
    title: 'The 5 AM Club',
    author: 'Robin Sharma',
    bannerColor: 'from-sky-600 to-cyan-800',
    summary: 'Using early morning victory hours to shield psychological assets, reclaim focus, and compound inner discipline.',
    tactics: [
      'The 20/20/20 Formula (Move, Reflect, Grow)',
      'Construct a calming pre-sleep environment',
      'Protect mental bandwidth from digital alerts'
    ]
  },
  {
    id: 'deep_work',
    title: 'Deep Work',
    author: 'Cal Newport',
    bannerColor: 'from-slate-600 to-zinc-800',
    summary: 'Distraction-free concentration blocks that push cognitive capabilities to their absolute limits and produce peak quality work.',
    tactics: [
      'Schedule concrete timeblocks for deep focus',
      'Embrace pure boredom to retrain attention capacity',
      'Implement structured shutdown rituals daily'
    ]
  }
];

const RACING_DOSSIERS: BookInfo[] = [
  {
    id: 'zen_garden',
    title: 'Flow State Zen Garden',
    author: 'Cognitive Balance Guide',
    bannerColor: 'from-teal-600 to-emerald-850',
    summary: 'A guide to entering deep distraction-free flow through pattern focus, rhythmic loops, and breathing awareness.',
    tactics: [
      'Focus strictly on the immediate block or cell',
      'Recognize logical connections with ease',
      'Inhale slowly whenever finding a correct pair'
    ]
  },
  {
    id: 'neuro_synergy',
    title: 'Bilateral Synapse Synergy',
    author: 'Brain Lab Guide',
    bannerColor: 'from-sky-600 to-blue-800',
    summary: 'Exploring how strategic puzzles and cerebral Chess simulations stimulate quick thinking and cognitive clarity.',
    tactics: [
      'Engage both brain chambers with recall memory',
      'Analyze the Chess AI movements step-by-step',
      'Develop patience through paced intellectual gaming'
    ]
  },
  {
    id: 'chimes_breathe',
    title: 'Acoustic Sound Healing',
    author: 'Audio Therapy Principles',
    bannerColor: 'from-yellow-600 to-indigo-900',
    summary: 'Blends nature sounds (rain, insects, summer birds) with slow-paced gameplay to calm anxiety and renew focus.',
    tactics: [
      'Blend lofi mixtape with rain volume levels',
      'Align slow breath cycles with chiming bells',
      'Sip fresh warm coffee or hot tea systematically'
    ]
  }
];

type ActiveTab = 'WORKSPACE' | 'TIMER' | 'PLANNER' | 'AMBIENT' | 'GAMES';

export const DisciplineDashboard: React.FC<DisciplineDashboardProps> = ({
  theme,
  setTheme,
  isLampOn,
  setIsLampOn,
  lampColor,
  setLampColor,
  lampBrightness,
  setLampBrightness,
  onTickActivity,
  onExit,
  season,
  setSeason,
}) => {
  let colorMode: any = 'LIGHT';

  // Navigation Menu state
  const [activeTab, setActiveTab] = useState<ActiveTab>('WORKSPACE');
  const [currentTime, setCurrentTime] = useState('10:00 AM');

  // Personalized user information
  const [userName, setUserName] = useState('Alinne');
  const [isEditingName, setIsEditingName] = useState(false);
  const [locationName, setLocationName] = useState('RIO DE JANEIRO');
  const [isEditingLocation, setIsEditingLocation] = useState(false);

  // Focus Checklist Tool state
  const [tasks, setTasks] = useState<DailyTask[]>([
    { id: '1', text: 'Study deep work focus block', completed: false },
    { id: '2', text: 'Hydrate with hot tea or fresh coffee', completed: true },
    { id: '3', text: 'Read J. Clear 1% habit rules', completed: false },
    { id: '4', text: 'Minimize digital friction (silence phone)', completed: false },
  ]);
  const [newTaskText, setNewTaskText] = useState('');

  // Sticky notes state
  const [stickies, setStickies] = useState<StickyNote[]>([
    { id: 's1', text: 'NO PHONE', color: 'yellow' },
    { id: 's2', text: 'NO DISTRACTIONS', color: 'pink' },
    { id: 's3', text: 'JUST FOCUS', color: 'emerald' },
  ]);
  const [newStickyText, setNewStickyText] = useState('');
  const [newStickyColor, setNewStickyColor] = useState<'yellow' | 'blue' | 'pink' | 'emerald'>('yellow');

  // Senses audio volumes
  const [rainVolume, setRainVolume] = useState(30);
  const [chimeVolume, setChimeVolume] = useState(25);
  const [summerVolume, setSummerVolume] = useState(30);
  const [nightVolume, setNightVolume] = useState(30);
  const [winterVolume, setWinterVolume] = useState(30);
  const [isSynthesizerActive, setIsSynthesizerActive] = useState(true);

  // Pomodoro countdown clock variables
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [selectedPresetTime, setSelectedPresetTime] = useState(25);

  // Coffee cup level
  const [focusSips, setFocusSips] = useState(3);
  const [isSipping, setIsSipping] = useState(false);
  const [activeBook, setActiveBook] = useState<BookInfo | null>(null);

  // Dynamic colors depending on dark/light
  const panelBg = colorMode === 'LIGHT'
    ? 'bg-white/85 backdrop-blur-md border border-slate-200/90 shadow-lg text-slate-800'
    : 'bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl text-slate-100';

  const subPanelBg = colorMode === 'LIGHT'
    ? 'bg-slate-50 border border-slate-200 text-slate-700 shadow-sm'
    : 'bg-black/30 border border-white/5 text-slate-200';

  const listInnerBg = colorMode === 'LIGHT'
    ? 'bg-white hover:bg-slate-100/50 border border-slate-200 text-slate-800 transition-colors shadow-sm'
    : 'bg-white/5 hover:bg-white/10 border border-white/5 text-slate-200 transition-colors';

  const inputBg = colorMode === 'LIGHT'
    ? 'bg-white border border-slate-300 text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
    : 'bg-slate-950 border border-white/10 text-white placeholder-slate-500 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400';

  // Digital clock ticks
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hrs = now.getHours();
      const ampm = hrs >= 12 ? 'PM' : 'AM';
      hrs = hrs % 12 || 12;
      const mins = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hrs}:${mins} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // Sync ambient synthesis settings
  useEffect(() => {
    if (isSynthesizerActive) {
      audio.stopAllSeasonalEffects();
      if (season === 'SUMMER') {
        audio.startSummerAmbient(summerVolume);
      } else if (season === 'NIGHT') {
        audio.startNightAmbient(nightVolume);
      } else if (season === 'RAINY') {
        audio.startRainyAmbient(rainVolume);
      } else if (season === 'WINTER') {
        audio.startWinterAmbient(winterVolume);
      }
      audio.startFocusChimes(chimeVolume);
    } else {
      audio.stopAllSeasonalEffects();
      audio.stopFocusChimes();
    }
    return () => {
      audio.stopAllSeasonalEffects();
      audio.stopFocusChimes();
    };
  }, [isSynthesizerActive, season, summerVolume, nightVolume, rainVolume, winterVolume, chimeVolume]);

  // Pomodoro countdown loop
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        onTickActivity();
        if (timerSeconds > 0) {
          setTimerSeconds((s) => s - 1);
        } else {
          if (timerMinutes > 0) {
            setTimerMinutes((m) => m - 1);
            setTimerSeconds(59);
          } else {
            setIsTimerRunning(false);
            audio.playPomodoroSignal();
            setIsLampOn(true);
          }
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerMinutes, timerSeconds]);

  // Change rain volume helper
  const handleRainVolumeChange = (vol: number) => {
    setRainVolume(vol);
    if (isSynthesizerActive) {
      audio.adjustRainVolume(vol);
    }
  };

  const handleToggleLamp = () => {
    audio.playClick();
    setIsLampOn(!isLampOn);
  };

  const handleTakeSip = () => {
    if (isSipping) return;
    setIsSipping(true);
    audio.playBeep(880, 0.12, 'sine', 0.08);
    setTimeout(() => {
      audio.playBeep(440, 0.08, 'sine', 0.06);
      setFocusSips((s) => s + 1);
      setIsSipping(false);
      onTickActivity();
    }, 350);
  };

  const handleToggleTask = (id: string) => {
    audio.playClick();
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    audio.playClick();
    setTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), text: newTaskText.trim(), completed: false }
    ]);
    setNewTaskText('');
  };

  const handleDeleteTask = (id: string) => {
    audio.playClick();
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddSticky = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStickyText.trim()) return;
    audio.playClick();
    setStickies((prev) => [
      ...prev,
      { id: Date.now().toString(), text: newStickyText.trim().toUpperCase(), color: newStickyColor }
    ]);
    setNewStickyText('');
  };

  const handleDeleteSticky = (id: string) => {
    audio.playClick();
    setStickies((prev) => prev.filter((s) => s.id !== id));
  };

  const handleBookClick = (book: BookInfo) => {
    audio.playClick();
    setActiveBook(book);
  };

  const handleQuickFocus = () => {
    audio.playConfirm();
    setTimerMinutes(25);
    setTimerSeconds(0);
    setIsTimerRunning(true);
    setChimeVolume(60);
    setIsSynthesizerActive(true);
    onTickActivity();
  };

  const handleQuickStudy = () => {
    audio.playConfirm();
    setTimerMinutes(50);
    setTimerSeconds(0);
    setIsTimerRunning(true);
    setRainVolume(70);
    setIsSynthesizerActive(true);
    onTickActivity();
  };

  return (
    <div className="absolute inset-0 z-10 flex flex-col p-3 sm:p-6 overflow-y-auto pointer-events-auto">
      
      {/* MASTER DIVIDER CONTAINER: LEFT MENU BAR SIDEBAR AND RIGHT CLEAN CONTENT PANELS */}
      <div className="w-full flex-grow flex flex-col lg:flex-row gap-6 items-stretch my-2">
        
        {/* =======================================================
            LEFT SIDEBAR NAVIGATION MENU BAR (CONGESTION ELIMINATOR)
            ======================================================= */}
        <aside className={`w-full lg:w-80 flex flex-col justify-between p-4 sm:p-5 rounded-2xl border shadow-lg relative ${panelBg}`}>
          <div className="space-y-4 lg:space-y-6">
            
            {/* 1. BRAND AND GREETING DECK */}
            <div className="flex flex-row lg:flex-col items-center lg:items-start justify-between gap-3 border-b pb-4 border-slate-400/15">
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-550 flex items-center justify-center shrink-0">
                  <Flame className="w-5 h-5 animate-pulse text-indigo-500" />
                </div>
                <div className="overflow-hidden">
                  <span className="text-xs font-mono tracking-widest uppercase font-extrabold text-indigo-600 dark:text-indigo-400 block">
                    Focus Mint
                  </span>
                  
                  {/* Editable User Name Greeting */}
                  <div className="flex items-center gap-1 mt-0.5">
                    <h2 className="text-sm sm:text-base font-black truncate text-slate-800 dark:text-white uppercase tracking-tight">
                      Hi,{' '}
                      {isEditingName ? (
                        <input
                          type="text"
                          value={userName}
                          maxLength={10}
                          onChange={(e) => setUserName(e.target.value)}
                          onBlur={() => { setIsEditingName(false); audio.playConfirm(); }}
                          onKeyDown={(e) => { if (e.key === 'Enter') { setIsEditingName(false); audio.playConfirm(); } }}
                          className="border-b border-dashed border-indigo-400 text-indigo-500 bg-transparent outline-none w-20 font-black uppercase text-sm sm:text-base"
                          autoFocus
                        />
                      ) : (
                        <span 
                          onClick={() => { setIsEditingName(true); audio.playClick(); }}
                          className="text-indigo-500 hover:brightness-110 underline decoration-dashed underline-offset-2 cursor-pointer font-black"
                          title="Edit name"
                        >
                          {userName}
                        </span>
                      )}
                    </h2>
                  </div>
                </div>
              </div>
              
              {/* Mobile top-right active clock widget */}
              <div className="lg:hidden text-xs font-mono font-bold text-slate-600 bg-black/5 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/5 px-2.5 py-1.5 rounded-xl shrink-0">
                ⏰ {currentTime}
              </div>
            </div>

            {/* 2. MENU BAR NAVIGATION LIST */}
            <div className="space-y-1.5 w-full overflow-hidden">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 font-extrabold block mb-2 px-1 hidden lg:block">
                Workspace Modes
              </span>
              
              {/* Horizontal scroll on mobile/tablet, vertical stack on desktop */}
              <div className="flex lg:flex-col overflow-x-auto gap-2 lg:space-y-1.5 pb-2 lg:pb-0 scrollbar-none w-full">
                {[
                  { id: 'WORKSPACE', label: 'Desk Setup', desc: 'Theme & Weather', icon: Compass, color: 'text-indigo-500' },
                  { id: 'TIMER', label: 'Focus Timer', desc: 'Pomodoro & Drinks', icon: Clock, color: 'text-rose-500' },
                  { id: 'PLANNER', label: 'Study Checklist', desc: 'Tasks & Library', icon: CheckSquare, color: 'text-amber-500' },
                  { id: 'AMBIENT', label: 'Sound & Music', desc: 'Mixtape & Sliders', icon: Music, color: 'text-teal-500' },
                  { id: 'GAMES', label: 'Focus Games', desc: 'Chess, Sudoku, Quiz', icon: Gamepad2, color: 'text-emerald-500' }
                ].map((tab) => {
                  const IconComponent = tab.icon;
                  const isSelected = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        audio.playClick();
                        setActiveTab(tab.id as ActiveTab);
                      }}
                      className={`flex items-center gap-2 lg:gap-3.5 p-2 lg:p-3.5 rounded-xl transition-all text-left group border cursor-pointer min-h-[40px] lg:min-h-[48px] shrink-0 ${
                        isSelected 
                          ? colorMode === 'LIGHT'
                            ? 'bg-indigo-50/80 border-indigo-200 shadow-sm text-indigo-900 font-bold'
                            : 'bg-indigo-500/15 border-indigo-500/20 text-indigo-300 font-extrabold'
                          : colorMode === 'LIGHT'
                            ? 'bg-transparent border-transparent text-slate-600 hover:bg-slate-100/80'
                            : 'bg-transparent border-transparent text-slate-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <IconComponent className={`w-4 h-4 lg:w-5 lg:h-5 shrink-0 ${isSelected ? tab.color : 'text-slate-400 group-hover:text-indigo-400 transition-colors'}`} />
                      <div className="leading-tight overflow-hidden text-left">
                        <span className="text-xs lg:text-sm font-bold block uppercase tracking-wide">{tab.label}</span>
                        <span className="text-xs text-slate-500 hidden sm:block pointer-events-none">{tab.desc}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 ml-auto opacity-0 lg:group-hover:opacity-100 transition-opacity shrink-0 hidden lg:block ${isSelected ? 'opacity-100 text-indigo-450' : ''}`} />
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Core controls stacked neatly on desktop */}
          <div className="mt-2 lg:mt-5">
            {/* 4. SIDEBAR FOOTER CONTROL SYSTEM */}
            <div className="space-y-3.5 lg:border-t lg:pt-4 border-slate-400/15 flex flex-col justify-end">
              
              {/* Clock Widget (Only visible on desktop/large layouts) */}
              <div className="justify-between items-center text-xs font-mono text-slate-500 hidden lg:flex">
                <span className="font-bold">⏰ {currentTime}</span>
                {isEditingLocation ? (
                  <input
                    type="text"
                    value={locationName}
                    maxLength={14}
                    onChange={(e) => setLocationName(e.target.value.toUpperCase())}
                    onBlur={() => { setIsEditingLocation(false); audio.playConfirm(); }}
                    onKeyDown={(e) => { if (e.key === 'Enter') { setIsEditingLocation(false); audio.playConfirm(); } }}
                    className="w-20 text-xs uppercase bg-transparent outline-none border-b border-indigo-400 text-indigo-500 font-bold"
                    autoFocus
                  />
                ) : (
                  <span 
                    onClick={() => { setIsEditingLocation(true); audio.playClick(); }}
                    className="cursor-pointer hover:text-indigo-400 underline decoration-dotted capitalize"
                    title="Edit location"
                  >
                    📍 {locationName.toLowerCase()}
                  </span>
                )}
              </div>

              {/* Quick action buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    audio.playClick();
                    setIsSynthesizerActive(!isSynthesizerActive);
                  }}
                  className={`flex-1 py-2.5 rounded-xl border cursor-pointer flex items-center justify-center gap-2 transition-colors ${
                    isSynthesizerActive
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-500'
                      : 'bg-rose-500/15 border-rose-500/30 text-rose-500'
                  }`}
                  title="Toggle Mute"
                >
                  {isSynthesizerActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <span className="text-xs font-mono font-black uppercase">{isSynthesizerActive ? 'AUDIBLE' : 'MUTED'}</span>
                </button>

                <button
                  onClick={onExit}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-all text-xs font-mono font-black cursor-pointer uppercase text-center"
                  title="Exit desk space"
                >
                  Exit Desk
                </button>
              </div>

            </div>

          </div>
        </aside>

        {/* =======================================================
            RIGHT ACTIVE MODE CONTAINER (CLEAN & NON-CONGESTED)
            ======================================================= */}
        <section className="flex-1 flex flex-col pointer-events-auto overflow-y-auto leading-none">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: COZY DESK SETUP */}
            {activeTab === 'WORKSPACE' && (
              <motion.div
                key="workspace_settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                
                {/* Highlight Info Box */}
                <div className={`p-6 rounded-2xl border shadow-md relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 ${panelBg}`}>
                  <div className="space-y-2 relative z-10">
                    <span className="text-xs font-mono tracking-widest text-[#34d399] bg-emerald-500/10 dark:bg-emerald-500/20 px-2.5 py-1 rounded-lg uppercase font-black border border-emerald-500/20 inline-block mb-1">
                      Sanctuary Zone
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">
                      CALIBRATE YOUR MIND HAVEN
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
                      Custom study environments trigger peaceful audio waves. Select your favorite scenery theme, adjust the weather, and cultivate a steady focus flow state.
                    </p>
                  </div>
                  
                  {/* Decorative element */}
                  <div className="flex gap-4 items-center shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center text-indigo-500 shadow-sm animate-bounce" style={{ animationDuration: '4s' }}>
                      <Compass className="w-8 h-8" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Active Scenery Wallpaper Theme Choices */}
                  <div className={`p-5 rounded-2xl border shadow-md ${panelBg} flex flex-col justify-between gap-4`}>
                    <div className="space-y-1">
                      <h4 className="text-xs font-mono font-black uppercase text-slate-400 tracking-wider">
                        Scenery Wallpaper Theme
                      </h4>
                      <p className="text-xs text-slate-500 leading-normal">
                        Switches the deep background visual wallpaper image instantly.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => { audio.playConfirm(); setTheme('COZY_DESK'); }}
                        className={`p-4 rounded-xl font-sans text-xs font-black uppercase tracking-wider transition-all border flex flex-col items-center justify-center gap-2 cursor-pointer min-h-[44px] ${
                          theme === 'COZY_DESK'
                            ? colorMode === 'LIGHT' ? 'bg-indigo-50 text-indigo-900 border-indigo-300 font-extrabold shadow-sm' : 'bg-indigo-500/25 text-indigo-350 border-indigo-500/30'
                            : colorMode === 'LIGHT' ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50' : 'bg-black/30 border-white/5 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span className="text-lg">💻</span>
                        <span>Cozy Desk Greenery</span>
                      </button>

                      <button
                        onClick={() => { audio.playConfirm(); setTheme('RELAXING_MIND'); }}
                        className={`p-4 rounded-xl font-sans text-xs font-black uppercase tracking-wider transition-all border flex flex-col items-center justify-center gap-2 cursor-pointer min-h-[44px] ${
                          theme === 'RELAXING_MIND'
                            ? colorMode === 'LIGHT' ? 'bg-indigo-50 text-indigo-900 border-indigo-300 font-extrabold shadow-sm' : 'bg-indigo-500/25 text-indigo-350 border-indigo-500/30'
                            : colorMode === 'LIGHT' ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50' : 'bg-black/30 border-white/5 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span className="text-lg">🧘</span>
                        <span>Mind Zen Pathway</span>
                      </button>
                    </div>

                    <div className={`p-3 text-xs font-mono leading-relaxed border border-dashed rounded-xl text-slate-500 ${subPanelBg}`}>
                      💡 TIP: Cozy Desk Greenery preset features warm greenhouse plants, while Mind Zen Pathway is oriented around mystical foggy mountain forests.
                    </div>
                  </div>

                  {/* Seasonal Weather Adjusters */}
                  <div className={`p-5 rounded-2xl border shadow-md ${panelBg} flex flex-col justify-between gap-4`}>
                    <div className="space-y-1">
                      <h4 className="text-xs font-mono font-black uppercase text-slate-400 tracking-wider">
                        Active Weather Season
                      </h4>
                      <p className="text-xs text-slate-500 leading-normal">
                        Triggers custom weather particle synthesis and background white-noise audio.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { id: 'SUMMER', label: 'Summer Sun', icon: '☀️', color: 'hover:border-amber-400' },
                        { id: 'NIGHT', label: 'Night Star', icon: '🌙', color: 'hover:border-indigo-400' },
                        { id: 'RAINY', label: 'Raining drops', icon: '🌧️', color: 'hover:border-teal-400' },
                        { id: 'WINTER', label: 'Winter Ice', icon: '❄️', color: 'hover:border-sky-400' }
                      ].map((s) => (
                        <button
                          key={s.id}
                          onClick={() => { audio.playClick(); setSeason(s.id as SeasonTheme); }}
                          className={`p-3 rounded-xl text-xs font-sans font-bold flex items-center gap-2.5 border transition-all cursor-pointer min-h-[44px] ${s.color} ${
                            season === s.id
                              ? colorMode === 'LIGHT'
                                ? 'bg-amber-50 border-amber-300 text-amber-955 font-extrabold shadow-sm'
                                : 'bg-amber-500/20 border-amber-500/30 text-amber-405 font-extrabold shadow'
                              : colorMode === 'LIGHT' ? 'bg-white border-slate-205 text-slate-600 hover:bg-slate-50' : 'bg-black/30 border-white/5 text-slate-400 hover:text-slate-100'
                          }`}
                        >
                          <span className="text-base">{s.icon}</span>
                          <span className="uppercase tracking-widest text-xs">{s.label}</span>
                        </button>
                      ))}
                    </div>

                    <div className={`p-3 text-xs font-mono leading-relaxed border border-dashed rounded-xl text-slate-500 ${subPanelBg}`}>
                      Choose a season to activate real-time falling weather animations across the desk view automatically.
                    </div>
                  </div>

                </div>

                {/* Micro focus presets triggers */}
                <div className={`p-5 rounded-2xl border shadow-md ${panelBg}`}>
                  <h4 className="text-xs font-mono font-black uppercase text-slate-400 tracking-wider mb-4">
                    Quick Concentration Anchors
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={handleQuickFocus}
                      className={`p-4 rounded-xl border flex items-center gap-3.5 group cursor-pointer text-left transition-all hover:scale-[1.01] ${subPanelBg}`}
                    >
                      <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500/20 shrink-0 shadow">
                        <Heart className="w-5 h-5 fill-emerald-500/10" />
                      </div>
                      <div className="leading-snug">
                        <span className="text-xs font-sans font-black block uppercase text-slate-700 dark:text-slate-200">
                          25-Minute Focus Block
                        </span>
                        <span className="text-xs text-slate-500">Initiates custom chimes & sets timers</span>
                      </div>
                    </button>

                    <button
                      onClick={handleQuickStudy}
                      className={`p-4 rounded-xl border flex items-center gap-3.5 group cursor-pointer text-left transition-all hover:scale-[1.01] ${subPanelBg}`}
                    >
                      <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-400/20 flex items-center justify-center text-amber-550 group-hover:bg-amber-500/20 shrink-0 shadow">
                        <Cat className="w-5 h-5" />
                      </div>
                      <div className="leading-snug">
                        <span className="text-xs font-sans font-black block uppercase text-slate-700 dark:text-slate-200">
                          50-Minute Study block
                        </span>
                        <span className="text-xs text-slate-500">Starts deep rainfall loops & timer clock</span>
                      </div>
                    </button>
                  </div>
                </div>

              </motion.div>
            )}

            {/* TAB 2: POMODORO TIMER */}
            {activeTab === 'TIMER' && (
              <motion.div
                key="timer_settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
              >
                
                {/* Active Pomodoro Countdown panel */}
                <div className={`md:col-span-2 p-6 rounded-2xl border shadow-xl flex flex-col justify-between gap-6 relative min-h-[300px] ${panelBg}`}>
                  <div className="absolute top-4 right-4 flex gap-2 items-center">
                    <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </div>
                  
                  <div className="flex justify-between items-center border-b pb-3.5 border-slate-400/15">
                    <span className="text-xs font-mono tracking-widest font-black uppercase text-rose-500 dark:text-rose-400">
                      ⏰ Concentration Focus Clock
                    </span>
                    <span className="text-xs font-mono text-slate-500">Focus Desk Space</span>
                  </div>

                  {/* Oversized clock readout */}
                  <div className="my-6 text-center">
                    <div className="text-6xl sm:text-7xl md:text-8xl font-black font-mono tracking-widest tabular-nums leading-none select-text text-slate-900 dark:text-white">
                      {timerMinutes.toString().padStart(2, '0')}
                      <span className={isTimerRunning ? 'animate-pulse text-emerald-500' : 'text-indigo-400'}>:</span>
                      {timerSeconds.toString().padStart(2, '0')}
                    </div>
                    <span className="text-xs font-mono text-slate-500 tracking-wider font-extrabold uppercase mt-4 block">
                      REMAINING TIMEBLOCK INTERVAL
                    </span>
                  </div>

                  {/* Countdown controller buttons */}
                  <div className="flex flex-wrap justify-between items-center gap-4 pt-4 border-t border-slate-400/15">
                    <div className="flex items-center gap-1.5 font-mono">
                      {[10, 25, 50].map((mins) => (
                        <button
                          key={mins}
                          onClick={() => {
                            audio.playClick();
                            setTimerMinutes(mins);
                            setTimerSeconds(0);
                            setSelectedPresetTime(mins);
                            setIsTimerRunning(false);
                          }}
                          className={`px-3 py-2 min-h-[44px] min-w-[44px] rounded-xl text-xs font-black transition-all cursor-pointer border ${
                            selectedPresetTime === mins 
                              ? 'bg-rose-500/15 text-rose-600 dark:text-rose-450 border-rose-400 font-extrabold' 
                              : colorMode === 'LIGHT' ? 'bg-white border-slate-205 text-slate-650' : 'bg-slate-950 border-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          {mins}m
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2.5 font-sans">
                      <button
                        onClick={() => {
                          audio.playClick();
                          setIsTimerRunning(!isTimerRunning);
                        }}
                        className={`px-6 py-3 min-h-[44px] rounded-xl text-xs font-sans tracking-widest uppercase font-black flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer border ${
                          isTimerRunning 
                            ? 'bg-amber-500/15 text-amber-600 border-amber-400/30' 
                            : colorMode === 'LIGHT'
                              ? 'bg-slate-950 text-white border-slate-900 shadow-lg'
                              : 'bg-sky-500 border-sky-600 text-slate-950 hover:bg-sky-450 font-black'
                        }`}
                      >
                        {isTimerRunning ? <Pause className="w-4 h-4 text-amber-600" /> : <Play className="w-4 h-4" />}
                        <span>{isTimerRunning ? 'PAUSE' : 'START TIMER'}</span>
                      </button>

                      <button
                        onClick={() => {
                          audio.playClick();
                          setIsTimerRunning(false);
                          setTimerMinutes(selectedPresetTime);
                          setTimerSeconds(0);
                        }}
                        className={`p-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl transition-colors border cursor-pointer ${
                          colorMode === 'LIGHT' 
                            ? 'bg-white border-slate-250 text-slate-600' 
                            : 'bg-slate-950 border-white/5 text-slate-400 hover:text-white'
                        }`}
                        title="Reset countdown"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>

                {/* Water/Coffee tracking mug cup */}
                <div className="flex flex-col gap-4">
                  <div 
                    onClick={handleTakeSip}
                    className={`p-5 rounded-2xl border flex flex-col justify-between cursor-pointer relative group overflow-hidden transition-all duration-300 flex-grow ${panelBg} ${
                      isSipping 
                        ? 'border-emerald-500 ring-2 ring-emerald-500/15 shadow scale-[1.01]' 
                        : 'hover:border-emerald-500/40'
                    }`}
                  >
                    <div className="flex justify-between items-start leading-none">
                      <div className="relative">
                        <Coffee className={`w-10 h-10 text-amber-600 ${isSipping ? 'animate-bounce' : 'group-hover:scale-105 transition-transform'}`} />
                        {/* steam trails */}
                        <div className="absolute -top-3 left-4 flex flex-col gap-0.5 pointer-events-none">
                          <span className="h-1 w-[1.5px] bg-indigo-450 animate-pulse" />
                          <span className="h-1.5 w-[1px] bg-slate-400 animate-pulse" />
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-3xl font-black font-mono tabular-nums block text-indigo-500">
                          {focusSips}
                        </span>
                        <span className="text-xs font-mono text-slate-500 block uppercase font-black uppercase">
                          Sips Logged
                        </span>
                      </div>
                    </div>

                    <div className="my-3 space-y-1">
                      <h4 className="text-xs font-mono font-black uppercase text-slate-400 block">
                        Hydrate to Energize
                      </h4>
                      <p className="text-xs font-mono leading-relaxed text-slate-500">
                        "Compound micro actions, drink pure fluids periodically, and lock attention."
                      </p>
                    </div>

                    <div className={`p-2 rounded-xl text-center text-xs font-mono uppercase font-bold text-slate-500 ${subPanelBg}`}>
                      Click this tea cup to register fluid sips & trigger background sparks!
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border text-xs leading-normal shadow-sm ${
                    colorMode === 'LIGHT' ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-sky-500/5 border-sky-500/10 text-[#0ea5e9]'
                  }`}>
                    <span className="text-xs font-mono font-extrabold uppercase tracking-widest block mb-1">
                      Focus Routine Advice
                    </span>
                    Lock secondary alerts, keep digital items away from your desk workspace, and use slow nature volumes to ease stress.
                  </div>
                </div>

              </motion.div>
            )}

            {/* TAB 3: STUDY CHECKLIST & BOOK SHELF */}
            {activeTab === 'PLANNER' && (
              <motion.div
                key="planner_settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch"
              >
                
                {/* Clean Study checklist double-panel */}
                <div className={`xl:col-span-2 p-5 rounded-2xl border shadow-md flex flex-col gap-4 ${panelBg}`}>
                  <div className="border-b pb-3 flex justify-between items-center border-slate-400/15">
                    <h3 className="text-xs font-black font-mono uppercase text-[#0ea5e9]">
                      📝 Your Daily Study Agenda
                    </h3>
                    <span className="text-xs font-mono text-slate-500 uppercase font-black">
                      {tasks.filter((t) => t.completed).length}/{tasks.length} Done
                    </span>
                  </div>

                  {/* To Do Items List */}
                  <div className="space-y-2 py-1 flex-grow">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`p-3.5 rounded-xl border flex items-center justify-between transition-all group ${listInnerBg} ${
                          task.completed ? 'opacity-65' : ''
                        }`}
                      >
                        <div 
                          onClick={() => handleToggleTask(task.id)}
                          className="flex items-center gap-3 flex-grow cursor-pointer select-none"
                        >
                          <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                            task.completed 
                              ? 'bg-indigo-500 border-indigo-500 text-white' 
                              : 'bg-transparent border-slate-300 dark:border-white/20'
                          }`}>
                            {task.completed && <Check className="w-3.5 h-3.5 stroke-[4px]" />}
                          </div>
                          
                          <span className={`text-xs sm:text-sm font-sans font-semibold pr-3 leading-snug ${
                            task.completed ? 'line-through text-slate-450 dark:text-slate-500' : 'text-slate-700 dark:text-slate-205'
                          }`}>
                            {task.text}
                          </span>
                        </div>

                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 p-1.5 text-slate-400 hover:text-rose-500 transition-all rounded-lg cursor-pointer w-8 h-8 flex items-center justify-center min-h-[32px] min-w-[32px]"
                          title="Delete task"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    {tasks.length === 0 && (
                      <div className="text-center py-8 text-xs font-mono text-slate-500">
                        No active checklist targets. Draft some milestones below!
                      </div>
                    )}
                  </div>

                  {/* To Do Submit Form */}
                  <form onSubmit={handleAddTask} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Insert study checkpoint..."
                      value={newTaskText}
                      onChange={(e) => setNewTaskText(e.target.value)}
                      maxLength={70}
                      className={`flex-grow rounded-xl px-4 py-3 text-xs outline-none ${inputBg}`}
                    />
                    <button
                      type="submit"
                      className="px-4.5 py-3 min-h-[44px] bg-indigo-500 hover:bg-indigo-650 text-white rounded-xl text-xs font-sans font-black uppercase cursor-pointer shrink-0 transition-transform active:scale-95 flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>ADD Task</span>
                    </button>
                  </form>
                </div>

                {/* Curated focus library insights shelf list */}
                <div className={`p-5 rounded-2xl border flex flex-col gap-3.5 shadow-sm justify-between ${panelBg}`}>
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-slate-500 tracking-wider uppercase block">
                      Focus Book Library
                    </span>
                    <div className="border-b pb-2.5 flex justify-between items-center border-slate-400/15">
                      <h3 className="text-xs font-black font-mono uppercase text-slate-750 dark:text-slate-200 flex items-center gap-1.5 block">
                        <BookOpen className="w-4 h-4 text-emerald-500" />
                        <span>Insight Vault</span>
                      </h3>
                      <span className="text-xs font-mono text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded uppercase font-black leading-none">
                        Tactics
                      </span>
                    </div>
                  </div>

                  {/* Book list items */}
                  <div className="space-y-2 flex-grow overflow-y-auto">
                    {(theme === 'RELAXING_MIND' ? RACING_DOSSIERS : CLASSIC_BOOKS).map((book) => (
                      <div
                        key={book.id}
                        onClick={() => handleBookClick(book)}
                        className={`p-3 border rounded-xl cursor-pointer transition-all flex items-center justify-between group ${listInnerBg} hover:translate-x-0.5`}
                      >
                        <div className="flex items-center gap-2 overflow-hidden pr-2">
                          <div className={`h-8 w-1.5 rounded-full bg-gradient-to-b ${book.bannerColor}`} />
                          <div className="overflow-hidden leading-snug">
                            <h4 className="text-xs font-bold uppercase truncate text-slate-705 dark:text-slate-100">
                              {book.title}
                            </h4>
                            <span className="text-xs font-mono text-slate-400 truncate block">by {book.author}</span>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-indigo-500 font-black shrink-0 transition-transform uppercase leading-none">
                          {"READ >"}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className={`p-3 text-xs font-mono leading-relaxed border border-dashed rounded-xl text-slate-500 ${subPanelBg}`}>
                    Tip: Read summaries and choose micro-habits to immediately insert them inside your active agenda!
                  </div>
                </div>

              </motion.div>
            )}

            {/* TAB 4: RETRO SOUND FLUID AUDIO PLAYER & VOLUME MIXER */}
            {activeTab === 'AMBIENT' && (
              <motion.div
                key="ambient_settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch"
              >
                
                {/* Retro cassette tape workspace player */}
                <div className="flex flex-col">
                  <DeviceAudioPlayer
                    colorMode={colorMode}
                    panelBg={panelBg}
                    subPanelBg={subPanelBg}
                    listInnerBg={listInnerBg}
                    inputBg={inputBg}
                  />
                </div>

                {/* Natural sound slidders mixers */}
                <div className={`p-5 rounded-2xl border flex flex-col gap-4 shadow-md ${panelBg}`}>
                  <div className="border-b pb-3 flex justify-between items-center border-slate-400/15">
                    <h3 className="text-xs font-black font-mono uppercase text-teal-500 flex items-center gap-1.5">
                      <Wind className="w-4 h-4 text-teal-400 animate-pulse" />
                      <span>Soundscape Volume Mixer</span>
                    </h3>
                    <span className="text-xs font-mono text-teal-600 bg-teal-500/10 px-2 py-0.5 rounded-lg font-black uppercase">
                      Atmosphere
                    </span>
                  </div>

                  <div className="space-y-4">
                    
                    {/* Summer chirp volume */}
                    <div className={`p-2 rounded-xl transition-all ${
                      season === 'SUMMER' ? 'bg-amber-500/5 border border-amber-500/10' : 'border border-transparent'
                    }`}>
                      <div className="flex justify-between text-xs font-sans font-bold text-slate-700 dark:text-slate-300 mb-2">
                        <span className="flex items-center gap-1">
                          ☀️ Summer Forest Birds {season === 'SUMMER' && <span className="text-xs bg-amber-400/25 text-amber-700 px-1 rounded font-black uppercase">Active</span>}
                        </span>
                        <span className="text-indigo-400 font-extrabold font-mono">{summerVolume}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={summerVolume}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          setSummerVolume(v);
                          if (isSynthesizerActive) audio.adjustSummerVolume(v);
                        }}
                        disabled={!isSynthesizerActive}
                        className="w-full h-1.5 rounded-lg outline-none accent-indigo-500 bg-slate-200 dark:bg-slate-800 disabled:opacity-20 cursor-pointer"
                      />
                    </div>

                    {/* Night crickets volume */}
                    <div className={`p-2 rounded-xl transition-all ${
                      season === 'NIGHT' ? 'bg-indigo-500/5 border border-indigo-500/10' : 'border border-transparent'
                    }`}>
                      <div className="flex justify-between text-xs font-sans font-bold text-slate-700 dark:text-slate-300 mb-2">
                        <span className="flex items-center gap-1">
                          🌙 Midnight Insects {season === 'NIGHT' && <span className="text-xs bg-indigo-450/20 text-indigo-400 px-1 rounded font-black uppercase">Active</span>}
                        </span>
                        <span className="text-indigo-400 font-extrabold font-mono">{nightVolume}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={nightVolume}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          setNightVolume(v);
                          if (isSynthesizerActive) audio.adjustNightVolume(v);
                        }}
                        disabled={!isSynthesizerActive}
                        className="w-full h-1.5 rounded-lg outline-none accent-indigo-500 bg-slate-200 dark:bg-slate-800 disabled:opacity-20 cursor-pointer"
                      />
                    </div>

                    {/* Raining droplets volume */}
                    <div className={`p-2 rounded-xl transition-all ${
                      season === 'RAINY' ? 'bg-teal-500/5 border border-teal-500/10' : 'border border-transparent'
                    }`}>
                      <div className="flex justify-between text-xs font-sans font-bold text-slate-700 dark:text-slate-300 mb-2">
                        <span className="flex items-center gap-1">
                          🌧️ Rainfall droplets {season === 'RAINY' && <span className="text-xs bg-teal-400/25 text-teal-700 px-1 rounded font-black uppercase">Active</span>}
                        </span>
                        <span className="text-indigo-400 font-extrabold font-mono">{rainVolume}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={rainVolume}
                        onChange={(e) => handleRainVolumeChange(Number(e.target.value))}
                        disabled={!isSynthesizerActive}
                        className="w-full h-1.5 rounded-lg outline-none accent-indigo-500 bg-slate-200 dark:bg-slate-800 disabled:opacity-20 cursor-pointer"
                      />
                    </div>

                    {/* Winter wind blizzard volume */}
                    <div className={`p-2 rounded-xl transition-all ${
                      season === 'WINTER' ? 'bg-cyan-500/5 border border-cyan-500/10' : 'border border-transparent'
                    }`}>
                      <div className="flex justify-between text-xs font-sans font-bold text-slate-700 dark:text-slate-300 mb-2">
                        <span className="flex items-center gap-1">
                          ❄️ Cold blizzards {season === 'WINTER' && <span className="text-xs bg-cyan-400/20 text-cyan-600 px-1 rounded font-black uppercase">Active</span>}
                        </span>
                        <span className="text-indigo-400 font-extrabold font-mono">{winterVolume}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={winterVolume}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          setWinterVolume(v);
                          if (isSynthesizerActive) audio.adjustWinterVolume(v);
                        }}
                        disabled={!isSynthesizerActive}
                        className="w-full h-1.5 rounded-lg outline-none accent-indigo-500 bg-slate-200 dark:bg-slate-800 disabled:opacity-20 cursor-pointer"
                      />
                    </div>

                    {/* Pentatonic chimes */}
                    <div className="p-2 border border-transparent">
                      <div className="flex justify-between text-xs font-sans font-bold text-slate-700 dark:text-slate-300 mb-2">
                        <span>🎹 Cozy Ambient Chimes Bells</span>
                        <span className="text-indigo-400 font-extrabold font-mono">{chimeVolume}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={chimeVolume}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          setChimeVolume(v);
                          if (isSynthesizerActive) audio.startFocusChimes(v);
                        }}
                        disabled={!isSynthesizerActive}
                        className="w-full h-1.5 rounded-lg outline-none accent-indigo-500 bg-slate-200 dark:bg-slate-800 disabled:opacity-20 cursor-pointer"
                      />
                    </div>

                  </div>
                </div>

              </motion.div>
            )}

            {/* TAB 5: MINDFUL FOCUS GAMES (CHESS, SUDOKU, MEMORY, QUIZ) */}
            {activeTab === 'GAMES' && (
              <motion.div
                key="games_settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className={`p-5 rounded-2xl border shadow-md relative overflow-hidden flex flex-col gap-4 ${panelBg}`}>
                  <div className="flex justify-between items-center border-b pb-3.5 border-slate-400/10">
                    <div className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-emerald-500 animate-pulse" />
                      <h3 className="text-sm font-black font-mono uppercase text-emerald-500">
                        🧩 SHARPEN CONCENTRATION CORES
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-slate-450 uppercase font-black">
                      Cognitive Workout
                    </span>
                  </div>

                  {/* Relaxing games component injection */}
                  <div className="mt-1">
                    <RelaxingMindGames
                      colorMode={colorMode}
                      subPanelBg={subPanelBg}
                      listInnerBg={listInnerBg}
                      cardInnerBg={listInnerBg}
                      onActionComplete={onTickActivity}
                    />
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </section>

      </div>

      {/* =======================================================
          PINNED STICKIES NOTES PINBOARD (RENDERED DISCREETLY AT BOTTOM OF PAGE)
          ======================================================= */}
      <section className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-4 items-center gap-4 bg-white dark:bg-zinc-900/60 p-3.5 rounded-xl border border-dashed border-slate-300 dark:border-slate-400/15 shadow-sm backdrop-blur-sm pointer-events-auto mt-3">
        
        {/* Board title */}
        <div className="leading-tight">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-extrabold block">
            Adhesive Post-it pins
          </span>
          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-350 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '8s' }} />
            <span>QUICK DESK NOTES</span>
          </h4>
        </div>

        {/* Slided display of notes */}
        <div className="md:col-span-3 flex flex-wrap items-center gap-2">
          {stickies.map((s) => {
            const colorsMap = {
              yellow: {
                bg: 'bg-amber-500/15 hover:bg-amber-500/25 border-amber-500/30',
                text: 'text-amber-700 dark:text-amber-450 font-black',
              },
              blue: {
                bg: 'bg-sky-500/15 hover:bg-sky-500/25 border-sky-500/30',
                text: 'text-sky-700 dark:text-sky-400 font-black',
              },
              pink: {
                bg: 'bg-pink-500/15 hover:bg-pink-500/25 border-pink-500/30',
                text: 'text-pink-700 dark:text-pink-400 font-black',
              },
              emerald: {
                bg: 'bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-500/30',
                text: 'text-emerald-700 dark:text-emerald-400 font-black',
              },
            };
            const cStyles = colorsMap[s.color] || colorsMap.yellow;
            return (
              <div
                key={s.id}
                className={`px-3 py-1 border rounded-lg flex items-center justify-between gap-2.5 shadow-sm group transition-all ${cStyles.bg}`}
              >
                <span className={`text-xs font-mono block truncate max-w-[170px] uppercase ${cStyles.text}`}>
                  📌 {s.text}
                </span>
                <button
                  onClick={() => handleDeleteSticky(s.id)}
                  className="text-red-500 hover:text-red-650 dark:hover:text-red-400 font-extrabold transition-colors font-mono text-xs w-4 h-4 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-200/50 dark:hover:bg-zinc-800/50"
                  title="Remove sticky memo"
                >
                  ×
                </button>
              </div>
            );
          })}
          
          {/* Text submission */}
          <form onSubmit={handleAddSticky} className="flex gap-2 items-center flex-wrap flex-grow max-w-[460px]">
            <input
              type="text"
              placeholder="+ New Sticky note memo..."
              value={newStickyText}
              onChange={(e) => setNewStickyText(e.target.value)}
              maxLength={15}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-mono outline-none max-w-[150px] sm:max-w-[170px] ${inputBg}`}
            />
            {/* Tiny interactive color selectors to assign custom colors */}
            <div className="flex items-center gap-1 bg-slate-100/50 dark:bg-black/20 px-1.5 py-1 rounded-lg border border-slate-300/30">
              {[
                { name: 'yellow', colorClass: 'bg-amber-400 border-amber-500' },
                { name: 'blue', colorClass: 'bg-sky-400 border-sky-500' },
                { name: 'pink', colorClass: 'bg-pink-400 border-pink-500' },
                { name: 'emerald', colorClass: 'bg-emerald-400 border-emerald-500' }
              ].map((colorItem) => (
                <button
                  key={colorItem.name}
                  type="button"
                  title={`Select ${colorItem.name}`}
                  onClick={() => setNewStickyColor(colorItem.name as any)}
                  className={`w-3.5 h-3.5 rounded-full border cursor-pointer transition-all ${colorItem.colorClass} ${
                    newStickyColor === colorItem.name 
                      ? 'scale-125 border-slate-900 dark:border-white ring-1 ring-amber-550' 
                      : 'opacity-70 hover:opacity-100 border-transparent hover:scale-115'
                  }`}
                />
              ))}
            </div>
            <button
              type="submit"
              className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg text-xs font-mono font-black uppercase cursor-pointer"
            >
              PIN
            </button>
          </form>
        </div>
      </section>

      {/* =======================================================
          TACTICS MODAL DRAWER
          ======================================================= */}
      <AnimatePresence>
        {activeBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm pointer-events-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className={`max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl relative border ${
                colorMode === 'LIGHT' ? 'bg-white border-slate-350 text-slate-800' : 'bg-slate-900 border-slate-800 text-slate-100'
              }`}
            >
              <div className={`p-6 bg-gradient-to-r ${activeBook.bannerColor} text-white flex justify-between items-start`}>
                <div className="leading-tight">
                  <span className="text-xs font-mono tracking-widest text-sky-200 bg-slate-950/40 px-2 py-0.5 rounded font-black uppercase inline-block mb-1">
                    Book Insight Summaries
                  </span>
                  <h3 className="text-lg sm:text-xl font-black uppercase mt-1">
                    {activeBook.title}
                  </h3>
                  <span className="text-xs text-slate-300">by {activeBook.author}</span>
                </div>

                <button
                  onClick={() => {
                    audio.playClick();
                    setActiveBook(null);
                  }}
                  className="px-3 py-1.5 bg-slate-950/40 hover:bg-slate-950 text-white rounded-lg text-xs font-mono border border-white/20 cursor-pointer"
                >
                  CLOSE
                </button>
              </div>

              <div className="p-6 space-y-4 leading-normal">
                <div className="space-y-1.5">
                  <span className="text-xs font-mono font-black text-slate-400 uppercase tracking-widest block">
                    Core Premise
                  </span>
                  <p className={`text-xs font-mono leading-relaxed p-3.5 rounded-xl border select-text ${
                    colorMode === 'LIGHT' ? 'bg-slate-50 border-slate-205 text-slate-600' : 'bg-slate-950/80 border-slate-800 text-slate-300'
                  }`}>
                    {activeBook.summary}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-black text-slate-400 uppercase tracking-widest block">
                    Adoptable Micro-Tactics
                  </span>
                  <div className="space-y-1.5">
                    {activeBook.tactics.map((tactic, i) => (
                      <button
                        key={i} 
                        onClick={() => {
                          audio.playClick();
                          const customTask: DailyTask = {
                            id: Date.now().toString() + i,
                            text: `${activeBook.title.split(' ')[0]}: ${tactic}`,
                            completed: false
                          };
                          setTasks((prev) => [...prev, customTask]);
                          setActiveBook(null);
                          audio.playConfirm();
                        }}
                        className={`w-full p-3.5 rounded-xl flex items-center justify-between text-left text-xs font-sans font-bold group cursor-pointer transition-all border ${
                          colorMode === 'LIGHT' 
                            ? 'bg-slate-50 hover:bg-indigo-50/50 border-slate-200 text-slate-800 hover:border-indigo-300' 
                            : 'bg-slate-950 hover:bg-slate-800 border-white/5 text-slate-300'
                        }`}
                      >
                        <span className="leading-snug pr-3 group-hover:text-indigo-400">{tactic}</span>
                        <span className="text-xs text-teal-600 group-hover:text-emerald-500 uppercase shrink-0 font-extrabold font-mono">
                          + ADD TO PLAN
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className={`px-6 py-3.5 border-t text-xs font-mono text-center uppercase ${
                colorMode === 'LIGHT' ? 'bg-slate-50 border-slate-200 text-slate-500' : 'bg-slate-950/60 border-slate-800 text-slate-500'
              }`}>
                Tip: Click any micro-tactic to load it automatically as an active checklist item inside your notebook agenda!
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

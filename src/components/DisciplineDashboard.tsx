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
<<<<<<< HEAD
=======
  Square, 
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
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
<<<<<<< HEAD
  Clock,
  Edit2,
  Gamepad2,
  ChevronRight
=======
  CloudRain,
  Snowflake,
  Clock
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
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
<<<<<<< HEAD
}

// Curated focus book summaries
=======
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
}

// Solid curated information on the 4 classic focus books
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
const CLASSIC_BOOKS: BookInfo[] = [
  {
    id: 'mindset',
    title: 'Mindset',
    author: 'Carol S. Dweck',
<<<<<<< HEAD
    bannerColor: 'from-blue-600 to-indigo-800',
    summary: 'Embracing challenges and viewing failures not as evidence of intelligence but as a heartening springboard for growth is paramount.',
    tactics: [
      'Praise effort expended, not fixed talent',
      'Choose challenging hurdles over comfort zones',
=======
    bannerColor: 'from-blue-700/80 to-indigo-900/80',
    summary: 'The core tenet is that our abilities are not fixed. Embracing challenges and viewing failures not as evidence of unitelligence but as a heartening springboard for growth and stretching our existing abilities is paramount.',
    tactics: [
      'Praise the effort expended, not fixed talent',
      'Choose challenging hurdles rather than easy comfort zones',
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
      'Transform setbacks into calibration routines'
    ]
  },
  {
    id: 'atomic_habits',
    title: 'Atomic Habits',
    author: 'James Clear',
<<<<<<< HEAD
    bannerColor: 'from-amber-600 to-red-800',
    summary: 'Small, easy daily improvements compound over time into incredible results through systemized habit environments.',
    tactics: [
      'Practice the 1% daily improvement rule',
      'Use the Two-Minute Rule to beat inertia',
      'Optimize environmental cues for good habits'
=======
    bannerColor: 'from-amber-600/80 to-red-900/80',
    summary: 'An atomic habit is a regular practice or routine that is not only small and easy to do but is also the source of incredible power; a component of the system of compound growth.',
    tactics: [
      'The 1% daily improvement rule',
      'The Two-Minute Rule to defeat inertia',
      'Optimize environmental triggers for good habits'
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
    ]
  },
  {
    id: 'five_am_club',
    title: 'The 5 AM Club',
    author: 'Robin Sharma',
<<<<<<< HEAD
    bannerColor: 'from-sky-600 to-cyan-800',
    summary: 'Using early morning victory hours to shield psychological assets, reclaim focus, and compound inner discipline.',
    tactics: [
      'The 20/20/20 Formula (Move, Reflect, Grow)',
      'Construct a calming pre-sleep environment',
      'Protect mental bandwidth from digital alerts'
=======
    bannerColor: 'from-sky-700/80 to-cyan-900/80',
    summary: 'Embracing the primary victory hour of early mornings allows individuals to shield their psychological assets, reclaim peak genius, and compound inner discipline before the rest of the world awakes.',
    tactics: [
      'The 20/20/20 Formula (Move, Reflect, Grow)',
      'Construct a pre-sleep recovery environment',
      'Protect mental bandwidth from digital traps'
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
    ]
  },
  {
    id: 'deep_work',
    title: 'Deep Work',
    author: 'Cal Newport',
<<<<<<< HEAD
    bannerColor: 'from-slate-600 to-zinc-800',
    summary: 'Distraction-free concentration blocks that push cognitive capabilities to their absolute limits and produce peak quality work.',
=======
    bannerColor: 'from-slate-700/80 to-zinc-900/80',
    summary: 'Professional activities performed in a state of distraction-free concentration that push your cognitive capabilities to their limit. These efforts create new value, improve your skill, and are hard to replicate.',
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
    tactics: [
      'Schedule concrete timeblocks for deep focus',
      'Embrace pure boredom to retrain attention capacity',
      'Implement structured shutdown rituals daily'
    ]
  }
];

<<<<<<< HEAD
=======
const RACING_QUOTES = [
  {
    text: "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.",
    author: "Thich Nhat Hanh"
  },
  {
    text: "The mind is like water. When it's turbulent, it's difficult to see. When it's calm, everything becomes clear.",
    author: "Prasad Mahes"
  },
  {
    text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
    author: "Buddha"
  },
  {
    text: "Silence is a source of Great Strength. Unwind the cognitive gears and seek simple clarity.",
    author: "Lao Tzu"
  },
  {
    text: "Within you, there is a stillness and a sanctuary to which you can retreat at any time and be yourself.",
    author: "Hermann Hesse"
  }
];

>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
const RACING_DOSSIERS: BookInfo[] = [
  {
    id: 'zen_garden',
    title: 'Flow State Zen Garden',
    author: 'Cognitive Balance Guide',
<<<<<<< HEAD
    bannerColor: 'from-teal-600 to-emerald-850',
    summary: 'A guide to entering deep distraction-free flow through pattern focus, rhythmic loops, and breathing awareness.',
    tactics: [
      'Focus strictly on the immediate block or cell',
      'Recognize logical connections with ease',
=======
    bannerColor: 'from-[#0d9488] to-[#111827]',
    summary: 'A manual on entering deeper, distraction-free concentration through puzzles. Emphasizes visual geometry, pattern analysis, and the release of task tension.',
    tactics: [
      'Focus strictly on the immediate move or cell',
      'Recognize logical links without forced strain',
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
      'Inhale slowly whenever finding a correct pair'
    ]
  },
  {
    id: 'neuro_synergy',
    title: 'Bilateral Synapse Synergy',
<<<<<<< HEAD
    author: 'Brain Lab Guide',
    bannerColor: 'from-sky-600 to-blue-800',
    summary: 'Exploring how strategic puzzles and cerebral Chess simulations stimulate quick thinking and cognitive clarity.',
    tactics: [
      'Engage both brain chambers with recall memory',
      'Analyze the Chess AI movements step-by-step',
      'Develop patience through paced intellectual gaming'
=======
    author: 'Brain Fitness Lab Manual',
    bannerColor: 'from-[#0ea5e9] to-[#0f172a]',
    summary: 'Exploring how solving lateral logic puzzles and playing strategic chess stimulates neuroplasticity, rewiring neural connections to support daily study efficiency.',
    tactics: [
      'Engage dual hemispheres through memory flip games',
      'Predict Chess AI actions with strategic vision',
      'Calibrate focus depth over longer gaming sessions'
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
    ]
  },
  {
    id: 'chimes_breathe',
    title: 'Acoustic Sound Healing',
<<<<<<< HEAD
    author: 'Audio Therapy Principles',
    bannerColor: 'from-yellow-600 to-indigo-900',
    summary: 'Blends nature sounds (rain, insects, summer birds) with slow-paced gameplay to calm anxiety and renew focus.',
    tactics: [
      'Blend lofi mixtape with rain volume levels',
      'Align slow breath cycles with chiming bells',
      'Sip fresh warm coffee or hot tea systematically'
=======
    author: 'Therapeutic Audio Principles',
    bannerColor: 'from-[#eab308] to-[#1e1b4b]',
    summary: 'Mastering the integration of natural white noise (like rain, night insects, and summer birds) with slow-paced gameplay to quiet the amygdala and reduce cortisol.',
    tactics: [
      'Blend lofi cassette tapes with rain sliders',
      'Align breath cycles with active sound chimes',
      'Take relaxing focus coffee sips to refresh tactile focus'
    ]
  },
  {
    id: 'stoic_stillness',
    title: 'Letters from a Quiet Study',
    author: 'Zen Philosophers Compendium',
    bannerColor: 'from-[#10b981] to-[#022c22]',
    summary: 'Stoic and Zen tactics on guarding the inner study space against digital alerts, maintaining tranquility during intense academic deadlines or daily tasks.',
    tactics: [
      'Acknowledge digital notifications as passing clouds',
      'Differentiate between reaction and deliberate action',
      'Dwell entirely inside the physical desk environment'
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
    ]
  }
];

<<<<<<< HEAD
type ActiveTab = 'WORKSPACE' | 'TIMER' | 'PLANNER' | 'AMBIENT' | 'GAMES';

=======
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
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
<<<<<<< HEAD
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
=======
  colorMode,
  setColorMode,
}) => {
  // Dynamic colorMode style coordinates for pristine responsive look in light/dark theme with high-end glassmorphism / glossy reflections
  const panelBg = colorMode === 'LIGHT'
    ? 'bg-white/35 backdrop-blur-lg border border-white/60 shadow-[inset_0_1px_3px_rgba(255,255,255,0.8),0_8px_32px_rgba(148,163,184,0.12)] text-slate-800'
    : 'bg-black/20 backdrop-blur-2xl border border-white/8 shadow-[inset_0_1.5px_2.5px_rgba(255,255,255,0.08),0_12px_45px_rgba(0,0,0,0.5)] text-white';

  const subPanelBg = colorMode === 'LIGHT'
    ? 'bg-white/25 backdrop-blur-md border border-white/30 text-slate-705 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] shadow-sm'
    : 'bg-slate-950/25 backdrop-blur-xl border border-white/5 text-slate-300 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.03)]';

  const cardInnerBg = colorMode === 'LIGHT'
    ? 'bg-white/20 hover:bg-white/45 border border-white/25 text-slate-800 transition-all duration-300 shadow-sm'
    : 'bg-white/3 hover:bg-white/8 border border-white/5 hover:border-amber-500/25 transition-all duration-300 shadow-[inset_0_0.5px_1px_rgba(255,255,255,0.02)]';

  const listInnerBg = colorMode === 'LIGHT'
    ? 'bg-white/20 hover:bg-white/35 border border-white/10 text-slate-700 transition-all duration-200'
    : 'bg-white/2 hover:bg-white/5 border border-white/3 hover:border-white/6 transition-all duration-200';

  const textPrimary = colorMode === 'LIGHT' ? 'text-slate-850 font-semibold' : 'text-slate-100';
  const textSecondary = colorMode === 'LIGHT' ? 'text-slate-650' : 'text-slate-400';
  const textMuted = colorMode === 'LIGHT' ? 'text-slate-450' : 'text-slate-500';
  const inputBg = colorMode === 'LIGHT'
    ? 'bg-white/20 border border-white/30 text-slate-900 placeholder-slate-450 focus:border-amber-550 focus:bg-white/80'
    : 'bg-[#ffffff02] border border-white/3 text-slate-205 placeholder-slate-500 focus:border-amber-500/40 focus:bg-[#ffffff08]';

  const borderSub = colorMode === 'LIGHT' ? 'border-slate-200/65' : 'border-white/10';
  const borderMuted = colorMode === 'LIGHT' ? 'border-slate-150/70' : 'border-[#ffffff07]';

  // Mobile navigation tab state
  const [mobileTab, setMobileTab] = useState<'WORKSPACE' | 'TIMER' | 'PLANNER' | 'AMBIENT'>('WORKSPACE');

  // Responsive layout state to toggle between duplicate mounts gracefully
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280); // Match Tailwind's xl layout breakpoint
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 1. Task lists notebooks states
  const [tasks, setTasks] = useState<DailyTask[]>([
    { id: '1', text: 'Study Deep Work Focus Block', completed: false },
    { id: '2', text: 'Hydrate with hot tea / coffee', completed: true },
    { id: '3', text: 'Read James Clear 1% Rules', completed: false },
    { id: '4', text: 'Minimize digital friction (No Phone)', completed: false },
  ]);
  const [newTaskText, setNewTaskText] = useState('');

  // 2. Interactive Sticky notes states
  const [stickies, setStickies] = useState<StickyNote[]>([
    { id: 's1', text: 'NO PHONE', color: 'yellow' },
    { id: 's2', text: 'NO DISTRACTIONS', color: 'pink' },
    { id: 's3', text: 'JUST PROGRESS', color: 'emerald' },
  ]);
  const [newStickyText, setNewStickyText] = useState('');
  const [newStickyColor, setNewStickyColor] = useState<'yellow' | 'pink' | 'emerald'>('yellow');

  // 3. Audio mixer states
  const [rainVolume, setRainVolume] = useState(25);
  const [chimeVolume, setChimeVolume] = useState(15);
  const [summerVolume, setSummerVolume] = useState(25);
  const [nightVolume, setNightVolume] = useState(25);
  const [winterVolume, setWinterVolume] = useState(25);
  const [isSynthesizerActive, setIsSynthesizerActive] = useState(true);

  // 4. Pomodoro / Digital screen timer states
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [selectedPresetTime, setSelectedPresetTime] = useState(25);

<<<<<<< HEAD
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
=======
  // 5. Sip Mug focus level indicator
  const [focusSips, setFocusSips] = useState(3);
  const [isSipping, setIsSipping] = useState(false);

  // 6. Selected book details modal trigger
  const [activeBook, setActiveBook] = useState<BookInfo | null>(null);

  // F1 theme specific state
  const [raceQuoteIndex, setRaceQuoteIndex] = useState(0);

  // 7. General Clock State for background screen element
  const [currentTime, setCurrentTime] = useState('10:00');

  // Cozy Customisable Greeting Name State (matching HELLO, Alinne of user attachment)
  const [userName, setUserName] = useState('Alinne');
  const [isEditingName, setIsEditingName] = useState(false);

  // Cozy Customisable Weather Location State (matching 'RIO DE JANEIRO' default)
  const [locationName, setLocationName] = useState('RIO DE JANEIRO');
  const [isEditingLocation, setIsEditingLocation] = useState(false);

  // Sync actual real clock
  useEffect(() => {
    const updateRealTime = () => {
      const now = new Date();
      let hours = now.getHours();
      let mins: any = now.getMinutes();
      if (mins < 10) mins = '0' + mins;
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // safety 0
      setCurrentTime(`${hours}:${mins} ${ampm}`);
    };
    updateRealTime();
    const clockInt = setInterval(updateRealTime, 30000);
    return () => clearInterval(clockInt);
  }, []);

  // Sync Synthesizers
  useEffect(() => {
    if (isSynthesizerActive) {
      audio.stopAllSeasonalEffects();

>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
      if (season === 'SUMMER') {
        audio.startSummerAmbient(summerVolume);
      } else if (season === 'NIGHT') {
        audio.startNightAmbient(nightVolume);
      } else if (season === 'RAINY') {
        audio.startRainyAmbient(rainVolume);
      } else if (season === 'WINTER') {
        audio.startWinterAmbient(winterVolume);
      }
<<<<<<< HEAD
=======

>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
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

<<<<<<< HEAD
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
=======
  // Pomodoro Countdown Mechanism
  useEffect(() => {
    let tickInterval: any = null;
    if (isTimerRunning) {
      tickInterval = setInterval(() => {
        onTickActivity(); // triggers sparkles flutter in three scene
        
        if (timerSeconds > 0) {
          setTimerSeconds(s => s - 1);
        } else if (timerSeconds === 0) {
          if (timerMinutes > 0) {
            setTimerMinutes(m => m - 1);
            setTimerSeconds(59);
          } else {
            // Alarm sequence!
            setIsTimerRunning(false);
            audio.playPomodoroSignal();
            setIsLampOn(true); // alerts user by brightening light
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
          }
        }
      }, 1000);
    }
<<<<<<< HEAD
    return () => clearInterval(interval);
  }, [isTimerRunning, timerMinutes, timerSeconds]);

  // Change rain volume helper
=======
    return () => clearInterval(tickInterval);
  }, [isTimerRunning, timerMinutes, timerSeconds]);

  // Handle rain slider adjustments
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
  const handleRainVolumeChange = (vol: number) => {
    setRainVolume(vol);
    if (isSynthesizerActive) {
      audio.adjustRainVolume(vol);
    }
  };

<<<<<<< HEAD
=======
  // Dynamic book click logic
  const handleBookClick = (book: BookInfo) => {
    audio.playClick();
    setActiveBook(book);
  };

>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
  const handleToggleLamp = () => {
    audio.playClick();
    setIsLampOn(!isLampOn);
  };

  const handleTakeSip = () => {
    if (isSipping) return;
    setIsSipping(true);
<<<<<<< HEAD
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
=======
    audio.playBeep(880, 0.2, 'sine', 0.1);
    setTimeout(() => {
      audio.playBeep(440, 0.12, 'sine', 0.08);
      setFocusSips(s => s + 1);
      setIsSipping(false);
      onTickActivity();
    }, 450);
  };

  // List notebook edits
  const handleToggleTask = (id: string) => {
    audio.playClick();
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    audio.playClick();
<<<<<<< HEAD
    setTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), text: newTaskText.trim(), completed: false }
    ]);
=======
    const newTask: DailyTask = {
      id: Date.now().toString(),
      text: newTaskText.trim(),
      completed: false
    };
    setTasks(prev => [...prev, newTask]);
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
    setNewTaskText('');
  };

  const handleDeleteTask = (id: string) => {
    audio.playClick();
<<<<<<< HEAD
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

=======
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // Sticky notes edits
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
  const handleAddSticky = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStickyText.trim()) return;
    audio.playClick();
<<<<<<< HEAD
    setStickies((prev) => [
      ...prev,
      { id: Date.now().toString(), text: newStickyText.trim().toUpperCase(), color: newStickyColor }
    ]);
=======
    const newS: StickyNote = {
      id: Date.now().toString(),
      text: newStickyText.trim().toUpperCase(),
      color: 'yellow' // simplified standard cozy yellow
    };
    setStickies(prev => [...prev, newS]);
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
    setNewStickyText('');
  };

  const handleDeleteSticky = (id: string) => {
    audio.playClick();
<<<<<<< HEAD
    setStickies((prev) => prev.filter((s) => s.id !== id));
  };

  const handleBookClick = (book: BookInfo) => {
    audio.playClick();
    setActiveBook(book);
  };

=======
    setStickies(prev => prev.filter(s => s.id !== id));
  };

  // Switch between focus layout or track drift layout
  const handlePresetChange = (presetTheme: SpaceTheme) => {
    audio.playConfirm();
    setTheme(presetTheme);
  };

  // Custom Quick Preset actions (focus and estudar matching user image)
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
  const handleQuickFocus = () => {
    audio.playConfirm();
    setTimerMinutes(25);
    setTimerSeconds(0);
    setIsTimerRunning(true);
    setChimeVolume(60);
    setIsSynthesizerActive(true);
<<<<<<< HEAD
=======
    if (isSynthesizerActive) {
      audio.startFocusChimes(60);
    }
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
    onTickActivity();
  };

  const handleQuickStudy = () => {
    audio.playConfirm();
    setTimerMinutes(50);
    setTimerSeconds(0);
    setIsTimerRunning(true);
    setRainVolume(70);
    setIsSynthesizerActive(true);
<<<<<<< HEAD
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
=======
    if (isSynthesizerActive) {
      audio.startRainSound(70);
    }
    onTickActivity();
  };

  // Dynamic weekday helper for the aesthetic vertical text line
  const targetDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const weekdayVertical = targetDay.toUpperCase().split('');

  return (
    <div className={`absolute inset-0 pointer-events-auto z-10 flex flex-col justify-between font-sans p-2 sm:p-5 overflow-y-auto ${colorMode === 'LIGHT' ? 'text-slate-800' : 'text-white'}`}>
      
      {/* 1. TOP HEADER NAVIGATION DECK */}
      <header className="w-full flex-shrink-0 flex flex-col lg:flex-row justify-between items-center pointer-events-auto py-2 gap-3 z-20">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className={`p-2 rounded-lg border backdrop-blur-md ${colorMode === 'LIGHT' ? 'bg-white/90 border-slate-300' : 'bg-black/75 border-slate-800'}`}>
              <Flame 
                className="w-4 h-4 transition-colors duration-300" 
                style={isLampOn ? { color: LAMP_COLORS.find(c => c.id === lampColor)?.hex || '#f59e0b', filter: `drop-shadow(0 0 4px ${LAMP_COLORS.find(c => c.id === lampColor)?.hex || '#f59e0b'})` } : { color: '#64748b' }} 
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className={`text-[10px] font-mono tracking-widest uppercase font-bold ${colorMode === 'LIGHT' ? 'text-emerald-700' : 'text-[#0ea5e9]'}`}>MINDSET SYSTEM STABILIZED</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h1 className={`text-base sm:text-lg font-black tracking-wider uppercase font-serif select-none mt-0.5 ${colorMode === 'LIGHT' ? 'text-slate-900' : 'text-white'}`}>
              VELOCITY & DISCIPLINE MATRIX
            </h1>
          </div>
        </div>

        {/* TOP ACCENTS CONTROL BAR */}
        <div className="hidden xl:flex flex-wrap items-center justify-center gap-2.5">
          {/* 4 SEASONS SELECTOR (EXCELLENT FOR USER'S REQ) */}
          {theme === 'COZY_DESK' && (
            <div className={`backdrop-blur-md border rounded-lg p-0.5 flex gap-1 items-center ${colorMode === 'LIGHT' ? 'bg-slate-200/90 border-slate-300' : 'bg-black/70 border-slate-800'}`}>
              <button
                onClick={() => { audio.playClick(); setSeason('SUMMER'); }}
                className={`px-2 py-1 rounded text-[9px] font-mono font-bold tracking-wider flex items-center gap-1 uppercase transition-all ${season === 'SUMMER' ? 'bg-amber-500/20 text-amber-600' : 'text-slate-500 hover:text-amber-500'}`}
                title="Summer (Sunlight Weather on Leaf)"
              >
                <span>☀️</span> <span className="hidden sm:inline">SUMMER</span>
              </button>
              <button
                onClick={() => { audio.playClick(); setSeason('NIGHT'); }}
                className={`px-2 py-1 rounded text-[9px] font-mono font-bold tracking-wider flex items-center gap-1 uppercase transition-all ${season === 'NIGHT' ? 'bg-indigo-500/20 text-indigo-500' : 'text-slate-500 hover:text-indigo-500'}`}
                title="Night (Moonlight on Leaf)"
              >
                <span>🌙</span> <span className="hidden sm:inline">NIGHT</span>
              </button>
              <button
                onClick={() => { audio.playClick(); setSeason('RAINY'); }}
                className={`px-2 py-1 rounded text-[9px] font-mono font-bold tracking-wider flex items-center gap-1 uppercase transition-all ${season === 'RAINY' ? 'bg-emerald-500/20 text-emerald-600' : 'text-slate-500 hover:text-emerald-500'}`}
                title="Rainy Season (Rain Droplets on Leaf)"
              >
                <span>🌧️</span> <span className="hidden sm:inline">RAINY</span>
              </button>
              <button
                onClick={() => { audio.playClick(); setSeason('WINTER'); }}
                className={`px-2 py-1 rounded text-[9px] font-mono font-bold tracking-wider flex items-center gap-1 uppercase transition-all ${season === 'WINTER' ? 'bg-cyan-500/20 text-cyan-600' : 'text-slate-500 hover:text-cyan-500'}`}
                title="Winter (Snowfall on Leaf)"
              >
                <span>❄️</span> <span className="hidden sm:inline">WINTER</span>
              </button>
            </div>
          )}

          {/* CHOOSE DAY & LIGHT THEME TOGGLE (DIRECT OPTION FOR USER'S REQ) */}
          <button
            onClick={() => {
              audio.playConfirm();
              setColorMode(colorMode === 'DARK' ? 'LIGHT' : 'DARK');
            }}
            className={`p-1.5 px-3 rounded-lg border backdrop-blur-md transition-all flex items-center gap-1.5 text-[10.5px] font-mono font-bold tracking-wider ${
              colorMode === 'LIGHT' 
                ? 'bg-amber-100/90 border-amber-300 text-amber-800 hover:bg-amber-200' 
                : 'bg-black/60 border-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Toggle Day & Light Theme Mode"
          >
            {colorMode === 'LIGHT' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: '30s' }} />
                <span>DAY LIGHT Theme</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                <span>COSMIC DARK Theme</span>
              </>
            )}
          </button>

          {/* THEME PRESET SLIDERS */}
          <div className={`backdrop-blur-md border rounded-lg p-0.5 flex gap-1 ${colorMode === 'LIGHT' ? 'bg-slate-200/90 border-slate-300' : 'bg-black/70 border-slate-800'}`}>
            <button
              onClick={() => handlePresetChange('COZY_DESK')}
              className={`px-3 py-1 rounded text-[10px] font-mono tracking-widest uppercase transition-all ${theme === 'COZY_DESK' ? `${colorMode === 'LIGHT' ? 'bg-white text-slate-900 border border-slate-300' : 'bg-amber-500/25 text-amber-400 border border-amber-500/30'} font-bold` : 'text-slate-500 hover:text-slate-700'}`}
            >
              COZY DESK
            </button>
            <button
              onClick={() => handlePresetChange('RELAXING_MIND')}
              className={`px-3 py-1 rounded text-[10px] font-mono tracking-widest uppercase transition-all ${theme === 'RELAXING_MIND' ? `${colorMode === 'LIGHT' ? 'bg-white text-slate-900 border border-slate-100' : 'bg-emerald-500/20 text-emerald-450 border border-emerald-400/30'} font-bold` : 'text-slate-500 hover:text-slate-700'}`}
            >
              RELAXING MIND
            </button>
          </div>

          <button
            onClick={() => {
              audio.playClick();
              setIsSynthesizerActive(!isSynthesizerActive);
            }}
            className={`p-2 border rounded-lg transition-colors ${colorMode === 'LIGHT' ? 'bg-white/85 border-slate-300 text-slate-600 hover:text-slate-900' : 'bg-black/60 border-slate-800 text-slate-400 hover:text-white'}`}
            title="Toggle Ambient Audio Synth"
          >
            {isSynthesizerActive ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
          </button>

          <button
            onClick={onExit}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-widest uppercase transition-all ${colorMode === 'LIGHT' ? 'bg-rose-100 hover:bg-rose-200 text-rose-700 border border-rose-300' : 'bg-rose-950/40 border-rose-900/60 text-rose-200 hover:bg-rose-900/70'}`}
          >
            GATEKEEPER
          </button>
        </div>
      </header>

      {/* 2. CENTER DISPLAY - DYNAMICALLY PIVOTED BETWEEN MOODS */}
      <div className="w-full pointer-events-auto my-2 select-none flex-shrink-0 z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-6"
        >
          {theme === 'COZY_DESK' ? (
            <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* BRAND SIGNATURE CALLIGRAPHY GREETING (LEFT) */}
              <div className="flex flex-col items-start text-left">
                <span className={`text-[10px] font-mono tracking-[0.4em] uppercase select-none leading-none mb-1 ${colorMode === 'LIGHT' ? 'text-slate-500' : 'text-slate-400'}`}>
                  HELLO,
                </span>
                <div className="flex items-center gap-2">
                  {isEditingName ? (
                    <input
                      type="text"
                      className={`border rounded px-2 py-0.5 text-lg font-mono outline-none w-40 ${colorMode === 'LIGHT' ? 'bg-slate-50 border-slate-350 text-slate-900' : 'bg-slate-900 border-emerald-500 text-white'}`}
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      onBlur={() => setIsEditingName(false)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setIsEditingName(false);
                          audio.playConfirm();
                        }
                      }}
                      autoFocus
                    />
                  ) : (
                    <h2 
                      onClick={() => {
                        audio.playClick();
                        setIsEditingName(true);
                      }}
                      className={`font-script text-4xl sm:text-5xl font-medium cursor-pointer leading-tight drop-shadow-md select-text transition-colors ${
                        colorMode === 'LIGHT' 
                          ? 'text-emerald-800 hover:text-emerald-600' 
                           : 'text-emerald-100 hover:text-emerald-300'
                      }`}
                      title="Click to rename"
                    >
                      {userName}
                    </h2>
                  )}
                  <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${colorMode === 'LIGHT' ? 'bg-emerald-600' : 'bg-emerald-400'}`} />
                </div>
              </div>

              {/* CENTER CONCISE REMINDER STATEMENT */}
              <div className="hidden xl:flex flex-col items-center">
                <span className={`text-[9px] font-mono font-black tracking-[0.4em] uppercase ${colorMode === 'LIGHT' ? 'text-amber-600/90' : 'text-amber-500/80'}`}>
                  PLAN • FOCUS • EXECUTE • REPEAT
                </span>
                <h1 className={`text-xl font-bold tracking-tight uppercase mt-0.5 font-serif ${colorMode === 'LIGHT' ? 'text-slate-800' : 'text-slate-200'}`}>
                  YOUR FUTURE IS BUILT TODAY
                </h1>
              </div>

              {/* COMPACT WEATHER & CLOCK WIDGETS (RIGHT) */}
              <div className="flex flex-wrap items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full md:w-auto">
                <div className={`backdrop-blur-md p-2.5 rounded-xl flex items-center gap-3 shadow flex-grow sm:flex-grow-0 ${
                  colorMode === 'LIGHT' 
                    ? 'bg-white/90 border border-slate-350 shadow-slate-200/50' 
                    : 'bg-slate-950/60 border border-slate-900/60'
                }`}>
                  <div className="text-right flex-grow sm:flex-grow-0">
                    <div className="flex items-center gap-1.5 justify-end">
                      <span className={`text-xs font-mono font-bold ${colorMode === 'LIGHT' ? 'text-slate-800' : 'text-neutral-100'}`}>
                        {season === 'SUMMER' ? '29°' : season === 'NIGHT' ? '18°' : season === 'WINTER' ? '12°' : '23°'}
                      </span>
                      {isEditingLocation ? (
                        <input
                          type="text"
                          className={`border rounded px-1.5 py-0.5 text-[10px] font-mono outline-none text-right w-24 ${
                            colorMode === 'LIGHT' ? 'bg-slate-50 border-slate-350 text-slate-900' : 'bg-slate-900 border-emerald-500 text-white'
                          }`}
                          value={locationName}
                          onChange={(e) => setLocationName(e.target.value.toUpperCase())}
                          onBlur={() => setIsEditingLocation(false)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              setIsEditingLocation(false);
                              audio.playConfirm();
                            }
                          }}
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
                          autoFocus
                        />
                      ) : (
                        <span 
<<<<<<< HEAD
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
=======
                          onClick={() => {
                            audio.playClick();
                            setIsEditingLocation(true);
                          }}
                          className={`text-[10px] font-mono font-bold cursor-pointer hover:underline transition-colors ${
                            colorMode === 'LIGHT' ? 'text-emerald-700 hover:text-emerald-500' : 'text-emerald-400 hover:text-emerald-300'
                          }`}
                          title="Click to edit location"
                        >
                          {season === 'SUMMER' ? `SUMMER • ${locationName}` : season === 'NIGHT' ? `NIGHT • ${locationName}` : season === 'WINTER' ? `WINTER • ${locationName}` : `${locationName}`}
                        </span>
                      )}
                    </div>
                    <div className={`text-[9px] font-mono uppercase mt-0.5 ${colorMode === 'LIGHT' ? 'text-slate-500' : 'text-slate-500'}`}>
                      {season === 'SUMMER' ? '☀️ SOLAR ATMOSPHERE' : season === 'NIGHT' ? '🌙 MIDNIGHT FOCUS' : season === 'WINTER' ? '❄️ PRESERVED SNOW' : `🌧️ ${locationName} ATMOSPHERE`}
                    </div>
                  </div>
                  <div className={`h-8 w-[1px] ${colorMode === 'LIGHT' ? 'bg-slate-200' : 'bg-slate-800'}`} />
                  <div className="flex flex-col items-center leading-none">
                    <span className={`text-[10px] font-mono font-bold ${colorMode === 'LIGHT' ? 'text-[#0284c7]' : 'text-[#0ea5e9]'}`}>{currentTime}</span>
                    <span className={`text-[7px] font-mono mt-1 uppercase ${colorMode === 'LIGHT' ? 'text-slate-400' : 'text-slate-600'}`}>UTC CLOCK</span>
                  </div>
                </div>

                {/* VERTICAL DAY TICKER FROM GREETING BOARD */}
                <div className={`flex flex-row md:flex-col items-center justify-center leading-none py-1.5 px-2 md:py-1.5 md:px-2 gap-1 md:gap-0 rounded-lg ${
                  colorMode === 'LIGHT' 
                    ? 'bg-slate-200/80 border border-slate-300' 
                    : 'bg-slate-950/40 border border-slate-900/40'
                }`}>
                  {weekdayVertical.map((char, index) => (
                    <span 
                      key={index} 
                      className={`text-[9.5px] font-mono font-bold uppercase py-[0.5px] transition-colors ${
                        colorMode === 'LIGHT' 
                          ? 'text-emerald-700 hover:text-emerald-600' 
                          : 'text-[#4ade80] hover:text-white'
                      }`}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col md:flex-row items-stretch justify-between gap-5 p-5 rounded-2xl border border-red-500/25 bg-slate-950/70 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(239,68,68,0.1)] relative overflow-hidden group">
              {/* Highlight red speed light beam corner */}
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-red-650 to-amber-500" />
              
              {/* Left Side: F1 Driver Statement & Dynamic Quotes */}
              <div className="flex-grow text-left space-y-3.5 z-10 max-w-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 flex-wrap leading-none mb-2">
                    <span className="text-[9px] font-mono tracking-[0.4em] font-black text-red-500 uppercase">COCKPIT MOTIVATION • DRIVER: {userName.toUpperCase()}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-ping" />
                    <span className="text-[8px] font-mono text-zinc-400 border border-white/10 rounded px-1.5 py-0.5 bg-black/50">SECTOR ACTIVE</span>
                  </div>
                  
                  {isEditingName ? (
                    <div className="flex items-center gap-2 my-2 py-1">
                      <input
                        type="text"
                        className="border rounded px-2.5 py-1 text-xs font-mono outline-none bg-slate-900 border-red-550 text-white w-48 focus:ring-1 focus:ring-red-500"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        onBlur={() => setIsEditingName(false)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            setIsEditingName(false);
                            audio.playConfirm();
                          }
                        }}
                        autoFocus
                      />
                      <button
                        onClick={() => {
                          setIsEditingName(false);
                          audio.playConfirm();
                        }}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-[10px] font-mono font-bold"
                      >
                        SAVE
                      </button>
                    </div>
                  ) : (
                    <div className={`relative pl-3.5 border-l-2 ${theme === 'RELAXING_MIND' ? 'border-emerald-500' : 'border-red-600'}`}>
                      <p className="text-[13px] sm:text-[15px] font-serif italic text-white font-bold leading-relaxed drop-shadow-md">
                        "{RACING_QUOTES[raceQuoteIndex].text}"
                      </p>
                      <p className={`text-[9.5px] font-mono mt-1 uppercase font-extrabold tracking-wider ${theme === 'RELAXING_MIND' ? 'text-emerald-400' : 'text-red-400'}`}>
                        — {RACING_QUOTES[raceQuoteIndex].author}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2.5 pt-1.5">
                  <button
                    id="btn-next-race-quote"
                    onClick={() => {
                      audio.playClick();
                      setRaceQuoteIndex((prev) => (prev + 1) % RACING_QUOTES.length);
                    }}
                    className={`px-3 py-1.5 active:scale-95 border rounded-lg text-[9px] font-mono uppercase font-bold tracking-widest transition-all cursor-pointer flex items-center gap-1.5 ${
                      theme === 'RELAXING_MIND'
                        ? 'bg-emerald-600/15 hover:bg-emerald-600/25 border-emerald-500/30 hover:border-emerald-500/50 text-emerald-400'
                        : 'px-3 py-1.5 bg-red-600/10 hover:bg-red-600/25 active:scale-95 border border-red-500/30 hover:border-red-500/50 text-red-400'
                    }`}
                  >
                    <span>{theme === 'RELAXING_MIND' ? 'NEXT SANCTUARY QUOTE' : 'NEXT RACING QUOTE'}</span>
                    <span className="text-[11px]">{theme === 'RELAXING_MIND' ? '🧘' : '🏁'}</span>
                  </button>
                  
                  {!isEditingName && (
                    <button
                      id="btn-edit-driver-name"
                      onClick={() => {
                        audio.playClick();
                        setIsEditingName(true);
                      }}
                      className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-850 active:scale-95 border border-white/5 rounded-lg text-[9px] font-mono text-slate-400 uppercase font-bold tracking-widest transition-all cursor-pointer"
                    >
                      RENAME DRIVER
                    </button>
                  )}
                </div>
              </div>

              {/* Right Side: High-Performance Live Telemetry Gauge Display */}
              <div className="flex-shrink-0 grid grid-cols-2 md:flex md:items-center gap-4 bg-black/60 border border-white/5 p-4 rounded-xl text-left select-none relative overflow-hidden min-w-[280px] shadow-[inset_0_1px_15px_rgba(255,255,255,0.02)] z-10 w-full md:w-auto">
                <div className="flex flex-col">
                  <span className="text-[7.5px] font-mono text-slate-500 uppercase tracking-widest leading-none">TEAM RADIO</span>
                  <span className="text-xs font-black font-mono text-emerald-400 tracking-tight mt-1 inline-flex items-center gap-1">
                    RADIO OK <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </span>
                  <span className="text-[8px] font-mono text-slate-400 mt-1">DRS: <span className="text-red-500 font-extrabold">READY</span></span>
                </div>

                <div className="w-[1px] h-10 bg-slate-800 hidden md:block" />

                <div className="flex flex-col">
                  <span className="text-[7.5px] font-mono text-slate-500 uppercase tracking-widest leading-none">TELEMETRY REV</span>
                  <span className="text-sm font-mono font-black text-amber-500 tracking-tighter mt-1">11,250 <span className="text-[9px] font-bold text-slate-400">RPM</span></span>
                  <span className="text-[8px] font-mono text-slate-400 leading-none mt-1">GEAR: <span className="text-white font-bold">7 / MAX</span></span>
                </div>

                <div className="w-[1px] h-10 bg-slate-800 hidden md:block" />

                <div className="flex flex-col">
                  <span className="text-[7.5px] font-mono text-slate-500 uppercase tracking-widest leading-none">CURRENT SPEED</span>
                  <span className="text-base font-mono font-black text-rose-500 tracking-tighter leading-none mt-1">
                    324 <span className="text-[9px] font-bold">KM/H</span>
                  </span>
                  <span className="text-[8px] font-mono text-slate-450 mt-1 uppercase">PADDOCK LIVE</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* 3. CORE TWO LAYOUTS (COZY PHYSICAL STUDY DESK AREA) */}
      <main className="w-full flex-grow grid grid-cols-1 xl:grid-cols-12 gap-5 z-20 pointer-events-auto items-stretch my-4">
        
        {/* ==========================================
            LEFT 7/12 BLOCK: PHYSICAL COZY STUDY DESK
            ========================================== */}
        <div className={`xl:col-span-8 flex flex-col gap-4 ${mobileTab === 'AMBIENT' ? 'hidden xl:flex' : 'flex'}`}>
          
          {/* MOBILE ONLY DEDICATED SYSTEM SETTINGS PANEL */}
          {mobileTab === 'WORKSPACE' && (
            <div className="xl:hidden w-full flex flex-col gap-3 rounded-2xl p-4 border shadow-sm select-none" style={{ backgroundColor: colorMode === 'LIGHT' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.3)', borderColor: colorMode === 'LIGHT' ? '#e2e8f0' : 'rgba(255,255,255,0.05)' }}>
              <div className="flex justify-between items-center pb-1.5 border-b border-dashed border-slate-400/20">
                <span className="text-[9px] font-mono tracking-widest font-black uppercase text-amber-500">SYSTEM PRESETS DECK</span>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
              </div>
              
              {/* Season Selection Row */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest leading-none">ACTIVE WEATHER ENVIRONMENT</span>
                <div className="grid grid-cols-4 gap-1">
                  {[
                    { id: 'SUMMER', label: 'SUMMER', icon: '☀️' },
                    { id: 'NIGHT', label: 'NIGHT', icon: '🌙' },
                    { id: 'RAINY', label: 'RAINY', icon: '🌧️' },
                    { id: 'WINTER', label: 'WINTER', icon: '❄️' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => { audio.playClick(); setSeason(s.id as SeasonTheme); }}
                      className={`py-2 rounded-lg text-[9px] font-mono font-bold flex flex-col items-center justify-center gap-0.5 border transition-all ${
                        season === s.id
                          ? colorMode === 'LIGHT'
                            ? 'bg-amber-100 border-amber-300 text-amber-800 font-extrabold'
                            : 'bg-amber-500/20 border-amber-500/30 text-amber-400 font-extrabold'
                          : colorMode === 'LIGHT' ? 'bg-white/50 border-slate-200 text-slate-500' : 'bg-black/30 border-white/5 text-slate-400'
                      }`}
                    >
                      <span className="text-xs">{s.icon}</span>
                      <span>{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid with themes, lights, and presets */}
              <div className="grid grid-cols-2 gap-2 mt-1">
                {/* Theme mode selection */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest leading-none">COLOR PROFILE</span>
                  <button
                    onClick={() => {
                      audio.playConfirm();
                      setColorMode(colorMode === 'DARK' ? 'LIGHT' : 'DARK');
                    }}
                    className={`py-2.5 px-3 rounded-xl border flex items-center justify-center gap-1.5 text-[9px] font-mono font-bold tracking-wider transition-all cursor-pointer ${
                      colorMode === 'LIGHT'
                        ? 'bg-amber-50 border-amber-250 text-amber-805 hover:bg-amber-100'
                        : 'bg-neutral-900 border-white/5 text-slate-300 hover:text-white'
                    }`}
                  >
                    {colorMode === 'LIGHT' ? '☀️ LIGHT MODE' : '🌙 DARK MODE'}
                  </button>
                </div>

                {/* Dashboard Theme Presets */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest leading-none">DESK MINDSET</span>
                  <div className="grid grid-cols-2 gap-1 flex-grow">
                    <button
                      onClick={() => handlePresetChange('COZY_DESK')}
                      className={`py-2 rounded-lg text-[8px] font-mono tracking-wider transition-all border ${
                        theme === 'COZY_DESK'
                          ? colorMode === 'LIGHT' ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold' : 'bg-emerald-500/25 text-emerald-400 border-emerald-500/30 font-bold'
                          : colorMode === 'LIGHT' ? 'bg-white/50 border-slate-205 text-slate-500' : 'bg-black/30 border-white/5 text-slate-500'
                      }`}
                    >
                      COZY
                    </button>
                    <button
                      onClick={() => handlePresetChange('RELAXING_MIND')}
                      className={`py-2 rounded-lg text-[8px] font-mono tracking-wider transition-all border ${
                        theme === 'RELAXING_MIND'
                          ? colorMode === 'LIGHT' ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold' : 'bg-emerald-500/25 text-emerald-400 border-emerald-500/30 font-bold'
                          : colorMode === 'LIGHT' ? 'bg-white/50 border-slate-205 text-slate-500' : 'bg-black/30 border-white/5 text-slate-500'
                      }`}
                    >
                      MIND
                    </button>
                  </div>
                </div>
              </div>

              {/* Location Input Row */}
              <div className="flex flex-col gap-1.5 mt-1">
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest leading-none">STUDY LOCATION / REGION</span>
                <div className="relative">
                  <input
                    type="text"
                    className={`w-full py-2 px-3 rounded-lg border text-[10px] font-mono outline-none transition-all uppercase pl-7 ${
                      colorMode === 'LIGHT'
                        ? 'bg-white/50 border-slate-205 text-slate-805 focus:border-emerald-350 focus:bg-white'
                        : 'bg-black/30 border-white/5 text-slate-200 focus:border-emerald-500/50 focus:bg-black/50'
                    }`}
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value.toUpperCase())}
                    placeholder="e.g. TOKYO"
                  />
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px]">📍</span>
                </div>
              </div>

              {/* Audio and Gatekeeper buttons */}
              <div className="grid grid-cols-2 gap-2 mt-1">
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
                <button
                  onClick={() => {
                    audio.playClick();
                    setIsSynthesizerActive(!isSynthesizerActive);
                  }}
<<<<<<< HEAD
                  className={`flex-1 py-2.5 rounded-xl border cursor-pointer flex items-center justify-center gap-2 transition-colors ${
                    isSynthesizerActive
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-500'
                      : 'bg-rose-500/15 border-rose-500/30 text-rose-500'
                  }`}
                  title="Toggle Mute"
                >
                  {isSynthesizerActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <span className="text-xs font-mono font-black uppercase">{isSynthesizerActive ? 'AUDIBLE' : 'MUTED'}</span>
=======
                  className={`py-2.5 rounded-xl border flex items-center justify-center gap-1.5 text-[9px] font-mono font-bold transition-all cursor-pointer ${
                    isSynthesizerActive
                      ? colorMode === 'LIGHT' ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
                      : colorMode === 'LIGHT' ? 'bg-rose-50 border-rose-300 text-rose-800' : 'bg-rose-950/20 border-rose-900/40 text-rose-400'
                  }`}
                >
                  {isSynthesizerActive ? '🔊 SYNTHS ACTIVE' : '🔇 SYNTHS MUTED'}
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
                </button>

                <button
                  onClick={onExit}
<<<<<<< HEAD
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
=======
                  className={`py-2.5 rounded-xl border text-[9px] font-mono font-bold tracking-wider transition-all cursor-pointer ${
                    colorMode === 'LIGHT'
                      ? 'bg-rose-100 border-rose-305 text-rose-800 hover:bg-rose-200'
                      : 'bg-rose-950/40 border-rose-900/60 text-rose-200 hover:bg-rose-900/60'
                  }`}
                >
                  🏁 GATEKEEPER EXIT
                </button>
              </div>
            </div>
          )}
          
          {/* THE SEAMLESS INTERACTIVE WORKSPACE */}
          <div className={`rounded-2xl transition-all duration-300 ${
            mobileTab === 'WORKSPACE' || mobileTab === 'TIMER'
              ? `${panelBg} p-4 sm:p-5 flex flex-col xl:flex-row gap-5 items-stretch relative overflow-hidden w-full`
              : 'hidden xl:flex xl:flex-row gap-5 items-stretch relative overflow-hidden w-full ' + panelBg + ' p-4 sm:p-5'
          }`}>
            
            {/* AMBIENT LAMP LIGHTING LAYER DIRECTLY IN PORT CARD CONTAINER */}
            <div 
              className="absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl transition-all duration-800 pointer-events-none -translate-x-12 -translate-y-12" 
              style={isLampOn ? { backgroundColor: `rgba(${LAMP_COLORS.find(c => c.id === lampColor)?.rgb || '245,158,11'}, ${(lampBrightness / 100) * 0.35})` } : undefined}
            />

            {/* DYNAMIC WINDOW ACCENT - SUNSET / TRACK VIEWPORT */}
            <div className={`w-full xl:w-48 rounded-xl relative p-3 flex flex-col justify-between border overflow-hidden min-h-[140px] sm:min-h-auto ${subPanelBg} ${mobileTab === 'WORKSPACE' ? 'flex' : 'hidden xl:flex'}`}>
              {theme === 'RELAXING_MIND' ? (
                <>
                  {/* Serene Zen pathway garden view background Image */}
                  <img 
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=500&h=700&q=80" 
                    alt="Serene Zen Stones Garden"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover opacity-85 pointer-events-none transition-opacity duration-500"
                  />
                  {/* Peaceful emerald overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-emerald-950/40 pointer-events-none" />

                  <div className="flex justify-between items-start z-10 relative">
                    <span className="text-[9px] font-mono tracking-widest text-[#34d399] bg-black/85 px-2 py-0.5 rounded uppercase font-black border border-emerald-500/30">ZEN GARDEN</span>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  </div>

                  <div className="flex flex-col gap-0.5 leading-none z-10 relative mt-auto bg-black/75 p-2 rounded border border-white/5 backdrop-blur-sm">
                    <span className="text-[8px] font-mono uppercase tracking-wider text-slate-450 font-bold">COGNITIVE SYNERGY</span>
                    <span className="text-[11px] font-mono text-emerald-400 font-extrabold uppercase tracking-wide">THETA STATE ALPHA</span>
                  </div>
                </>
              ) : (
                <>
                  {/* Cozy Desk Leaf Immersive Background Image */}
                  <img 
                    src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=500&h=700&q=80" 
                    alt="Aesthetic Monstera Leaf"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen pointer-events-none transition-opacity duration-500"
                  />
                  {/* Warm amber tint overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-950/30 via-black/30 to-black/70 pointer-events-none" />

                  <div className="flex justify-between items-start z-10 relative">
                    <span className="text-[9px] font-mono tracking-widest text-amber-400 uppercase font-bold">LEAF ENVIRONMENT</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500/50" />
                  </div>

                  <div className="flex flex-col gap-0.5 leading-none z-10 relative mt-auto">
                    <span className={`text-[10px] font-mono uppercase tracking-wider ${colorMode === 'LIGHT' ? 'text-slate-750' : 'text-slate-350'}`}>MINDSET ZONE</span>
                    <span className="text-xs font-serif italic text-amber-550 font-bold">Compound 1%</span>
                  </div>
                </>
              )}
            </div>

             {/* VINTAGE BRONZE DESK LAMP CONTROL MODULE */}
            <div className={`flex flex-col justify-between items-center p-3 rounded-xl w-full xl:w-52 text-center border shadow-inner transition-all duration-305 ${subPanelBg} ${mobileTab === 'WORKSPACE' ? 'flex' : 'hidden xl:flex'}`}>
              <div className="w-full flex justify-between items-center px-1">
                <span className={`text-[9px] font-mono font-bold tracking-wider ${colorMode === 'LIGHT' ? 'text-slate-500' : 'text-slate-400'}`}>DESK LIGHT DECK</span>
                <span className="flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: isLampOn ? (LAMP_COLORS.find(c => c.id === lampColor)?.hex || '#f59e0b') : '#4b5563' }} />
              </div>
              
              <div className="my-2 relative flex flex-col items-center justify-center gap-1">
                <motion.button
                  id="btn-toggle-lamp"
                  onClick={handleToggleLamp}
                  animate={{ scale: isLampOn ? 1.05 : 1 }}
                  className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300 select-none ${
                    !isLampOn 
                      ? colorMode === 'LIGHT' ? 'bg-slate-200 border-slate-300 text-slate-600 hover:text-slate-900' : 'bg-slate-900 text-slate-500 border-slate-800 hover:brightness-110'
                      : ''
                  }`}
                  style={isLampOn ? {
                    backgroundColor: LAMP_COLORS.find(c => c.id === lampColor)?.hex || '#f59e0b',
                    color: '#090d16',
                    boxShadow: `0 0 15px ${(LAMP_COLORS.find(c => c.id === lampColor)?.hex || '#f59e0b')}80`,
                    borderColor: '#ffffff50'
                  } : undefined}
                >
                  <Sun className={`w-5 h-5 ${isLampOn ? 'animate-spin' : ''}`} style={{ animationDuration: '12s' }} />
                </motion.button>
                {/* Colored visual beam under physical button */}
                {isLampOn && (
                  <span 
                    className="w-1.5 h-3 blur-[1px] rounded-full transition-all duration-300" 
                    style={{ backgroundColor: LAMP_COLORS.find(c => c.id === lampColor)?.hex || '#f59e0b' }} 
                  />
                )}
              </div>

              {/* LAMP COLOR SWATCHES */}
              <div className="w-full space-y-1 my-1">
                <span className="text-[7px] font-mono text-slate-550 uppercase tracking-wider block font-bold">CHOOSE HUE</span>
                <div className="flex items-center justify-center gap-1.5 flex-wrap">
                  {LAMP_COLORS.map((lc) => {
                    const isSelected = lc.id === lampColor;
                    return (
                      <button
                        key={lc.id}
                        onClick={() => {
                          if (!isLampOn) {
                            setIsLampOn(true);
                          }
                          audio.playClick();
                          setLampColor(lc.id);
                        }}
                        className={`w-3.5 h-3.5 rounded-full transition-all duration-200 border flex items-center justify-center cursor-pointer ${
                          isSelected ? 'scale-125 border-white ring-1 ring-slate-400' : 'border-transparent select-none active:scale-95 hover:scale-110'
                        }`}
                        title={lc.name}
                        style={{ backgroundColor: lc.hex }}
                      >
                        {isSelected && (
                          <span className="w-0.5 h-0.5 rounded-full bg-slate-950" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* LAMP ADJUSTABLE BRIGHTNESS SLIDER */}
              <div className="w-full space-y-1 mt-1">
                <div className="flex justify-between items-center text-[7px] font-mono text-slate-550 uppercase px-1 font-bold tabular-nums">
                  <span>BRIGHTNESS</span>
                  <span className={isLampOn ? LAMP_COLORS.find(c => c.id === lampColor)?.text : ''}>
                    {isLampOn ? `${lampBrightness}%` : 'OFF'}
                  </span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <Sun className={`w-3 h-3 ${isLampOn ? 'text-slate-400' : 'text-slate-600'}`} />
                  <input
                    type="range"
                    min="15"
                    max="100"
                    step="5"
                    disabled={!isLampOn}
                    value={lampBrightness}
                    onChange={(e) => {
                      setLampBrightness(Number(e.target.value));
                    }}
                    className={`flex-grow h-1 rounded-lg outline-none cursor-pointer transition-opacity ${
                      isLampOn 
                        ? 'opacity-100 accent-amber-500 bg-slate-200 dark:bg-slate-800' 
                        : 'opacity-30 accent-slate-600 bg-slate-250 dark:bg-slate-900 cursor-not-allowed'
                    }`}
                  />
                </div>
              </div>

              <span className={`text-[8px] font-mono uppercase font-bold tracking-widest mt-1.5 block ${isLampOn ? LAMP_COLORS.find(c => c.id === lampColor)?.text : 'text-slate-500'}`}>
                {isLampOn ? LAMP_COLORS.find(c => c.id === lampColor)?.name : 'MIDNIGHT OFF'}
              </span>
            </div>

            {/* STUNNING QUICK ACTIONS FROM THE ATTACHED IMAGE (FOCUS & ESTUDAR PROFILE WIDGETS) */}
            {theme === 'COZY_DESK' && (
              <div className={`p-3.5 border rounded-xl w-full xl:w-28 text-center backdrop-blur-md ${colorMode === 'LIGHT' ? 'bg-emerald-50/45 border-emerald-300/60 shadow shadow-emerald-100/40' : 'bg-[#10b981]/10 border-[#10b981]/25'} ${mobileTab === 'WORKSPACE' ? 'flex justify-around items-center xl:flex-col xl:justify-between' : 'hidden xl:flex xl:flex-col xl:justify-between'}`}>
                <span className={`text-[8px] font-mono tracking-widest uppercase font-bold ${colorMode === 'LIGHT' ? 'text-emerald-700 font-extrabold' : 'text-emerald-400'}`}>WIDGETS</span>
                
                {/* FOCUS BUTTON WITH HEART */}
                <button
                  onClick={handleQuickFocus}
                  className="flex flex-col items-center justify-center gap-1 group cursor-pointer my-2 outline-none select-none"
                  title="25 Minute Daily Focus"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-450 transition-all duration-300 group-hover:scale-105 group-hover:bg-emerald-500/35 group-hover:border-emerald-400/50 shadow shadow-emerald-500/10 group-active:scale-95">
                    <Heart className="w-4 h-4 fill-emerald-400/20 group-hover:fill-emerald-450/40" />
                  </div>
                  <span className="text-[12px] font-script tracking-wider text-emerald-300 leading-none lowercase">focus</span>
                </button>

                {/* ESTUDAR BUTTON WITH CAT */}
                <button
                  onClick={handleQuickStudy}
                  className="flex flex-col items-center justify-center gap-1 group cursor-pointer my-2 outline-none select-none"
                  title="50 Minute Deep Study"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-450 transition-all duration-300 group-hover:scale-105 group-hover:bg-amber-500/35 group-hover:border-amber-400/50 shadow shadow-amber-500/10 group-active:scale-95">
                    <Cat className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-[12px] font-script tracking-wider text-amber-350 leading-none lowercase">estudar</span>
                </button>

                <span className="text-[7px] font-mono text-slate-500 uppercase">PRESETS</span>
              </div>
            )}

            {/* INTERACTIVE DIGITAL PC LAPTOP & COUNTER STRAP BLOCK (POMODORO) */}
            <div className={`flex-grow border rounded-xl p-4 flex flex-col justify-between shadow-2xl relative min-h-[180px] ${subPanelBg} ${mobileTab === 'TIMER' ? 'flex' : 'hidden xl:flex'}`}>
              {/* Corner decorative light indicators */}
              <div className="absolute top-2 right-2 flex gap-1 items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              
              <div className={`flex justify-between items-center border-b pb-2 ${colorMode === 'LIGHT' ? 'border-slate-200' : 'border-slate-900'}`}>
                <span className={`text-[10px] font-mono tracking-wider font-bold ${colorMode === 'LIGHT' ? 'text-[#0284c7]' : 'text-[#0ea5e9]'}`}>DIGITAL COMPUTER SCREEN (10:00)</span>
                {/* Switch digital screen mode actual clock vs active pomodoro */}
                <div className={`text-[9px] font-mono flex items-center gap-1.5 ${colorMode === 'LIGHT' ? 'text-slate-500' : 'text-slate-500'}`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> ACTUAL CLOCK: {currentTime}
                </div>
              </div>

              {/* Countdown metrics */}
              <div className="my-3 text-center flex flex-col items-center">
                <div className={`text-3xl sm:text-4xl font-extrabold tracking-widest font-mono tabular-nums ${colorMode === 'LIGHT' ? 'text-slate-900' : 'text-neutral-100'}`}>
                  {timerMinutes < 10 ? '0' + timerMinutes : timerMinutes}
                  <span className="animate-pulse">:</span>
                  {timerSeconds < 10 ? '0' + timerSeconds : timerSeconds}
                </div>
                <span className="text-[9px] font-mono text-slate-500 tracking-[0.2em] uppercase mt-1">ACTIVE FOCUS DURATION</span>
              </div>

              {/* Laptop Controllers */}
              <div className={`flex flex-wrap justify-between items-center gap-2 pt-2 border-t ${colorMode === 'LIGHT' ? 'border-slate-200' : 'border-slate-900'}`}>
                {/* Time presets */}
                <div className="flex items-center gap-1">
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
                      className={`px-2 py-0.5 rounded text-[9px] font-mono tracking-wider border ${selectedPresetTime === mins ? 'bg-[#0ea5e9]/20 text-[#0284c7] border-[#0284c7]/40 font-bold' : `${colorMode === 'LIGHT' ? 'bg-slate-50 border-slate-250 text-slate-650 hover:text-slate-950' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'}`}`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      audio.playClick();
                      setIsTimerRunning(!isTimerRunning);
                    }}
                    className={`px-3 py-1 rounded text-[10px] font-mono tracking-widest uppercase font-bold flex items-center gap-1 transition-colors ${isTimerRunning ? 'bg-amber-500/25 text-amber-500 border border-amber-400/35' : 'bg-[#0ea5e9] hover:bg-[#0ea5e9]/90 text-slate-950 font-bold'}`}
                  >
                    {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-slate-950" />}
                    <span>{isTimerRunning ? 'PAUSE' : 'START'}</span>
                  </button>

                  <button
                    onClick={() => {
                      audio.playClick();
                      setIsTimerRunning(false);
                      setTimerMinutes(selectedPresetTime);
                      setTimerSeconds(0);
                    }}
                    className={`p-1.5 rounded transition-colors border ${colorMode === 'LIGHT' ? 'bg-slate-100 border-slate-300 text-slate-600 hover:text-slate-900' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'}`}
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* OPEN INTUITIVE NOTEBOOK - CHECKLIST PLAN (DOUBLE PAGE LAYOUT) ENHANCED FOR ZEN GAMES */}
          {theme === 'RELAXING_MIND' ? (
            <div className={`${panelBg} rounded-2xl relative p-4 sm:p-5 flex-grow flex flex-col justify-between border ${colorMode === 'LIGHT' ? 'border-slate-205' : 'border-slate-800/60'} ${mobileTab === 'PLANNER' ? 'block' : 'hidden xl:block'}`}>
              <div className={`absolute top-0 right-0 p-1.5 border-b border-l text-[8px] font-mono tracking-widest uppercase ${colorMode === 'LIGHT' ? 'bg-emerald-100 border-slate-300 text-emerald-800 font-bold' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 font-bold'}`}>
                RELAXING MIND STATION
              </div>
              
              <div className="my-2 mt-4">
                <RelaxingMindGames
                  colorMode={colorMode}
                  subPanelBg={subPanelBg}
                  listInnerBg={listInnerBg}
                  cardInnerBg={cardInnerBg}
                  onActionComplete={onTickActivity}
                />
              </div>
            </div>
          ) : (
            <div className={`${panelBg} rounded-2xl relative p-5 flex-grow flex flex-col justify-between ${mobileTab === 'PLANNER' ? 'block' : 'hidden xl:block'}`}>
              <div className={`absolute top-0 right-0 p-1.5 border-b border-l text-[8px] font-mono tracking-widest uppercase ${colorMode === 'LIGHT' ? 'bg-amber-100 border-slate-300 text-amber-800' : 'bg-amber-500/10 border-amber-500/20 text-amber-500'}`}>
                STUDY CHECKLIST PORTAL
              </div>

              {/* Split Notebook Double Page visualizer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch relative my-2">
                {/* Central fold binder mark */}
                <div className={`hidden md:block absolute left-1/2 top-4 bottom-4 w-[1px] -translate-x-1/2 before:content-[''] before:absolute before:inset-y-0 before:-left-1 before:w-2 before:border-r before:border-l ${colorMode === 'LIGHT' ? 'bg-slate-200 before:border-slate-200/50' : 'bg-slate-800 before:border-slate-800/45'}`} />

                {/* LEFT PAGE: DISCIPLINE TODAY, SUCCESS TOMORROW */}
                <div className="flex flex-col gap-3">
                  <div className={`border-b pb-1.5 ${borderMuted}`}>
                    <h3 className={`text-xs font-black font-mono tracking-widest flex items-center gap-1.5 uppercase select-none ${textSecondary}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-550" /> DISCIPLINE TODAY, SUCCESS TOMORROW
                    </h3>
                  </div>

                  <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                    {tasks.map((task) => (
                      <div 
                        key={task.id}
                        onClick={() => handleToggleTask(task.id)}
                        className={`p-2 border rounded-xl cursor-pointer group flex items-start justify-between transition-all ${listInnerBg}`}
                      >
                        <div className="flex items-center gap-2 overflow-hidden select-none">
                          <div className="text-[#0ea5e9] flex-shrink-0">
                            {task.completed ? (
                              <CheckSquare className="w-4 h-4 text-emerald-500 animate-pulse" />
                            ) : (
                              <Square className={`w-4 h-4 ${colorMode === 'LIGHT' ? 'text-slate-400' : 'text-slate-600'}`} />
                            )}
                          </div>
                          <span className={`text-[11px] font-mono tracking-tight leading-normal truncate group-hover:text-amber-600 ${task.completed ? 'line-through text-slate-400 font-light' : `${colorMode === 'LIGHT' ? 'text-slate-800' : 'text-slate-355'} font-semibold`}`}>
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
                            {task.text}
                          </span>
                        </div>

                        <button
<<<<<<< HEAD
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
=======
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTask(task.id);
                          }}
                          className={`opacity-0 group-hover:opacity-100 p-0.5 rounded transition-all ml-1 flex-shrink-0 ${colorMode === 'LIGHT' ? 'hover:bg-slate-200 text-slate-450 hover:text-red-650' : 'hover:bg-slate-900 text-slate-500 hover:text-red-400'}`}
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT PAGE: PLAN - STUDY, FOCUS, IMPROVE, SUCCEED */}
                <div className="flex flex-col justify-between gap-3">
                  <div>
                    <div className={`border-b pb-1.5 ${borderMuted}`}>
                      <h3 className={`text-xs font-black font-mono tracking-widest flex items-center gap-1.5 uppercase select-none ${colorMode === 'LIGHT' ? 'text-emerald-800' : 'text-[#0ea5e9]'}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${colorMode === 'LIGHT' ? 'bg-emerald-600' : 'bg-[#0ea5e9]'}`} /> PLAN: STUDY, FOCUS, IMPROVE, SUCCEED
                      </h3>
                    </div>

                    {/* Add action task form */}
                    <form onSubmit={handleAddTask} className="flex gap-2 my-3">
                      <input
                        type="text"
                        placeholder="Type custom task..."
                        value={newTaskText}
                        onChange={(e) => setNewTaskText(e.target.value)}
                        className={`flex-grow rounded-lg px-2.5 py-1.5 text-[10px] font-mono outline-none ${inputBg}`}
                      />
                      <button
                        type="submit"
                        className="px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold font-mono hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 text-white" /> ADD
                      </button>
                    </form>
                  </div>

                  {/* Micro instructions / checklist count summary */}
                  <div className={`text-[10px] font-mono rounded-lg space-y-1 select-none border p-2.5 ${subPanelBg}`}>
                    <div className="flex justify-between">
                      <span>PENDING HABIT LOAD:</span>
                      <span className="text-amber-600 font-bold tabular-nums">{tasks.filter(t => !t.completed).length} MODULES</span>
                    </div>
                    <div className="flex justify-between">
                      <span>COMPLETED INDEX:</span>
                      <span className={`font-bold tabular-nums ${colorMode === 'LIGHT' ? 'text-emerald-700' : 'text-[#0ea5e9]'}`}>
                        {Math.round((tasks.filter(t => t.completed).length / Math.max(1, tasks.length)) * 100)}% SUCCESS RATE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RETRO DEVICE MUSIC CASSETTE & AUDIO PLAYER HUB */}
          {!isMobile && (
            <DeviceAudioPlayer
              colorMode={colorMode}
              panelBg={panelBg}
              subPanelBg={subPanelBg}
              listInnerBg={listInnerBg}
              inputBg={inputBg}
            />
          )}
        </div>

        {/* ==========================================
            RIGHT 4/12 BLOCK: FOCUS BOOKS & AUDIO MIXER
            ========================================== */}
        <div className={`xl:col-span-4 flex flex-col gap-4 ${mobileTab === 'AMBIENT' ? 'flex' : 'hidden xl:flex'}`}>
          
          {/* RETRO DEVICE MUSIC CASSETTE & AUDIO PLAYER HUB FOR MOBILE */}
          {isMobile && mobileTab === 'AMBIENT' && (
            <DeviceAudioPlayer
              colorMode={colorMode}
              panelBg={panelBg}
              subPanelBg={subPanelBg}
              listInnerBg={listInnerBg}
              inputBg={inputBg}
            />
          )}

          {/* THE STACK OF FOUR CLASSIC BOOKS MODULE */}
          <div className={`${panelBg} rounded-2xl p-4 sm:p-5 flex flex-col gap-3 relative overflow-hidden`}>
            <span className="text-[9px] font-mono text-slate-500 tracking-widest uppercase">
              {theme === 'RELAXING_MIND' ? 'COGNITIVE WORKOUT BLUEPRINTS (Image #2)' : 'Stacked Essential Library (Image #2)'}
            </span>
            <div className={`border-b pb-1.5 flex justify-between items-center ${borderMuted}`}>
              <h3 className={`text-xs font-black font-mono uppercase select-none flex items-center gap-1.5 ${textSecondary}`}>
                {theme === 'RELAXING_MIND' ? (
                  <>
                    <Brain className="w-3.5 h-3.5 text-emerald-450 animate-pulse" /> <span>SANCTUARY MINDFUL READS</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="w-3.5 h-3.5 text-amber-550" /> <span>LITERARY FOCUS ACCENTS</span>
                  </>
                )}
              </h3>
              <span className={`text-[9px] font-mono px-1 py-0.5 rounded ${theme === 'RELAXING_MIND' ? 'text-emerald-500 bg-emerald-500/10' : 'text-amber-500 bg-amber-500/10'}`}>
                {theme === 'RELAXING_MIND' ? 'MINDFUL READ' : 'TAP FILE ENTRY'}
              </span>
            </div>

            {/* Simulated stacked books spines */}
            <div className="space-y-2 py-1">
              {(theme === 'RELAXING_MIND' ? RACING_DOSSIERS : CLASSIC_BOOKS).map((book) => (
                <div
                  key={book.id}
                  onClick={() => handleBookClick(book)}
                  className={`p-2.5 border rounded-xl cursor-pointer transition-all flex items-center justify-between group ${listInnerBg} ${
                    theme === 'RELAXING_MIND'
                      ? 'hover:border-emerald-500/40'
                      : 'hover:border-red-550/40'
                  } ${colorMode === 'LIGHT' ? 'hover:bg-slate-50' : 'hover:bg-slate-900/85'}`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    {/* Visual Spine color tab */}
                    <div className={`h-8 w-1.5 rounded bg-gradient-to-b ${book.bannerColor}`} />
                    <div className="overflow-hidden">
                      <h4 className={`text-xs font-black font-mono tracking-tight uppercase truncate ${colorMode === 'LIGHT' ? 'text-slate-900' : 'text-slate-200'}`}>
                        {book.title}
                      </h4>
                      <p className="text-[9px] font-mono text-slate-500 leading-tight">
                        by {book.author}
                      </p>
                    </div>
                  </div>
                  
                  <span className={`text-[9px] font-mono text-slate-500 ${theme === 'RELAXING_MIND' ? 'group-hover:text-emerald-400' : 'group-hover:text-amber-550'} transition-colors`}>
                    {theme === 'RELAXING_MIND' ? 'OPEN ESSAY >' : 'OPEN DATA >'}
                  </span>
                </div>
              ))}
            </div>

            {/* STEAMIING FOCUS COFFEE/TEA MUG (TACTILE ACCENT) */}
            <div 
              onClick={handleTakeSip}
              className={`p-3 border rounded-xl flex items-center justify-between cursor-pointer select-none relative group overflow-hidden ${subPanelBg} ${
                isSipping 
                  ? (theme === 'RELAXING_MIND' ? 'border-emerald-500 ring-1 ring-emerald-500/20' : 'border-amber-550 ring-1 ring-amber-500/20') 
                  : ''
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  {theme === 'RELAXING_MIND' ? (
                    <Wind className={`w-5 h-5 text-emerald-450 ${isSipping ? 'animate-pulse scale-110' : 'group-hover:scale-110 transition-transform'}`} />
                  ) : (
                    <Coffee className={`w-5 h-5 text-amber-500 ${isSipping ? 'animate-bounce' : 'group-hover:scale-105 transition-transform'}`} />
                  )}
                  {/* Virtual steam swirls */}
                  <div className="absolute -top-3.5 left-2 cursor-none flex flex-col gap-0.5 w-[5px] pointer-events-none">
                    <span className="h-2 w-[1.5px] bg-slate-400/50 coffee-steam" style={{ animationDelay: '0.2s' }} />
                    <span className="h-2 w-[1px] bg-slate-400/30 coffee-steam" style={{ animationDelay: '1.2s' }} />
                  </div>
                </div>

                <div>
                  <h4 className={`text-[10px] font-black font-mono tracking-widest uppercase leading-none ${colorMode === 'LIGHT' ? 'text-slate-900' : 'text-slate-300'}`}>
                    {theme === 'RELAXING_MIND' ? 'MINDFUL CHAMOMILE TEA' : 'FOCUS COFFEE MUG'}
                  </h4>
                  <p className="text-[9px] font-mono text-slate-500 leading-none mt-1 uppercase italic pr-2">
                    {theme === 'RELAXING_MIND' ? '"Inhale steam, sip calmness, release tension"' : '"Focus, Plan, Execute, Repeat"'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end leading-none">
                <span className={`text-[10px] font-mono font-bold tabular-nums ${
                  colorMode === 'LIGHT' 
                    ? (theme === 'RELAXING_MIND' ? 'text-emerald-700 font-extrabold' : 'text-emerald-750') 
                    : (theme === 'RELAXING_MIND' ? 'text-emerald-400 font-extrabold' : 'text-[#0ea5e9]')
                }`}>
                  SIPS: {focusSips}
                </span>
                <span className="text-[8px] font-mono text-slate-600 mt-0.5 uppercase tracking-wide">
                  {theme === 'RELAXING_MIND' ? 'SIP TEA' : 'TAP BREW'}
                </span>
              </div>
            </div>
          </div>

          {/* DYNAMIC SYSTHEIZERS FOCUS AUDIO CONTROLLER */}
          <div className={`${panelBg} rounded-2xl p-4 sm:p-5 flex flex-col gap-3 relative overflow-hidden`}>
            <div className={`border-b pb-1.5 flex justify-between items-center ${borderMuted}`}>
              <h3 className={`text-xs font-black font-mono uppercase select-none flex items-center gap-1.5 ${textSecondary}`}>
                <Wind className="w-3.5 h-3.5 text-teal-500" /> ATMOSPHERIC AUDIO DESK
              </h3>
              <span className="text-[9px] font-mono text-teal-650 bg-teal-500/10 px-1 py-0.5 rounded font-bold">SYNTHETIC</span>
            </div>

            <div className="space-y-2 py-1">
              {/* Summer Volume */}
              <div className={`p-2 rounded-xl transition-all border ${season === 'SUMMER' ? 'border-amber-500/30 bg-amber-500/5' : 'border-transparent'}`}>
                <div className="flex justify-between text-[9px] font-mono text-slate-550 mb-1 select-none">
                  <span className="flex items-center gap-1 font-bold">
                    ☀️ SUMMER BIRDS (CHIRPING) {season === 'SUMMER' && <span className="text-[8px] bg-amber-500/20 text-amber-600 px-1 rounded font-bold">CURRENT SEASON</span>}
                  </span>
                  <span className="text-emerald-600 font-bold tabular-nums">{summerVolume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={summerVolume}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setSummerVolume(v);
                    if (isSynthesizerActive) {
                      audio.adjustSummerVolume(v);
                    }
                  }}
                  disabled={!isSynthesizerActive}
                  className="w-full h-1 bg-transparent rounded-lg outline-none accent-emerald-500 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                />
              </div>

              {/* Night Volume */}
              <div className={`p-2 rounded-xl transition-all border ${season === 'NIGHT' ? 'border-indigo-500/30 bg-indigo-500/5' : 'border-transparent'}`}>
                <div className="flex justify-between text-[9px] font-mono text-slate-550 mb-1 select-none">
                  <span className="flex items-center gap-1 font-bold font-mono">
                    🌙 NIGHT CRICKETS & WIND {season === 'NIGHT' && <span className="text-[8px] bg-indigo-500/20 text-indigo-550 px-1 rounded font-bold">CURRENT SEASON</span>}
                  </span>
                  <span className="text-emerald-600 font-bold tabular-nums">{nightVolume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={nightVolume}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setNightVolume(v);
                    if (isSynthesizerActive) {
                      audio.adjustNightVolume(v);
                    }
                  }}
                  disabled={!isSynthesizerActive}
                  className="w-full h-1 bg-transparent rounded-lg outline-none accent-indigo-500 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                />
              </div>

              {/* Rainy Volume */}
              <div className={`p-2 rounded-xl transition-all border ${season === 'RAINY' ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-transparent'}`}>
                <div className="flex justify-between text-[9px] font-mono text-slate-550 mb-1 select-none">
                  <span className="flex items-center gap-1 font-bold">
                    🌧️ RAIN & THUNDERSTORMS {season === 'RAINY' && <span className="text-[8px] bg-emerald-500/20 text-emerald-600 px-1 rounded font-bold">CURRENT SEASON</span>}
                  </span>
                  <span className="text-emerald-600 font-bold tabular-nums">{rainVolume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rainVolume}
                  onChange={(e) => handleRainVolumeChange(Number(e.target.value))}
                  disabled={!isSynthesizerActive}
                  className="w-full h-1 bg-transparent rounded-lg outline-none accent-emerald-500 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                />
              </div>

              {/* Winter Volume */}
              <div className={`p-2 rounded-xl transition-all border ${season === 'WINTER' ? 'border-cyan-500/30 bg-cyan-500/5' : 'border-transparent'}`}>
                <div className="flex justify-between text-[9px] font-mono text-slate-550 mb-1 select-none">
                  <span className="flex items-center gap-1 font-bold">
                    ❄️ WINTER SNOW BLIZZARD {season === 'WINTER' && <span className="text-[8px] bg-cyan-500/20 text-cyan-600 px-1 rounded font-bold">CURRENT SEASON</span>}
                  </span>
                  <span className="text-emerald-600 font-bold tabular-nums">{winterVolume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={winterVolume}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setWinterVolume(v);
                    if (isSynthesizerActive) {
                      audio.adjustWinterVolume(v);
                    }
                  }}
                  disabled={!isSynthesizerActive}
                  className="w-full h-1 bg-transparent rounded-lg outline-none accent-cyan-550 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                />
              </div>

              {/* Lofi chime plucks generator volume slider */}
              <div className="p-2 border border-transparent">
                <div className="flex justify-between text-[9px] font-mono text-slate-555 mb-1 select-none font-bold">
                  <span>🎹 AMBIENT PENTATONIC PLUCKS</span>
                  <span className="text-emerald-600 font-bold tabular-nums">{chimeVolume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={chimeVolume}
                  onChange={(e) => {
                    setChimeVolume(Number(e.target.value));
                    if (isSynthesizerActive) {
                      audio.startFocusChimes(Number(e.target.value));
                    }
                  }}
                  disabled={!isSynthesizerActive}
                  className="w-full h-1 bg-transparent rounded-lg outline-none accent-emerald-500 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <p className={`text-[9px] font-mono leading-normal p-2 rounded border select-none ${colorMode === 'LIGHT' ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-zinc-950/60 border-slate-900/60 text-slate-500'}`}>
              Note: Sounds are procedurally synthesized on-the-fly using trigonometric mathematical formulas via the Web Audio API. 
            </p>
          </div>

          {/* PINBOARD - ADHENSIVE STICKY NOTES BOARD */}
          <div className={`${panelBg} rounded-2xl p-4 sm:p-5 flex flex-col gap-3 relative overflow-hidden`}>
            <div className={`border-b pb-1.5 flex justify-between items-center ${borderMuted}`}>
              <h3 className={`text-xs font-black font-mono uppercase select-none flex items-center gap-1.5 ${textSecondary}`}>
                <Music className="w-3.5 h-3.5 text-rose-500 animate-pulse" /> ADHENSIVE STICKY BOARD
              </h3>
              <span className="text-[9px] font-mono text-rose-500 font-bold">PINNED REMINDERS</span>
            </div>

            {/* Yellow sticky note graphics display */}
            <div className="grid grid-cols-3 gap-2.5 my-1">
              {stickies.map((s) => (
                <div
                  key={s.id}
                  className="aspect-square bg-yellow-500/15 border border-yellow-500/35 rounded-md p-1.5 flex flex-col justify-between relative shadow shadow-yellow-500/5 group"
                >
                  <span className="text-[9px] font-mono font-bold text-yellow-600 uppercase select-none leading-tight tracking-wide text-center uppercase break-words pr-2">
                    {s.text}
                  </span>

                  <button
                    onClick={() => handleDeleteSticky(s.id)}
                    className={`opacity-0 group-hover:opacity-100 absolute top-1 right-1 rounded p-0.5 text-slate-500 hover:text-red-500 transition-all cursor-pointer ${colorMode === 'LIGHT' ? 'hover:bg-slate-100' : 'hover:bg-slate-900'}`}
                  >
                    <Trash2 className="w-2.5 h-2.5" />
                  </button>
                  <div className="text-[7px] font-mono text-yellow-650 uppercase text-right mt-1 font-bold">STICKY P1</div>
                </div>
              ))}
            </div>

            {/* Add Sticky controller */}
            <form onSubmit={handleAddSticky} className="flex gap-1.5 mt-2">
              <input
                type="text"
                placeholder="ADD REMINDER..."
                value={newStickyText}
                onChange={(e) => setNewStickyText(e.target.value)}
                maxLength={14}
                className={`flex-grow rounded-lg px-2 py-1.5 text-[9px] font-mono outline-none ${inputBg}`}
              />
              <button
                type="submit"
                className="px-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[9px] font-mono font-bold cursor-pointer shrink-0 transition-transform active:scale-95"
              >
                PIN NOTE
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* 4. DETAILS BOOK PHILOSOPHY OVERLAY MODAL */}
      <AnimatePresence>
        {activeBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#010409]/80 backdrop-blur-sm pointer-events-auto">
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
<<<<<<< HEAD
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
=======
              className={`max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl relative border ${colorMode === 'LIGHT' ? 'bg-white border-slate-300' : 'bg-black/95 border-slate-800'}`}
            >
              {/* Colored Book Banner header */}
              <div className={`p-6 bg-gradient-to-r ${activeBook.bannerColor} text-white flex justify-between items-start`}>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#0ea5e9] bg-slate-950/80 px-2.5 py-0.5 rounded font-black">
                    STUDY DECK DISCIPLINE LIBRARY
                  </span>
                  <h3 className="text-2xl font-black tracking-tight font-serif uppercase mt-1">
                    {activeBook.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-300">
                    by {activeBook.author}
                  </p>
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
                </div>

                <button
                  onClick={() => {
                    audio.playClick();
                    setActiveBook(null);
                  }}
<<<<<<< HEAD
                  className="px-3 py-1.5 bg-slate-950/40 hover:bg-slate-950 text-white rounded-lg text-xs font-mono border border-white/20 cursor-pointer"
=======
                  className="p-1 px-2.5 bg-slate-950/60 hover:bg-slate-950 text-white rounded text-xs font-mono transition-colors border border-slate-900/60 cursor-pointer"
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
                >
                  CLOSE
                </button>
              </div>

<<<<<<< HEAD
              <div className="p-6 space-y-4 leading-normal">
                <div className="space-y-1.5">
                  <span className="text-xs font-mono font-black text-slate-400 uppercase tracking-widest block">
                    Core Premise
                  </span>
                  <p className={`text-xs font-mono leading-relaxed p-3.5 rounded-xl border select-text ${
                    colorMode === 'LIGHT' ? 'bg-slate-50 border-slate-205 text-slate-600' : 'bg-slate-950/80 border-slate-800 text-slate-300'
                  }`}>
=======
              {/* Book Info Body */}
              <div className="p-6 space-y-4">
                {/* Summary */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">CORE PHILOSOPHY</span>
                  <p className={`text-[11px] sm:text-xs font-mono leading-relaxed p-3 rounded-xl border ${colorMode === 'LIGHT' ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-950/60 border-slate-900 text-slate-300'}`}>
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
                    {activeBook.summary}
                  </p>
                </div>

<<<<<<< HEAD
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
=======
                {/* Practical rules checklist selection */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-[#0ea5e9] uppercase tracking-widest block">RECOMMENDED MICRO-HABITS</span>
                  <div className="space-y-1.5">
                    {activeBook.tactics.map((tactic, i) => (
                      <div 
                        key={i} 
                        onClick={() => {
                          audio.playClick();
                          // Append to Checklist notebook automatically
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
                          const customTask: DailyTask = {
                            id: Date.now().toString() + i,
                            text: `${activeBook.title.split(' ')[0]}: ${tactic}`,
                            completed: false
                          };
<<<<<<< HEAD
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
=======
                          setTasks(prev => [...prev, customTask]);
                          // Close modal with sound
                          setActiveBook(null);
                          audio.playConfirm();
                        }}
                        className={`p-2.5 rounded-lg flex items-center justify-between text-left text-[11px] font-mono group cursor-pointer transition-all border ${colorMode === 'LIGHT' ? 'bg-slate-55 border-slate-250 hover:bg-slate-100 text-slate-800 hover:border-slate-350' : 'bg-slate-950 hover:bg-slate-900 border-slate-900/60 hover:border-slate-800 text-slate-300'}`}
                      >
                        <span className={`leading-tight group-hover:text-emerald-600 pr-3 select-none ${colorMode === 'LIGHT' ? 'text-slate-850' : 'text-slate-300'}`}>
                          {tactic}
                        </span>
                        
                        <span className="text-[9px] font-bold text-slate-500 group-hover:text-emerald-550 uppercase shrink-0">
                          + PLAN
                        </span>
                      </div>
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
                    ))}
                  </div>
                </div>
              </div>

<<<<<<< HEAD
              <div className={`px-6 py-3.5 border-t text-xs font-mono text-center uppercase ${
                colorMode === 'LIGHT' ? 'bg-slate-50 border-slate-200 text-slate-500' : 'bg-slate-950/60 border-slate-800 text-slate-500'
              }`}>
                Tip: Click any micro-tactic to load it automatically as an active checklist item inside your notebook agenda!
=======
              {/* Modal footer hints */}
              <div className={`px-6 py-3 border-t text-[9px] font-mono text-center select-none uppercase ${colorMode === 'LIGHT' ? 'bg-slate-50 border-slate-300 text-slate-500' : 'bg-slate-950/80 border-slate-900 text-slate-400'}`}>
                Tip: Click any macro tactic to adopt and insert it into your Notebook checklist!
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

<<<<<<< HEAD
=======
      {/* 5. ACCENT FOOTER BAR */}
      <footer className="w-full flex-shrink-0 flex justify-between items-center text-[9px] font-mono text-slate-500 tracking-widest pt-2 flex-wrap gap-2 pb-24 xl:pb-2">
        <span>DEVELOPMENT PREVIEW MODE (10:00)</span>
        <span>"STAY DISCIPLINED. YOUR FUTURE IS BUILT TODAY."</span>
      </footer>

      {/* 6. MOBILE NAVIGATION BAR */}
      <div className={`xl:hidden fixed bottom-4 left-4 right-4 z-40 rounded-2xl backdrop-blur-lg border p-1.5 flex justify-around items-center shadow-lg transition-all duration-300 ${
        colorMode === 'LIGHT'
          ? 'bg-white/80 border-slate-305 shadow-slate-200/60 text-slate-705'
          : 'bg-black/80 border-white/10 shadow-black/80 text-slate-300'
      }`}>
        <button
          onClick={() => { audio.playClick(); setMobileTab('WORKSPACE'); }}
          className={`flex-1 py-2.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer ${
            mobileTab === 'WORKSPACE'
              ? colorMode === 'LIGHT'
                ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-250/50 shadow-sm'
                : 'bg-emerald-500/15 text-emerald-450 font-bold border border-emerald-500/20 shadow-sm'
              : 'text-slate-500 hover:text-slate-400'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-mono tracking-wider font-semibold uppercase">Workspace</span>
        </button>

        <button
          onClick={() => { audio.playClick(); setMobileTab('TIMER'); }}
          className={`flex-1 py-2.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer ${
            mobileTab === 'TIMER'
              ? colorMode === 'LIGHT'
                ? 'bg-blue-50 text-blue-800 font-bold border border-blue-250/50 shadow-sm'
                : 'bg-sky-500/15 text-sky-450 font-bold border border-sky-500/20 shadow-sm'
              : 'text-slate-500 hover:text-slate-400'
          }`}
        >
          <Clock className="w-5 h-5" />
          <span className="text-[10px] font-mono tracking-wider font-semibold uppercase">Timer</span>
        </button>

        <button
          onClick={() => { audio.playClick(); setMobileTab('PLANNER'); }}
          className={`flex-1 py-2.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer ${
            mobileTab === 'PLANNER'
              ? colorMode === 'LIGHT'
                ? 'bg-amber-50 text-amber-800 font-bold border border-amber-250/50 shadow-sm'
                : 'bg-amber-500/15 text-amber-450 font-bold border border-amber-500/20 shadow-sm'
              : 'text-slate-500 hover:text-slate-400'
          }`}
        >
          <CheckSquare className="w-5 h-5" />
          <span className="text-[10px] font-mono tracking-wider font-semibold uppercase">Planner</span>
        </button>

        <button
          onClick={() => { audio.playClick(); setMobileTab('AMBIENT'); }}
          className={`flex-1 py-2.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer ${
            mobileTab === 'AMBIENT'
              ? colorMode === 'LIGHT'
                ? 'bg-teal-50 text-teal-800 font-bold border border-teal-250/50 shadow-sm'
                : 'bg-teal-500/15 text-teal-450 font-bold border border-teal-500/20 shadow-sm'
              : 'text-slate-500 hover:text-slate-400'
          }`}
        >
          <Music className="w-5 h-5" />
          <span className="text-[10px] font-mono tracking-wider font-semibold uppercase">Ambient</span>
        </button>
      </div>
>>>>>>> c81a0958240802c308a4ef1122d2b84cfb7cc5b4
    </div>
  );
};

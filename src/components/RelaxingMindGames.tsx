/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Grid3X3, 
  BookOpen, 
  Brain, 
  HelpCircle, 
  RefreshCw, 
  Check, 
  AlertCircle, 
  Trophy, 
  Sparkles, 
  User, 
  Monitor,
  Flame,
  Award
} from 'lucide-react';
import { audio } from '../utils/audio';

// TYPES OR INTERFACES
type GameMode = 'SUDOKU' | 'CHESS' | 'QUIZ' | 'MEMORY';

interface RelaxingMindGamesProps {
  colorMode: 'LIGHT' | 'DARK';
  subPanelBg: string;
  listInnerBg: string;
  cardInnerBg: string;
  onActionComplete?: () => void;
}

// -------------------------------------------------------------
// CHESS HELPER UTILS, CONSTANTS AND PIECE RULES
// -------------------------------------------------------------
type ChessPiece = { type: 'p' | 'r' | 'n' | 'b' | 'q' | 'k'; color: 'w' | 'b' } | null;
type ChessBoard = ChessPiece[][];

const createInitialChessBoard = (): ChessBoard => [
  [
    { type: 'r', color: 'b' }, { type: 'n', color: 'b' }, { type: 'b', color: 'b' }, { type: 'q', color: 'b' },
    { type: 'k', color: 'b' }, { type: 'b', color: 'b' }, { type: 'n', color: 'b' }, { type: 'r', color: 'b' }
  ],
  [
    { type: 'p', color: 'b' }, { type: 'p', color: 'b' }, { type: 'p', color: 'b' }, { type: 'p', color: 'b' },
    { type: 'p', color: 'b' }, { type: 'p', color: 'b' }, { type: 'p', color: 'b' }, { type: 'p', color: 'b' }
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    { type: 'p', color: 'w' }, { type: 'p', color: 'w' }, { type: 'p', color: 'w' }, { type: 'p', color: 'w' },
    { type: 'p', color: 'w' }, { type: 'p', color: 'w' }, { type: 'p', color: 'w' }, { type: 'p', color: 'w' }
  ],
  [
    { type: 'r', color: 'w' }, { type: 'n', color: 'w' }, { type: 'b', color: 'w' }, { type: 'q', color: 'w' },
    { type: 'k', color: 'w' }, { type: 'b', color: 'w' }, { type: 'n', color: 'w' }, { type: 'r', color: 'w' }
  ]
];

const CHESS_SYMBOLS: Record<string, string> = {
  'w_p': '♟', 'w_r': '♜', 'w_n': '♞', 'w_b': '♝', 'w_q': '♛', 'w_k': '♚',
  'b_p': '♟', 'b_r': '♜', 'b_n': '♞', 'b_b': '♝', 'b_q': '♛', 'b_k': '♚'
};

const PIECE_VALUES: Record<string, number> = {
  p: 10, n: 30, b: 30, r: 50, q: 90, k: 900
};

// -------------------------------------------------------------
// SUDOKU PRE-BUILD EASY / MEDIUM / HARD MODULES WITH ANSWERS
// -------------------------------------------------------------
interface SudokuPreset {
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  board: number[][];
  solution: number[][];
}

const SUDOKU_PRESETS: SudokuPreset[] = [
  {
    difficulty: 'EASY',
    board: [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ],
    solution: [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 5, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 1, 2, 8, 6, 1, 7, 9] // Minor correction on corner bounds
    ]
  },
  {
    difficulty: 'MEDIUM',
    board: [
      [3, 0, 6, 5, 0, 8, 4, 0, 0],
      [5, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 8, 7, 0, 0, 0, 0, 3, 1],
      [0, 0, 3, 0, 1, 0, 0, 8, 0],
      [9, 0, 0, 8, 6, 3, 0, 0, 5],
      [0, 5, 0, 0, 9, 0, 6, 0, 0],
      [1, 3, 0, 0, 0, 0, 2, 5, 0],
      [0, 0, 0, 0, 0, 0, 0, 7, 4],
      [0, 0, 5, 2, 0, 6, 3, 0, 0],
    ],
    solution: [
      [3, 9, 6, 5, 7, 8, 4, 1, 2],
      [5, 2, 1, 6, 3, 4, 9, 5, 8],
      [4, 8, 7, 9, 2, 1, 5, 3, 1],
      [6, 7, 3, 5, 1, 2, 4, 8, 9],
      [9, 1, 4, 8, 6, 3, 7, 2, 5],
      [8, 5, 2, 7, 9, 4, 6, 1, 3],
      [1, 3, 8, 4, 5, 7, 2, 5, 6],
      [2, 6, 9, 3, 8, 5, 1, 7, 4],
      [7, 4, 5, 2, 1, 6, 3, 9, 8],
    ]
  },
  {
    difficulty: 'HARD',
    board: [
      [0, 0, 0, 6, 0, 0, 4, 0, 0],
      [7, 0, 0, 0, 0, 3, 6, 0, 0],
      [0, 0, 0, 0, 9, 1, 0, 8, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 5, 0, 1, 8, 0, 0, 0, 3],
      [0, 0, 0, 3, 5, 6, 0, 4, 0],
      [0, 4, 0, 0, 0, 0, 7, 0, 0],
      [0, 0, 3, 0, 0, 0, 0, 0, 0],
      [9, 7, 0, 0, 0, 0, 0, 0, 5]
    ],
    solution: [
      [5, 8, 1, 6, 7, 2, 4, 3, 9],
      [7, 9, 2, 8, 4, 3, 6, 5, 1],
      [3, 6, 4, 5, 9, 1, 2, 8, 7],
      [4, 3, 7, 2, 1, 9, 5, 6, 8],
      [6, 5, 9, 1, 8, 4, 2, 7, 3],
      [8, 2, 1, 3, 5, 6, 9, 4, 7],
      [1, 4, 5, 9, 3, 8, 7, 2, 6],
      [2, 7, 3, 4, 6, 5, 8, 9, 1],
      [9, 7, 8, 1, 2, 6, 3, 4, 5]
    ]
  }
];

// -------------------------------------------------------------
// BRAIN QUIZ QUESTIONS DATA
// -------------------------------------------------------------
interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const MASTER_QUIZ_POOL: Record<string, QuizQuestion[]> = {
  'LOGIC': [
    {
      question: "If a group has 8 people, and every person shakes hands with everyone else exactly once, how many handshakes occur in total?",
      options: ["16", "28", "32", "64"],
      correctIndex: 1, // 8 * 7 / 2 = 28
      explanation: "The formula for matches or combinations is: n * (n - 1) / 2. Here, 8 * 7 / 2 = 28 handshakes."
    },
    {
      question: "A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?",
      options: ["$0.10", "$0.05", "$0.01", "$0.15"],
      correctIndex: 1,
      explanation: "Let the ball be X. The bat is X + 1. Total: X + X + 1 = 1.10 => 2X = 0.10 => X = $0.05."
    },
    {
      question: "In the famous Monty Hall problem, switching your choice to the other closed door after one empty door is shown increases your win probability to what fraction?",
      options: ["1/2", "2/3", "1/3", "3/4"],
      correctIndex: 1,
      explanation: "Initially, you have a 1/3 chance of picked the correct door. Since Monty must reveal a goat behind one of the other doors, the remaining unpicked door inherits the aggregate probability of both other doors, which is 2/3."
    },
    {
      question: "An island is inhabited by 'Truth-tellers' (who always tell the truth) and 'Liars' (who always lie). Person A says: 'We are both liars.' What is the truth?",
      options: ["Both are truth-tellers", "Person A is a liar, Person B is a truth-teller", "Person A is a truth-teller, Person B is a liar", "Both are liars"],
      correctIndex: 1,
      explanation: "If A were a truth-teller, the statement would be true, meaning they are both liars (a contradiction). So A must be a liar. Since A is a liar, his statement is false, which implies they are not both liars. Since A is a liar, B must be a truth-teller."
    },
    {
      question: "What is the exact angle between the hour hand and the minute hand of a traditional analog clock at 3:15?",
      options: ["0°", "7.5°", "15°", "22.5°"],
      correctIndex: 1,
      explanation: "The minute hand is exactly at the 15-minute mark (90°). In 15 minutes, the hour hand has moved 1/4 of the way to 4. Since there are 30° between consecutive hours, it moved 30 * 1/4 = 7.5° past the 3-hour mark."
    },
    {
      question: "You have 9 identical-looking coins, but 1 is a counterfeit and weighs slightly less. What is the minimum number of balance scale weighings required to guarantee finding it?",
      options: ["1", "2", "3", "4"],
      correctIndex: 1,
      explanation: "Divide into three groups of 3. Weigh group A vs group B. If equal, the counterfeit is in group C; else it's in the lighter group. From those 3 coins, weigh 1 vs 1. If equal, the 3rd is counterfeit; else it is the lighter one. Total: 2 weighings."
    },
    {
      question: "A mother has 4 daughters, and each daughter has exactly one brother. How many children are in the family total?",
      options: ["8", "5", "4", "9"],
      correctIndex: 1,
      explanation: "The single brother is shared by all daughters. Therefore, there are 4 daughters + 1 brother = 5 children."
    },
    {
      question: "Complete the logical letter sequence: J, F, M, A, M, J, J, A, ... What is the next letter?",
      options: ["S", "O", "N", "D"],
      correctIndex: 0,
      explanation: "The letters correspond to the first initials of the months of the year starting in January. After August (A), comes September (S)."
    },
    {
      question: "A census taker is told by a parent: 'My three children's ages multiply to 36 and sum to my house number.' Given the oldest child plays piano, how old are they?",
      options: ["2, 2, 9", "1, 6, 6", "1, 4, 9", "3, 3, 4"],
      correctIndex: 0,
      explanation: "The sets of three numbers multiplying to 36 that have the same sum are (1, 6, 6) with sum 13 and (2, 2, 9) with sum 13. Since there is a single 'oldest' child, the ages must be 2, 2, and 9 (not 1, 6, 6 where there are twins as the oldest)."
    }
  ],
  'SCIENCE': [
    {
      question: "Neuroplasticity refers to the brain's unique capability to:",
      options: ["Generate heat during hard math", "Create new blood vessels", "Reorganize connections and adapt throughout life", "Prevent all cognitive decay instantly"],
      correctIndex: 2,
      explanation: "Neuroplasticity allows neurons to adjust their actions in response to learning, environment, or damage."
    },
    {
      question: "Which frequency range is traditionally associated with deep focus, calm alertness, and peak flow states in human EEGs?",
      options: ["Delta (0.5-4 Hz)", "Theta (4-8 Hz)", "Alpha (8-12 Hz)", "High Gamma (40-100 Hz)"],
      correctIndex: 2,
      explanation: "Alpha waves (8-12 Hz) signify relaxed alert focus, while Low Beta waves are tied to active study concentration."
    },
    {
      question: "The phenomenon where two particles continue to influence each other's physical state instantaneously, regardless of distance, is called:",
      options: ["Quantum Coherence", "Quantum Superposition", "Quantum Entanglement", "Spontaneous Tunneling"],
      correctIndex: 2,
      explanation: "Quantum entanglement describes particles whose quantum states are linked even over astronomical distances."
    },
    {
      question: "How long does it take for light emitted from the Sun to travel to the Earth?",
      options: ["Approximately 8 seconds", "Approximately 8 minutes", "Approximately 8 hours", "Approximately 1 day"],
      correctIndex: 1,
      explanation: "Light travels at ~300,000 km/s. The distance to the Sun is ~150 million km, resulting in ~500 seconds, or 8.3 minutes."
    },
    {
      question: "What cellular organelle is responsible for generating adenosine triphosphate (ATP), the primary energy currency of brain cells?",
      options: ["Ribosome", "Mitochondrion", "Lysosome", "Golgi Apparatus"],
      correctIndex: 1,
      explanation: "Often called the powerhouse of the cell, mitochondria generate chemical energy utilized by cellular synapses."
    },
    {
      question: "Which neurotransmitter is primary in facilitating neuromuscular action and is also heavily involved in arousal, memory, and cognitive focus?",
      options: ["Dopamine", "Acetylcholine", "Serotonin", "GABA"],
      correctIndex: 1,
      explanation: "Acetylcholine (ACh) is a neurotransmitter that plays a crucial role in memory processes and physical learning."
    },
    {
      question: "What is approximate Absolute Zero in Celsius, the temperature at which all molecular kinetic motion stops?",
      options: ["-100 °C", "-273.15 °C", "-373.15 °C", "0 °C"],
      correctIndex: 1,
      explanation: "Absolute zero represents 0 Kelvin, which equates precisely to -273.15 °C."
    },
    {
      question: "If you drop a heavy bowling ball and a light feather in a perfect vacuum tube on Earth, what happens?",
      options: ["The bowling ball hits first", "The feather hits first", "They hit the bottom at the exact same instant", "The feather floats forever"],
      correctIndex: 2,
      explanation: "In a vacuum, there is no air resistance to slow the feather down, so they fall at the exact same rate under gravitational acceleration (g ≈ 9.8 m/s²)."
    },
    {
      question: "The sky appears blue because gases in Earth's atmosphere scatter short-wavelength light in all directions. What is this called?",
      options: ["Rayleigh Scattering", "Mie Scattering", "Doppler Effect", "Refractive Dispersion"],
      correctIndex: 0,
      explanation: "Rayleigh scattering affects light of shorter wavelengths (blue and violet) much more than longer wavelengths (red and yellow)."
    }
  ],
  'PATTERN': [
    {
      question: "If 'SUDOKU' is encrypted as 'TVEPLV', what does 'CHESS' become under the same single-letter shift formula?",
      options: ["DIFTT", "DIETT", "CHFTT", "DGERS"],
      correctIndex: 0,
      explanation: "Each letter is shifted forward by 1 letter in the alphabet (C->D, H->I, E->F, S->T, S->T)."
    },
    {
      question: "Look at this sequence: 1, 1, 2, 3, 5, 8, 13, ... What is the 10th term in this sequence?",
      options: ["21", "34", "55", "89"],
      correctIndex: 2,
      explanation: "The Fibonacci sequence. The terms are: 1, 1, 2, 3, 5, 8, 13, 21 (8th), 34 (9th), 55 (10th)."
    },
    {
      question: "Complete the numerical pattern sequence: 1, 4, 9, 16, 25, 36, ... what is the next squared number?",
      options: ["42", "45", "49", "64"],
      correctIndex: 2,
      explanation: "The values are squares of sequential integers: 1², 2², 3², 4², 5², 6², and the next is 7² = 49."
    },
    {
      question: "Identify the pattern to find the next letter in this sequence: A, C, F, J, O, ...?",
      options: ["T", "U", "V", "W"],
      correctIndex: 1,
      explanation: "The gap between letters grows by 1 each time: A (+2) -> C (+3) -> F (+4) -> J (+5) -> O (+6) -> U."
    },
    {
      question: "Complete this logical mathematical progression: 3, 5, 9, 17, 33, ...?",
      options: ["45", "50", "65", "80"],
      correctIndex: 2,
      explanation: "The pattern double-subtracts 1 (2x - 1), or adds exponential powers of two (+2, +4, +8, +16, +32 => 33 + 32 = 65)."
    },
    {
      question: "If 123 is coded as 36, and 234 is coded as 81, what does 345 represent under this digital sum pattern?",
      options: ["100", "121", "144", "169"],
      correctIndex: 2,
      explanation: "Sum the internal digits and square the result: (1+2+3)² = 36; (2+3+4)² = 81; (3+4+5)² = 12² = 144."
    },
    {
      question: "Analyze this backward alternating series: Z, W, T, Q, N, ... What comes next?",
      options: ["K", "L", "J", "I"],
      correctIndex: 0,
      explanation: "The pattern subtracts 3 letters in the alphabet: Z(26) -> W(23) -> T(20) -> Q(17) -> N(14) -> K(11)."
    },
    {
      question: "Consider the look-and-say sequence: 1, 11, 21, 1211, 111221, ... What is the next term?",
      options: ["312211", "311222", "1112221", "211211"],
      correctIndex: 0,
      explanation: "Each term describes the digits of the previous: '111221' has three 1s, two 2s, one 1, which translates to '312211'."
    },
    {
      question: "Identify the pattern and complete the prime sequence: 2, 3, 5, 7, 11, 13, 17, ... What is the next prime?",
      options: ["18", "19", "21", "23"],
      correctIndex: 1,
      explanation: "These are consecutive prime numbers. The next prime number greater than 17 is 19."
    }
  ]
};

export const RelaxingMindGames: React.FC<RelaxingMindGamesProps> = ({
  colorMode,
  subPanelBg,
  listInnerBg,
  cardInnerBg,
  onActionComplete
}) => {
  const [activeGame, setActiveGame] = useState<GameMode>('SUDOKU');

  // Unified visual cues
  const txtPrimary = colorMode === 'LIGHT' ? 'text-slate-800' : 'text-slate-100';
  const txtSecondary = colorMode === 'LIGHT' ? 'text-slate-600' : 'text-slate-400';
  const borderMuted = colorMode === 'LIGHT' ? 'border-slate-205' : 'border-slate-800/80';

  // 1. SUDOKU GAME STATE
  const [sudokuDifficulty, setSudokuDifficulty] = useState<'EASY' | 'MEDIUM' | 'HARD'>('EASY');
  const [sudokuGrid, setSudokuGrid] = useState<number[][]>([]);
  const [startedSudokuGrid, setStartedSudokuGrid] = useState<number[][]>([]);
  const [sudokuSelectedCell, setSudokuSelectedCell] = useState<{ r: number, c: number } | null>(null);
  const [sudokuAlert, setSudokuAlert] = useState<string | null>(null);
  const [sudokuCompleted, setSudokuCompleted] = useState(false);

  // Load a Sudoku preset
  const loadSudoku = (diff: 'EASY' | 'MEDIUM' | 'HARD') => {
    const preset = SUDOKU_PRESETS.find(p => p.difficulty === diff) || SUDOKU_PRESETS[0];
    // deep copy
    const copiedGrid = preset.board.map(row => [...row]);
    setSudokuGrid(copiedGrid);
    setStartedSudokuGrid(preset.board.map(row => [...row]));
    setSudokuSelectedCell(null);
    setSudokuAlert(null);
    setSudokuCompleted(false);
  };

  useEffect(() => {
    loadSudoku(sudokuDifficulty);
  }, [sudokuDifficulty]);

  const handleSudokuCellClick = (r: number, c: number) => {
    audio.playClick();
    // Cannot edit hardcoded cells that started filled
    if (startedSudokuGrid[r] && startedSudokuGrid[r][c] !== 0) {
      setSudokuAlert("That cell was provided in the puzzle preset.");
      return;
    }
    setSudokuAlert(null);
    setSudokuSelectedCell({ r, c });
  };

  const handleSudokuNumberInput = (num: number) => {
    if (!sudokuSelectedCell) return;
    audio.playClick();
    const { r, c } = sudokuSelectedCell;
    const newGrid = sudokuGrid.map(row => [...row]);
    newGrid[r][c] = num;
    setSudokuGrid(newGrid);

    // Call dynamic trigger in App to add sparkles in ambient background!
    if (onActionComplete) onActionComplete();
  };

  const handleCheckSudoku = () => {
    const preset = SUDOKU_PRESETS.find(p => p.difficulty === sudokuDifficulty) || SUDOKU_PRESETS[0];
    let hasMistake = false;
    let isFilled = true;

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (sudokuGrid[r][c] === 0) {
          isFilled = false;
        } else if (sudokuGrid[r][c] !== preset.solution[r][c]) {
          hasMistake = true;
        }
      }
    }

    if (!isFilled) {
      audio.playClick();
      setSudokuAlert("The grid is incomplete. Keep searching!");
    } else if (hasMistake) {
      audio.playClick();
      setSudokuAlert("Some numbers are incorrect. Look closely at the rows and 3x3 grids.");
    } else {
      audio.playConfirm();
      setSudokuCompleted(true);
      setSudokuAlert("Congratulations! Brilliant Sudoku solution!");
    }
  };


  // 2. CHESS GAME STATE
  const [board, setBoard] = useState<ChessBoard>(createInitialChessBoard());
  const [selectedSquare, setSelectedSquare] = useState<{ r: number, c: number } | null>(null);
  const [chessTurn, setChessTurn] = useState<'w' | 'b'>('w');
  const [chessLogs, setChessLogs] = useState<string[]>(["Game started. You are White (w)."]);
  const [capturedPieces, setCapturedPieces] = useState<{ w: string[], b: string[] }>({ w: [], b: [] });
  const [chessWinner, setChessWinner] = useState<'w' | 'b' | null>(null);
  const [restartCountdown, setRestartCountdown] = useState<number | null>(null);

  const resetChess = () => {
    audio.playClick();
    setBoard(createInitialChessBoard());
    setSelectedSquare(null);
    setChessTurn('w');
    setCapturedPieces({ w: [], b: [] });
    setChessWinner(null);
    setRestartCountdown(null);
    setChessLogs(["Game started. Make a move!"]);
  };

  // Automatically detect King capture (King gone) and trigger game-over modal
  useEffect(() => {
    let whiteKingFound = false;
    let blackKingFound = false;

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece && piece.type === 'k') {
          if (piece.color === 'w') whiteKingFound = true;
          if (piece.color === 'b') blackKingFound = true;
        }
      }
    }

    // Since both kings exist during game start, we only trigger winner if one gets missing
    if (whiteKingFound && !blackKingFound && !chessWinner) {
      setChessWinner('w');
      audio.playPomodoroSignal();
    } else if (!whiteKingFound && blackKingFound && !chessWinner) {
      setChessWinner('b');
      audio.playPomodoroSignal();
    }
  }, [board, chessWinner]);

  // Handle auto-restarting timer count down when a winner is declared
  useEffect(() => {
    if (!chessWinner) {
      setRestartCountdown(null);
      return;
    }

    setRestartCountdown(7); // Show overlay with 7 seconds auto-restart
    const intervalId = setInterval(() => {
      setRestartCountdown(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(intervalId);
          // Auto restart the board game
          setBoard(createInitialChessBoard());
          setSelectedSquare(null);
          setChessTurn('w');
          setCapturedPieces({ w: [], b: [] });
          setChessWinner(null);
          setChessLogs(["Game auto-restarted! Make a move!"]);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [chessWinner]);

  const getPieceName = (type: 'p' | 'r' | 'n' | 'b' | 'q' | 'k'): string => {
    const names: Record<string, string> = {
      p: 'Pawn', r: 'Rook', n: 'Knight', b: 'Bishop', q: 'Queen', k: 'King'
    };
    return names[type] || 'Piece';
  };

  const isPathBlocked = (fromR: number, fromC: number, toR: number, toC: number, customBoard: ChessBoard = board): boolean => {
    const rowDiff = Math.abs(toR - fromR);
    const colDiff = Math.abs(toC - fromC);

    if (fromR === toR) {
      // Horizontal slide
      const step = toC > fromC ? 1 : -1;
      let c = fromC + step;
      while (c !== toC) {
        if (customBoard[fromR][c] !== null) return true;
        c += step;
      }
    } else if (fromC === toC) {
      // Vertical slide
      const step = toR > fromR ? 1 : -1;
      let r = fromR + step;
      while (r !== toR) {
        if (customBoard[r][fromC] !== null) return true;
        r += step;
      }
    } else if (rowDiff === colDiff) {
      // Diagonal slide
      const rStep = toR > fromR ? 1 : -1;
      const cStep = toC > fromC ? 1 : -1;
      let r = fromR + rStep;
      let c = fromC + cStep;
      while (r !== toR && c !== toC) {
        if (customBoard[r][c] !== null) return true;
        r += rStep;
        c += cStep;
      }
    }
    return false;
  };

  // Validate a basic Chess move visually (very friendly, simplified rule set)
  const isMoveLegal = (fromR: number, fromC: number, toR: number, toC: number, piece: ChessPiece, customBoard: ChessBoard = board): boolean => {
    if (!piece) return false;
    if (fromR === toR && fromC === toC) return false;
    
    // Target piece color check
    const target = customBoard[toR][toC];
    if (target && target.color === piece.color) return false;

    const rowDiff = Math.abs(toR - fromR);
    const colDiff = Math.abs(toC - fromC);

    switch (piece.type) {
      case 'p': // Pawn
        const direction = piece.color === 'w' ? -1 : 1;
        // Normal step
        if (fromC === toC && toR - fromR === direction && !target) return true;
        // First double-step
        if (fromC === toC && fromR === (piece.color === 'w' ? 6 : 1) && toR - fromR === 2 * direction && !target && !customBoard[fromR + direction][fromC]) return true;
        // Take diagonally
        if (colDiff === 1 && toR - fromR === direction && target && target.color !== piece.color) return true;
        return false;

      case 'r': // Rook
        if (fromR !== toR && fromC !== toC) return false;
        return !isPathBlocked(fromR, fromC, toR, toC, customBoard);

      case 'n': // Knight
        return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);

      case 'b': // Bishop
        if (rowDiff !== colDiff) return false;
        return !isPathBlocked(fromR, fromC, toR, toC, customBoard);

      case 'q': // Queen
        if (fromR !== toR && fromC !== toC && rowDiff !== colDiff) return false;
        return !isPathBlocked(fromR, fromC, toR, toC, customBoard);

      case 'k': // King
        return rowDiff <= 1 && colDiff <= 1;

      default:
        return false;
    }
  };

  // Highlight helper
  const isHighlighted = (r: number, c: number): boolean => {
    if (!selectedSquare) return false;
    const piece = board[selectedSquare.r][selectedSquare.c];
    return isMoveLegal(selectedSquare.r, selectedSquare.c, r, c, piece);
  };

  // Handle human click on a square
  const handleSquareClick = (r: number, c: number) => {
    if (chessWinner) return; // Prevent any interaction if game is over!
    if (chessTurn !== 'w') return; // Wait for computer/opponent
    audio.playClick();

    const clickedPiece = board[r][c];

    if (selectedSquare) {
      const fromR = selectedSquare.r;
      const fromC = selectedSquare.c;
      const movingPiece = board[fromR][fromC];

      if (isMoveLegal(fromR, fromC, r, c, movingPiece)) {
        // Carry out move
        const newBoard = board.map(row => [...row]);
        const targetPiece = newBoard[r][c];
        
        // Pawn promotion to Queen
        if (movingPiece && movingPiece.type === 'p' && r === 0) {
          newBoard[r][c] = { type: 'q', color: 'w' };
        } else {
          newBoard[r][c] = movingPiece;
        }
        newBoard[fromR][fromC] = null;

        // Save capture
        if (targetPiece) {
          audio.playConfirm();
          setCapturedPieces(prev => ({
            ...prev,
            b: [...prev.b, targetPiece.type]
          }));
        }

        setBoard(newBoard);
        setSelectedSquare(null);
        setChessTurn('b');
        
        const pieceName = getPieceName(movingPiece!.type);
        const destCoords = `${String.fromCharCode(97 + c)}${8 - r}`;
        const moveStr = `${pieceName} to ${destCoords}${targetPiece ? ' (Captured!)' : ''}`;
        setChessLogs(prev => [moveStr, ...prev]);

        if (onActionComplete) onActionComplete();
      } else {
        // If clicked on own piece, select it instead
        if (clickedPiece && clickedPiece.color === 'w') {
          setSelectedSquare({ r, c });
        } else {
          setSelectedSquare(null);
        }
      }
    } else {
      if (clickedPiece && clickedPiece.color === 'w') {
        setSelectedSquare({ r, c });
      }
    }
  };

  // --- ADVANCED MINI-MAX ENGINE with 3-PLY LOOKAHEAD & POSITION MATRIX (Black = Maximizes AI, White = Minimizes Player) ---
  const POSITION_BONUS_KNIGHT = [
    [-10, -5, -5, -5, -5, -5, -5, -10],
    [-5,  0,  0,  2,  2,  0,  0,  -5],
    [-5,  0,  5,  5,  5,  5,  0,  -5],
    [-5,  2,  5, 10, 10,  5,  2,  -5],
    [-5,  2,  5, 10, 10,  5,  2,  -5],
    [-5,  0,  5,  5,  5,  5,  0,  -5],
    [-5,  0,  0,  2,  2,  0,  0,  -5],
    [-10, -5, -5, -5, -5, -5, -5, -10]
  ];

  interface SimulatedMove {
    from: { r: number; c: number };
    to: { r: number; c: number };
    piece: { type: 'p' | 'r' | 'n' | 'b' | 'q' | 'k'; color: 'w' | 'b' };
  }

  const evaluateBoard = (customBoard: ChessBoard): number => {
    let score = 0;
    let whiteKingExists = false;
    let blackKingExists = false;

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = customBoard[r][c];
        if (piece) {
          if (piece.type === 'k') {
            if (piece.color === 'b') blackKingExists = true;
            if (piece.color === 'w') whiteKingExists = true;
          }

          const baseValue = PIECE_VALUES[piece.type] * 10;
          let posBonus = 0;
          if (piece.type === 'p') {
            posBonus = piece.color === 'b' ? r * 2 : (7 - r) * 2;
          } else if (piece.type === 'n') {
            posBonus = POSITION_BONUS_KNIGHT[r][c];
          } else if (piece.type === 'k') {
            posBonus = piece.color === 'b' ? (r === 0 ? 10 : -10) : (r === 7 ? 10 : -10);
          } else {
            const distCenter = Math.abs(3.5 - r) + Math.abs(3.5 - c);
            posBonus = (6 - distCenter) * 0.5;
          }

          const totalValue = baseValue + posBonus;
          if (piece.color === 'b') {
            score += totalValue;
          } else {
            score -= totalValue;
          }
        }
      }
    }

    if (!whiteKingExists) return 99999 + score;
    if (!blackKingExists) return -99999 + score;

    return score;
  };

  const getLegalMoves = (customBoard: ChessBoard, color: 'w' | 'b'): SimulatedMove[] => {
    const moves: SimulatedMove[] = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = customBoard[r][c];
        if (piece && piece.color === color) {
          for (let tr = 0; tr < 8; tr++) {
            for (let tc = 0; tc < 8; tc++) {
              if (isMoveLegal(r, c, tr, tc, piece, customBoard)) {
                moves.push({
                   from: { r, c },
                   to: { r: tr, c: tc },
                   piece: { type: piece.type, color: piece.color }
                });
              }
            }
          }
        }
      }
    }
    return moves;
  };

  const minimax = (
    currentBoard: ChessBoard,
    depth: number,
    alpha: number,
    beta: number,
    isMaximizing: boolean
  ): { score: number; move?: SimulatedMove } => {
    if (depth === 0) {
      return { score: evaluateBoard(currentBoard) };
    }

    const color = isMaximizing ? 'b' : 'w';
    const moves = getLegalMoves(currentBoard, color);

    if (moves.length === 0) {
      return { score: isMaximizing ? -25000 : 25000 };
    }

    moves.sort((m1, m2) => {
      const target1 = currentBoard[m1.to.r][m1.to.c];
      const target2 = currentBoard[m2.to.r][m2.to.c];
      const val1 = target1 ? PIECE_VALUES[target1.type] : 0;
      const val2 = target2 ? PIECE_VALUES[target2.type] : 0;
      return val2 - val1;
    });

    let bestMove: SimulatedMove | undefined = undefined;

    if (isMaximizing) {
      let maxScore = -Infinity;
      for (const move of moves) {
        const nextBoard = currentBoard.map(row => [...row]);
        nextBoard[move.to.r][move.to.c] = move.piece;
        nextBoard[move.from.r][move.from.c] = null;

        if (move.piece.type === 'p' && move.to.r === 7) {
          nextBoard[move.to.r][move.to.c] = { type: 'q', color: 'b' };
        }

        const { score } = minimax(nextBoard, depth - 1, alpha, beta, false);
        if (score > maxScore) {
          maxScore = score;
          bestMove = move;
        }
        alpha = Math.max(alpha, score);
        if (beta <= alpha) {
          break;
        }
      }
      return { score: maxScore, move: bestMove };
    } else {
      let minScore = Infinity;
      for (const move of moves) {
        const nextBoard = currentBoard.map(row => [...row]);
        nextBoard[move.to.r][move.to.c] = move.piece;
        nextBoard[move.from.r][move.from.c] = null;

        if (move.piece.type === 'p' && move.to.r === 0) {
          nextBoard[move.to.r][move.to.c] = { type: 'q', color: 'w' };
        }

        const { score } = minimax(nextBoard, depth - 1, alpha, beta, true);
        if (score < minScore) {
          minScore = score;
          bestMove = move;
        }
        beta = Math.min(beta, score);
        if (beta <= alpha) {
          break;
        }
      }
      return { score: minScore, move: bestMove };
    }
  };

  // Triggers Chess AI Opponent Response (Calculates best moves after player)
  useEffect(() => {
    if (chessTurn !== 'b' || chessWinner !== null) return;

    const timer = setTimeout(() => {
      // Execute 3-ply Minimax Search
      const { move: chosenMove } = minimax(board, 3, -Infinity, Infinity, true);

      if (chosenMove) {
        const newBoard = board.map(row => [...row]);
        const targetPiece = newBoard[chosenMove.to.r][chosenMove.to.c];

        // Pawn promotion to Queen for AI
        if (chosenMove.piece.type === 'p' && chosenMove.to.r === 7) {
          newBoard[chosenMove.to.r][chosenMove.to.c] = { type: 'q', color: 'b' };
        } else {
          newBoard[chosenMove.to.r][chosenMove.to.c] = chosenMove.piece;
        }
        newBoard[chosenMove.from.r][chosenMove.from.c] = null;

        if (targetPiece) {
          audio.startFocusChimes(45); // cute little chime for AI attack
          setCapturedPieces(prev => ({
            ...prev,
            w: [...prev.w, targetPiece.type]
          }));
        }

        setBoard(newBoard);
        setChessTurn('w');
        const aiPieceName = getPieceName(chosenMove.piece.type);
        const aiDestCoords = `${String.fromCharCode(97 + chosenMove.to.c)}${8 - chosenMove.to.r}`;
        const aiMoveStr = `🤖 AI ${aiPieceName} to ${aiDestCoords}${targetPiece ? ' (Captured!)' : ''}`;
        setChessLogs(prev => [aiMoveStr, ...prev]);
      } else {
        // Stalemate/Checkmate look
        setChessLogs(prev => ["Checkmate! You win!", ...prev]);
        setChessTurn('w');
      }
    }, 900);

    return () => clearTimeout(timer);
  }, [chessTurn]);


  // 3. BRAIN QUIZ INTRADAY GAME
  const [quizTopic, setQuizTopic] = useState<'LOGIC' | 'SCIENCE' | 'PATTERN'>('LOGIC');
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>(() => {
    return [...MASTER_QUIZ_POOL['LOGIC']].sort(() => Math.random() - 0.5).slice(0, 4);
  });
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSessionComplete, setQuizSessionComplete] = useState(false);

  const handleOptionSelect = (i: number) => {
    if (quizChecked) return;
    audio.playClick();
    setQuizSelectedOption(i);
  };

  const handleNextQuestion = () => {
    audio.playClick();
    const questions = activeQuestions;
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setQuizSelectedOption(null);
      setQuizChecked(false);
    } else {
      setQuizSessionComplete(true);
    }
  };

  const handleCheckQuizAnswer = () => {
    if (quizSelectedOption === null) return;
    const questions = activeQuestions;
    const correct = questions[currentQIndex]?.correctIndex === quizSelectedOption;
    
    if (correct) {
      audio.playConfirm();
      setQuizScore(quizScore + 1);
    } else {
      audio.startFocusChimes(30);
    }
    setQuizChecked(true);
    if (onActionComplete) onActionComplete();
  };

  const handleResetQuiz = (topic: 'LOGIC' | 'SCIENCE' | 'PATTERN') => {
    audio.playClick();
    setQuizTopic(topic);
    
    // Choose 4 non-repeating random questions out of 9
    const questionsPool = MASTER_QUIZ_POOL[topic] || MASTER_QUIZ_POOL['LOGIC'];
    const shuffled = [...questionsPool].sort(() => Math.random() - 0.5).slice(0, 4);
    setActiveQuestions(shuffled);

    setCurrentQIndex(0);
    setQuizSelectedOption(null);
    setQuizChecked(false);
    setQuizScore(0);
    setQuizSessionComplete(false);
  };


  // 4. MEMORY MATCH CARDS puzzle
  interface MemoryCard {
    id: number;
    symbol: string;
    isFlipped: boolean;
    isMatched: boolean;
  }

  const MEMORY_SYMBOLS = ['🧘', '🧠', '🌊', '🌸', '🍵', '⛰️', '🌳', '🦉'];
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryMatchedCount, setMemoryMatchedCount] = useState(0);

  const initMemoryGame = () => {
    audio.playClick();
    const doubled = [...MEMORY_SYMBOLS, ...MEMORY_SYMBOLS]
      .map((sym, index) => ({
        id: index,
        symbol: sym,
        isFlipped: false,
        isMatched: false
      }))
      // shuffle algorithm
      .sort(() => Math.random() - 0.5);

    setMemoryCards(doubled);
    setFlippedIndices([]);
    setMemoryMoves(0);
    setMemoryMatchedCount(0);
  };

  useEffect(() => {
    if (activeGame === 'MEMORY' && memoryCards.length === 0) {
      initMemoryGame();
    }
  }, [activeGame]);

  const handleCardClick = (i: number) => {
    if (flippedIndices.length === 2) return;
    if (memoryCards[i].isFlipped || memoryCards[i].isMatched) return;

    audio.playClick();
    const updated = [...memoryCards];
    updated[i].isFlipped = true;
    setMemoryCards(updated);

    const newIndices = [...flippedIndices, i];
    setFlippedIndices(newIndices);

    if (newIndices.length === 2) {
      const first = memoryCards[newIndices[0]];
      const second = memoryCards[newIndices[1]];
      setMemoryMoves(m => m + 1);

      if (first.symbol === second.symbol) {
        // Matched!
        setTimeout(() => {
          audio.playConfirm();
          const matchedGrid = updated.map((card, idx) => {
            if (idx === newIndices[0] || idx === newIndices[1]) {
              return { ...card, isMatched: true };
            }
            return card;
          });
          setMemoryCards(matchedGrid);
          setFlippedIndices([]);
          setMemoryMatchedCount(c => c + 1);
          if (onActionComplete) onActionComplete();
        }, 500);
      } else {
        // Slide flip back down
        setTimeout(() => {
          const revertGrid = updated.map((card, idx) => {
            if (idx === newIndices[0] || idx === newIndices[1]) {
              return { ...card, isFlipped: false };
            }
            return card;
          });
          setMemoryCards(revertGrid);
          setFlippedIndices([]);
        }, 1100);
      }
    }
  };


  return (
    <div className="w-full flex flex-col gap-4">
      {/* 4 HORIZONTAL MENU GAME MODAL CHANGER TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {(['SUDOKU', 'CHESS', 'QUIZ', 'MEMORY'] as GameMode[]).map((mode) => {
          const isActive = activeGame === mode;
          const label = mode === 'SUDOKU' ? 'SUDOKU' : mode === 'CHESS' ? 'CHESS' : mode === 'QUIZ' ? 'BRAIN QUIZ' : 'MEMORY FLIP';
          const modeIcon = mode === 'SUDOKU' ? <Grid3X3 className="w-3.5 h-3.5" /> : mode === 'CHESS' ? <Award className="w-3.5 h-3.5" /> : mode === 'QUIZ' ? <HelpCircle className="w-3.5 h-3.5" /> : <Brain className="w-3.5 h-3.5" />;
          
          return (
            <button
              key={mode}
              onClick={() => {
                audio.playClick();
                setActiveGame(mode);
              }}
              className={`p-2 sm:p-3 rounded-xl border flex flex-row items-center justify-center gap-2 transition-all text-[9px] sm:text-[9.5px] font-mono tracking-widest font-black uppercase text-center shrink-0 cursor-pointer ${
                isActive 
                  ? colorMode === 'LIGHT' ? 'bg-amber-100 text-amber-900 border-amber-350 shadow-sm font-extrabold' : 'bg-emerald-500/25 text-emerald-400 border-emerald-500/35 shadow shadow-emerald-500/10'
                  : colorMode === 'LIGHT' ? 'bg-white/40 border-slate-205 text-slate-500 hover:text-slate-800' : 'bg-zinc-950/20 border-white/5 text-slate-500 hover:text-slate-200'
              }`}
            >
              {modeIcon}
              <span className="text-[8px] sm:text-[9px] select-none truncate">{label}</span>
            </button>
          );
        })}
      </div>

      {/* GAME SHELL COMPILING SPACE */}
      <div className={`p-4 rounded-2xl border min-h-[340px] flex flex-col justify-between ${cardInnerBg} ${borderMuted}`}>
        
        {/* =======================================================
            A. SUDOKU SCREEN 
            ======================================================= */}
        {activeGame === 'SUDOKU' && (
          <div className="flex flex-col gap-3">
            {/* Sudoku header / diff picker */}
            <div className="flex flex-col sm:flex-row gap-2 justify-between items-center border-b pb-2 border-dashed border-slate-700/30">
              <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-555 flex items-center gap-1.5 uppercase select-none">
                🧩 ZEN SUDOKU MINDFULNESS
              </span>
              <div className="flex items-center gap-1.5">
                {(['EASY', 'MEDIUM', 'HARD'] as const).map((diff) => {
                  const isSel = sudokuDifficulty === diff;
                  return (
                    <button
                      key={diff}
                      onClick={() => {
                        audio.playClick();
                        setSudokuDifficulty(diff);
                      }}
                      className={`px-2 py-0.5 rounded text-[8.5px] font-mono border transition-all ${
                        isSel 
                          ? colorMode === 'LIGHT' 
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-350 font-black shadow-sm' 
                            : 'bg-emerald-500/25 text-emerald-350 border-emerald-500/40 font-bold' 
                          : colorMode === 'LIGHT'
                            ? 'text-slate-500 hover:text-slate-800 border-transparent hover:bg-slate-100'
                            : 'text-slate-500 hover:text-slate-300 border-transparent hover:bg-white/5'
                      }`}
                    >
                      {diff}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sudoku 9x9 layout */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center py-2">
              <div className="grid grid-cols-9 gap-[1px] bg-slate-400/30 border border-slate-400/50 p-[2.5px] rounded-lg w-full max-w-[280px] xs:max-w-[310px] sm:max-w-[330px]">
                {sudokuGrid.map((row, r) => 
                  row.map((val, c) => {
                    const isCellSelected = sudokuSelectedCell?.r === r && sudokuSelectedCell?.c === c;
                    const isPrefilled = startedSudokuGrid[r] && startedSudokuGrid[r][c] !== 0;
                    
                    // Borders for 3x3 grids
                    const borderR = (r + 1) % 3 === 0 && r < 8 ? 'border-b-2 border-slate-400' : '';
                    const borderC = (c + 1) % 3 === 0 && c < 8 ? 'border-r-2 border-slate-400' : '';

                    let cellStyle = '';
                    if (isPrefilled) {
                      cellStyle = colorMode === 'LIGHT'
                        ? 'bg-slate-100/90 text-slate-705 font-extrabold border-slate-300'
                        : 'bg-slate-500/10 text-slate-400 border-slate-700/30';
                    } else {
                      cellStyle = colorMode === 'LIGHT'
                        ? 'text-emerald-750 hover:bg-emerald-50 border-slate-300'
                        : 'text-emerald-400 hover:bg-emerald-500/10 border-slate-800/40';
                    }

                    if (isCellSelected) {
                      cellStyle += colorMode === 'LIGHT'
                        ? ' bg-emerald-200/90 border-emerald-600 text-emerald-950 font-black ring-2 ring-emerald-500/35'
                        : ' bg-emerald-500/35 border-emerald-400 text-emerald-200 ring-2 ring-emerald-500/40';
                    }

                    return (
                      <div
                        key={`${r}-${c}`}
                        onClick={() => handleSudokuCellClick(r, c)}
                        className={`aspect-square flex items-center justify-center text-xs xs:text-sm font-mono font-bold select-none cursor-pointer border-[0.5px] transition-all text-center ${cellStyle} ${borderR} ${borderC}`}
                      >
                        {val !== 0 ? val : ''}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Sudoku input controls & verify */}
              <div className="flex flex-col gap-3 shrink-0 w-full max-w-[280px] xs:max-w-[310px] sm:max-w-[330px] md:w-36">
                <span className="text-[7.5px] font-mono text-slate-500 text-center md:text-left tracking-wide">ENTER OR UPDATE NUMBER:</span>
                <div className="grid grid-cols-5 gap-1 justify-center">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                    const btnClass = colorMode === 'LIGHT'
                      ? 'bg-slate-100 hover:bg-emerald-100 text-slate-800 hover:text-emerald-800 border border-slate-200/80'
                      : 'bg-white/5 hover:bg-emerald-500/25 text-slate-300 hover:text-emerald-300 border border-white/5';
                    
                    return (
                      <button
                        key={num}
                        onClick={() => handleSudokuNumberInput(num)}
                        disabled={!sudokuSelectedCell}
                        className={`aspect-square rounded border disabled:opacity-30 disabled:hover:bg-transparent text-xs font-mono flex items-center justify-center cursor-pointer transition-all active:scale-90 ${btnClass}`}
                      >
                        {num}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => handleSudokuNumberInput(0)}
                    disabled={!sudokuSelectedCell}
                    className={`aspect-square rounded text-[8px] font-mono uppercase flex items-center justify-center cursor-pointer transition-all active:scale-95 disabled:opacity-30 ${
                      colorMode === 'LIGHT'
                        ? 'bg-rose-100 hover:bg-rose-200 text-rose-800 border border-rose-200/80'
                        : 'bg-rose-500/15 hover:bg-rose-500/30 text-rose-450 border border-rose-500/10'
                    }`}
                    title="Clear cell"
                  >
                    CLR
                  </button>
                </div>

                <div className="flex gap-1.5 mt-2">
                  <button
                    onClick={() => loadSudoku(sudokuDifficulty)}
                    className="flex-grow py-1.5 px-2 text-[9px] font-mono font-bold bg-slate-500/10 rounded border border-white/5 text-slate-400 hover:text-white flex items-center justify-center gap-1 active:scale-95 transition-all"
                  >
                    <RefreshCw className="w-2.5 h-2.5" /> RESET
                  </button>
                  <button
                    onClick={handleCheckSudoku}
                    className="flex-grow py-1.5 px-2 text-[9px] font-mono font-bold bg-emerald-600 hover:bg-emerald-500 text-slate-950 rounded flex items-center justify-center gap-1 font-black cursor-pointer shadow active:scale-95 transition-all"
                  >
                    <Check className="w-2.5 h-2.5" /> CHECK
                  </button>
                </div>
              </div>
            </div>

            {/* Alert banner */}
            {sudokuAlert && (
              <div className={`p-2.5 rounded-lg border text-[9.5px] font-mono flex items-center gap-1.5 ${
                sudokuCompleted ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
              }`}>
                {sudokuCompleted ? <Trophy className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                <span>{sudokuAlert}</span>
              </div>
            )}
          </div>
        )}

        {/* =======================================================
            B. CHESS SCREEN
            ======================================================= */}
        {activeGame === 'CHESS' && (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center border-b pb-2 border-dashed border-slate-700/30">
              <span className="text-[10px] font-mono font-bold tracking-widest text-sky-400 flex items-center gap-1.5 uppercase select-none">
                👑 CHESS MIND COGNITIVE CORE
              </span>
              <button
                onClick={resetChess}
                className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-500/10 hover:bg-slate-500/25 border border-white/5 text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                RESTART MATCH
              </button>
            </div>

            {/* Main board + sidebar stats */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center md:items-stretch py-1.5 flex-col md:flex-row">
              
              {/* Captured dashboard / stats */}
              <div className="md:col-span-3 order-2 md:order-1 grid grid-cols-2 md:grid-cols-1 gap-2 font-mono text-[9px] w-full">
                <div className={`p-2.5 rounded-xl space-y-1.5 border ${subPanelBg}`}>
                  <span className="text-slate-500 uppercase font-bold text-[7.5px] block">MATCH STATUS</span>
                  <div className="flex justify-between items-center gap-1">
                    <span>YOUR SIDE:</span>
                    <span className="text-sky-450 font-bold flex items-center gap-1"><User className="w-2.5 h-2.5 shrink-0" /> WHITE</span>
                  </div>
                  <div className="flex justify-between items-center gap-1 mb-1">
                    <span>CHESS AI:</span>
                    <span className="text-red-400 font-bold flex items-center gap-1"><Monitor className="w-2.5 h-2.5 shrink-0" /> DEEP BLUE</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-slate-500/10 gap-1">
                    <span>TURN:</span>
                    <span className={`font-black p-0.5 px-1 bg-white/5 rounded text-[8px] truncate ${chessTurn === 'w' ? 'text-sky-400 animate-pulse' : 'text-red-400'}`}>
                      {chessTurn === 'w' ? 'YOURS (W)' : 'AI THINKING...'}
                    </span>
                  </div>
                </div>

                <div className={`p-2.5 rounded-xl border ${subPanelBg} overflow-hidden max-h-36`}>
                  <span className="text-slate-500 uppercase font-black text-[7px] block mb-1">CAPTURED MATES</span>
                  <div className="space-y-1 select-none animate-fade-in">
                    <div className="flex justify-between items-center border-b border-white/5 pb-1">
                      <span className="text-white">BY WHITE:</span>
                      <span className="text-[14px] select-none text-emerald-450 tracking-wider">
                        {capturedPieces.b.map(pt => CHESS_SYMBOLS[`b_${pt}`]).join(' ')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-slate-555">BY BLACK:</span>
                      <span className="text-[14px] select-none text-rose-450 tracking-wider">
                        {capturedPieces.w.map(pt => CHESS_SYMBOLS[`w_${pt}`]).join(' ')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* The Interactive Board Display */}
              <div className="md:col-span-6 order-1 md:order-2 flex justify-center items-center relative w-full">
                <div className={`grid grid-cols-8 gap-[1px] p-[2px] rounded-lg overflow-hidden w-full max-w-[280px] xs:max-w-[310px] sm:max-w-[340px] md:max-w-[250px] lg:max-w-[280px] xl:max-w-[315px] shadow-2xl border backdrop-blur-md ${
                  colorMode === 'LIGHT' ? 'bg-slate-300/40 border-slate-200/50' : 'bg-black/30 border-white/10'
                }`}>
                  {board.map((row, r) => 
                    row.map((piece, c) => {
                      const isWhiteCell = (r + c) % 2 === 0;
                      const isSelected = selectedSquare?.r === r && selectedSquare?.c === c;
                      const isPossibleMove = isHighlighted(r, c);

                      // background - glossy and glassmorphic
                      const cellBg = isSelected 
                        ? 'bg-amber-400/40 text-white backdrop-blur-md shadow-inner ring-2 ring-amber-400/50' 
                        : isPossibleMove 
                          ? 'bg-emerald-500/35 hover:bg-emerald-500/50 backdrop-blur-sm' 
                          : isWhiteCell 
                            ? colorMode === 'LIGHT' 
                              ? 'bg-slate-50/65 hover:bg-white/95 border border-white/10' 
                              : 'bg-white/12 hover:bg-white/20 backdrop-blur-sm border border-white/5 shadow-inner'
                            : colorMode === 'LIGHT' 
                              ? 'bg-[#10b981]/12 hover:bg-[#10b981]/25 border border-[#10b981]/5' 
                              : 'bg-emerald-950/40 hover:bg-emerald-950/55 backdrop-blur-sm border border-emerald-500/10 shadow-inner';

                      // CSS styles for high contrast pieces
                      const pieceColorClass = piece?.color === 'w'
                        ? colorMode === 'LIGHT'
                          ? 'text-amber-700 filter drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] sm:drop-shadow-[0_1.5px_1.5px_rgba(255,255,255,0.85)] hover:scale-105 transition-transform font-bold'
                          : 'text-amber-200 filter drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.95)] hover:scale-105 transition-transform'
                        : colorMode === 'LIGHT'
                          ? 'text-slate-800 filter drop-shadow-[0_1px_1.5px_rgba(255,255,255,0.9)] hover:scale-105 transition-transform font-bold'
                          : 'text-rose-405 filter drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.95)] hover:scale-105 transition-transform font-bold';

                      return (
                        <div
                          key={`${r}-${c}`}
                          onClick={() => handleSquareClick(r, c)}
                          className={`aspect-square flex items-center justify-center text-xl cursor-pointer transition-all relative select-none ${cellBg}`}
                        >
                          {piece && (
                            <span className={`text-[1.4rem] leading-none select-none z-10 ${pieceColorClass}`}>
                              {CHESS_SYMBOLS[`${piece.color}_${piece.type}`]}
                            </span>
                          )}
                          {/* Highlight handle indicator */}
                          {isPossibleMove && !piece && (
                            <span className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-90 shadow" />
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                {chessWinner && (
                  <div className="absolute inset-0 m-auto w-full max-w-[280px] xs:max-w-[310px] sm:max-w-[340px] md:max-w-[250px] lg:max-w-[280px] xl:max-w-[315px] h-full flex flex-col items-center justify-center bg-black/75 backdrop-blur-md rounded-lg p-2 text-center z-20 transition-all duration-300">
                    <div className="bg-slate-900/95 border border-white/10 p-4 rounded-xl shadow-2xl max-w-[210px] space-y-2.5 flex flex-col items-center justify-center">
                      {chessWinner === 'w' ? (
                        <div className="text-3xl text-amber-400 select-none animate-bounce">👑</div>
                      ) : (
                        <div className="text-3xl text-rose-500 select-none animate-pulse">💀</div>
                      )}
                      <div>
                        <h4 className={`text-xs font-mono font-black tracking-widest uppercase ${
                          chessWinner === 'w' ? 'text-amber-300' : 'text-rose-400'
                        }`}>
                          {chessWinner === 'w' ? 'VICTORY!' : 'DEFEAT!'}
                        </h4>
                        <p className="text-[9px] text-slate-300 font-mono mt-1 leading-normal">
                          {chessWinner === 'w' 
                            ? 'You have captured the AI\'s King!' 
                            : 'The AI has captured your King!'}
                        </p>
                      </div>
                      <div className="bg-white/5 border border-white/5 px-2 py-1 rounded text-slate-400 font-mono text-[8px] tracking-wide w-full">
                        {restartCountdown !== null ? `Auto-restart in ${restartCountdown}s...` : 'Restarting game...'}
                      </div>
                      <button
                        onClick={resetChess}
                        className="w-full text-center py-1 px-3 rounded text-black bg-gradient-to-r from-amber-400 to-amber-300 hover:brightness-110 active:scale-95 font-mono text-[8.5px] font-black tracking-widest uppercase select-none transition-all cursor-pointer shadow-md"
                      >
                        RESTART NOW
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Move Logs terminal */}
              <div className="md:col-span-3 order-3 md:order-3 flex flex-col border border-slate-700/20 rounded-xl p-2 bg-[#090d16]/30 overflow-hidden h-40 w-full animate-fade-in">
                <span className="text-[7.5px] font-mono text-slate-500 font-black tracking-widest uppercase mb-1.5 block">MOVE LOGS TIMEOUT</span>
                <div className="flex-grow overflow-y-auto space-y-1 font-mono text-[8px] tracking-tight text-slate-400 select-none">
                  {chessLogs.map((log, index) => (
                    <div key={index} className="flex gap-1 items-start leading-tight">
                      <span className="text-slate-600">&gt;</span>
                      <span dangerouslySetInnerHTML={{ __html: log }} />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =======================================================
            C. BRAIN QUIZ SCREEN
            ======================================================= */}
        {activeGame === 'QUIZ' && (
          <div className="flex flex-col gap-3">
            {/* Quiz Title & topic pickers */}
            <div className="flex justify-between items-center border-b pb-2 border-dashed border-slate-700/30">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#0ea5e9]">
                💡 LATERAL MIND TRIVIA SHIELD
              </span>
              <div className="flex items-center gap-1 font-mono text-[8.5px]">
                {(['LOGIC', 'SCIENCE', 'PATTERN'] as const).map((topic) => (
                  <button
                    key={topic}
                    onClick={() => handleResetQuiz(topic)}
                    className={`px-2 py-0.5 rounded border ${
                      quizTopic === topic 
                        ? 'bg-sky-500/15 text-sky-400 border-sky-500/35 font-bold' 
                        : 'text-slate-500 hover:text-slate-400 border-transparent'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* If complete display score summary */}
            {quizSessionComplete ? (
              <div className="text-center py-6 flex flex-col items-center gap-2 select-none text-center">
                <Trophy className="w-12 h-12 text-amber-500 animate-bounce" />
                <h4 className={`text-sm font-black font-mono tracking-widest mt-1 uppercase ${colorMode === 'LIGHT' ? 'text-slate-800' : 'text-white'}`}>Topic complete!</h4>
                <p className={`text-xs font-mono font-bold ${colorMode === 'LIGHT' ? 'text-emerald-700' : 'text-emerald-400'}`}>
                  Final score: {quizScore} / {activeQuestions.length} correct answers!
                </p>
                <button
                  onClick={() => handleResetQuiz(quizTopic)}
                  className={`mt-3 px-3 py-1.5 text-[9.5px] font-mono font-black border tracking-widest rounded-lg transition-all active:scale-95 cursor-pointer ${
                    colorMode === 'LIGHT'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                  }`}
                >
                  PLAY AGAIN
                </button>
              </div>
            ) : (
              <div className="space-y-4 py-1 flex flex-col">
                <div className="flex justify-between items-center text-[8px] font-mono text-slate-500">
                  <span>TOPIC: {quizTopic} SEC</span>
                  <span className="tabular-nums">QUESTION: {currentQIndex + 1} / {activeQuestions.length}</span>
                </div>

                {/* Question */}
                <h4 className={`text-xs sm:text-[13px] font-mono leading-relaxed p-3.5 border rounded-xl select-none ${subPanelBg}`}>
                  {activeQuestions[currentQIndex]?.question}
                </h4>

                {/* Option grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeQuestions[currentQIndex]?.options.map((opt, optIdx) => {
                    const isSelected = quizSelectedOption === optIdx;
                    const isCorrectOption = activeQuestions[currentQIndex]?.correctIndex === optIdx;

                    let btnClass = '';
                    if (isSelected) {
                      btnClass = colorMode === 'LIGHT'
                        ? 'bg-sky-50 text-sky-850 border-sky-300 ring-2 ring-sky-450/25'
                        : 'bg-sky-500/15 text-sky-300 border-sky-400/40 ring-1 ring-sky-450/40';
                    } else {
                      btnClass = colorMode === 'LIGHT'
                        ? 'bg-slate-50 hover:bg-slate-100 border-slate-205 text-slate-700'
                        : 'bg-zinc-950/20 hover:bg-[#ffffff06] border-white/5 text-slate-300';
                    }
                    
                    if (quizChecked) {
                      if (isCorrectOption) {
                        btnClass = colorMode === 'LIGHT'
                          ? 'bg-emerald-55 text-emerald-850 border-emerald-400 ring-2 ring-emerald-400/35'
                          : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 ring-1';
                      } else if (isSelected) {
                        btnClass = colorMode === 'LIGHT'
                          ? 'bg-rose-50 text-rose-800 border-rose-300'
                          : 'bg-red-500/15 text-red-400 border-red-550/45';
                      } else {
                        btnClass = colorMode === 'LIGHT'
                          ? 'opacity-30 bg-slate-100/50 text-slate-400 border-transparent'
                          : 'opacity-40 bg-zinc-900/10 text-slate-600 border-transparent';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleOptionSelect(optIdx)}
                        disabled={quizChecked}
                        className={`p-2.5 sm:p-3 text-[11px] font-mono rounded-xl border text-left flex items-start gap-2.5 transition-all select-none cursor-pointer group hover:scale-101 outline-none ${btnClass}`}
                      >
                        <span className="h-4 w-4 rounded-full bg-slate-500/10 text-slate-500 text-[8.5px] font-mono flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-tight select-none">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Action button */}
                <div className="flex justify-between items-center pt-2 gap-3">
                  <div className="text-[9px] font-mono leading-tight max-w-[70%] select-none">
                    {quizChecked ? (
                      <span className="text-slate-450">{activeQuestions[currentQIndex]?.explanation}</span>
                    ) : (
                      <span className="text-slate-500">Select option and submit for check.</span>
                    )}
                  </div>
                  
                  {!quizChecked ? (
                    <button
                      onClick={handleCheckQuizAnswer}
                      disabled={quizSelectedOption === null}
                      className="px-4 py-2 font-mono font-black text-xs tracking-wider bg-sky-500 hover:bg-sky-450 text-slate-950 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg shrink-0 cursor-pointer shadow transform active:scale-95"
                    >
                      SUBMIT
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="px-4 py-1.5 font-mono font-black text-xs tracking-wider bg-emerald-600 hover:bg-emerald-500 text-slate-950 rounded-lg shrink-0 cursor-pointer shadow active:scale-95 transition-all"
                    >
                      {currentQIndex === activeQuestions.length - 1 ? 'FINISH' : 'NEXT QUESTION >'}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* =======================================================
            D. MEMORY CARDS FLIP SCREEN
            ======================================================= */}
        {activeGame === 'MEMORY' && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-2 justify-between items-center border-b pb-2 border-dashed border-slate-700/30">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#0ea5e9] flex items-center gap-1.5 uppercase select-none">
                🧠 MINDFULNESS MEMORY MATRIX
              </span>
              <div className="flex items-center gap-3 sm:gap-4 text-[9px] font-mono">
                <span className="tabular-nums">MOVES: {memoryMoves}</span>
                <span className={`tabular-nums font-black ${colorMode === 'LIGHT' ? 'text-emerald-700' : 'text-emerald-450'}`}>MATCHED: {memoryMatchedCount} / 8</span>
                <button
                  onClick={initMemoryGame}
                  className="px-2 py-0.5 rounded bg-slate-500/10 hover:bg-slate-500/25 border border-white/5 text-slate-400 hover:text-white transition-all cursor-pointer active:scale-95"
                >
                  RESET GRID
                </button>
              </div>
            </div>

            {/* Check success state */}
            {memoryMatchedCount === 8 ? (
              <div className="text-center py-6 flex flex-col items-center gap-2 select-none text-center">
                <Trophy className="w-12 h-12 text-amber-500 animate-bounce" />
                <h4 className={`text-sm font-black font-mono tracking-widest mt-1 uppercase ${colorMode === 'LIGHT' ? 'text-slate-800' : 'text-white'}`}>Grid completed!</h4>
                <p className={`text-xs font-mono font-bold ${colorMode === 'LIGHT' ? 'text-emerald-700' : 'text-emerald-450'}`}>
                  Completed in {memoryMoves} moves total! Excellent focus.
                </p>
                <button
                  onClick={initMemoryGame}
                  className={`mt-3 px-3 py-1.5 text-[9.5px] font-mono font-black border tracking-widest rounded-lg transition-all active:scale-95 cursor-pointer ${
                    colorMode === 'LIGHT'
                      ? 'bg-sky-50 text-sky-850 border-sky-300 hover:bg-sky-100'
                      : 'bg-[#0ea5e9]/20 text-[#0ea5e9] border-[#0ea5e9]/30 hover:bg-[#0ea5e9]/30'
                  }`}
                >
                  PLAY AGAIN
                </button>
              </div>
            ) : (
              <div className="flex justify-center items-center py-2">
                <div className="grid grid-cols-4 gap-2 sm:gap-3.5 w-full max-w-[260px] xs:max-w-[290px] sm:max-w-[325px] justify-center items-center select-none">
                  {memoryCards.map((card, idx) => {
                    const isFlipped = card.isFlipped || card.isMatched;

                    return (
                      <div
                        key={card.id}
                        onClick={() => handleCardClick(idx)}
                        className={`aspect-square rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-center transform active:scale-95 border select-none
                          ${isFlipped 
                            ? colorMode === 'LIGHT' 
                              ? 'bg-amber-50 border-amber-300 text-amber-950 shadow-inner text-[1.4rem] rotate-0 shadow scale-102' 
                              : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300 shadow-inner text-[1.4rem] rotate-0 shadow scale-102' 
                            : colorMode === 'LIGHT' 
                              ? 'bg-slate-100 hover:bg-slate-205 border-slate-250 text-slate-400 text-[11px] sm:text-xs' 
                              : 'bg-[#ffffff06] hover:bg-white/10 hover:border-slate-700 border-white/5 text-slate-500 text-[11px] sm:text-xs'
                          }
                          ${card.isMatched ? 'opacity-60 border-emerald-500/30' : ''}
                        `}
                      >
                        {isFlipped ? card.symbol : '❓'}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

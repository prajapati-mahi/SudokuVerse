import { create } from "zustand";
import { calculateFinalScore } from "../utils/scoreCalculator";
import { findWrongCell, getCandidates } from "../utils/hintSystem";
import { isPuzzleSolved } from "../utils/sudokuValidator";

export const useGameStore = create((set, get) => ({
  size: "3x3",
  difficulty: "easy",

  puzzleGrid: [],
  solutionGrid: [],
  userGrid: [],

  pencilMarks: {},

  selectedCell: null,

  mistakes: 0,
  score: 0,
  hintsLeft: 3,

  timeElapsed: 0,

  undoStack: [],
  redoStack: [],

  isGameOver: false,
  isGameWon: false,

  isPencilMode: false,

  // Hint UI state
  hintMessage: "",
  highlightedCell: null,
  highlightedRow: null,
  highlightedCol: null,
  candidatesList: [],

  setGameConfig: (size, difficulty) => {
    set({ size, difficulty });
  },

  setPuzzle: (puzzleGrid, solutionGrid) => {
    set({
      puzzleGrid,
      solutionGrid,
      userGrid: JSON.parse(JSON.stringify(puzzleGrid)),
      pencilMarks: {},
      mistakes: 0,
      score: 0,
      hintsLeft: 3,
      timeElapsed: 0,
      undoStack: [],
      redoStack: [],
      isGameOver: false,
      isGameWon: false,
      selectedCell: null,
      isPencilMode: false,
      hintMessage: "",
      highlightedCell: null,
      highlightedRow: null,
      highlightedCol: null,
      candidatesList: [],
    });
  },

  setSelectedCell: (row, col) => {
    set({ selectedCell: { row, col } });
  },

  togglePencil: () => {
    set({ isPencilMode: !get().isPencilMode });
  },

  setTimeElapsed: (callback) => {
    set((state) => ({
      timeElapsed:
        typeof callback === "function" ? callback(state.timeElapsed) : callback,
    }));
  },

  incrementMistake: () => {
    const mistakes = get().mistakes + 1;

    if (mistakes >= 3) {
      set({ mistakes, isGameOver: true });
    } else {
      set({ mistakes });
    }
  },

  calculateScore: () => {
    const { difficulty, timeElapsed, mistakes, hintsLeft } = get();
    const hintsUsed = 3 - hintsLeft;

    const finalScore = calculateFinalScore(
      difficulty,
      timeElapsed,
      mistakes,
      hintsUsed
    );

    set({ score: finalScore });
  },

  enterNumber: (num) => {
    const {
      selectedCell,
      puzzleGrid,
      userGrid,
      solutionGrid,
      isPencilMode,
      pencilMarks,
      undoStack,
    } = get();

    if (!selectedCell) return;

    const { row, col } = selectedCell;

    if (puzzleGrid[row][col] !== 0) return;

    const key = `${row}-${col}`;

    // Save for undo
    set({
      undoStack: [
        ...undoStack,
        {
          userGrid: JSON.parse(JSON.stringify(userGrid)),
          pencilMarks: JSON.parse(JSON.stringify(pencilMarks)),
          mistakes: get().mistakes,
          score: get().score,
          hintsLeft: get().hintsLeft,
        },
      ],
      redoStack: [],
    });

    // Pencil Mode
    if (isPencilMode) {
      const existingNotes = pencilMarks[key] || [];

      if (existingNotes.includes(num)) {
        const updatedNotes = existingNotes.filter((n) => n !== num);

        set({
          pencilMarks: {
            ...pencilMarks,
            [key]: updatedNotes,
          },
        });
      } else {
        set({
          pencilMarks: {
            ...pencilMarks,
            [key]: [...existingNotes, num].sort((a, b) => a - b),
          },
        });
      }
      return;
    }

    // Normal placement
    const newGrid = JSON.parse(JSON.stringify(userGrid));
    newGrid[row][col] = num;

    if (solutionGrid[row][col] !== num) {
      get().incrementMistake();
    }

    set({ userGrid: newGrid });

    // Clear pencil marks for that cell
    const updatedMarks = { ...pencilMarks };
    delete updatedMarks[key];
    set({ pencilMarks: updatedMarks });

    // Check solved
    const solved = isPuzzleSolved(newGrid, solutionGrid);

    if (solved) {
      set({ isGameWon: true });
      get().calculateScore();
    }
  },

  eraseCell: () => {
    const { selectedCell, puzzleGrid, userGrid, pencilMarks, undoStack } = get();

    if (!selectedCell) return;

    const { row, col } = selectedCell;

    if (puzzleGrid[row][col] !== 0) return;

    const key = `${row}-${col}`;

    set({
      undoStack: [
        ...undoStack,
        {
          userGrid: JSON.parse(JSON.stringify(userGrid)),
          pencilMarks: JSON.parse(JSON.stringify(pencilMarks)),
          mistakes: get().mistakes,
          score: get().score,
          hintsLeft: get().hintsLeft,
        },
      ],
      redoStack: [],
    });

    const newGrid = JSON.parse(JSON.stringify(userGrid));
    newGrid[row][col] = 0;

    const updatedMarks = { ...pencilMarks };
    delete updatedMarks[key];

    set({ userGrid: newGrid, pencilMarks: updatedMarks });
  },

  undoMove: () => {
    const { undoStack, redoStack, userGrid, pencilMarks } = get();

    if (undoStack.length === 0) return;

    const lastState = undoStack[undoStack.length - 1];

    set({
      redoStack: [
        ...redoStack,
        {
          userGrid: JSON.parse(JSON.stringify(userGrid)),
          pencilMarks: JSON.parse(JSON.stringify(pencilMarks)),
          mistakes: get().mistakes,
          score: get().score,
          hintsLeft: get().hintsLeft,
        },
      ],
      undoStack: undoStack.slice(0, -1),
      userGrid: lastState.userGrid,
      pencilMarks: lastState.pencilMarks,
      mistakes: lastState.mistakes,
      score: lastState.score,
      hintsLeft: lastState.hintsLeft,
    });
  },

  redoMove: () => {
    const { redoStack, undoStack, userGrid, pencilMarks } = get();

    if (redoStack.length === 0) return;

    const nextState = redoStack[redoStack.length - 1];

    set({
      undoStack: [
        ...undoStack,
        {
          userGrid: JSON.parse(JSON.stringify(userGrid)),
          pencilMarks: JSON.parse(JSON.stringify(pencilMarks)),
          mistakes: get().mistakes,
          score: get().score,
          hintsLeft: get().hintsLeft,
        },
      ],
      redoStack: redoStack.slice(0, -1),
      userGrid: nextState.userGrid,
      pencilMarks: nextState.pencilMarks,
      mistakes: nextState.mistakes,
      score: nextState.score,
      hintsLeft: nextState.hintsLeft,
    });
  },

  useHint: () => {
    const { selectedCell, puzzleGrid, userGrid, solutionGrid, hintsLeft, size } =
      get();

    if (hintsLeft <= 0) return;

    const boxSize = size === "2x2" ? 2 : size === "3x3" ? 3 : 4;

    // Clear previous hint state
    set({
      hintMessage: "",
      highlightedCell: null,
      highlightedRow: null,
      highlightedCol: null,
      candidatesList: [],
    });

    // Random hint type
    const hintType = Math.floor(Math.random() * 3) + 1;

    // 1) Wrong cell highlight
    if (hintType === 1) {
      const wrongCell = findWrongCell(userGrid, solutionGrid, puzzleGrid);

      if (wrongCell) {
        set({
          highlightedCell: wrongCell,
          hintMessage: "❌ A wrong cell is highlighted!",
          hintsLeft: hintsLeft - 1,
        });
        return;
      }
    }

    // 2) Row/Column highlight
    if (hintType === 2 && selectedCell) {
      set({
        highlightedRow: selectedCell.row,
        highlightedCol: selectedCell.col,
        hintMessage: "⚡ Check this row & column for conflicts!",
        hintsLeft: hintsLeft - 1,
      });
      return;
    }

    // 3) Candidates list
    if (hintType === 3 && selectedCell) {
      const { row, col } = selectedCell;

      if (puzzleGrid[row][col] !== 0) {
        set({
          hintMessage: "⚠️ Fixed cell selected. Choose an empty cell!",
        });
        return;
      }

      const candidates = getCandidates(userGrid, row, col, boxSize);

      set({
        candidatesList: candidates,
        hintMessage: "✅ Possible candidates are shown below.",
        hintsLeft: hintsLeft - 1,
      });
      return;
    }

    set({
      hintMessage: "⚠️ No hint available right now. Select a cell first!",
    });
  },

  resetGame: () => {
    const { puzzleGrid, solutionGrid, size, difficulty } = get();

    set({
      size,
      difficulty,
      puzzleGrid,
      solutionGrid,
      userGrid: JSON.parse(JSON.stringify(puzzleGrid)),
      pencilMarks: {},
      selectedCell: null,
      mistakes: 0,
      score: 0,
      hintsLeft: 3,
      timeElapsed: 0,
      undoStack: [],
      redoStack: [],
      isGameOver: false,
      isGameWon: false,
      isPencilMode: false,
      hintMessage: "",
      highlightedCell: null,
      highlightedRow: null,
      highlightedCol: null,
      candidatesList: [],
    });
  },
}));

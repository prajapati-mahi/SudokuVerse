import { create } from "zustand";

export const useGameStore = create((set, get) => ({
  // =========================
  // GAME STATE VARIABLES
  // =========================

  size: "3x3",
  difficulty: "easy",

  puzzleGrid: [], // original puzzle (fixed numbers)
  solutionGrid: [], // solved grid
  userGrid: [], // what user is filling

  pencilMarks: {}, // { "row-col": [1,2,3] }

  selectedCell: null, // {row, col}

  mistakes: 0,
  score: 0,
  hintsLeft: 3,

  timeElapsed: 0, // in seconds

  undoStack: [],
  redoStack: [],

  isGameOver: false,
  isGameWon: false,

  isPencilMode: false,

  // =========================
  // ACTIONS / FUNCTIONS
  // =========================

  setGameConfig: (size, difficulty) => {
    set({ size, difficulty });
  },

  setPuzzle: (puzzleGrid, solutionGrid) => {
    set({
      puzzleGrid,
      solutionGrid,
      userGrid: JSON.parse(JSON.stringify(puzzleGrid)), // deep copy
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
    });
  },

  setSelectedCell: (row, col) => {
    set({ selectedCell: { row, col } });
  },

  togglePencil: () => {
    set({ isPencilMode: !get().isPencilMode });
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

    let baseScore = 0;

    if (difficulty === "beginner") baseScore = 200;
    else if (difficulty === "easy") baseScore = 400;
    else if (difficulty === "medium") baseScore = 600;
    else if (difficulty === "hard") baseScore = 800;
    else if (difficulty === "expert") baseScore = 1000;
    else if (difficulty === "extreme") baseScore = 1200;

    const hintsUsed = 3 - hintsLeft;

    const hintPenalty = hintsUsed * 50;
    const mistakePenalty = mistakes * 30;

    const timeBonus = Math.max(0, 500 - Math.floor(timeElapsed / 2));

    const finalScore = baseScore + timeBonus - hintPenalty - mistakePenalty;

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

    // If cell is fixed (original puzzle), do nothing
    if (puzzleGrid[row][col] !== 0) return;

    const key = `${row}-${col}`;

    // Save current state for undo
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

    // Pencil mode logic
    if (isPencilMode) {
      const existingNotes = pencilMarks[key] || [];

      if (existingNotes.includes(num)) {
        // remove note
        const updatedNotes = existingNotes.filter((n) => n !== num);
        set({
          pencilMarks: {
            ...pencilMarks,
            [key]: updatedNotes,
          },
        });
      } else {
        // add note
        set({
          pencilMarks: {
            ...pencilMarks,
            [key]: [...existingNotes, num].sort((a, b) => a - b),
          },
        });
      }

      return;
    }

    // Normal mode (place number)
    const newGrid = JSON.parse(JSON.stringify(userGrid));
    newGrid[row][col] = num;

    // Check correctness
    if (solutionGrid[row][col] !== num) {
      get().incrementMistake();
    }

    set({ userGrid: newGrid });

    // Clear pencil marks after placing number
    const updatedMarks = { ...pencilMarks };
    delete updatedMarks[key];
    set({ pencilMarks: updatedMarks });

    // Check if solved
    const isSolved = newGrid.every((r, rIndex) =>
      r.every((val, cIndex) => val === solutionGrid[rIndex][cIndex])
    );

    if (isSolved) {
      set({ isGameWon: true });
      get().calculateScore();
    }
  },

  eraseCell: () => {
    const { selectedCell, puzzleGrid, userGrid, pencilMarks, undoStack } = get();

    if (!selectedCell) return;

    const { row, col } = selectedCell;

    // fixed cell cannot be erased
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
    const { selectedCell, puzzleGrid, userGrid, solutionGrid, hintsLeft } = get();

    if (!selectedCell) return;
    if (hintsLeft <= 0) return;

    const { row, col } = selectedCell;

    // fixed cell can't take hint
    if (puzzleGrid[row][col] !== 0) return;

    const newGrid = JSON.parse(JSON.stringify(userGrid));
    newGrid[row][col] = solutionGrid[row][col];

    set({
      userGrid: newGrid,
      hintsLeft: hintsLeft - 1,
    });

    // Check if solved after hint
    const isSolved = newGrid.every((r, rIndex) =>
      r.every((val, cIndex) => val === solutionGrid[rIndex][cIndex])
    );

    if (isSolved) {
      set({ isGameWon: true });
      get().calculateScore();
    }
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
    });
  },

  setTimeElapsed: (time) => {
    set({ timeElapsed: time });
  },
}));

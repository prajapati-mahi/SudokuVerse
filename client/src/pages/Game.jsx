import { useEffect } from "react";
import { useParams } from "react-router-dom";
import GameOverModal from "../components/GameOverModal";
import WinModal from "../components/WinModal";
import TopBar from "../components/TopBar";
import useTimer from "../hooks/useTimer";

import SudokuBoard from "../components/SudokuBoard";
import GameControls from "../components/GameControls";
import NumberPad from "../components/NumberPad";

import { useGameStore } from "../store/useGameStore";

export default function Game() {
  const { size, difficulty } = useParams();
  const [isPaused, setIsPaused] = useState(false);
  useTimer(isPaused, isGameOver, isGameWon, setTimeElapsed);


  const {
    puzzleGrid,
    userGrid,
    selectedCell,
    setSelectedCell,
    enterNumber,
    eraseCell,
    undoMove,
    redoMove,
    useHint,
    togglePencil,
    isPencilMode,
    hintsLeft,
    isGameOver,
    isGameWon,
    mistakes,
    score,
    setPuzzle,
    setGameConfig,
    resetGame,
    timeElapsed,
    setTimeElapsed,
  } = useGameStore();

  // Temporary puzzle setup for testing
  useEffect(() => {
    setGameConfig(size, difficulty);

    const gridSize = size === "2x2" ? 4 : size === "3x3" ? 9 : 16;

    const emptyPuzzle = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => 0)
    );

    const emptySolution = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => 1)
    );

    setPuzzle(emptyPuzzle, emptySolution);
  }, [size, difficulty, setPuzzle, setGameConfig]);

  const handleNumberClick = (num) => {
    if (!isGameOver && !isGameWon) {
      enterNumber(num);
    }
  };

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold text-center">SudokuVerse 🧩</h1>

      <p className="text-center mt-2 text-white/70">
        Size: <span className="text-blue-400">{size}</span> | Difficulty:{" "}
        <span className="text-pink-400">{difficulty}</span>
      </p>

      <SudokuBoard
        board={userGrid}
        size={size}
        selectedCell={selectedCell}
        setSelectedCell={(cell) => setSelectedCell(cell.row, cell.col)}
      />

      <GameControls
        isPencilMode={isPencilMode}
        setIsPencilMode={togglePencil}
        handleEraser={eraseCell}
        handleUndo={undoMove}
        handleRedo={redoMove}
        handleHint={useHint}
        handlePause={() => setIsPaused(!isPaused)}
        isPaused={isPaused}
        hintsLeft={hintsLeft}
        theme={"classic"}
        setTheme={() => {}}
        isSoundOn={true}
        setIsSoundOn={() => {}}
      />

      <TopBar
        score={score}
        mistakes={mistakes}
        timeElapsed={timeElapsed}
        hintsLeft={hintsLeft}
      />


      <NumberPad size={size} onNumberClick={handleNumberClick} />

      {/* ✅ ADD MODALS HERE (JUST BEFORE CLOSING DIV) */}
      {isGameOver && <GameOverModal onRestart={resetGame} />}
      {isGameWon && <WinModal score={score} onRestart={resetGame} />}
    </div>
  );

}

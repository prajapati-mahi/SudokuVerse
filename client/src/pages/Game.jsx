import { useEffect } from "react";
import { useParams } from "react-router-dom";

import SudokuBoard from "../components/SudokuBoard";
import GameControls from "../components/GameControls";
import NumberPad from "../components/NumberPad";

import { useGameStore } from "../store/useGameStore";

export default function Game() {
  const { size, difficulty } = useParams();

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

      <div className="flex justify-center gap-6 mt-4 text-white/80">
        <p>Score: <span className="text-green-400 font-bold">{score}</span></p>
        <p>Mistakes: <span className="text-red-400 font-bold">{mistakes}/3</span></p>
      </div>

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
        handlePause={() => alert("Pause will be added later")}
        isPaused={false}
        hintsLeft={hintsLeft}
        theme={"classic"}
        setTheme={() => {}}
        isSoundOn={true}
        setIsSoundOn={() => {}}
      />

      <NumberPad size={size} onNumberClick={handleNumberClick} />

      {isGameOver && (
        <div className="text-center mt-6 text-red-500 font-bold text-2xl">
          Game Over! ❌
        </div>
      )}

      {isGameWon && (
        <div className="text-center mt-6 text-green-400 font-bold text-2xl">
          Congratulations! You Won 🎉
        </div>
      )}
    </div>
  );
}

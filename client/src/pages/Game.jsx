import { useState } from "react";
import { useParams } from "react-router-dom";
import SudokuBoard from "../components/SudokuBoard";
import GameControls from "../components/GameControls";

export default function Game() {
  const { size, difficulty } = useParams();

  const gridSize = size === "2x2" ? 4 : size === "3x3" ? 9 : 16;

  const initialBoard = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () => 0)
  );

  const [board, setBoard] = useState(initialBoard);
  const [selectedCell, setSelectedCell] = useState(null);

  const [isPencilMode, setIsPencilMode] = useState(false);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  const [theme, setTheme] = useState("classic");
  const [isSoundOn, setIsSoundOn] = useState(true);

  // Dummy functions (we will implement properly later)
  const handleEraser = () => {
    alert("Eraser clicked (logic will be added later)");
  };

  const handleUndo = () => {
    alert("Undo clicked (logic will be added later)");
  };

  const handleRedo = () => {
    alert("Redo clicked (logic will be added later)");
  };

  const handleHint = () => {
    if (hintsLeft > 0) {
      setHintsLeft(hintsLeft - 1);
      alert("Hint used (logic will be added later)");
    }
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold text-center">SudokuVerse 🧩</h1>

      <p className="text-center mt-2 text-white/70">
        Size: <span className="text-blue-400">{size}</span> | Difficulty:{" "}
        <span className="text-pink-400">{difficulty}</span>
      </p>

      <SudokuBoard
        board={board}
        size={size}
        selectedCell={selectedCell}
        setSelectedCell={setSelectedCell}
      />

      <GameControls
        isPencilMode={isPencilMode}
        setIsPencilMode={setIsPencilMode}
        handleEraser={handleEraser}
        handleUndo={handleUndo}
        handleRedo={handleRedo}
        handleHint={handleHint}
        handlePause={handlePause}
        isPaused={isPaused}
        hintsLeft={hintsLeft}
        theme={theme}
        setTheme={setTheme}
        isSoundOn={isSoundOn}
        setIsSoundOn={setIsSoundOn}
      />
    </div>
  );
}

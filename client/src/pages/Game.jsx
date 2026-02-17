import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SudokuBoard from "../components/SudokuBoard";
import GameControls from "../components/GameControls";
import NumberPad from "../components/NumberPad";
import TopBar from "../components/TopBar";

import GameOverModal from "../components/GameOverModal";
import WinModal from "../components/WinModal";
import { soundManager } from "../utils/soundManager";

import useTimer from "../hooks/useTimer";

import { useGameStore } from "../store/useGameStore";

export default function Game() {
  const { size, difficulty } = useParams();
  const [isPaused, setIsPaused] = useState(false);

  const {
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
    resetGame,
    timeElapsed,
    setTimeElapsed,
    setPuzzle,
    setGameConfig,

    // Hint UI states
    hintMessage,
    highlightedCell,
    highlightedRow,
    highlightedCol,
    candidatesList,
  } = useGameStore();

  useEffect(() => {
    setGameConfig(size, difficulty);

    const gridSize = size === "2x2" ? 4 : size === "3x3" ? 9 : 16;

    const emptyPuzzle = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => 0)
    );

    // Dummy solution for now (later we will generate real puzzle)
    const dummySolution = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => 1)
    );

    setPuzzle(emptyPuzzle, dummySolution);
  }, [size, difficulty, setPuzzle, setGameConfig]);

  useTimer(isPaused, isGameOver, isGameWon, setTimeElapsed);

  const handleNumberClick = (num) => {
    if (!isGameOver && !isGameWon && !isPaused) {
      enterNumber(num);
    }
  };

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold text-center">SudokuVerse 🧩</h1>

      <button
        onClick={() => soundManager.playSound("click")}
        className="bg-green-500 px-4 py-2 rounded-lg mb-4"
      >
        Test Click Sound
      </button>

      <p className="text-center mt-2 text-white/70">
        Size: <span className="text-blue-400">{size}</span> | Difficulty:{" "}
        <span className="text-pink-400">{difficulty}</span>
      </p>

      <TopBar
        score={score}
        mistakes={mistakes}
        timeElapsed={timeElapsed}
        hintsLeft={hintsLeft}
      />

      <SudokuBoard
        board={userGrid}
        size={size}
        selectedCell={selectedCell}
        setSelectedCell={(cell) => setSelectedCell(cell.row, cell.col)}
        highlightedCell={highlightedCell}
        highlightedRow={highlightedRow}
        highlightedCol={highlightedCol}
      />

      {/* Hint Message UI */}
      {hintMessage && (
        <div className="mt-4 flex justify-center">
          <div className="bg-blue-500/20 border border-blue-400/30 text-white px-6 py-3 rounded-xl shadow-lg">
            {hintMessage}
          </div>
        </div>
      )}

      {/* Candidates List UI */}
      {candidatesList.length > 0 && (
        <div className="mt-4 flex justify-center">
          <div className="bg-purple-500/20 border border-purple-400/30 text-white px-6 py-3 rounded-xl shadow-lg">
            <p className="font-semibold mb-2">Candidates:</p>
            <div className="flex flex-wrap gap-2">
              {candidatesList.map((num) => (
                <span
                  key={num}
                  className="px-3 py-1 rounded-lg bg-white/10 font-bold"
                >
                  {num}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

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

      <NumberPad size={size} onNumberClick={handleNumberClick} />

      {isGameOver && <GameOverModal onRestart={resetGame} />}
      {isGameWon && <WinModal score={score} onRestart={resetGame} />}
    </div>
  );
}

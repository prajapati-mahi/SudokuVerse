import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const API = "http://localhost:5000/api";

export default function Game({ puzzleId }) {

  const token = localStorage.getItem("token");

  const [grid, setGrid] = useState([]);
  const [solution, setSolution] = useState([]);

  const [timeElapsed, setTimeElapsed] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [score, setScore] = useState(0);

  const [loading, setLoading] = useState(true);
  const [gameWon, setGameWon] = useState(false);

  const timerRef = useRef(null);

  /* ================= LOAD GAME ================= */

  useEffect(() => {
    const loadGame = async () => {

      const res = await axios.get(
        `${API}/puzzle/generate?size=3x3&difficulty=medium`
      );

      setGrid(res.data.puzzleGrid);
      setSolution(res.data.solutionGrid || []);
      setLoading(false);
    };

    loadGame();
  }, []);

  /* ================= TIMER ================= */

  useEffect(() => {
    if (loading || gameWon) return;

    timerRef.current = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [loading, gameWon]);

  /* ================= WIN CHECK ================= */

  const checkWin = (updatedGrid) => {
    for (let r = 0; r < solution.length; r++) {
      for (let c = 0; c < solution.length; c++) {
        if (updatedGrid[r][c] !== solution[r][c])
          return false;
      }
    }
    return true;
  };

  /* ================= COMPLETE ================= */

  const completeGame = () => {

    clearInterval(timerRef.current);
    setGameWon(true);

    confetti({
      particleCount: 150,
      spread: 90,
    });
  };

  /* ================= UPDATE CELL ================= */

  const updateCell = (row, col, value) => {

    const num = Number(value);

    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = isNaN(num) ? 0 : num;

    setGrid(newGrid);

    if (checkWin(newGrid)) {
      completeGame();
    }
  };

  if (loading)
    return <h2 className="text-center mt-10">Loading...</h2>;

  /* ================= UI ================= */

  return (
    <motion.div
      className="text-center p-6 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >

      <h1 className="text-3xl font-bold mb-4">
        🧩 SudokuVerse
      </h1>

      <div className="flex justify-center gap-6 mb-6">
        <p>⏱ {timeElapsed}s</p>
        <p>❌ {mistakes}</p>
        <p>💡 {hintsLeft}</p>
        <p>⭐ {score}</p>
      </div>

      {/* ✅ UPDATED RESPONSIVE BOARD */}
      <div className="
        bg-appCard
        p-6
        rounded-2xl
        shadow-lg
        max-w-md
        mx-auto
      ">

        {grid.map((row, r) =>
          row.map((cell, c) => (
            <input
              value={cell || ""}
              onChange={(e) =>
                updateCell(r, c, e.target.value)
              }
              disabled={gameWon}
              className="
                w-11 h-11
                text-center
                text-lg
                border border-slate-700
                bg-slate-900
                text-white
                rounded-md
                hover:bg-primary/20
                transition
                duration-200
                hover:scale-105
                focus:outline-none
              "
            />
          ))
        )}
      </div>

      {gameWon && (
        <h2 className="text-green-400 text-2xl mt-6">
          ✅ You Won!
        </h2>
      )}

    </motion.div>
  );
}

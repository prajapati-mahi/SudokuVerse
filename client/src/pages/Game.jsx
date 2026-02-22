import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

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

  /* =====================================================
        LOAD SAVED GAME OR NEW PUZZLE
  ===================================================== */

  useEffect(() => {

    const loadGame = async () => {
      try {

        // ✅ Try resume
        if (puzzleId) {
          const saved = await axios.get(
            `${API}/game/load/${puzzleId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (saved.data) {
            setGrid(saved.data.currentGrid);
            setTimeElapsed(saved.data.timeElapsed || 0);
            setMistakes(saved.data.mistakes || 0);
            setHintsLeft(saved.data.hintsLeft || 3);
            setScore(saved.data.score || 0);
            setLoading(false);
            return;
          }
        }

      } catch {
        console.log("No saved game");
      }

      // ✅ Generate new puzzle
      const res = await axios.get(
        `${API}/puzzle/generate?size=3x3&difficulty=medium`
      );

      setGrid(res.data.puzzleGrid);
      setSolution(res.data.solutionGrid || []);
      setLoading(false);
    };

    loadGame();

  }, [puzzleId, token]);



  /* =====================================================
                        TIMER
  ===================================================== */

  useEffect(() => {

    if (loading || gameWon) return;

    timerRef.current = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timerRef.current);

  }, [loading, gameWon]);



  /* =====================================================
                    AUTOSAVE SYSTEM
  ===================================================== */

  useEffect(() => {

    if (!grid.length || gameWon) return;

    const interval = setInterval(async () => {

      try {
        await axios.post(
          `${API}/game/save`,
          {
            puzzleId,
            currentGrid: grid,
            timeElapsed,
            mistakes,
            hintsLeft,
            score,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("✅ Autosaved");

      } catch {
        console.log("Autosave failed");
      }

    }, 20000);

    return () => clearInterval(interval);

  }, [
    grid,
    timeElapsed,
    mistakes,
    hintsLeft,
    score,
    puzzleId,
    token,
    gameWon,
  ]);



  /* =====================================================
                WIN DETECTION
  ===================================================== */

  const checkWin = (updatedGrid) => {

    if (!solution.length) return false;

    for (let r = 0; r < solution.length; r++) {
      for (let c = 0; c < solution.length; c++) {
        if (updatedGrid[r][c] !== solution[r][c])
          return false;
      }
    }

    return true;
  };



  /* =====================================================
                  COMPLETE GAME
  ===================================================== */

  const completeGame = async () => {

    clearInterval(timerRef.current);
    setGameWon(true);

    try {

      await axios.post(
        `${API}/game/complete`,
        {
          puzzleId,
          difficulty: "medium",
          size: "3x3",
          score,
          timeTaken: timeElapsed,
          mistakes,
          hintsUsed: 3 - hintsLeft,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("🎉 Puzzle Completed!");

    } catch {
      console.log("Completion failed");
    }
  };



  /* =====================================================
                  CELL UPDATE
  ===================================================== */

  const updateCell = (row, col, value) => {

    const num = Number(value);

    const newGrid =
      grid.map(r => [...r]);

    newGrid[row][col] =
      isNaN(num) ? 0 : num;

    setGrid(newGrid);

    // ✅ Check win instantly
    if (checkWin(newGrid)) {
      completeGame();
    }
  };



  /* =====================================================
                      LOADING
  ===================================================== */

  if (loading)
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;



  /* =====================================================
                        UI
  ===================================================== */

  return (
    <div style={{ textAlign: "center" }}>
      <h1>🧩 SudokuVerse</h1>

      <p>⏱ Time: {timeElapsed}s</p>
      <p>❌ Mistakes: {mistakes}</p>
      <p>💡 Hints Left: {hintsLeft}</p>
      <p>⭐ Score: {score}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            `repeat(${grid.length}, 45px)`,
          justifyContent: "center",
          gap: "6px",
          marginTop: "20px",
        }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <input
              key={`${r}-${c}`}
              value={cell || ""}
              onChange={(e) =>
                updateCell(r, c, e.target.value)
              }
              disabled={gameWon}
              style={{
                width: "45px",
                height: "45px",
                textAlign: "center",
                fontSize: "18px",
              }}
            />
          ))
        )}
      </div>

      {gameWon && (
        <h2 style={{ color: "green" }}>
          ✅ You Won!
        </h2>
      )}
    </div>
  );
}

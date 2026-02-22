import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function Game({ puzzleId }) {

  const token = localStorage.getItem("token");

  const [grid, setGrid] = useState([]);
  const [pencilMarks, setPencilMarks] = useState({});
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  const timerRef = useRef(null);

  /* ===================================================
        LOAD SAVED GAME OR NEW PUZZLE
  =================================================== */

  useEffect(() => {

    const loadGame = async () => {

      try {

        // ✅ Try loading saved game
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
            setGrid(saved.data.currentGrid || []);
            setPencilMarks(saved.data.pencilMarks || {});
            setTimeElapsed(saved.data.timeElapsed || 0);
            setMistakes(saved.data.mistakes || 0);
            setHintsLeft(saved.data.hintsLeft ?? 3);
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
      setLoading(false);
    };

    loadGame();

  }, [puzzleId, token]);



  /* ===================================================
                      TIMER
  =================================================== */

  useEffect(() => {

    if (loading) return;

    timerRef.current = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timerRef.current);

  }, [loading]);



  /* ===================================================
                    AUTOSAVE
  =================================================== */

  useEffect(() => {

    if (!grid.length || !puzzleId) return;

    const autosave = setInterval(async () => {

      try {

        await axios.post(
          `${API}/game/save`,
          {
            puzzleId,
            currentGrid: grid,
            pencilMarks,
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

    return () => clearInterval(autosave);

  }, [
    grid,
    pencilMarks,
    timeElapsed,
    mistakes,
    hintsLeft,
    score,
    puzzleId,
    token,
  ]);



  /* ===================================================
                  CELL UPDATE
  =================================================== */

  const updateCell = (row, col, value) => {

    const num = Number(value);

    const newGrid =
      grid.map(r => [...r]); // ✅ deep copy

    newGrid[row][col] = isNaN(num) ? 0 : num;

    setGrid(newGrid);
  };



  /* ===================================================
                      LOADING UI
  =================================================== */

  if (loading)
    return <h2 style={{ textAlign: "center" }}>Loading Puzzle...</h2>;



  /* ===================================================
                      GAME UI
  =================================================== */

  return (
    <div style={{ textAlign: "center" }}>
      <h2>🧩 SudokuVerse</h2>

      <p>⏱ Time: {timeElapsed}s</p>
      <p>❌ Mistakes: {mistakes}</p>
      <p>💡 Hints Left: {hintsLeft}</p>
      <p>⭐ Score: {score}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${grid.length}, 40px)`,
          justifyContent: "center",
          gap: "5px",
          marginTop: "20px"
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
              style={{
                width: "40px",
                height: "40px",
                textAlign: "center",
                fontSize: "18px",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

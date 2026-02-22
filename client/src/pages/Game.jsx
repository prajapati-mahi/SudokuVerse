import React, { useEffect, useState } from "react";
import axios from "axios";

const Game = ({ puzzleId }) => {

  const [grid, setGrid] = useState([]);
  const [pencilMarks, setPencilMarks] = useState({});
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [score, setScore] = useState(0);

  const token = localStorage.getItem("token");

  const API = "http://localhost:5000/api";

  /* ===============================
        LOAD SAVED GAME OR PUZZLE
  =============================== */

  useEffect(() => {
    const loadGame = async () => {
      try {
        // ✅ Try loading saved progress
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
          setPencilMarks(saved.data.pencilMarks || {});
          setTimeElapsed(saved.data.timeElapsed || 0);
          setMistakes(saved.data.mistakes || 0);
          setHintsLeft(saved.data.hintsLeft || 3);
          setScore(saved.data.score || 0);
          return;
        }
      } catch (err) {
        console.log("No saved game found");
      }

      // ✅ Otherwise load new puzzle
      const res = await axios.get(
        `${API}/puzzle/generate?size=3x3&difficulty=medium`
      );

      setGrid(res.data.puzzleGrid);
    };

    loadGame();
  }, [puzzleId]);



  /* ===============================
            TIMER
  =============================== */

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);




  /* ===============================
          AUTOSAVE (20 sec)
  =============================== */

  useEffect(() => {

    if (!grid.length) return;

    const interval = setInterval(async () => {
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

        console.log("✅ Game Autosaved");

      } catch (error) {
        console.log("Autosave failed");
      }

    }, 20000);

    return () => clearInterval(interval);

  }, [
    grid,
    pencilMarks,
    timeElapsed,
    mistakes,
    hintsLeft,
    score,
  ]);



  /* ===============================
          CELL UPDATE
  =============================== */

  const updateCell = (row, col, value) => {

    const newGrid = [...grid];
    newGrid[row][col] = Number(value);

    setGrid(newGrid);
  };



  /* ===============================
            UI GRID
  =============================== */

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Sudoku Game</h2>

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
        }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <input
              key={`${r}-${c}`}
              value={cell === 0 ? "" : cell}
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
};

export default Game;

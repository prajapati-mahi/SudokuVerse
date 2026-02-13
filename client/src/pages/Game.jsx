
import { useState } from "react";
import { useParams } from "react-router-dom";
import SudokuBoard from "../components/SudokuBoard";

export default function Game() {
  const { size, difficulty } = useParams();

  const gridSize = size === "2x2" ? 4 : size === "3x3" ? 9 : 16;

  // Temporary empty board for testing
  const initialBoard = Array.from({ length: gridSize }, () =>
    Array.from({ length: gridSize }, () => 0)
  );

  const [board, setBoard] = useState(initialBoard);
  const [selectedCell, setSelectedCell] = useState(null);

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold text-center">
        SudokuVerse 🧩
      </h1>

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

      {selectedCell && (
        <p className="text-center mt-6 text-white/70">
          Selected Cell: Row {selectedCell.row + 1}, Column {selectedCell.col + 1}
        </p>
      )}
    </div>
  );
}

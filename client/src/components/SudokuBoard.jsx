import React from "react";

export default function SudokuBoard({
  board,
  size,
  selectedCell,
  setSelectedCell,
  highlightedCell,
  highlightedRow,
  highlightedCol,
}) {
  const gridSize = size === "2x2" ? 4 : size === "3x3" ? 9 : 16;
  const boxSize = size === "2x2" ? 2 : size === "3x3" ? 3 : 4;

  return (
    <div className="flex justify-center items-center mt-6">
      <div
        className="grid border-4 border-white/30 rounded-xl overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          width: "min(90vw, 500px)",
          height: "min(90vw, 500px)",
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isSelected =
              selectedCell?.row === rowIndex && selectedCell?.col === colIndex;

            const isSameRow = selectedCell?.row === rowIndex;
            const isSameCol = selectedCell?.col === colIndex;

            const isSameBox =
              selectedCell &&
              Math.floor(selectedCell.row / boxSize) ===
                Math.floor(rowIndex / boxSize) &&
              Math.floor(selectedCell.col / boxSize) ===
                Math.floor(colIndex / boxSize);

            const isHintCell =
              highlightedCell?.row === rowIndex &&
              highlightedCell?.col === colIndex;

            const isHintRow = highlightedRow === rowIndex;
            const isHintCol = highlightedCol === colIndex;

            const borderClasses = `
              border border-white/20
              ${colIndex % boxSize === 0 ? "border-l-4 border-l-white/30" : ""}
              ${rowIndex % boxSize === 0 ? "border-t-4 border-t-white/30" : ""}
              ${colIndex === gridSize - 1 ? "border-r-4 border-r-white/30" : ""}
              ${rowIndex === gridSize - 1 ? "border-b-4 border-b-white/30" : ""}
            `;

            let bgColor = "bg-white/5";

            if (isSameRow || isSameCol) bgColor = "bg-blue-500/10";
            if (isSameBox) bgColor = "bg-purple-500/10";
            if (isSelected) bgColor = "bg-yellow-500/30";

            if (isHintRow || isHintCol) bgColor = "bg-yellow-500/20";
            if (isHintCell) bgColor = "bg-red-500/40";

            return (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => setSelectedCell({ row: rowIndex, col: colIndex })}
                className={`
                  ${borderClasses}
                  ${bgColor}
                  ${isHintCell ? "animate-pulse" : ""}
                  flex items-center justify-center
                  text-white font-semibold
                  hover:bg-yellow-500/20
                  transition duration-200
                  select-none
                `}
                style={{
                  fontSize: gridSize === 16 ? "14px" : "18px",
                }}
              >
                {cell !== 0 ? cell : ""}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

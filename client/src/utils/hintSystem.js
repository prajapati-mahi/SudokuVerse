import {
  checkRowConflict,
  checkColConflict,
  checkBoxConflict,
} from "./sudokuValidator";

// Returns candidates possible for a cell
export function getCandidates(grid, row, col, boxSize) {
  const candidates = [];

  for (let num = 1; num <= grid.length; num++) {
    const rowConflict = checkRowConflict(grid, row, num);
    const colConflict = checkColConflict(grid, col, num);
    const boxConflict = checkBoxConflict(grid, row, col, num, boxSize);

    if (!rowConflict && !colConflict && !boxConflict) {
      candidates.push(num);
    }
  }

  return candidates;
}

// Finds wrong filled cell (compares with solution)
export function findWrongCell(userGrid, solutionGrid, puzzleGrid) {
  for (let r = 0; r < userGrid.length; r++) {
    for (let c = 0; c < userGrid.length; c++) {
      if (puzzleGrid[r][c] === 0 && userGrid[r][c] !== 0) {
        if (userGrid[r][c] !== solutionGrid[r][c]) {
          return { row: r, col: c };
        }
      }
    }
  }
  return null;
}

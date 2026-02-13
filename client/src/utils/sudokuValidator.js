// Check if a number already exists in the row
export function checkRowConflict(grid, row, num) {
  return grid[row].includes(num);
}

// Check if a number already exists in the column
export function checkColConflict(grid, col, num) {
  for (let i = 0; i < grid.length; i++) {
    if (grid[i][col] === num) return true;
  }
  return false;
}

// Check if a number already exists in the sub-box
export function checkBoxConflict(grid, row, col, num, boxSize) {
  const startRow = Math.floor(row / boxSize) * boxSize;
  const startCol = Math.floor(col / boxSize) * boxSize;

  for (let r = startRow; r < startRow + boxSize; r++) {
    for (let c = startCol; c < startCol + boxSize; c++) {
      if (grid[r][c] === num) return true;
    }
  }
  return false;
}

// Check if move is valid
export function isValidMove(grid, row, col, num, boxSize) {
  if (checkRowConflict(grid, row, num)) return false;
  if (checkColConflict(grid, col, num)) return false;
  if (checkBoxConflict(grid, row, col, num, boxSize)) return false;
  return true;
}

// Check if puzzle is solved
export function isPuzzleSolved(userGrid, solutionGrid) {
  for (let r = 0; r < userGrid.length; r++) {
    for (let c = 0; c < userGrid.length; c++) {
      if (userGrid[r][c] !== solutionGrid[r][c]) {
        return false;
      }
    }
  }
  return true;
}

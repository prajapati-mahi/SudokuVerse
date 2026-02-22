function isSafe(board, row, col, num, boxSize) {
  const n = board.length;

  for (let x = 0; x < n; x++) {
    if (board[row][x] === num) return false;
    if (board[x][col] === num) return false;
  }

  const startRow = row - (row % boxSize);
  const startCol = col - (col % boxSize);

  for (let i = 0; i < boxSize; i++) {
    for (let j = 0; j < boxSize; j++) {
      if (board[startRow + i][startCol + j] === num)
        return false;
    }
  }

  return true;
}

function solveSudoku(board, boxSize) {
  const n = board.length;

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {

      if (board[row][col] === 0) {

        for (let num = 1; num <= n; num++) {

          if (isSafe(board, row, col, num, boxSize)) {

            board[row][col] = num;

            if (solveSudoku(board, boxSize))
              return true;

            board[row][col] = 0;
          }
        }

        return false;
      }
    }
  }

  return true;
}

module.exports = {
  solveSudoku,
  isSafe,
};

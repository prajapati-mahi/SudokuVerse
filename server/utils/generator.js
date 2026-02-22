const { solveSudoku } = require("./solver");

/* ===============================
   Shuffle Helper
================================*/
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


/* ===============================
   Create Empty Board
================================*/
function generateEmptyBoard(size) {
  return Array.from({ length: size }, () =>
    Array(size).fill(0)
  );
}


/* ===============================
   Fill Diagonal Boxes
================================*/
function fillDiagonalBoxes(board, boxSize) {
  const n = board.length;

  for (let k = 0; k < n; k += boxSize) {
    let nums = shuffle(
      [...Array(n).keys()].map(x => x + 1)
    );

    for (let i = 0; i < boxSize; i++) {
      for (let j = 0; j < boxSize; j++) {
        board[k + i][k + j] = nums.pop();
      }
    }
  }
}


/* ===============================
   Generate Solved Board
================================*/
function generateSolvedBoard(size, boxSize) {
  const board = generateEmptyBoard(size);

  fillDiagonalBoxes(board, boxSize);

  // Solve remaining cells
  solveSudoku(board, boxSize);

  return board;
}


/* ===============================
   Deep Copy Board
================================*/
function copyBoard(board) {
  return board.map(row => [...row]);
}


/* ===============================
   Remove Cells (Difficulty)
================================*/
function removeCells(board, difficulty) {
  const n = board.length;

  let removeCount = 0;

  switch (difficulty) {
    case "beginner":
      removeCount = 20;
      break;
    case "easy":
      removeCount = 30;
      break;
    case "medium":
      removeCount = 40;
      break;
    case "hard":
      removeCount = 50;
      break;
    case "expert":
      removeCount = 55;
      break;
    case "extreme":
      removeCount = 60;
      break;
    default:
      removeCount = 35;
  }

  // Adjust for board size
  if (n === 4) removeCount = Math.min(removeCount, 6);
  if (n === 16) removeCount = Math.min(removeCount * 3, 180);

  while (removeCount > 0) {
    const row = Math.floor(Math.random() * n);
    const col = Math.floor(Math.random() * n);

    if (board[row][col] !== 0) {
      board[row][col] = 0;
      removeCount--;
    }
  }

  return board;
}


/* ===============================
   MAIN PUZZLE GENERATOR
================================*/
function generatePuzzle(sizeStr, difficulty) {
  let size = 9;
  let boxSize = 3;

  if (sizeStr === "2x2") {
    size = 4;
    boxSize = 2;
  } 
  else if (sizeStr === "3x3") {
    size = 9;
    boxSize = 3;
  } 
  else if (sizeStr === "4x4") {
    size = 16;
    boxSize = 4;
  }

  const solutionGrid = generateSolvedBoard(size, boxSize);

  const puzzleGrid = removeCells(
    copyBoard(solutionGrid),
    difficulty
  );

  return {
    puzzleGrid,
    solutionGrid,
  };
}

module.exports = { generatePuzzle };

const express = require("express");
const Puzzle = require("../models/Puzzle");
const { generatePuzzle } = require("../utils/generator");

const router = express.Router();

router.get("/generate", async (req, res) => {
  try {
    const { size, difficulty } = req.query;

    if (!size || !difficulty) {
      return res.status(400).json({
        message: "size and difficulty required",
      });
    }

    const { puzzleGrid, solutionGrid } =
      generatePuzzle(size, difficulty);

    const puzzle = await Puzzle.create({
      size,
      difficulty,
      puzzleGrid,
      solutionGrid,
    });

    res.json({
      id: puzzle._id,
      size,
      difficulty,
      puzzleGrid,
    });

  } 
    catch (error) {
        console.error("PUZZLE ERROR:", error);
        res.status(500).json({
            message: "Puzzle generation failed",
            error: error.message,
        });
    }

});

module.exports = router;

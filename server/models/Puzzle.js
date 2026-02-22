const mongoose = require("mongoose");

const puzzleSchema = new mongoose.Schema(
  {
    size: { type: String, required: true },
    difficulty: { type: String, required: true },

    puzzleGrid: { type: Array, required: true },
    solutionGrid: { type: Array, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Puzzle", puzzleSchema);

const mongoose = require("mongoose");

const savedGameSchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  puzzleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Puzzle",
  },

  currentGrid: Array,
  pencilMarks: Object,

  timeElapsed: Number,
  mistakes: Number,
  hintsLeft: Number,
  score: Number,
},
{ timestamps: true }
);

module.exports = mongoose.model("SavedGame", savedGameSchema);

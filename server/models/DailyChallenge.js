const mongoose = require("mongoose");

const dailyChallengeSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true,
  },

  size: String,
  difficulty: String,

  puzzleGrid: Array,
  solutionGrid: Array,
});

module.exports =
mongoose.model("DailyChallenge", dailyChallengeSchema);

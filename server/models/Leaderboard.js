const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  difficulty: String,
  size: String,

  score: Number,
  timeTaken: Number,
  mistakes: Number,

  mode: String, // solo / multiplayer

}, { timestamps: true });

module.exports =
mongoose.model("Leaderboard", leaderboardSchema);

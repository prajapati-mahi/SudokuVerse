const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    avatarUrl: {
      type: String,
      default: "",
    },

    stats: {
      completedGames: { type: Number, default: 0 },
      bestScore: { type: Number, default: 0 },
      totalTimePlayed: { type: Number, default: 0 },
    },

    streak: {
      currentStreak: { type: Number, default: 0 },
      bestStreak: { type: Number, default: 0 },
      lastPlayedDate: { type: Date, default: null },
    },

    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

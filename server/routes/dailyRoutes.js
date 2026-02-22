const express = require("express");
const DailyChallenge = require("../models/DailyChallenge");
const { generatePuzzle } = require("../utils/generator");

const router = express.Router();

router.get("/today", async (req, res) => {
  try {

    const today =
      new Date().toISOString().split("T")[0];

    // check if already exists
    let challenge =
      await DailyChallenge.findOne({ date: today });

    // create if not exists
    if (!challenge) {

      const { puzzleGrid, solutionGrid } =
        generatePuzzle("3x3", "medium");

      challenge =
        await DailyChallenge.create({
          date: today,
          size: "3x3",
          difficulty: "medium",
          puzzleGrid,
          solutionGrid,
        });
    }

    res.json(challenge);

  } catch (error) {
    res.status(500).json({
      message: "Daily challenge failed",
    });
  }
});

const User = require("../models/User");
const authMiddleware =
require("../middleware/authMiddleware");

router.post(
"/complete",
authMiddleware,
async (req, res) => {

  const user =
  await User.findById(req.userId);

  const today =
  new Date().toISOString().split("T")[0];

  if (user.lastSolvedDate !== today) {

    user.streak =
      (user.streak || 0) + 1;

    user.longestStreak =
      Math.max(
        user.longestStreak || 0,
        user.streak
      );

    user.lastSolvedDate = today;
  }

  await user.save();

  res.json({
    streak: user.streak,
    longest: user.longestStreak,
  });
});


module.exports = router;

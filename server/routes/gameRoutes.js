const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const SavedGame = require("../models/SavedGame");
const Leaderboard = require("../models/Leaderboard");
const User = require("../models/User");

const { checkAchievements } =
  require("../utils/achievementEngine");



/* =====================================================
   ✅ SAVE GAME PROGRESS
===================================================== */
router.post("/save", authMiddleware, async (req, res) => {
  try {

    const {
      puzzleId,
      currentGrid,
      pencilMarks,
      timeElapsed,
      mistakes,
      hintsLeft,
      score,
    } = req.body;

    const savedGame =
      await SavedGame.findOneAndUpdate(
        {
          userId: req.userId,
          puzzleId,
        },
        {
          userId: req.userId,
          puzzleId,
          currentGrid,
          pencilMarks,
          timeElapsed,
          mistakes,
          hintsLeft,
          score,
        },
        {
          new: true,
          upsert: true,
        }
      );

    res.json(savedGame);

  } catch (error) {
    res.status(500).json({
      message: "Game save failed",
      error: error.message,
    });
  }
});



/* =====================================================
   ✅ LOAD SAVED GAME
===================================================== */
router.get(
  "/load/:puzzleId",
  authMiddleware,
  async (req, res) => {

    try {

      const game =
        await SavedGame.findOne({
          userId: req.userId,
          puzzleId: req.params.puzzleId,
        });

      res.json(game);

    } catch (error) {
      res.status(500).json({
        message: "Load failed",
      });
    }
  }
);



/* =====================================================
   ✅ GAME COMPLETION API
===================================================== */
router.post(
  "/complete",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        difficulty,
        size,
        score,
        timeTaken,
        mistakes,
        hintsUsed,
        puzzleId,
      } = req.body;


      /* ==========================
         GET USER
      ========================== */
      const user =
        await User.findById(req.userId);

      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found" });
      }


      /* ==========================
         SAVE LEADERBOARD ENTRY
      ========================== */
      await Leaderboard.create({
        userId: user._id,
        difficulty,
        size,
        score,
        timeTaken,
        mistakes,
        mode: "solo",
      });


      /* ==========================
         UPDATE USER STATS
      ========================== */

      if (difficulty === "easy") {
        user.easySolved =
          (user.easySolved || 0) + 1;
      }

      user.totalGames =
        (user.totalGames || 0) + 1;

      await user.save();


      /* ==========================
         ⭐ ACHIEVEMENT ENGINE
      ========================== */
      await checkAchievements(user, {
        difficulty,
        timeTaken,
        hintsUsed,
        easySolved: user.easySolved,
      });


      /* ==========================
         DELETE SAVED GAME
      ========================== */
      if (puzzleId) {
        await SavedGame.deleteOne({
          userId: req.userId,
          puzzleId,
        });
      }


      res.json({
        message: "Game completed successfully ✅",
      });

    } catch (error) {

      console.error("GAME COMPLETE ERROR:", error);

      res.status(500).json({
        message: "Game completion failed",
        error: error.message,
      });
    }
  }
);

module.exports = router;

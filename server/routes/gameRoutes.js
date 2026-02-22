const express = require("express");
const SavedGame = require("../models/SavedGame");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ✅ SAVE GAME
router.post("/save", authMiddleware, async (req, res) => {
  try {

    const data = {
      userId: req.userId,
      ...req.body,
    };

    const saved = await SavedGame.findOneAndUpdate(
      {
        userId: req.userId,
        puzzleId: req.body.puzzleId,
      },
      data,
      { upsert: true, new: true }
    );

    res.json(saved);

  } catch (err) {
    res.status(500).json({ message: "Save failed" });
  }
});


// ✅ LOAD GAME
router.get("/load/:puzzleId", authMiddleware, async (req, res) => {

  const game = await SavedGame.findOne({
    userId: req.userId,
    puzzleId: req.params.puzzleId,
  });

  res.json(game);
});

module.exports = router;

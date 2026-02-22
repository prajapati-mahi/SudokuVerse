const express = require("express");
const Leaderboard = require("../models/Leaderboard");

const router = express.Router();


// ✅ GLOBAL
router.get("/global", async (req, res) => {

  const { difficulty, size } = req.query;

  const data = await Leaderboard
    .find({ difficulty, size })
    .populate("userId", "name avatarUrl")
    .sort({ score: -1 })
    .limit(50);

  res.json(data);
});


// ✅ FRIENDS
router.get("/friends", async (req, res) => {

  const user = await User.findById(req.userId);

  const data = await Leaderboard.find({
    userId: { $in: user.friends },
  });

  res.json(data);
});

module.exports = router;

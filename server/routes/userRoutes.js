const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

/* =====================================================
   ✅ GET LOGGED-IN USER PROFILE
===================================================== */
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-passwordHash");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});


/* =====================================================
   ✅ UPLOAD / UPDATE USER AVATAR
===================================================== */
router.post(
  "/avatar",
  authMiddleware,
  upload.single("avatar"),
  async (req, res) => {
    try {
      // Check file
      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded",
        });
      }

      // Find user
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      /* ===============================
         Convert buffer → base64
      =============================== */
      const base64String =
        req.file.buffer.toString("base64");

      const dataURI =
        `data:${req.file.mimetype};base64,${base64String}`;

      /* ===============================
         Upload to Cloudinary
      =============================== */
      const uploadResult =
        await cloudinary.uploader.upload(dataURI, {
          folder: "SudokuVerse_Avatars",
        });

      /* ===============================
         Save URL in MongoDB
      =============================== */
      user.avatarUrl = uploadResult.secure_url;
      await user.save();

      res.json({
        message: "Avatar uploaded successfully",
        avatarUrl: user.avatarUrl,
      });

    } catch (error) {
      console.error("Avatar Upload Error:", error);

      res.status(500).json({
        message: "Avatar upload failed",
        error: error.message,
      });
    }
  }
);

module.exports = router;
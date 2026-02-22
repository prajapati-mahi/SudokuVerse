const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");


require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);



// Test Route
app.get("/", (req, res) => {
  res.send("SudokuVerse Backend Running 🚀");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Error:", err));
// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error("Global Error:", err);

  if (err instanceof require("multer").MulterError) {
    return res.status(400).json({ message: err.message });
  }

  // if (err.message === "Unexpected end of form") {
  //   return res.status(400).json({ message: "File upload failed - incomplete form data" });
  // }

  res.status(500).json({ message: "Server error", error: err.message });
});

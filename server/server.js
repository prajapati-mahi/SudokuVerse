const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const app = express();

/* ===============================
   MIDDLEWARE
=============================== */

app.use(cors());
app.use(express.json());

/* ===============================
   ROUTES
=============================== */

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const puzzleRoutes = require("./routes/puzzleRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/puzzle", puzzleRoutes);

/* ===============================
   TEST ROUTE
=============================== */

app.get("/", (req, res) => {
  res.send("SudokuVerse Backend Running 🚀");
});

/* ===============================
   DATABASE CONNECTION
=============================== */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

/* ===============================
   CREATE SERVER + SOCKET.IO
=============================== */

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

/* ===============================
   SOCKET MATCHMAKING
=============================== */

require("./socket/matchmaking")(io);

/* ===============================
   START SERVER
=============================== */

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
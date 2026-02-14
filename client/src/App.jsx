import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Play from "./pages/Play";
import Game from "./pages/Game";
import Daily from "./pages/Daily";
import Leaderboard from "./pages/Leaderboard";
import Battle from "./pages/Battle";
import Profile from "./pages/Profile";
import Achievements from "./pages/Achievements";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { useGameStore } from "./store/useGameStore";
import { themes } from "./utils/themeConfig";

export default function App() {
  const { theme } = useGameStore();
  const currentTheme = themes[theme] || themes.classic;

  return (
    <div className={`min-h-screen ${currentTheme.background}`}>
      <Navbar />

      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="/game/:size/:difficulty" element={<Game />} />
          <Route path="/daily" element={<Daily />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/battle" element={<Battle />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}

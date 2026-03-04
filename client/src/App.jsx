import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Play from "./pages/Play";
import Daily from "./pages/Daily";
import Leaderboard from "./pages/Leaderboard";
import Battle from "./pages/Battle";
import Game from "./pages/Game";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Play />} />
        <Route path="/daily" element={<Daily />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/game/:size/:difficulty" element={<Game />} />
      </Routes>

    </div>
  );
}
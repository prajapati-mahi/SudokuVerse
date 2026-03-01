import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Play from "./pages/Play";
import Daily from "./pages/Daily";
import Leaderboard from "./pages/Leaderboard";
import Battle from "./pages/Battle";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-appDark text-black dark:text-white">        
        <Navbar />

        {/*  CENTERED RESPONSIVE CONTAINER */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Play />} />
            <Route path="/play" element={<Play />} />
            <Route path="/daily" element={<Daily />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/battle" element={<Battle />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

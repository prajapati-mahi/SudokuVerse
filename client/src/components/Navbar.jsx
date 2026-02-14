import { Link } from "react-router-dom";
import ThemeSelector from "./ThemeSelector";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white/5 border-b border-white/10 backdrop-blur-md">
      <Link to="/" className="text-2xl font-bold text-white">
        SudokuVerse 🧩
      </Link>

      <div className="flex gap-6 items-center text-white font-medium">
        <Link to="/play" className="hover:text-yellow-400 transition">
          Play
        </Link>

        <Link to="/daily" className="hover:text-yellow-400 transition">
          Daily Challenge
        </Link>

        <Link to="/leaderboard" className="hover:text-yellow-400 transition">
          Leaderboard
        </Link>

        <Link to="/battle" className="hover:text-yellow-400 transition">
          Battle
        </Link>

        <ThemeSelector />
      </div>
    </nav>
  );
}

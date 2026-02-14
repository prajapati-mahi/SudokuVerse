import { Link } from "react-router-dom";
import ThemeSelector from "./ThemeSelector";

import { useGameStore } from "../store/useGameStore";
import { themes } from "../utils/themeConfig";

export default function Navbar() {
  const { theme } = useGameStore();
  const currentTheme = themes[theme] || themes.classic;

  return (
    <nav
      className={`flex justify-between items-center px-8 py-4 border-b backdrop-blur-md ${currentTheme.card}`}
    >
      <Link to="/" className={`text-2xl font-bold ${currentTheme.primaryText}`}>
        SudokuVerse 🧩
      </Link>

      <div className={`flex gap-6 items-center font-medium ${currentTheme.primaryText}`}>
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

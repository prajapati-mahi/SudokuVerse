import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {

  const [dark, setDark] = useState(true);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="bg-slate-900 px-6 py-4 flex justify-between items-center">

      <h1 className="text-xl font-bold">
        SudokuVerse 🧩
      </h1>

      <div className="flex gap-6 items-center">
        <Link to="/play">Play</Link>
        <Link to="/daily">Daily</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/battle">Battle</Link>

        <button
          onClick={toggleTheme}
          className="bg-blue-600 px-3 py-1 rounded"
        >
          {dark ? "Day ☀️" : "Night 🌙"}
        </button>
      </div>

    </nav>
  );
}

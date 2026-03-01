import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {

  const [dark, setDark] = useState(true);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };


  return (
    <nav className="bg-appCard shadow-md px-6 py-4 flex justify-between">

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
          className="
            bg-primary
            px-4 py-2
            rounded-lg
            text-white
            hover:bg-blue-700
            transition
          "
        >
          Toggle Theme
        </button>

      </div>

    </nav>
  );
}

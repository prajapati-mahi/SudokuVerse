import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-black/40 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-white tracking-wide">
        Sudoku<span className="text-blue-400">Verse</span>
      </Link>

      {/* Links */}
      <div className="flex gap-6 text-white font-medium">
        <Link to="/play" className="hover:text-blue-400 transition">
          Play
        </Link>

        <Link to="/daily" className="hover:text-blue-400 transition">
          Daily Challenge
        </Link>

        <Link to="/leaderboard" className="hover:text-blue-400 transition">
          Leaderboard
        </Link>

        <Link to="/battle" className="hover:text-blue-400 transition">
          Battle
        </Link>

        <Link to="/profile" className="hover:text-blue-400 transition">
          Profile
        </Link>
      </div>
    </nav>
  );
}

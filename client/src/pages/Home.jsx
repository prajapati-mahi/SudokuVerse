import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-4xl font-bold mb-6">SudokuVerse 🧩</h1>

      <div className="space-x-4">
        <Link
          to="/play"
          className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Play
        </Link>

        <Link
          to="/daily"
          className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Daily Challenge
        </Link>

        <Link
          to="/leaderboard"
          className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Leaderboard
        </Link>
      </div>
    </div>
  );
}

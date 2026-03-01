import { Link } from "react-router-dom";

export default function Play(){

  const difficulties=[
    "beginner",
    "easy",
    "medium",
    "hard",
    "expert",
    "extreme"
  ];

  return(
    <div className="text-center p-6 text-white">
      <h1 className="text-3xl mb-6">
        🎮 Play Sudoku
      </h1>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {difficulties.map(d=>(
          <Link
            key={d}
            to={`/game/3x3/${d}`}
            className="bg-blue-600 p-4 rounded-xl"
          >
            {d.toUpperCase()}
          </Link>
        ))}
      </div>
    </div>
  );
}

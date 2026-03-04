import { useNavigate } from "react-router-dom";

export default function Play() {

  const navigate = useNavigate();

  const levels = [
    "beginner",
    "easy",
    "medium",
    "hard",
    "expert",
    "extreme",
  ];

  return (
    <div className="text-center">

      <h1 className="text-3xl mb-6">
        Select Difficulty
      </h1>

      <div className="grid md:grid-cols-3 gap-4">

        {levels.map(level => (
          <button
            key={level}
            onClick={() =>
              navigate(`/play?difficulty=${level}`)
            }
            className="
              bg-blue-600
              hover:bg-blue-700
              p-4 rounded-xl
            "
          >
            {level.toUpperCase()}
          </button>
        ))}

      </div>

    </div>
  );
}
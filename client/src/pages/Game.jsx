import { useParams } from "react-router-dom";

export default function Game() {
  const { size, difficulty } = useParams();

  return (
    <div className="text-white text-3xl font-bold p-6">
      Game Page 🧩 <br />
      Size: {size} <br />
      Difficulty: {difficulty}
    </div>
  );
}


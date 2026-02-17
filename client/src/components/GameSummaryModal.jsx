import { useNavigate } from "react-router-dom";

export default function GameSummaryModal({
  status,
  timeTaken,
  mistakes,
  hintsUsed,
  accuracy,
  finalScore,
  onReplay,
  onNextLevel,
}) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-gray-900 border border-white/10 rounded-2xl p-8 w-[90%] max-w-lg shadow-2xl text-white">
        <h2 className="text-3xl font-bold text-center mb-4">
          {status === "win" ? "🎉 You Won!" : "💀 Game Over"}
        </h2>

        <div className="space-y-3 text-lg mt-6">
          <p>
            ⏱ <span className="font-semibold">Time Taken:</span> {timeTaken}
          </p>
          <p>
            ❤️ <span className="font-semibold">Mistakes:</span> {mistakes} / 3
          </p>
          <p>
            💡 <span className="font-semibold">Hints Used:</span> {hintsUsed} / 3
          </p>
          <p>
            🎯 <span className="font-semibold">Accuracy:</span> {accuracy}%
          </p>
          <p className="text-green-400 font-bold text-xl">
            🏆 Final Score: {finalScore}
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-8">
          <button
            onClick={onReplay}
            className="bg-blue-500 hover:bg-blue-600 transition py-3 rounded-xl font-semibold"
          >
            🔁 Replay
          </button>

          <button
            onClick={onNextLevel}
            className="bg-purple-500 hover:bg-purple-600 transition py-3 rounded-xl font-semibold"
          >
            🚀 Play Next Level
          </button>

          <button
            onClick={() => navigate("/")}
            className="bg-gray-700 hover:bg-gray-800 transition py-3 rounded-xl font-semibold"
          >
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
}

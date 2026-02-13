export default function GameOverModal({ onRestart }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-gray-900 border border-red-500/40 rounded-2xl p-8 w-[90%] max-w-md text-center shadow-xl">
        <h2 className="text-3xl font-bold text-red-500">Game Over ❌</h2>

        <p className="text-white/80 mt-4">
          You made 3 mistakes. Better luck next time!
        </p>

        <button
          onClick={onRestart}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          Restart Game
        </button>
      </div>
    </div>
  );
}

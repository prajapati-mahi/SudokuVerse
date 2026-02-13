export default function WinModal({ score, onRestart }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-gray-900 border border-green-500/40 rounded-2xl p-8 w-[90%] max-w-md text-center shadow-xl">
        <h2 className="text-3xl font-bold text-green-400">
          Congratulations 🎉
        </h2>

        <p className="text-white/80 mt-4">
          You solved the Sudoku puzzle successfully!
        </p>

        <p className="text-xl font-bold text-yellow-400 mt-4">
          Score: {score}
        </p>

        <button
          onClick={onRestart}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

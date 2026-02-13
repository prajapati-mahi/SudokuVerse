export default function TopBar({ score, mistakes, timeElapsed, hintsLeft }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="mt-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white/5 border border-white/10 rounded-2xl p-4 flex justify-between items-center shadow-lg backdrop-blur-md">
        
        {/* Score */}
        <div className="text-center">
          <p className="text-white/60 text-sm">Score</p>
          <p className="text-green-400 font-bold text-xl">{score}</p>
        </div>

        {/* Mistakes */}
        <div className="text-center">
          <p className="text-white/60 text-sm">Mistakes</p>
          <p className="text-red-400 font-bold text-xl">
            ❤️ {mistakes}/3
          </p>
        </div>

        {/* Timer */}
        <div className="text-center">
          <p className="text-white/60 text-sm">Time</p>
          <p className="text-blue-400 font-bold text-xl">{formatTime(timeElapsed)}</p>
        </div>

        {/* Hints */}
        <div className="text-center">
          <p className="text-white/60 text-sm">Hints</p>
          <p className="text-yellow-400 font-bold text-xl">{hintsLeft}</p>
        </div>
      </div>
    </div>
  );
}

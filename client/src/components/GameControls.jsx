import {
  Pencil,
  Eraser,
  Undo2,
  Redo2,
  Lightbulb,
  Pause,
  Palette,
  Volume2,
  VolumeX,
} from "lucide-react";

export default function GameControls({
  isPencilMode,
  setIsPencilMode,
  handleEraser,
  handleUndo,
  handleRedo,
  handleHint,
  handlePause,
  isPaused,
  hintsLeft,
  theme,
  setTheme,
  isSoundOn,
  setIsSoundOn,
}) {
  const themes = ["classic", "neon", "minimal", "night", "colorblind"];

  const changeTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  return (
    <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-wrap justify-center gap-4 shadow-lg backdrop-blur-md">
      
      {/* Pencil */}
      <button
        onClick={() => setIsPencilMode(!isPencilMode)}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition
        ${
          isPencilMode
            ? "bg-yellow-500 text-black"
            : "bg-white/10 text-white hover:bg-white/20"
        }`}
      >
        <Pencil size={18} />
        Pencil
      </button>

      {/* Eraser */}
      <button
        onClick={handleEraser}
        className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-white/10 text-white hover:bg-white/20 transition"
      >
        <Eraser size={18} />
        Eraser
      </button>

      {/* Undo */}
      <button
        onClick={handleUndo}
        className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-white/10 text-white hover:bg-white/20 transition"
      >
        <Undo2 size={18} />
        Undo
      </button>

      {/* Redo */}
      <button
        onClick={handleRedo}
        className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-white/10 text-white hover:bg-white/20 transition"
      >
        <Redo2 size={18} />
        Redo
      </button>

      {/* Hint */}
      <button
        onClick={handleHint}
        disabled={hintsLeft === 0}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition
        ${
          hintsLeft === 0
            ? "bg-gray-600 text-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        <Lightbulb size={18} />
        Hint ({hintsLeft})
      </button>

      {/* Pause */}
      <button
        onClick={handlePause}
        handlePause={() => setIsPaused(!isPaused)}
isPaused={isPaused}

      >
        <Pause size={18} />
        {isPaused ? "Resume" : "Pause"}
      </button>

      {/* Theme Toggle */}
      <button
        onClick={changeTheme}
        className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-purple-500 text-white hover:bg-purple-600 transition"
      >
        <Palette size={18} />
        Theme
      </button>

      {/* Sound Toggle */}
      <button
        onClick={() => setIsSoundOn(!isSoundOn)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold bg-white/10 text-white hover:bg-white/20 transition"
      >
        {isSoundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
        {isSoundOn ? "Sound On" : "Sound Off"}
      </button>
    </div>
  );
}

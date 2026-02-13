export default function NumberPad({ size, onNumberClick }) {
  const maxNumber = size === "2x2" ? 4 : size === "3x3" ? 9 : 16;

  const numbers = Array.from({ length: maxNumber }, (_, i) => i + 1);

  return (
    <div className="mt-6 flex justify-center">
      <div
        className="grid gap-3 bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-md"
        style={{
          gridTemplateColumns:
            maxNumber === 4
              ? "repeat(4, 1fr)"
              : maxNumber === 9
              ? "repeat(3, 1fr)"
              : "repeat(4, 1fr)",
        }}
      >
        {numbers.map((num) => (
          <button
            key={num}
            onClick={() => onNumberClick(num)}
            className="w-14 h-14 rounded-xl bg-white/10 text-white font-bold text-lg hover:bg-blue-500/40 transition duration-200 flex items-center justify-center"
          >
            {num}
          </button>
          
        ))}
      </div>
    </div>
  );
}


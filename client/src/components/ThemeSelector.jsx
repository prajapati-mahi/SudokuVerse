import { useGameStore } from "../store/useGameStore";

export default function ThemeSelector() {
  const { theme, setTheme } = useGameStore();

  return (
    <div className="flex items-center gap-2">
      <label className="text-white/70 font-medium">Theme:</label>

      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="bg-white/10 text-white px-3 py-2 rounded-xl border border-white/10 outline-none cursor-pointer"
      >
        <option value="classic">Classic</option>
        <option value="neon">Neon</option>
        <option value="minimal">Minimal</option>
        <option value="night">Night Mode</option>
        <option value="colorblind">Colorblind</option>
      </select>
    </div>
  );
}

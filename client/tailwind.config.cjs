/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      colors: {

        /* ✅ APP BACKGROUND */
        appDark: "#020617",     // slate-950
        appCard: "#0f172a",     // slate-900

        /* ✅ ACTION COLORS */
        primary: "#2563eb",     // blue
        success: "#22c55e",     // green
        leaderboard: "#9333ea", // purple
      },

    },
  },

  plugins: [],
};
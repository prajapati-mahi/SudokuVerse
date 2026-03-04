import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const API = "http://localhost:5000/api";

export default function Daily() {

  const [dailyPuzzle, setDailyPuzzle] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* ===============================
        FETCH DAILY PUZZLE
  =============================== */

  useEffect(() => {

    const fetchDaily = async () => {
      try {

        const res = await axios.get(
          `${API}/daily/today`
        );

        setDailyPuzzle(res.data);

      } catch (error) {

        console.log("Daily challenge fetch failed");

      } finally {

        setLoading(false);

      }
    };

    fetchDaily();

  }, []);

  /* ===============================
            LOADING UI
  =============================== */

  if (loading) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <Skeleton height={40} className="mb-4" />
        <Skeleton height={30} count={3} />
      </div>
    );
  }

  if (!dailyPuzzle) {
    return (
      <h2 className="text-center text-red-400">
        Daily challenge unavailable
      </h2>
    );
  }

  /* ===============================
              UI
  =============================== */

  return (
    <div className="text-white p-6 text-center">

      <h1 className="text-3xl font-bold mb-6">
        📅 Daily Sudoku Challenge
      </h1>

      <div
        className="
        bg-appCard
        p-6
        rounded-2xl
        shadow-lg
        max-w-md
        mx-auto
      "
      >

        <p className="mb-2 text-lg">
          🧩 Size:
          <span className="text-blue-400 ml-2">
            {dailyPuzzle.size}
          </span>
        </p>

        <p className="mb-4 text-lg">
          ⚡ Difficulty:
          <span className="text-pink-400 ml-2">
            {dailyPuzzle.difficulty}
          </span>
        </p>

        <button
          onClick={() =>
            navigate(
              `/game/${dailyPuzzle.size}/${dailyPuzzle.difficulty}?daily=true&id=${dailyPuzzle._id}`
            )
          }
          className="
            bg-primary
            hover:bg-blue-700
            transition
            px-6
            py-3
            rounded-xl
            text-lg
            font-semibold
          "
        >
          ▶ Play Daily Challenge
        </button>

      </div>

    </div>
  );
}
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Game from "../components/Game";

const API = "http://localhost:5000/api";

export default function Daily() {

  const [dailyPuzzle, setDailyPuzzle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [daily, setDaily] = useState(null);
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
      }

      setLoading(false);
    };

    fetchDaily();

  }, []);

  /* ===============================
            LOADING UI
  =============================== */

  if (!daily)
    return <h2>Loading Daily Challenge...</h2>;
  
  if (loading) {
    return (
      <div className="p-6">
        <Skeleton height={40} />
        <Skeleton height={40} count={4} />
      </div>
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

      <div className="bg-white/10 p-6 rounded-2xl max-w-md mx-auto">

        <p className="mb-2">
          🧩 Size:
          <span className="text-blue-400 ml-2">
            {dailyPuzzle.size}
          </span>
        </p>

        <p className="mb-4">
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
            bg-blue-600
            hover:bg-blue-700
            transition
            px-6
            py-3
            rounded-xl
            text-lg
          "
        >
          ▶ Play Daily Challenge
        </button>

      </div>

    </div>
  );
}

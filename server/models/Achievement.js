import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function Achievements() {

  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");


  /* =====================================
        FETCH USER ACHIEVEMENTS
  ===================================== */
  useEffect(() => {

    const fetchAchievements = async () => {
      try {

        const res = await axios.get(
          `${API}/achievements/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAchievements(res.data);

      } catch (error) {
        console.log("Failed to load achievements");
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();

  }, [token]);



  /* =====================================
              LOADING UI
  ===================================== */
  if (loading)
    return (
      <h2 className="text-center text-white mt-10">
        Loading Achievements...
      </h2>
    );



  /* =====================================
              EMPTY STATE
  ===================================== */
  if (!achievements.length)
    return (
      <div className="text-center text-white mt-10">
        <h2 className="text-2xl">🏅 Achievements</h2>
        <p className="mt-4 text-white/60">
          Play games to unlock badges!
        </p>
      </div>
    );



  /* =====================================
                UI
  ===================================== */
  return (
    <div className="min-h-screen text-white p-6">

      <h1 className="text-3xl font-bold text-center mb-8">
        🏅 Your Achievements
      </h1>

      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        gap-6
      ">
        {achievements.map((a, index) => (

          <div
            key={index}
            className="
              bg-white/5
              border border-white/10
              rounded-2xl
              p-6
              text-center
              backdrop-blur-lg
              hover:scale-105
              transition
              shadow-lg
            "
          >
            <div className="text-4xl mb-3">
              🏆
            </div>

            <h3 className="text-xl font-semibold">
              {a.achievementName}
            </h3>

            <p className="text-sm text-white/60 mt-2">
              Unlocked on{" "}
              {new Date(
                a.unlockedAt
              ).toLocaleDateString()}
            </p>
          </div>

        ))}
      </div>

    </div>
  );
}

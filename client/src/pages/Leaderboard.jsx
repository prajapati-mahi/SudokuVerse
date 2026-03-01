import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const Leaderboard = () => {

  const [players, setPlayers] = useState([]);
  const [activeTab, setActiveTab] = useState("score");

  const API = "http://localhost:5000/api";

  /* ======================
        FETCH DATA
  ====================== */

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(
          `${API}/leaderboard/global`
        );

        setPlayers(res.data);
      } catch (err) {
        console.log("Leaderboard fetch failed");
      }
    };

    fetchLeaderboard();
  }, []);



  /* ======================
        SORTING LOGIC
  ====================== */

  const sortedPlayers = [...players].sort((a, b) => {

    if (activeTab === "score")
      return b.score - a.score;

    if (activeTab === "time")
      return a.timeTaken - b.timeTaken;

    if (activeTab === "mistakes")
      return a.mistakes - b.mistakes;

    return 0;
  });



  /* ======================
          UI
  ====================== */

  return (
    <div style={{ textAlign: "center" }}>
      <h2>🏆 Leaderboard</h2>

      {/* Tabs */}
      <div>
        <button onClick={() => setActiveTab("score")}
          className="bg-leaderboard px-4 py-2 rounded-xl"
        >
          🏆 Highest Score
        </button>

        <button onClick={() => setActiveTab("time")}
          className="bg-leaderboard px-4 py-2 rounded-xl"
        >
          ⚡ Fastest Time
        </button>

        <button onClick={() => setActiveTab("mistakes")}
          className="bg-leaderboard px-4 py-2 rounded-xl"
        >
          🎯 Lowest Mistakes
        </button>
      </div>

      <br />

      {/* Table */}
      <table border="1" align="center">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
            <th>Time</th>
            <th>Mistakes</th>
          </tr>
        </thead>

        <tbody>
          {sortedPlayers.map((player, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{player.userId?.name || "Player"}</td>
              <td>{player.score}</td>
              <td>{player.timeTaken}s</td>
              <td>{player.mistakes}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default Leaderboard;

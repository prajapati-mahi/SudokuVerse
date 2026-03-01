import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function Achievements() {

  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await axios.get(
          `${API}/achievements`,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );
        setAchievements(res.data);
      } catch {
        console.log("Failed loading achievements");
      }
      setLoading(false);
    };

    fetchAchievements();
  }, []);

  if(loading) return <h2 className="text-center">Loading...</h2>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl mb-6">🏅 Achievements</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {achievements.map(a=>(
          <div
            key={a._id}
            className="bg-white/10 p-6 rounded-xl text-center"
          >
            ⭐ {a.achievementName}
          </div>
        ))}
      </div>
    </div>
  );
}

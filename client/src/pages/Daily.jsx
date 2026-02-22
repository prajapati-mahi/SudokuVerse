import { useEffect, useState } from "react";
import axios from "axios";

export default function Daily() {

  const [challenge,setChallenge]=useState(null);

  useEffect(()=>{

    axios
      .get("http://localhost:5000/api/daily/today")
      .then(res=>setChallenge(res.data));

  },[]);

  if(!challenge) return <p>Loading...</p>;

  return (
    <div>
      <h2>🔥 Daily Challenge</h2>
      <p>{challenge.date}</p>
    </div>
  );
}

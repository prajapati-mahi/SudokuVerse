import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


export default function Daily() {

  const [challenge,setChallenge]=useState(null);

  useEffect(()=>{

    axios
      .get("http://localhost:5000/api/daily/today")
      .then(res=>setChallenge(res.data));

  },[]);

  if(!challenge) return <p><Skeleton height={40} count={5} />
</p>;

  return (
    <div>
      <h2>🔥 Daily Challenge</h2>
      <p>{challenge.date}</p>
    </div>
  );
}

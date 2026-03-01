import { useEffect, useState } from "react";
import axios from "axios";

const API="http://localhost:5000/api";

export default function Profile(){

  const [user,setUser]=useState(null);
  const token=localStorage.getItem("token");

  useEffect(()=>{
    axios.get(
      `${API}/users/me`,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    ).then(res=>setUser(res.data));
  },[]);

  if(!user)
    return <h2>Loading profile...</h2>;

  return(
    <div className="p-6 text-white">
      <h1 className="text-3xl">👤 Profile</h1>

      <img
        src={user.avatarUrl}
        className="w-32 rounded-full mt-4"
      />

      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>🔥 Streak: {user.streak}</p>
    </div>
  );
}

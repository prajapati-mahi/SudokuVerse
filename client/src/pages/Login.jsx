import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API="http://localhost:5000/api";

export default function Login(){

  const navigate=useNavigate();

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleLogin=async(e)=>{
    e.preventDefault();

    const res=await axios.post(
      `${API}/auth/login`,
      {email,password}
    );

    localStorage.setItem("token",res.data.token);

    navigate("/play");
  };

  return(
    <div className="flex justify-center mt-20">
      <form
        onSubmit={handleLogin}
        className="bg-white/10 p-8 rounded-xl"
      >
        <h2 className="text-2xl mb-4 text-white">Login</h2>

        <input
          placeholder="Email"
          className="p-3 mb-3 w-full"
          onChange={e=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="p-3 mb-3 w-full"
          onChange={e=>setPassword(e.target.value)}
        />

        <button className="bg-blue-600 px-5 py-2 w-full">
          Login
        </button>
      </form>
    </div>
  );
}

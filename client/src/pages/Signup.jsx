import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API="http://localhost:5000/api";

export default function Signup(){

  const navigate=useNavigate();

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleSignup=async(e)=>{
    e.preventDefault();

    await axios.post(
      `${API}/auth/signup`,
      {name,email,password}
    );

    navigate("/login");
  };

  return(
    <div className="flex justify-center mt-20">
      <form
        onSubmit={handleSignup}
        className="bg-white/10 p-8 rounded-xl"
      >
        <h2 className="text-2xl text-white mb-4">
          Signup
        </h2>

        <input
          placeholder="Name"
          className="p-3 mb-3 w-full"
          onChange={e=>setName(e.target.value)}
        />

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

        <button className="bg-green-600 w-full py-2">
          Create Account
        </button>
      </form>
    </div>
  );
}

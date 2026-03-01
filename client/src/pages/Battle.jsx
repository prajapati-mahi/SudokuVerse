import { useEffect, useState } from "react";
import { socket } from "../socket";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";



export default function Battle() {

const [status,setStatus]=useState("Idle");
const [roomId,setRoomId]=useState(null);

const findMatch=()=>{
 socket.emit("findMatch");
 setStatus("Searching...");
};

useEffect(()=>{

socket.on("waiting",()=>{
 setStatus("Waiting for opponent...");
});

socket.on("matchFound",(data)=>{
 setRoomId(data.roomId);
 setStatus("Match Found!");
});

},[]);

return(
<div>
<h2>⚔ Multiplayer Battle</h2>

<button onClick={findMatch}
 className="
  p-4
  text-lg
  rounded-xl
  bg-blue-600
  hover:bg-blue-700
  transition
 "
>
Find Opponent
</button>

<p>{status}</p>

</div>
);
}

import { socket } from "../socket";
import { useState } from "react";

export default function Battle(){

const [searching,setSearching]=
useState(false);

const findOpponent=()=>{
  setSearching(true);
  socket.emit("joinQueue");
};

return(
<div className="text-center">

<h2>⚔ Multiplayer Battle</h2>

<button
onClick={findOpponent}
className="bg-green-600 p-4 rounded-xl"
>
Find Opponent
</button>

{searching && <p>Searching...</p>}

</div>
);
}
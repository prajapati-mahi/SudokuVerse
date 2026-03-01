let waitingPlayer = null;

module.exports = (io) => {

  io.on("connection", (socket) => {
    console.log("Player connected:", socket.id);

    socket.on("joinBattle", () => {

      if (waitingPlayer) {

        const roomId = `room-${waitingPlayer.id}-${socket.id}`;

        waitingPlayer.join(roomId);
        socket.join(roomId);

        io.to(roomId).emit("battleStart", {
          roomId,
          puzzle: generatePuzzle()
        });

        waitingPlayer = null;

      } else {
        waitingPlayer = socket;
      }
    });

    socket.on("disconnect", () => {
      if (waitingPlayer === socket)
        waitingPlayer = null;
    });

  });
};
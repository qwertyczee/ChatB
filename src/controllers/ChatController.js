let rooms = {}; // Mapa serverů (chat room)

const getRooms = (req, res) => {
  res.json(Object.keys(rooms)); // Odpověď s aktuálními servery
};

// Funkce, která přijme socket a io
const initializeSocket = (socket, io) => {
  // Event pro vytváření nového serveru (chat room)
  socket.on('create_room', (roomName) => {
    rooms[roomName] = { users: [] };
    socket.join(roomName);
    console.log(`${socket.id} created room ${roomName}`);
    io.emit('update_rooms', Object.keys(rooms)); // Aktualizace seznamu serverů
  });

  // Event pro připojení k serveru
  socket.on('join_room', (room) => {
    socket.join(room);
    socket.to(room).emit('message', `${socket.id} joined the room.`);
  });

  // Event pro zpracování zpráv
  socket.on('send_message', ({ roomName, message }) => {
    io.to(roomName).emit('message', `${socket.id}: ${message}`);
  });

  // Když uživatel odejde
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
};

module.exports = {
  getRooms,
  initializeSocket, // Export funkce pro inicializaci socketu
};

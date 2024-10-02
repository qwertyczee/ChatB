const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const chatRoutes = require('./routes/ChatRoutes');
const { initializeSocket } = require('./controllers/ChatController'); // Import funkce pro inicializaci socketu

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());
app.use('/api', chatRoutes); // Přidání routování

// Inicializace socket.io
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  initializeSocket(socket, io); // Volání funkce pro inicializaci socketu
});

// Spuštění serveru
server.listen(4000, () => {
  console.log('Server is running on port 4000');
});

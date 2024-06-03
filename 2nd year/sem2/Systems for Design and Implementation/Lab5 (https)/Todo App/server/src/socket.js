const socketIo = require('socket.io');
let io;

const initializeSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: "*", // Allow all origins
      methods: ["GET", "POST", "PATCH"],
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

const getIo = () => {
  if (!io) {
    throw new Error("Socket.io is not initialized");
  }
  return io;
};

module.exports = { initializeSocket, getIo };

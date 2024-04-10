const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const listsRouter = require('../routes/lists');
const socketIo = require('socket.io');
const http = require('http');
const cron = require('node-cron');

const app = express();
const PORT = 5000;
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PATCH"], // Allow GET and POST methods
  }
});

const corsOptions = {
    origin: "*", // Allow requests from any origin
    credentials: true,
    optionSuccessStatus: 200
}

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', listsRouter);

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('New client connected');

  // Handle disconnect event
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Function to create a new list and emit it to connected clients
const createNewList = () => {
  const newList = {
    id: Date.now().toString(),
    name: "Cron List",
    tasks: []
  }

  io.emit('newList', newList);
}

// Cron job to create a new list every 10 seconds
cron.schedule('*/15 * * * * *', () => {
  createNewList();
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;

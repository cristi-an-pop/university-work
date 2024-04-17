const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const { initializeSocket } = require('./socket');
const listsRouter = require('../routes/lists');
const tasksRouter = require('../routes/tasks'); // Import tasksRouter
const { scheduleCronJob } = require('./utils/cronJob');

require('dotenv').config();

const app = express();
const PORT = process.env.NODE_ENV === 'test' ? process.env.TEST_PORT : process.env.PORT || 5002;
const server = http.createServer(app);

// Middleware setup
const corsOptions = {
  origin: "*", // Allow requests from any origin
  credentials: true,
  optionSuccessStatus: 200
};
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/lists', listsRouter);
app.use('/api/lists/:listId/tasks', tasksRouter);

// Initialize socket.io
initializeSocket(server);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  //scheduleCronJob();
});

module.exports = app;
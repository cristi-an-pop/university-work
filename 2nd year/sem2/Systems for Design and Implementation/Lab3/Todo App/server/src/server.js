const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const { initializeSocket } = require('./socket');
const listsRouter = require('../routes/lists');
const { scheduleCronJob } = require('./utils/cronJob');

const app = express();
const PORT = process.env.PORT || 5000;
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
app.use('/', listsRouter);

// Initialize socket.io
initializeSocket(server);

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Schedule cron job
scheduleCronJob();

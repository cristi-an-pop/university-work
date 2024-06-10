const https = require('https');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middleware/VerifyJWT');
const { initializeSocket } = require('./socket');
const listsRouter = require('../routes/lists');
const tasksRouter = require('../routes/tasks');
const authRouter = require('../routes/auth');
const refreshRouter = require('../routes/refresh');
const { scheduleCronJob } = require('./utils/cronJob');
const generateList = require('./utils/faker/ListFaker');
const generateTask = require('./utils/faker/TaskFaker');

const key = fs.readFileSync(`${__dirname}/localhost.decrypted.key`);
const cert = fs.readFileSync(`${__dirname}/localhost.crt`);

require('dotenv').config();

const app = express();
const PORT = process.env.NODE_ENV === 'test' ? process.env.TEST_PORT : process.env.PORT || 5002;
const server = https.createServer({ key, cert }, app);

// Middleware setup
const corsOptions = {
  origin: "https://localhost:5173", // Allow requests from any origin
  credentials: true,
  optionSuccessStatus: 200
};
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRouter);
app.use('/api/refresh', refreshRouter);
app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

app.use(verifyJWT);

app.use('/api/lists', listsRouter);
app.use('/api/lists/:listId/tasks', tasksRouter);

// Generate fake data
//generateList(1000);
//generateTask(10);

// Initialize socket.io
initializeSocket(server);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  //scheduleCronJob();
});

module.exports = app;
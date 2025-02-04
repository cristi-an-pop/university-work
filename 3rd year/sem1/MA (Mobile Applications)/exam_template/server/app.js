const express = require('express');
const sequelize = require('./config/db.config');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const WebSocketService = require('./services/websocket.service');
const itemRoutes = require('./routes/item.routes');
const errorHandler = require('./middlewares/errors.middleware');
const app = express();
const server = require('http').createServer(app);

require('dotenv').config();

const wsService = new WebSocketService(server);
global.wsService = wsService;

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', itemRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

sequelize.sync({ force: true }).then(async () => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

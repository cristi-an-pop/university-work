const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const listsRouter = require('../routes/lists');
const app = express();
app.use(bodyParser.json());
const PORT = 5000;
const corsOptions = {
    origin:"*",
    credentials:true,
    optionSuccessStatus:200
  }

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', listsRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
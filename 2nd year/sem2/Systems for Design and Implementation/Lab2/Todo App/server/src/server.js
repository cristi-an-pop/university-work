const express = require('express');
const cors = require('cors');
const listsRouter = require('../routes/lists');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', listsRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


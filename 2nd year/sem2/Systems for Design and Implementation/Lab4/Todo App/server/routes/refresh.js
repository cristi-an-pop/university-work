const express = require('express');
const router = express.Router();

const {
    handleRefreshToken
} = require('../src/controller/RefreshTokenController');

router.get("/", handleRefreshToken);

module.exports = router;
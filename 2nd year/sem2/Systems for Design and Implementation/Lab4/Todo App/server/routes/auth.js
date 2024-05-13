const express = require('express');
const router = express.Router();

const {
    createUser,
    loginUser
} = require('../src/controller/UserController');

router.post("/signup", createUser);
router.post("/signin", loginUser);

module.exports = router;
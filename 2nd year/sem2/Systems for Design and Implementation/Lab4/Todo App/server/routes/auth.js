const express = require('express');
const router = express.Router();

const {
    createUser,
    loginUser,
    getAllUsers
} = require('../src/controller/UserController');

router.post("/signup", createUser);
router.post("/signin", loginUser);
router.get("/users", getAllUsers);

module.exports = router;
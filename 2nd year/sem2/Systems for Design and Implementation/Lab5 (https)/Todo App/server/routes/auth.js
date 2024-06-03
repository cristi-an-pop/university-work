const express = require('express');
const router = express.Router();
const verifyUserRole = require('../src/middleware/VerifyUserRole');
const verifyJWT = require('../src/middleware/VerifyJWT');

const {
    createUser,
    loginUser,
    getAllUsers,
    promoteUser,
    demoteUser
} = require('../src/controller/UserController');

router.post("/signup", createUser);
router.post("/signin", loginUser);
router.use(verifyJWT, verifyUserRole).get("/users", getAllUsers);
router.use(verifyJWT, verifyUserRole).patch("/users/:id/promote", promoteUser);
router.use(verifyJWT, verifyUserRole).patch("/users/:id/demote", demoteUser);

module.exports = router;
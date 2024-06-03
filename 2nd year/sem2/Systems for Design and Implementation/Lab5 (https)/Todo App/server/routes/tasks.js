const express = require('express');
const router = express.Router({ mergeParams: true});
const verifyUserRole = require('../src/middleware/VerifyUserRole');
const {
    getTasksByListId,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} = require('../src/controller/TaskController'); 

router.use(verifyUserRole).post("/", createTask);
router.use(verifyUserRole).delete("/:taskId", deleteTask);
router.use(verifyUserRole).patch("/:taskId", updateTask);
router.get("/", getTasksByListId);
router.get("/:taskId", getTaskById);

module.exports = router;
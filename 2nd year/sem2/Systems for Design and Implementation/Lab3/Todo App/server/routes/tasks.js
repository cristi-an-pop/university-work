const express = require('express');
const router = express.Router({ mergeParams: true});
const {
    getTasksByListId,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} = require('../src/controller/TaskController'); 

router.post("/", createTask);
router.delete("/:taskId", deleteTask);
router.patch("/:taskId", updateTask);
router.get("/", getTasksByListId);
router.get("/:taskId", getTaskById);

module.exports = router;
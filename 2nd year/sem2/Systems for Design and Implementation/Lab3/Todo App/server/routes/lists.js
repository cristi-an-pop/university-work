const express = require('express');
const router = express.Router();
const {
    getAllLists,
    getListById,
    createList,
    updateList,
    deleteList,
    createTask,
    deleteTask,
    updateTask
  } = require('../src/controller/ListController'); 

router.get("/api/lists", getAllLists);
router.post("/api/lists", createList);
router.delete("/api/lists/:id", deleteList);
router.get("/api/lists/:id", getListById);
router.patch("/api/lists/:id", updateList);
router.post("/api/lists/:id/tasks", createTask);
router.delete("/api/lists/:id/tasks/:taskId", deleteTask);
router.patch("/api/lists/:id/tasks/:taskId", updateTask);

module.exports = router;
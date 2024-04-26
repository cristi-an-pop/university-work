const express = require('express');
const router = express.Router();
const {
    getAllLists,
    getAllListsTasksCount,
    getListById,
    createList,
    updateList,
    deleteList
} = require('../src/controller/ListController'); 

router.get("/", getAllLists);
router.get("/ok", getAllListsTasksCount)
router.post("/", createList);
router.delete("/:id", deleteList);
router.get("/:id", getListById);
router.patch("/:id", updateList);

module.exports = router;
const express = require('express');
const router = express.Router();
const {
    getAllLists,
    getAllListsTasksCount,
    getListById,
    createList,
    updateList,
    deleteList,
    getAllListsByUserId
} = require('../src/controller/ListController'); 

router.get("/", getAllListsByUserId);
router.get("/ok", getAllListsTasksCount)
router.post("/", createList);
router.delete("/:id", deleteList);
router.get("/:id", getListById);
router.patch("/:id", updateList);

module.exports = router;
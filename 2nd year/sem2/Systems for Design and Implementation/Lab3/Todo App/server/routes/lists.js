const express = require('express');
const router = express.Router();
const {
    getAllLists,
    getListById,
    createList,
    updateList,
    deleteList
} = require('../src/controller/ListController'); 

router.get("/", getAllLists);
router.post("/", createList);
router.delete("/:id", deleteList);
router.get("/:id", getListById);
router.patch("/:id", updateList);

module.exports = router;
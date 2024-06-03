const express = require('express');
const router = express.Router();
const verifyUserRole = require('../src/middleware/VerifyUserRole');
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
router.use(verifyUserRole).post("/", createList);
router.use(verifyUserRole).delete("/:id", deleteList);
router.get("/:id", getListById);
router.use(verifyUserRole).patch("/:id", updateList);

module.exports = router;
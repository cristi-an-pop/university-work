const express = require('express');
const router = express.Router();
const memories = require('../controllers/memory.controller');

router.post('/memories', memories.create);
router.get('/memories', memories.findAll);
router.delete('/memories/:id', memories.delete);
router.put('/memories/:id', memories.update);
router.get('/memories/:id', memories.findOne);

module.exports = router;

const express = require('express');
const router = express.Router();
const items = require('../controllers/item.controller');

router.post('/item', items.create);
router.get('/items', items.findAll);
router.delete('/item/:id', items.delete);
router.put('/item/:id', items.update);
router.get('/item/:id', items.findOne);

module.exports = router;

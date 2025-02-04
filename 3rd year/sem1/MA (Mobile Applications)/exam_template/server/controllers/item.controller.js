const { v4: uuidv4 } = require('uuid');
const Item = require('../models/item.model');

// Create a new item
exports.create = async (req, res, next) => {
    const item = req.body;
    try {
        console.log('Creating new item:', item);
        if (!item.title || !item.description || !item.date) {
            console.info('Validation failed: Missing required fields');
            return res.status(400).json({ message: "Title, description and date are required!" });
        }

        const data = await Item.create(item);
        console.log('Item created successfully:', data);
        wsService.notifyClients('CREATE', data.toJSON());
        res.send(data);
    } catch (error) {
        console.error('Error creating Item:', error);
        next(error);
    }
};

// Retrieve all items
exports.findAll = async (req, res, next) => {
  try {
    console.log('Retrieving all items');
    const items = await Item.findAll();
    console.log('Items retrieved successfully:', items);
    res.send(items);
  } catch (error) {
    console.error('Error retrieving memories:', error);
    next(error);
  }
};

// Retrieve item by id
exports.findOne = async (req, res, next) => {
  const id = req.params.id;
  try {
    console.log('Retrieving item by id:', id);
    const item = await Item.findByPk(id);
    if (item) {
      console.log('Item retrieved successfully:', item);
      res.send(item);
    } else {
      console.log('Item not found');
      res.status(404).send({ message: "Item not found!" });
    }
  } catch (error) {
    console.error('Error retrieving Item:', error);
    next(error);
  }
};

// Delete a item by id
exports.delete = async (req, res, next) => {
  const id = req.params.id;
  try {
    console.log('Deleting Item by id:', id);
    const num = await Item.destroy({ where: { id: id } });
    if (num == 1) {
      global.wsService.notifyClients('DELETE', id);
      res.send({ message: "Item was deleted successfully!" });
    } else {
      res.send({ message: `Cannot delete Item!` });
    }
  } catch (error) {
    console.error('Error deleting Item:', error);
    next(error);
  }
};

// Update a item by id
exports.update = async (req, res, next) => {
  const id = req.params.id;
  const updatedItem = req.body;
  try {
    console.log('Updating Item by id:', id);
    const num = await Item.update(updatedItem, { where: { id: id } });
    console.log('Item updated successfully:', updatedItem);
    if (num == 1) {
      global.wsService.notifyClients('UPDATE', updatedItem);
      res.send({ message: "Item was updated successfully." });
    } else {
      res.send({ message: `Cannot update Item.` });
    }
  } catch (error) {
    console.error('Error updating Item:', error);
    next(error);
  }
};

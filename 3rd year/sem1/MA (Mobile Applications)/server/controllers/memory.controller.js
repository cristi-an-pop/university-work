const Memory = require('../models/memory.model');

// Create a new Memory
exports.create = async (req, res, next) => {
  try {
    console.log('Creating new memory:', req.body);
    if (!req.body.memory.title || !req.body.memory.description) {
      console.log('Validation failed: Missing required fields');
      return res.status(400).json({ message: "Title and description are required!" });
    }
    const operationId = req.body.operationId;

    const data = await Memory.create(req.body.memory);
    console.log('Memory created successfully:', data);
    global.wsService.notifyClients('CREATE', data, operationId);
    res.json(data);
  } catch (error) {
    console.error('Error creating memory:', error);
    next(error);
  }
};

// Retrieve all Memories
exports.findAll = async (req, res) => {
  try {
    console.log('Retrieving all memories');
    const memories = await Memory.findAll();
    console.log('Memories retrieved successfully:', memories);
    res.send(memories);
  } catch (error) {
    console.error('Error retrieving memories:', error);
    next(error);
  }
};

// Retrieve Memory by Id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    console.log('Retrieving memory by id:', id);
    const memory = await Memory.findByPk(id);
    if (memory) {
      console.log('Memory retrieved successfully:', memory);
      res.send(memory);
    } else {
      console.log('Memory not found');
      res.status(404).send({ message: "Memory not found!" });
    }
  } catch (error) {
    console.error('Error retrieving memory:', error);
    next(error);
  }
};

// Delete a Memory by id
exports.delete = async (req, res) => {
  const id = req.params.id;
  const operationId = req.body.operationId;

  try {
    if (id.startsWith('temp-')) {
      return res.status(400).json({
        message: "Cannot delete temporary memory!"
      });
    }
    console.log('Deleting memory by id:', id);
    const num = await Memory.destroy({ where: { id: id } });
    if (num == 1) {
      global.wsService.notifyClients('DELETE', id, operationId);
      res.send({ message: "Memory was deleted successfully!" });
    } else {
      res.send({ message: `Cannot delete Memory!` });
    }
  } catch (error) {
    console.error('Error deleting memory:', error);
    next(error);
  }
};

// Update a Memory by id
exports.update = async (req, res) => {
  const id = req.params.id;
  const operationId = req.body.operationId;

  try {
    console.log('Updating memory by id:', id);
    const num = await Memory.update(req.body.updatedMemory, { where: { id: id } });
    console.log('Memory updated successfully:', req.body.updatedMemory);
    if (num == 1) {
      global.wsService.notifyClients('UPDATE', { ...req.body.updatedMemory, id }, operationId);
      res.send({ message: "Memory was updated successfully." });
    } else {
      res.send({ message: `Cannot update Memory.` });
    }
  } catch (error) {
    console.error('Error updating memory:', error);
    next(error);
  }
};

// Sync Memories
exports.sync = async (req, res) => {
  const memories = req.body.memories;

  try {
    const results = await Promise.all(memories.map(async (memory) => {
      const existingMemory = await Memory.findByPk(memory.id);
      if (existingMemory) {
        return await Memory.update(memory, { where: { id: memory.id } });
      } else {
        return await Memory.create(memory);
      }
    }));
    res.send(results);
  } catch (error) {
    res.status(500).send({ message: "Error" });
  }
};

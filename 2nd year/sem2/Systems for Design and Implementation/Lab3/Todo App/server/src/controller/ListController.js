const listModel = require('../model/ListModel');

const getAllLists = async (req, res) => {
    try {
        const { order } = req.query;
        const lists = await listModel.getAllLists(order);
        res.status(200).json(lists);
        console.log("All lists fetched");
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lists' });
    }
}

const getListById = async (req, res) => {
    try {
        const id = req.params.id;
        const list = await listModel.getListById(id);
        res.status(200).json(list);
        console.log("List fetched by id");
    } catch (error) {
        res.status(500).json({ message: 'Error fetching list' });
    }
}

const createList = async (req, res) => {
    try {
        const newList = req.body;
        const list = await listModel.createList(newList);
        res.status(201).json(list);
        console.log("List created");
    } catch (error) {
        res.status(500).json({ message: 'Error creating list' });
    }
}

const updateList = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedList = req.body;
        const list = await listModel.updateList(id, updatedList);
        res.status(200).json(list);
        console.log("List updated");
    } catch (error) {
        res.status(500).json({ message: 'Error updating list' });
    }
}

const deleteList = async (req, res) => {
    try {
        const id = req.params.id;
        await listModel.deleteList(id);
        res.status(200).json({ message: 'List deleted' });
        console.log("List deleted");
    } catch (error) {
        res.status(500).json({ message: 'Error deleting list' });
    }
}

module.exports = {
    getAllLists,
    getListById,
    createList,
    updateList,
    deleteList
};
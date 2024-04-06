const listModel = require('../model/ListModel');

const getAllLists = (req, res) => {
    const lists = listModel.getAllLists();
    res.status(200).json(lists);
    console.log("All lists fetched");
}

const getListById = (req, res) => {
    const id = req.params.id;
    const list = listModel.getListById(id);
    res.status(200).json(list);
    console.log("List fetched by id");
}

const createList = async (req, res) => {
    const newList = req.body;
    const list = await listModel.createList(newList);
    res.status(201).json(list);
    console.log("List created");
}

const updateList = async (req, res) => {
    const id = req.params.id;
    const updatedList = req.body;
    const list = await listModel.updateList(id, updatedList);
    res.status(200).json(list);
    console.log("List updated");
}

const deleteList = async (req, res) => {
    const id = req.params.id;
    await listModel.deleteList(id);
    res.status(204).json({message: "List deleted"});
    console.log("List deleted");
}

const createTask = async (req, res) => {
    const id = req.params.id;
    const newTask = req.body;
    const task = await listModel.createTask(id, newTask);
    res.status(201).json(task);
    console.log("Task created");
}

const deleteTask = async (req, res) => {
    const id = req.params.id;
    const taskId = req.params.taskId;
    await listModel.deleteTask(id, taskId);
    res.status(204).json({message: "Task deleted"});
    console.log("Task deleted");
}

const updateTask = async (req, res) => {
    const id = req.params.id;
    const taskId = req.params.taskId;
    const updatedTask = req.body;
    const task = await listModel.updateTask(id, taskId, updatedTask);
    res.status(200).json(task);
    console.log("Task updated");
}

module.exports = {
    getAllLists,
    getListById,
    createList,
    updateList,
    deleteList,
    createTask,
    deleteTask,
    updateTask
};
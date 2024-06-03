const taskModel = require('../model/TaskModel');

const getTasksByListId = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const pageSize = req.query.pageSize || 50;
        const listId = req.params.listId;
        const tasks = await taskModel.getTasksByListId(listId, page, pageSize);
        res.status(200).json(tasks);
        console.log("Tasks fetched by list id");
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
}

const getTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await taskModel.getTaskById(id);
        res.status(200).json(task);
        console.log("Task fetched by id");
    } catch (error) {
        res.status(500).json({ message: 'Error fetching task' });
    }
}

const createTask = async (req, res) => {
    try {
        console.log(req.params.listId);
        const newTask = {
            id: null,
            ...req.body,
            list_id: req.params.listId
        };
        const task = await taskModel.createTask(newTask);
        res.status(201).json(task);
        console.log("Task created");
    } catch (error) {
        res.status(500).json({ message: 'Error creating task' });
    }
}

const updateTask = async (req, res) => {
    try {
        const id = req.params.taskId;
        const updatedTask = req.body;
        const task = await taskModel.updateTask(id, updatedTask);
        res.status(200).json(task);
        console.log("Task updated");
    } catch (error) {
        res.status(500).json({ message: 'Error updating task' });
    }
}

const deleteTask = async (req, res) => {
    try {
        const id = req.params.taskId;
        await taskModel.deleteTask(id);
        res.status(200).json({ message: 'Task deleted' });
        console.log("Task deleted");
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task' });
    }
}

module.exports = {
    getTasksByListId,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
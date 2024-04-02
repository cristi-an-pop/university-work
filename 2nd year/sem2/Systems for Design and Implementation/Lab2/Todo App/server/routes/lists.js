const express = require('express');
const router = express.Router();
module.exports = router;
let lists = [];
let selectedListId = null;

router.get("/api/lists", (req, res) => {
    res.json(lists);    
    console.log(lists);
});

router.post("/api/lists", (req, res) => {
    const newList = req.body;
    lists.push(newList);
    res.status(201).json(newList);
});

router.delete("/api/lists/:id", (req, res) => {
    const id = req.params.id;
    lists = lists.filter(list => list.id !== id);
    res.status(204).json({ message: "List deleted" });
})

router.get("/api/lists/:id", (req, res) => {
    const id = req.params.id;
    const list = lists.find(list => list.id === id);
    res.json(list);
});

router.patch("/api/lists/:id", (req, res) => {
    const id = req.params.id;
    const newList = req.body;
    lists = lists.map(list => list.id === id ? newList : list);
    res.json(newList);
})

router.post("/api/lists/selectedListId", (req, res) => {
    selectedListId = req.body.id; 
    res.json({ message: 'Selected list ID saved successfully' });
});

router.get("/api/lists/selectedListId", (req, res) => {
    console.log(selectedListId);
    res.json(selectedListId);
});

router.post("/api/lists/:id/tasks", (req, res) => {
    const id = req.params.id;
    const newTask = req.body;
    lists = lists.map(list => list.id === id ? { ...list, tasks: [...list.tasks, newTask] } : list);
    res.json(newTask);
});

router.delete("/api/lists/:id/tasks/:taskId", (req, res) => {
    const id = req.params.id;
    const taskId = req.params.taskId;
    lists = lists.map(list => list.id === id ? { ...list, tasks: list.tasks.filter(task => task.id !== taskId) } : list);
    res.status(204).json({ message: "Task deleted" });
});

router.patch("/api/lists/:id/tasks/:taskId", (req, res) => {
    const id = req.params.id;
    const taskId = req.params.taskId;
    const updatedTask = req.body;
    lists = lists.map(list => list.id === id ? { ...list, tasks: list.tasks.map(task => task.id === taskId ? updatedTask : task) } : list);
    res.json(updatedTask);
});


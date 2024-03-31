const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

let lists = [];
let selectedListId = null;

app.get("/api/lists", (req, res) => {
    res.json(lists);    
    console.log(lists);
});

app.post("/api/lists", (req, res) => {
    const newList = req.body;
    lists.push(newList);
    res.json(newList);
});

app.delete("/api/lists/:id", (req, res) => {
    const id = req.params.id;
    lists = lists.filter(list => list.id !== id);
    res.json({ message: "List deleted" });
})

app.put("/api/lists/:id", (req, res) => {
    const id = req.params.id;
    const newList = req.body;
    lists = lists.map(list => list.id === id ? newList : list);
    res.json(newList);
})

app.post("/api/selectedListId", (req, res) => {
    selectedListId = req.body.id; // Save the selected list ID
    res.json({ message: 'Selected list ID saved successfully' });
});

app.get("/api/selectedListId", (req, res) => {
    console.log(selectedListId);
    res.json(selectedListId);
});

app.post("/api/lists/:id/tasks", (req, res) => {
    const id = req.params.id;
    const newTask = req.body;
    lists = lists.map(list => list.id === id ? { ...list, tasks: [...list.tasks, newTask] } : list);
    res.json(newTask);
});

app.delete("/api/lists/:id/tasks/:taskId", (req, res) => {
    const id = req.params.id;
    const taskId = req.params.taskId;
    lists = lists.map(list => list.id === id ? { ...list, tasks: list.tasks.filter(task => task.id !== taskId) } : list);
    res.json({ message: "Task deleted" });
});


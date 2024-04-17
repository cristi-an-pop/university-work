let tasks = []
let idCounter = 1;

const getTasksByListId = (listId, order) => {
    return tasks.filter(task => task.list_id === listId);
}

const getTaskById = (id) => {
    return tasks.find(task => task.id === id);
}

const createTask = (newTask) => {
    if(newTask.id == undefined)
    {
        newTask.id = idCounter++;
    }
    tasks.push(newTask);
    return newTask;
}

const updateTask = (id, updatedTask) => {
    const index = tasks.findIndex(task => task.id === id);
    tasks[index] = updatedTask;
    return updatedTask;
}

const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
}

module.exports = {
    getTasksByListId,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
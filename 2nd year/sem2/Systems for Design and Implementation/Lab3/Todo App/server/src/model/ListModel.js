const fs = require('fs');

let lists = require('./lists.json');

const saveLists = () => {
    fs.writeFileSync('./src/model/lists.json', JSON.stringify(lists, null, 2), 'utf8');
}

const getAllLists = () => {
    return lists;
}

const getListById = (id) => {
    return lists.find(list => list.id === id);
}

const createList = (newList) => {
    lists.push(newList);
    saveLists();
    return newList;
}

const updateList = (id, updatedList) => {
    lists = lists.map(list => list.id === id ? updatedList : list);
    saveLists();
    return updatedList;
}

const deleteList = (id) => {
    lists = lists.filter(list => list.id !== id);
    saveLists();
}

const createTask = (id, newTask) => {
    lists = lists.map(list => list.id === id ? { ...list, tasks: [...list.tasks, newTask] } : list);
    saveLists();
    return newTask;
}

const deleteTask = (id, taskId) => {
    lists = lists.map(list => list.id === id ? { ...list, tasks: list.tasks.filter(task => task.id !== taskId) } : list);
    saveLists();
}

const updateTask = (id, taskId, updatedTask) => {
    lists = lists.map(list => list.id === id ? { ...list, tasks: list.tasks.map(task => task.id === taskId ? updatedTask : task) } : list);
    saveLists();
    return updatedTask;
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


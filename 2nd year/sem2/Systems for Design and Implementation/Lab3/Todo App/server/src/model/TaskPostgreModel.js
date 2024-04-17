const db = require('../db');

const getTasksByListId = (listId, order) => {
    if (order === 'DESC') {
        return db.any('SELECT * FROM Tasks WHERE list_id = $1 ORDER BY name DESC', [listId]);
    } else {
        return db.any('SELECT * FROM Tasks WHERE list_id = $1 ORDER BY name ASC', [listId]);
    }
}

const getTaskById = (id) => {
    return db.one('SELECT * FROM Tasks WHERE id = $1', [id]);
}

const createTask = (newTask) => {
    return db.one('INSERT INTO Tasks (name, completed, dateTime, list_id) VALUES ($1, $2, $3, $4) RETURNING *', 
    [newTask.name, newTask.completed, newTask.dateTime, newTask.list_id]);
}

const updateTask = (id, updatedTask) => {
    return db.one('UPDATE Tasks SET name = $1, completed = $2, dateTime = $3 WHERE id = $4 RETURNING *', 
    [updatedTask.name, updatedTask.completed, updatedTask.datetime, id]);
}

const deleteTask = (id) => {
    return db.none('DELETE FROM Tasks WHERE id = $1', [id]);
}

module.exports = {
    getTasksByListId,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
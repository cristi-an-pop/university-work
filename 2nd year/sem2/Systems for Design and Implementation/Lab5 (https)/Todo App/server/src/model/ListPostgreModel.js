const db = require('../db');

const getAllLists = (order) => {
    if (order === 'DESC') {
        return db.any('SELECT * FROM Lists ORDER BY name DESC');
    } else {
        return db.any('SELECT * FROM Lists ORDER BY name ASC');
    }
}

const getAllListsByUserId = (userId, page, pageSize) => {
    const offset = (page - 1) * pageSize;
    console.log(userId);
    return db.any('SELECT * FROM Lists WHERE user_id = $1 ORDER BY name ASC OFFSET $2 LIMIT $3', [userId, offset, pageSize]);
}

const getAllListsTasksCount = (page, pageSize) => {
    const offset = (page - 1) * pageSize;
    return db.any('SELECT Lists.id, Lists.name, COUNT(Tasks.id) AS "taskCount" FROM Lists LEFT JOIN Tasks ON Lists.id = Tasks.list_id GROUP BY Lists.id, Lists.name ORDER BY Lists.name ASC OFFSET $1 LIMIT $2', [offset, pageSize]);
}

const getListById = (id) => {
    return db.one('SELECT * FROM Lists WHERE id = $1', [id]);
}

const createList = (userId, newList) => {
    return db.one('INSERT INTO Lists (id, name, user_id) VALUES ($1, $2, $3) RETURNING *', [newList.id, newList.name, userId]);
}

const updateList = (id, updatedList) => {
    return db.one('UPDATE Lists SET name = $1 WHERE id = $2 RETURNING *', [updatedList.name, id]);
}

const deleteList = (id) => {
    return db.tx(t => {
        // Delete all tasks associated with the list
        const deleteTasks = t.none('DELETE FROM Tasks WHERE list_id = $1', [id]);
        // Delete the list
        const deleteList = t.none('DELETE FROM Lists WHERE id = $1', [id]);
        return t.batch([deleteTasks, deleteList]);
    });
}

module.exports = {
    getAllLists,
    getAllListsTasksCount,
    getListById,
    createList,
    updateList,
    deleteList,
    getAllListsByUserId
};
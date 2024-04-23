const db = require('../db');

const getAllLists = (order) => {
    if (order === 'DESC') {
        return db.any('SELECT * FROM Lists ORDER BY name DESC');
    } else {
        return db.any('SELECT * FROM Lists ORDER BY name ASC');
    }
}

const getListById = (id) => {
    return db.one('SELECT * FROM Lists WHERE id = $1', [id]);
}

const createList = (newList) => {
    return db.one('INSERT INTO Lists (id, name) VALUES ($1, $2) RETURNING *', [newList.id, newList.name]);
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
    getListById,
    createList,
    updateList,
    deleteList
};
const axios = require('axios');
const { getAllLists } = require('../../model/ListPostgreModel');
const uuid = require('uuid');
const { createTask } = require('../../model/TaskPostgreModel');

async function generateTask(length) {
    const lists = await getAllLists();
    const listIds = lists.map(list => list.id);
    listIds.forEach(id => {
        for (let i = 0; i < length; i++) {
            const item = {
                id: uuid.v4(),
                name: "Task" + i,
                complted: false,
                datetime: new Date().toISOString(),
                list_id: id
            };
            createTask(item);
        }
    })
}

module.exports = generateTask;
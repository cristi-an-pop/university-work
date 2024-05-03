let TaskInMemoryModel = require('../model/TaskInMemoryModel');

const createTaskExample = () => {
    const task1 = {
        id: '123',
        name: 'test1',
        listId: '123',
        completed: false,
    }
    const task2 = {
        id: '456',
        name: 'test2',
        listId: '456',
        completed: false,
    }
    TaskInMemoryModel.createTask(task1);
    TaskInMemoryModel.createTask(task2);
}

module.exports = { createTaskExample };
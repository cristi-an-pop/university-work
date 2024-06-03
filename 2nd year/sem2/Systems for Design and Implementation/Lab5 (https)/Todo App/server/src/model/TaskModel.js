let TaskModel;

if (process.env.NODE_ENV === 'test') {
    TaskModel = require('./TaskInMemoryModel');
} else {
    TaskModel = require('./TaskPostgreModel');
}

module.exports = TaskModel;
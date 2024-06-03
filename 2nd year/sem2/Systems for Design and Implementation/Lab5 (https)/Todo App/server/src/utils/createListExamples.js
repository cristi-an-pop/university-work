let ListInMemoryModel = require('../model/ListInMemoryModel');

const createListExample = () => {
    const list1 = {
        id: '123',
        name: 'test1',
    }
    const list2 = {
        id: '456',
        name: 'test2',
    }
    ListInMemoryModel.createList(list1);
    ListInMemoryModel.createList(list2);
}

module.exports = { createListExample };

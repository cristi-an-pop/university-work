const { randomInt } = require('crypto');
const uuid = require('uuid');
const axios = require('axios');
const { createList } = require('../../model/ListPostgreModel');

function generateList(length) {
    for (let i = 0; i < length; i++) {
        const item = {
            id: uuid.v4(),
            name: "List" + randomInt(1, 100),
        };
        createList(item);
    }
}

module.exports = generateList;
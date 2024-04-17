let ListModel;

if (process.env.NODE_ENV === 'test') {
    ListModel = require('./ListInMemoryModel');
} else {
    ListModel = require('./ListPostgreModel');
}

module.exports = ListModel;
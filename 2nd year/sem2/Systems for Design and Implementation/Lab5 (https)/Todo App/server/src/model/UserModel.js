let UserModel;

if (process.env.NODE_ENV === 'test') {
    UserModel = require('./UserInMemoryModel');
} else {
    UserModel = require('./UserPostgreModel');
}

module.exports = UserModel;
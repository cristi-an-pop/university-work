const db = require('../db');

const createUser = (newUser) => {
    return db.one('INSERT INTO Users (username, password, email) VALUES ($1, $2, $3) RETURNING *', 
    [newUser.username, newUser.password, newUser.email]);
}

const getUserByUsername = (username) => {
    return db.oneOrNone('SELECT * FROM Users WHERE username = $1', [username]);
}

const getUserByRefreshToken = (refreshToken) => {
    return db.oneOrNone('SELECT * FROM Users WHERE refreshtoken = $1', [refreshToken]);
}

const updateUserRefreshToken = (username, refreshToken) => {
    return db.one('UPDATE Users SET refreshtoken = $1 WHERE username = $2 RETURNING *', [refreshToken, username]);
}

module.exports = {
    createUser,
    getUserByUsername,
    getUserByRefreshToken,
    updateUserRefreshToken
};
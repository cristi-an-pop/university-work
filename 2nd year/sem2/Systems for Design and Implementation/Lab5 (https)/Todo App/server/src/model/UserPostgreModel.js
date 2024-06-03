const db = require('../db');

const createUser = (newUser) => {
    db.connect()
    .then(obj => {
        obj.done(); // success, release the connection...
        console.log('Successfully connected to the database');
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
    });
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

const getAllUsers = () => {
    return db.many('SELECT * FROM Users');
}

const promoteUser = (id) => {
    return db.one('UPDATE Users SET role = 2022 WHERE id = $1 RETURNING *', [id]);
}

const demoteUser = (id) => {
    return db.one('UPDATE Users SET role = 1011 WHERE id = $1 RETURNING *', [id]);
}

module.exports = {
    createUser,
    getUserByUsername,
    getUserByRefreshToken,
    updateUserRefreshToken,
    getAllUsers,
    promoteUser,
    demoteUser
};
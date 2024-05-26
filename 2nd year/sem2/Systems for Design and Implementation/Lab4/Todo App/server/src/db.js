const pgp = require('pg-promise')();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'todoapp',
    user: 'postgres',
    password: '1234'
});

module.exports = db;
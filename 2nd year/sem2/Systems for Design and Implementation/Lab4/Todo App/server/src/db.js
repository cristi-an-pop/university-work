const pgp = require('pg-promise')();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_DATABASE,
    password: '1234'
});

module.exports = db;
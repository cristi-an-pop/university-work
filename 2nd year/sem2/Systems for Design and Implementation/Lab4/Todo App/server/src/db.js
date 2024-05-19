const pgp = require('pg-promise')();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD
});

module.exports = db;
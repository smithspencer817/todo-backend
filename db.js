require('dotenv/config');

const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.DB_ADMIN_USERNAME,
    password: process.env.DB_ADMIN_PASSWORD,
    host: 'localhost',
    port: 5432,
    database: 'todoapp'
});

module.exports = pool;
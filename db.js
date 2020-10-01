require('dotenv').config();

const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'spencersmith',
    password: 'Fender0402',
    host: 'localhost',
    port: 5432,
    database: 'todoapp'
});

module.exports = pool;
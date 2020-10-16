require('dotenv/config');

const { Sequelize } = require('sequelize');
const db = new Sequelize('todoapp', process.env.DB_ADMIN_USERNAME, process.env.DB_ADMIN_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
});

db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err))

module.exports = db;

// const Pool = require('pg').Pool;

// const pool = new Pool({
//     user: process.env.DB_ADMIN_USERNAME,
//     password: process.env.DB_ADMIN_PASSWORD,
//     host: 'localhost',
//     port: 5432,
//     database: 'todoapp'
// });

// module.exports = pool;
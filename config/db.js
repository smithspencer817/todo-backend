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
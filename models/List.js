const { DataTypes } = require('sequelize');
const db = require('../db');

const List = db.define('list', {
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = List;


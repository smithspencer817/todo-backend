const { DataTypes } = require('sequelize');
const db = require('../db');

const ListItem = db.define('list_item', {
    list_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = ListItem;
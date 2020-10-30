const { DataTypes } = require('sequelize');
const db = require('../config/db');

const List = db.define('list', {
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1,26],
                msg: "list name must be between 1 and 26 characters"
            }
        }
    }
});

module.exports = List;
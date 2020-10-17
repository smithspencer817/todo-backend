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
            length(value) {
                if (value.length === 0) {
                    throw new Error("list name can't be empty")
                } else if (value.length > 20) {
                    throw new Error("list name can't be longer than 20 characters")
                }
            }
        }
    }
});

module.exports = List;
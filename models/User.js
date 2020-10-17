const { DataTypes } = require('sequelize');
const db = require('../config/db');

const User = db.define('user', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1,26],
                msg: "must be between 1 and 26 characters"
            }
        }
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1,26],
                msg: "must be between 1 and 26 characters"
            }
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = User;
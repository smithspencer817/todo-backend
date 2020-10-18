const { DataTypes } = require('sequelize');
const db = require('../config/db');

const User = db.define('user', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1,26],
                msg: "first name must be between 1 and 26 characters"
            }
        }
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [1,26],
                msg: "last name must be between 1 and 26 characters"
            }
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: {
                args: [4,26],
                msg: "username must be between 4 and 26 characters"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [4,26],
                msg: "password must be between 4 and 26 characters"
            }
        }
    }
}, {
    timestamps: false
});

module.exports = User;
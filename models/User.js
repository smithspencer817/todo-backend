'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // User.hasMany(models.List, {foreignKey: 'userId', as: 'lists'})
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          len: {
              args: [1,26],
              msg: "first name must be between 1 and 26 characters"
          }
      }
    },
    lastName: {
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
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
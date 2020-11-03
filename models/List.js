'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    static associate(models) {
      List.hasMany(models.ListItem, {foreignKey: 'listId', as: 'listItems'})
      List.belongsTo(models.User, {sourceKey: 'userId', as: 'user'})
    }
  };
  List.init({
    userId: {
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
  }, {
    sequelize,
    modelName: 'List',
  });
  return List;
};
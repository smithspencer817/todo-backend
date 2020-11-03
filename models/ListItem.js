'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListItem extends Model {
    static associate(models) {
      // ListItem.belongsTo(models.User, {foreignKey: 'listId', as: 'list'})
    }
  };
  ListItem.init({
    listId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ListItem',
  });
  return ListItem;
};
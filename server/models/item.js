'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.Product);
      Item.belongsTo(models.Cart);
    }
  }
  Item.init({
    CartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'CartId is required'
        },
        notEmpty: {
          msg: 'CartId is required'
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'ProductId is required'
        },
        notEmpty: {
          msg: 'ProductId is required'
        }
      }
    },
    quantity: {
      defaultValue: 1,
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};
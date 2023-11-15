'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.Product);
      Cart.belongsTo(models.Order);
      Cart.belongsTo(models.User);
    }
  }
  Cart.init({
    OrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'OrderId is required'
        },
        notEmpty: {
          msg: 'OrderId is required'
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
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'UserId is required'
        },
        notEmpty: {
          msg: 'UserId is required'
        }
      }
    },
    quantity: {
      defaultValue: 1,
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};
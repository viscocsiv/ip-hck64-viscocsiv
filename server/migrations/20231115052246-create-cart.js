'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      OrderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      ProductId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      quantity: {
        defaultValue: 1,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Carts');
  }
};
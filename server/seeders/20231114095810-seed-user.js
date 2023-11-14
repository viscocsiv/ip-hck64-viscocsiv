'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = require('../data/users.json').map((user) => {
      user.createdAt = new Date();
      user.updatedAt = new Date();
      return user;
    })
    await queryInterface.bulkInsert('Users', users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
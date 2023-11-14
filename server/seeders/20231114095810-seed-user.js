'use strict';
const axios = require('axios');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const products = await axios({
      method: 'get',
      url: 'https://simple-grocery-store-api.glitch.me/products'
    }).map((product) => {
      
    })
    await queryInterface.bulkInsert('Products', products);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
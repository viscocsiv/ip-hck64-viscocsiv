'use strict';
const axios = require('axios');
const generatePrice = require('../helpers/generatePrice');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { data } = await axios({
      method: 'get',
      url: 'https://simple-grocery-store-api.glitch.me/products'
    })

    const products = data.map((product) => {
      delete product.id;
      product.price = generatePrice(5000, 50000);
      product.createdAt = new Date();
      product.updatedAt = new Date();
      return product;
    })
    await queryInterface.bulkInsert('Products', products);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};

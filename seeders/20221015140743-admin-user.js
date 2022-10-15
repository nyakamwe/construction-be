'use strict';
const Protection = require('../helpers/hash')
const {hashPassword} = Protection

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('users', [{
      name: 'oreste',
      email: 'oreste@gmail.com',
      password: hashPassword('test12345'),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};

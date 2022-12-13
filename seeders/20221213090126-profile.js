'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('profile', [{
      userId: 1,
      about: 'The company was establish in 2004 , they have built the following construction building: schools, Dams, Street Roads, churches, factories, residentials Houses, Commercials houses, Embassy Houses (American, Holland), Humidity protection insulator, Towers for FM antennas.',
      experience: 3,
      companies: 5,
      telephone: '+250786052793',
      email: 'oreste@gmail.com',
      completed: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('profile', null, {});
     
  }
};

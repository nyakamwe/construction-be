'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'projects', // table name
        'status', // new field name
        {
          type: Sequelize.ENUM('active', 'inactive'),
          allowNull: false,
          defaultValue: 'active'
        },
      ),
    ])
  },
  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('projects', 'status')
  }
};

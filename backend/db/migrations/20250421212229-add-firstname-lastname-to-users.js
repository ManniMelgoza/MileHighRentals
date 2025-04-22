'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    // option 1
    options.tableName = 'Users';
    await queryInterface.addColumn( options,'firstName', {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    })
    await queryInterface.addColumn(options, 'lastName', {
      type: Sequelize.STRING,
      allowNull: false,
      notEmpty: true
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Users', 'firstName'),
    await queryInterface.removeColumn('Users', 'lastName')
  }
};

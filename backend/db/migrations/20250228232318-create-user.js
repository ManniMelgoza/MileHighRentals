'use strict';

const { all } = require("../../routes");

//Line 3-6 is for render that uses SCHEMA to create sub databases within one database
// for every migration table you need to add the options obj at the end of the table obj
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
        // don't allow empty strings
        notEmpty: true
      },
      email: {
        type: Sequelize.STRING(256),
        allowNull: false,
        unique: true,
        // checks for email format (foo@bar.com)
        isEmail: true,
        // don't allow empty strings
        notEmpty: true
      },
      hashedPassword: {
        type: Sequelize.STRING.BINARY,
        allowNull: false,
        // don't allow empty strings
        notEmpty: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
      // options need to be passed for every migration file
    }, options);
  },

  async down(queryInterface, Sequelize) {
    // options.property = tablename
    options.tableName = "Users";
    // we pass the oprtions obj as the first arg instead of a str of the table name
    return queryInterface.dropTable(options);
  }
};

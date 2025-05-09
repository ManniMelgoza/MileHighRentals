'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      /*
      // This is how the Phase3 set up was done
      options.tablesName = 'Users;
      return queryInterface.bulkInser(options, [
        {
          email:
          username:
          hashedPassword: bcrypt.hashSync('password')
        }
      ])
      */
     {
       email: 'demo@user.io',
       username: 'Demo-lition',
       // Hashing happens with the bcrypt
       hashedPassword: bcrypt.hashSync('password'),
       firstName: 'Demo',
       lastName: 'User',
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'Fake',
        lastName: 'User1',
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Fake',
        lastName: 'User2',
      }
      /*
      by default, bulkCreate does not run validations on each object that is going to be
      created (which create does). To make bulkCreate run these validations as well,
      you must pass the validate: true option.
      */
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      // This are the things that we dont want to expose to the public
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};

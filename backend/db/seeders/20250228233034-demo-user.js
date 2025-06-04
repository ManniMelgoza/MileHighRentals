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
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Demo',
        lastName: 'User',
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Brendan',
        lastName: 'Eich',
      },
      {
        email: 'user3@user.io',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password4'),
        firstName: 'Donald',
        lastName: 'Chamberlin',
      },
      {
        email: 'user4@user.io',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password5'),
        firstName: 'Guido',
        lastName: 'van Rossum',
      },
      {
        email: 'user5@user.io',
        username: 'FakeUser5',
        hashedPassword: bcrypt.hashSync('password6'),
        firstName: 'Warren',
        lastName: 'Buffet',
      },
      {
        email: 'user6@user.io',
        username: 'FakeUser6',
        hashedPassword: bcrypt.hashSync('password7'),
        firstName: 'Linus',
        lastName: 'Torvalds',
      },
      {
        email: 'user7@user.io',
        username: 'FakeUser7',
        hashedPassword: bcrypt.hashSync('password8'),
        firstName: 'Akira',
        lastName: 'Toriyama',
      },
      {
        email: 'user8@user.io',
        username: 'FakeUser8',
        hashedPassword: bcrypt.hashSync('password9'),
        firstName: 'Satoshi',
        lastName: 'Tajiri',
      },
      {
        email: 'user9@user.io',
        username: 'FakeUser9',
        hashedPassword: bcrypt.hashSync('password10'),
        firstName: 'Naruto',
        lastName: 'Uzumaki',
      },
      {
        email: 'user10@user.io',
        username: 'FakeUser10',
        hashedPassword: bcrypt.hashSync('password11'),
        firstName: 'George',
        lastName: 'Lucas',
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
      username: { [Op.in]: ['Demo-lition', 'FakeUser2', 'FakeUser3'] }
    }, {});
  }
};

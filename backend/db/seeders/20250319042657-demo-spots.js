'use strict';

const { Spot, SpotImage } = require('../models'); // If you're using the Spot model
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat:  37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123.00,
      },
      {
        ownerId: 2,
        address: "3567 Larsh",
        city: "Denver",
        state: "Colorado",
        country: "United States of America",
        lat: 32.7645358,
        lng: -150.4730327,
        name: "Mountain View",
        description: "Great home to vacation close to the downtown denver area",
        price: 200.00,
      },
      {
        ownerId: 3,
        address: "1700 Franklin",
        city: "Riverside",
        state: "California",
        country: "United States of America",
        lat: 72.7645358,
        lng: 86.4730327,
        name: "Costal View",
        description: "Small cottage close to new development near the collge",
        price: 145.00
      }
        ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options, null, {});
  }
};

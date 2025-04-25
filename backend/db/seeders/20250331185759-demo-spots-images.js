'use strict';

const { Spot, SpotImage, User } = require('../models'); // If you're using the Spot model
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
  await SpotImage.bulkCreate([
    {
      spotId: 1,
      url: 'https://example.com/images/image_url.jpg',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://example.com/images/AppAcademyHome.jpg',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://example.com/images/image_url.jpg',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://example.com/images/OceanView.jpg',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://example.com/images/image_url.jpg',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://example.com/images/MountainViewCottage.jpg',
      preview: false
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
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, null, {});
  }
};

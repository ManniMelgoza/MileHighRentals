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
      url: 'https://example.com/images/AppAcademyHome.jpg',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://example.com/images/image_url.jpg',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://example.com/images/OceanView.jpg',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://example.com/images/image_url.jpg',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://example.com/images/MountainViewCottage.jpg',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://example.com/images/image_url.jpg',
      preview: false
    },
    {
      spotId: 4,
      url: 'https://example.com/images/RockyCabin.jpg',
      preview: true
    },
    {
      spotId: 4,
      url: 'https://example.com/images/image_url.jpg',
      preview: false
    },
    {
      spotId: 5,
      url: 'https://example.com/images/SnowCreekLodge.jpg',
      preview: true
    },
    {
      spotId: 5,
      url: 'https://example.com/images/image_url.jpg',
      preview: false
    },
    {
      spotId: 6,
      url: 'https://example.com/images/FoxgloveHideout.jpg',
      preview: true
    },
    {
      spotId: 6,
      url: 'https://example.com/images/image_url.jpg',
      preview: false
    },
    {
      spotId: 7,
      url: 'https://example.com/images/WinterPineRetreat.jpg',
      preview: true
    },
    {
      spotId: 7,
      url: 'https://example.com/images/image_url.jpg',
      preview: false
    },
    {
      spotId: 8,
      url: 'https://example.com/images/MeadowLookout.jpg',
      preview: true
    },
    {
      spotId: 8,
      url: 'https://example.com/images/image_url.jpg',
      preview: false
    },
    {
      spotId: 9,
      url: 'https://example.com/images/ElkValleyLodge.jpg',
      preview: true
    },
    {
      spotId: 9,
      url: 'https://example.com/images/image_url.jpg',
      preview: false
    },
    {
      spotId: 10,
      url: 'https://example.com/images/PineconeCottage.jpg',
      preview: true
    },
    {
      spotId: 10,
      url: 'https://example.com/images/image_url.jpg',
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

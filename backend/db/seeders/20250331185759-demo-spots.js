'use strict';

const { Spot, SpotImage, User } = require('../models'); // If you're using the Spot model
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
      url: 'https://example.com/AppAcademyHome.jpg',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://example.com/MountainViewCottage.jpg',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://example.com/OceanView.jpg',
      preview: true
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
    await queryInterface.bulkDelete('SpotImage', null, {});
  }
};

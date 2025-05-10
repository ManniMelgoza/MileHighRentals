'use strict';

const { User, Spot, SpotImage, Review, ReviewImage } = require('../models'); // If you're using the Spot model
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
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: 'https://example.com/images/image_url1.jpg',
      },
      {
        reviewId: 2,
        url: 'https://example.com/images/image_url2.jpg',
      },
      {
        reviewId: 3,
        url: 'https://example.com/images/image_url3.jpg',
      },
      {
        reviewId: 4,
        url: 'https://example.com/images/image_url4.jpg',
      },
      {
        reviewId: 5,
        url: 'https://example.com/images/image_url1-1.jpg',
      },
      {
        reviewId: 6,
        url: 'https://example.com/images/image_url2-2.jpg',
      },
      {
        reviewId: 7,
        url: 'https://example.com/images/image_url3-3.jpg',
      },
      {
        reviewId: 8,
        url: 'https://example.com/images/image_url4-4.jpg',
      },
      {
        reviewId: 9,
        url: 'https://example.com/images/image_url5-5.jpg',
      },
      {
        reviewId: 10,
        url: 'https://example.com/images/image_url6-6.jpg',
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
      options.tableName = 'ReviewImages';
      await queryInterface.bulkDelete(options, null, {});
    }
  };

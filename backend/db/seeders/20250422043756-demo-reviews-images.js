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
        url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747161956/Whispering_Pines_CottageReview_b7tout.jpg',
      },
      {
        reviewId: 2,
        url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747162075/Creekside_RetreatReview_relffu.jpg',
      },
      {
        reviewId: 3,
        url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747162099/Alpine_CottageReview_pkugie.jpg',
      },
      {
        reviewId: 4,
        url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747163338/PineHavenReview_zc44zi.jpg',
      },
      {
        reviewId: 5,
        url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747163368/VailCreekCabinReview_izl9fz.jpg',
      },
      {
        reviewId: 6,
        url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747162210/BearRidgeHideawayReview_c3j0d2.jpg',
      },
      {
        reviewId: 7,
        url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747162254/SnowcapCottageReview_tox8hy.jpg',
      },
      {
        reviewId: 8,
        url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747162289/LarkspurLookoutReview_lt3gv2.jpg',
      },
      {
        reviewId: 9,
        url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747163223/ElkMeadowEscapeReview_e5ocdd.jpg',
      },
      {
        reviewId: 10,
        url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747163944/ThePineconeCottageReview1_x1hvkr.png',
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

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
   //  const user1 = await User.findOne({ where: { username: 'JohnSmith' } });

   // UNCOMMEND BELOW
   const user1 = await User.findOne({ where: { username: 'Demo-lition' } });
   const user2 = await User.findOne({ where: { username: 'FakeUser1' } });
   const user3 = await User.findOne({ where: { username: 'FakeUser2' } });

   const spot1 = await Spot.findByPk(1);
   const spot2 = await Spot.findByPk(2);
   const spot3 = await Spot.findByPk(3);

      await Review.bulkCreate([
        {
          userId: 1,
          spotId: 1,
          review: 'Peaceful retreat surrounded by nature.',
          stars: 5
        },
        {
          userId: 2,
          spotId: 2,
          review: 'Clean cottage, perfect for a weekend stay.',
          stars: 4
        },
        {
          userId: 3,
          spotId: 3,
          review: 'Lovely views but too cold at night.',
          stars: 3
        },
        {
          userId: 4,
          spotId: 4,
          review: 'Everything was perfect. Would stay again!',
          stars: 5
        },
        {
          userId: 5,
          spotId: 5,
          review: 'Small but cozy, great hiking nearby.',
          stars: 4
        },
        {
          userId: 6,
          spotId: 6,
          review: 'Not very clean and quite noisy.',
          stars: 2
        },
        {
          userId: 7,
          spotId: 7,
          review: 'Nice decor and well-stocked kitchen.',
          stars: 4
        },
        {
          userId: 8,
          spotId: 8,
          review: 'Too remote, hard to find at night.',
          stars: 2
        },
        {
          userId: 9,
          spotId: 9,
          review: 'Beautiful sunrise view from the porch.',
          stars: 5
        },
        {
          userId: 10,
          spotId: 10,
          review: 'Decent place but overpriced.',
          stars: 3
        }
    ], { validate: true });
  },
    async down (queryInterface, Sequelize) {
      /**
       * Add commands to revert seed here.
       *
       * Example:
       * await queryInterface.bulkDelete('People', null, {});
       *
       */
      options.tableName = 'Reviews';
      await queryInterface.bulkDelete(options, null, {});
    }
  };

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
          userId: user1.id,
          spotId: spot1.id,
          review: 'Great place to study hard and learn',
          stars: 4
        },
        {
          userId: user1.id,
          spotId: spot2.id,
          review: 'Great place',
          stars: 3
        },
        {
          userId: user1.id,
          spotId: spot3.id,
          review: 'Great place grow',
          stars: 2
        },
        {
          userId: user2.id,
          spotId: spot1.id,
          review: 'A lot of great open spaces',
          stars: 1
        },
        {
          userId: user2.id,
          spotId: spot2.id,
          review: 'The views of the mountains are breathtaking',
          stars: 3
        },
        {
          userId: user3.id,
          spotId: spot3.id,
          review: 'Amazing beach access, but needs cosmetic work',
          stars: 2
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
      options.tableName = 'Users';
      await queryInterface.bulkDelete('Reviews', null, {});
    }
  };

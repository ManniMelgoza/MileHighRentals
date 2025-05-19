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
  //  const user1 = await User.findOne({ where: { username: 'Demo-lition' } });
  //  const user2 = await User.findOne({ where: { username: 'FakeUser1' } });
  //  const user3 = await User.findOne({ where: { username: 'FakeUser2' } });

  //  const spot1 = await Spot.findByPk(1);
  //  const spot2 = await Spot.findByPk(2);
  //  const spot3 = await Spot.findByPk(3);

      await Review.bulkCreate([
        // {
        //   userId: 1,
        //   spotId: 1,
        //   review: "Absolutely magical! The cottage is tucked away right next to Rocky Mountain National Park, and waking up to the view of towering pines was surreal. Cozy, quiet, and full of charm. Can’t wait to return!",
        //   stars: 4
        // },
        {
          userId: 2,
          spotId: 2,
          review: "The sound of the creek outside was so soothing, and the location was ideal for hitting the slopes! It had that warm, cabin-in-the-woods feel with all the modern comforts we needed. A perfect winter escape.",
          stars: 4
        },
        {
          userId: 3,
          spotId: 3,
          review: "We were blown away by the views of the San Juan Mountains. The cottage was spotless, peaceful, and perfectly positioned for exploring the area. A serene retreat to recharge.",
          stars: 3
        },
        {
          userId: 4,
          spotId: 4,
          review: "A nature lover’s dream! Nestled among tall pines and surrounded by trails, it felt like a private hideaway. Rustic and charming, though cell service was a bit spotty—still, a great unplugged experience.",
          stars: 5
        },
        {
          userId: 5,
          spotId: 5,
          review: "Ski-in, hot tub, and a designer interior? Say no more! This cabin was luxury meets nature. We skied right to the door and soaked in the tub under the stars. Worth every penny.",
          stars: 4
        },
        {
          userId: 6,
          spotId: 6,
          review: "The perfect blend of elegance and mountain charm. It’s quiet, stylish, and surrounded by forest. We especially loved the wood-burning fireplace and the sense of seclusion.",
          stars: 3
        },
        {
          userId: 7,
          spotId: 7,
          review: "Straight out of a fairy tale! The cottage is adorable and fully equipped, with hiking trails right outside. It’s equally perfect for a cozy winter stay or summer mountain adventures.",
          stars: 4
        },
        {
          userId: 8,
          spotId: 8,
          review: "Bright, sunny, and secluded! We enjoyed breakfast with a view of the lake and loved the fresh mountain air. It’s a bit off the beaten path, but that’s part of its charm.",
          stars: 3
        },
        {
          userId: 9,
          spotId: 9,
          review: "An incredible value! The wooden cabin was super cozy, and being close to the hot springs was a huge bonus. We spent nights stargazing on the porch—pure relaxation.",
          stars: 5
        },
        {
          userId: 10,
          spotId: 10,
          review: "Quiet, remote, and incredibly peaceful. This spot is ideal for a solo writing retreat or a couple's getaway. Nothing fancy, but the stillness and solitude were priceless.",
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

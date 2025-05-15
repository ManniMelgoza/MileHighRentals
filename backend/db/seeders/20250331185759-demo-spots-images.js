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
    // TODO JUST GET URL FROM SITE
    {
      spotId: 1,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155180/WhisperingPinesCottage3_nmoaml.jpg',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155182/WhisperingPinesCottage5_ujrnt8.jpg',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155181/WhisperingPinesCottage4_vslwbf.jpg',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155179/WhisperingPinesCottage2_h57z4w.jpg',
      preview: false
    },
    {
      spotId: 1,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155181/WhisperingPinesCottage1_jnjcn9.jpg',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747154829/CreeksideRetreat2_bym0lu.jpg',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747154830/CreeksideRetreat3_fwwci2.jpg',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747154831/CreeksideRetreat1_fpxytf.jpg',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747154826/CreeksideRetreat5_ce2e3n.jpg',
      preview: false
    },
    {
      spotId: 2,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747154824/CreeksideRetreat4_ygbxot.jpg',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747154809/AlpineCottage1_syswmr.jpg',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747154807/AlpineCottage5_goyuy7.jpg',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747154813/AlpineCottage2_krdf2d.jpg',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747154811/AlpineCottage3_xdv2oq.jpg',
      preview: false
    },
    {
      spotId: 3,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747154807/AlpineCottage4_cb7cav.jpg',
      preview: false
    },
    {
      spotId: 4,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155157/PineHeaven2_pgyrrm.jpg',
      preview: true
    },
    {
      spotId: 4,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155157/PineHeaven4_kf0zp6.jpg',
      preview: false
    },
    {
      spotId: 4,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155158/PineHeaven3_lovg4v.jpg',
      preview: false
    },
    {
      spotId: 4,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155158/PineHeaven5_wpmycn.jpg',
      preview: false
    },
    {
      spotId: 4,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155156/PineHeaven1_ppoqqd.jpg',
      preview: false
    },
    {
      spotId: 5,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155172/VailCreekCabin1_vo8kpn.jpg',
      preview: true
    },
    {
      spotId: 5,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155177/VailCreekCabin5_t6594y.jpg',
      preview: false
    },
    {
      spotId: 5,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155176/VailCreekCabin4_kwdyng.jpg',
      preview: false
    },
    {
      spotId: 5,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155173/VailCreekCabin2_ecdeom.jpg',
      preview: false
    },
    {
      spotId: 5,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155174/VailCreekCabin3_f4g8dc.jpg',
      preview: false
    },
    {
      spotId: 6,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747154818/BearRidgeHideway1_j4mzzw.jpg',
      preview: true
    },
    {
      spotId: 6,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747154820/BearRidgeHideway4_wzm9ii.jpg',
      preview: false
    },
    {
      spotId: 6,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747154815/BearRidgeHideway2_ghppcd.jpg',
      preview: false
    },
    {
      spotId: 6,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747154822/BearRidgeHideway5_gvt7eq.jpg',
      preview: false
    },
    {
      spotId: 6,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747154816/BearRidgeHideway3_mcxhbc.jpg',
      preview: false
    },
    {
      spotId: 7,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155161/SnowcapCottage6_ycooug.jpg',
      preview: true
    },
    {
      spotId: 7,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155158/SnowcapCottage5_zu6ioh.jpg',
      preview: false
    },
    {
      spotId: 7,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155163/SnowcapCottage1_slxh6f.png',
      preview: false
    },
    {
      spotId: 7,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155162/SnowcapCottage2_cfyjot.jpg',
      preview: false
    },
    {
      spotId: 7,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155159/SnowcapCottage4_c8fnmb.jpg',
      preview: false
    },
    {
      spotId: 8,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155154/LarkspurLookout1-1_gqn6lq.jpg',
      preview: true
    },
    {
      spotId: 8,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155152/LarkspurLookout5_krkx8e.jpg',
      preview: false
    },
    {
      spotId: 8,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155155/LarkspurLookout3_xmwv84.jpg',
      preview: false
    },
    {
      spotId: 8,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155154/LarkspurLookout4_waqbk2.jpg',
      preview: false
    },
    {
      spotId: 8,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155158/LarkspurLookout2_ssou1n.jpg',
      preview: false
    },
    {
      spotId: 9,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747154386/ElkMeadowEscape1_s8cj2v.jpg',
      preview: true
    },
    {
      spotId: 9,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747154761/ElkMeadowEscape3_xdwduq.jpg',
      preview: false
    },
    {
      spotId: 9,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747154761/ElkMeadowEscape5_o8ofz0.jpg',
      preview: false
    },
    {
      spotId: 9,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747154762/ElkMeadowEscape4_odupab.jpg',
      preview: false
    },
    {
      spotId: 9,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747154764/ElkMeadowEscape2_bei5k3.jpg',
      preview: false
    },
    {
      spotId: 10,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155171/ThePineconeCottage11_m1ahtt.jpg',
      preview: true
    },
    {
      spotId: 10,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155164/ThePineconeCottage8_lkimzo.jpg',
      preview: false
    },
    {
      spotId: 10,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155168/ThePineconeCottage7_sqpaej.jpg',
      preview: false
    },
    {
      spotId: 10,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155165/ThePineconeCottage1_nqwfij.jpg',
      preview: false
    },
    {
      spotId: 10,
      url: 'https://res.cloudinary.com/dnfeiduuu/image/upload/v1747155166/ThePineconeCottage2_j9rq9l.jpg',
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

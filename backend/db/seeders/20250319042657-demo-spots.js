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
        address: "125 Aspen Hollow Rd",
        city: "Estes Park",
        state: "Colorado",
        country: "United States of America",
        lat: 40.3772,
        lng: -105.5217,
        name: "Whispering Pines Cottage",
        description: "Charming cottage nestled at the edge of Rocky Mountain National Park with stunning pine views.",
        price: 275.00,
      },
      {
        ownerId: 2,
        address: "88 Willow Creek Trail",
        city: "Breckenridge",
        state: "Colorado",
        country: "United States of America",
        lat: 39.4817,
        lng: -106.0384,
        name: "Creekside Retreat",
        description: "Cozy mountain escape next to a bubbling creek, perfect for ski season getaways.",
        price: 325.00,
      },
      {
        ownerId: 3,
        address: "742 Sunset Pass Ln",
        city: "Telluride",
        state: "Colorado",
        country: "United States of America",
        lat: 37.9375,
        lng: -107.8123,
        name: "Alpine Cottage",
        description: "A peaceful cottage with panoramic views of the San Juan Mountains.",
        price: 310.00,
      },
      {
        ownerId: 4,
        address: "44 Timberline Loop",
        city: "Durango",
        state: "Colorado",
        country: "United States of America",
        lat: 37.2753,
        lng: -107.8801,
        name: "Pine Haven",
        description: "Escape to this log-style cottage surrounded by towering pines and endless trails.",
        price: 260.00,
      },
      {
        ownerId: 5,
        address: "913 Foxglove Way",
        city: "Vail",
        state: "Colorado",
        country: "United States of America",
        lat: 39.6403,
        lng: -106.3742,
        name: "Vail Creek Cabin",
        description: "Stylish mountain cottage with ski-in access and a private hot tub.",
        price: 550.00,
      },
      {
        ownerId: 6,
        address: "392 Bear Ridge Rd",
        city: "Aspen",
        state: "Colorado",
        country: "United States of America",
        lat: 39.1911,
        lng: -106.8175,
        name: "Bear Ridge Hideaway",
        description: "Elegant yet rustic, this cottage is tucked away in the serene forests of Aspen.",
        price: 400.00,
      },
      {
        ownerId: 7,
        address: "58 Snowcap Dr",
        city: "Crested Butte",
        state: "Colorado",
        country: "United States of America",
        lat: 38.8697,
        lng: -106.9878,
        name: "Snowcap Cottage",
        description: "Storybook-style mountain home ideal for snowy winter escapes or summer hikes.",
        price: 290.00,
      },
      {
        ownerId: 8,
        address: "205 Larkspur Lane",
        city: "Frisco",
        state: "Colorado",
        country: "United States of America",
        lat: 39.5744,
        lng: -106.0975,
        name: "Larkspur Lookout",
        description: "Sunny and secluded cottage with lake views and mountain breezes.",
        price: 440.00,
      },
      {
        ownerId: 9,
        address: "811 Elk Meadow Rd",
        city: "Pagosa Springs",
        state: "Colorado",
        country: "United States of America",
        lat: 37.2695,
        lng: -107.0098,
        name: "Elk Meadow Escape",
        description: "Charming wooden retreat near hot springs, perfect for relaxing and stargazing.",
        price: 65.00,
      },
      {
        ownerId: 10,
        address: "137 Pinecone Path",
        city: "Nederland",
        state: "Colorado",
        country: "United States of America",
        lat: 39.9619,
        lng: -105.5100,
        name: "The Pinecone Cottage",
        description: "Remote and quiet, this mountain haven is perfect for couples and solo adventurers.",
        price: 125.00,
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

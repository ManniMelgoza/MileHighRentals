'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/database.js')[env];
const db = {};
// const { Model, Validator } = require('sequelize');

const {
  Model
 } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /*
    # The A.hasOne(B) association means that a One-To-One relationship exists between A and B,
      with the foreign key being defined in the target model (B).

    # The A.belongsTo(B) association means that a One-To-One relationship exists
      between A and B, with the foreign key being defined in the source model (A).

    # The A.hasMany(B) association means that a One-To-Many relationship exists
      between A and B, with the foreign key being defined in the target model (B).

    */
    static associate(models) {
      // define association here
        Spot.belongsTo(models.User, {
          foreignKey: 'ownerId',
          as: 'Owner',
          onDelete: 'CASCADE'
        });

        Spot.hasMany(
        models.SpotImage,
        {
          foreignKey: "spotId",
          onDelete: 'CASCADE',
          // hooks: true,
        });
      // - Spot has many Reviews through spotId
        Spot.hasMany(
        models.Review,
        {
          foreignKey: "spotId",
          onDelete: 'CASCADE',
          // hooks: true,
        });
  //  - Spot has many Bookings through spotId
      // Spot.hasMany(
      //   models.Booking,
      // {
      //   foreignKey: "spotId",
      //   onDelete: 'CASCADE',
        // hooks: true,
      // });
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      {
        notEmpty: true,
        len: [1, 255],
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      {
        notEmpty: true,
        len: [1, 100],
      }
    },
    state: {
     type: DataTypes.STRING,
     allowNull: false,
     validate:
     {
       notEmpty: true,
       len: [1, 100],
     }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      {
        notEmpty: true,
        len: [1, 100],
      }
     },
    lat: {
    type: DataTypes.DECIMAL(10,7),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: -90,
      max: 90
    }
    },
    lng: {
      type: DataTypes.DECIMAL(10,7),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: -180,
        max: 180
    }
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate:
      {
        notEmpty: true,
        len: [1, 50]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate:
      {
        notEmpty: true,
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
      isDecimal: true,
      min: 1
      }
    },
    // avgRating: {
    //   type: DataTypes.FLOAT,
    //   allowNull: false,
    //   validate: {
    //     isNumeric: true,
    //     min: 1.0,
    //     max: 5.0
    //   }
    // },
    // previewImage:{
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate:{
    //   // don't allow empty strings
    //   notEmpty: true,
    //   isUrl: true
      // }
    // },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};

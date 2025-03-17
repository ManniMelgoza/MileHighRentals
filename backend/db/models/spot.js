'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../../config/database.js')[env];
// const db = {};

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
    static associate(models) {
      // define association here
  //     Spot.belongsTo(
  //       models.User,
  //       {
  //         as: "Owner",
  //         foreignKey: 'ownerId',
  //         onDelete: 'CASCADE',
  //         hooks: true
  //       }
  //     )
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate: {

      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      {
        // don't allow empty strings
        notEmpty: true,
        len: [5, 100]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      {
        // don't allow empty strings
        notEmpty: true,
        len: [2, 100]
      }
    },
    state: {
     type: DataTypes.STRING,
     allowNull: false,
     validate:
     {
       // don't allow empty strings
       notEmpty: true,
       len: [2, 100]
     }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      {
        // don't allow empty strings
        notEmpty: true,
        len: [2, 100]
      }
     },
    lat: {
    type: DataTypes.DECIMAL(10,7),
    allowNull: false,
    validate: {
      // will only allow numbers
      isNumeric: true,
      // checks for any numbers
      isFloat: true,
      min: -90,
      max: 90
    }
    },
    lng: {
      type: DataTypes.DECIMAL(10,7),
      allowNull: false,
      validate: {
        // will only allow numbers
        isNumeric: true,
        // checks for any numbers
        isFloat: true,
        min: -180,
        max: 180
    }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      {
        // don't allow empty strings
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:
      {
        // don't allow empty strings
        notEmpty: true,
        len: [10, 500]
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
      // will only allow numbers
      isNumeric: true,
      // checks for any numbers
      isFloat: true,
      min: 1,
      max: 100000,
      }
    },
    avgRating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        isNumeric: true,
        min: 1.0,
        max: 5.0
      }
    },
    previewImage:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
      // don't allow empty strings
      notEmpty: true,
      isUrl: true
      }
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};

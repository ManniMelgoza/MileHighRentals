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
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(
        models.Spot,
        {
          foreignKey: "spotId",
          onDelete: 'CASCADE'
        });
      Review.belongsTo(
        models.User,
        {
          foreignKey: "userId",
          onDelete: 'CASCADE'
        });
      Review.hasMany(
        models.ReviewImage,
        {
          foreignKey: 'reviewId',
          onDelete: 'CASCADE'
        });
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
       notEmpty: true
      }
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
        isInt: true,
      }
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};

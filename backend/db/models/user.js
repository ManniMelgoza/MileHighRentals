'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

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
      User.hasMany(models.Spot, {
        foreignKey: 'ownerId',
        onDelete: 'CASCADE',
        // hooks: true,
      });
      // - User has many Reviews through userId with cascade delete
      User.hasMany(models.Review, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        // hooks: true,
      });
      // - User has many Bookings through userId with cascade delete
      // User.hasMany(models.Booking, {
      //   foreignKey: 'userId',
      //   onDelete: 'CASCADE',
      //   // hooks: true,
      // });
    }
  }

  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error('Cannot be an email.');
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          // legnth of email
          len: [3, 256],
          isEmail: true,
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          // hard 60 characters needed
          len: [60, 60],
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: {
          // ths is what wont be sended to the user with any of our responses
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
        },
      },
      /*
      scopes: {
        currentUser: {
          attributes: { exclude: ['hashedPassword'} }
        },
        loginYser: {
          attributes: {}
        }
      }
      */
    } // if scopes becomes uncommented for use this curly brace would be needeid to be removed
  );
  return User;
};

'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          // Refrences the Users table
          model: 'Users',
          // id column as the foreign key
          key: 'id'
        },
        // Automatically deletes user when owner is deleted
        onDelete: 'CASCADE'
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lat: {
        type: Sequelize.DECIMAL(10,7),
        allowNull: false,
      },
      lng: {
        type: Sequelize.DECIMAL(10,7),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        // type: Sequelize.STRING,
        type: Sequelize.TEXT,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      // avgRating: {
      //   type: Sequelize.FLOAT,
      //   allowNull: true
      // },
      previewImage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
//   async down(queryInterface, Sequelize) {
//     await queryInterface.dropTable('Spots');
//   }
// };

async down(queryInterface, Sequelize) {
  // options.property = tablename
  options.tableName = "Spots";
  // we pass the oprtions obj as the first arg instead of a str of the table name
  return queryInterface.dropTable(options);
}
};

// backend/config/database.js
const config = require('./index');

module.exports = {
  development: {
    // where to look for the database
    storage: config.dbFile,
    //what type of db connecting to
    dialect: "sqlite",
    //what seeder files have being raned
    seederStorage: "sequelize",
    //log values as paramaters if not it will be loged with $1 ect
    logQueryParameters: true,
    // makes sure that the items that are being added to the bd are of the same type from the
    typeValidation: true
  },
  production: {
    use_env_variable: 'DATABASE_URL', //render will use this later on
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    define: {
      schema: process.env.SCHEMA
    }
  }
};

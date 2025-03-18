const { sequelize } = require('./db/models');

// particular part of the database that will be use for this project
// To allow use the schema
// schema partion parts of our database to make multiple database in one database

sequelize.showAllSchemas({ logging: false }).then(async (data) => {
  if (!data.includes(process.env.SCHEMA)) {
    await sequelize.createSchema(process.env.SCHEMA);
  }
});

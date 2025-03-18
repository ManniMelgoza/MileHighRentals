// backend/config/index.js
// This file will help other files in this project to access any info in env file
module.exports = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000,
  dbFile: process.env.DB_FILE,
  // obj importing
  jwtConfig: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN
  }
};

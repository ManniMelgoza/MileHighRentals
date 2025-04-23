// backend/routes/api/users.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
//   // THIS WILL BE USED IN ANY ROUTER FILE THAT NEED PROTECTION FROM USERS THAT ARE NOT YET LOGGED IN (POST, PATH, DELETE)
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { OP, where } = require('sequelize')


const router = express.Router();

// check for email format and check username with char 8 char long, check passwoord
//
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .notEmpty()
      .withMessage("Invalid email"),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .notEmpty()
      .withMessage("Username is required"),
    // check('username')
    //   .not()
    //   .isEmail()
    //   .notEmpty()
    //   .withMessage('Username cannot be an email.'),
    check('firstName')
      .notEmpty()
      .withMessage("First Name is required"),
    check('lastName')
      .notEmpty()
      .withMessage("Last Name is required"),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

// sign up route
// POST /api/users
router.post(
  // '',
  '/',
    validateSignup,
    async (req, res) => {
      const { email, password, username, firstName, lastName } = req.body;

      // Check if user exist

      const existingEmail = await User.findOne({
        where: { email }
      });

      const existingUsername = await User.findOne({
        where: { username }
      });

      if(existingEmail || existingUsername) {
        const existingUserErrorMessage = {
          message: "User already exists",
          errors: {}
        };
        // (email from the database extraction === the email trying to be added to the database)
        if (existingEmail && existingEmail.email === email) {
          // if (existingEmail.email === email) {
          // need to dot into the obj to add message to the errors obj nested in the obj existingUserErrorMessage
          existingUserErrorMessage.errors.email = "User with that email already exists";
        };
        // if (existingUsername.username === username) {
        if (existingUsername && existingUsername.username === username) {
          existingUserErrorMessage.errors.username = "User with that username already exists";
        };

        return res.status(500).json(existingUserErrorMessage);
      };

      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ email, username, hashedPassword, firstName, lastName });

      const safeUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        email: user.email,
        username: user.username,
      };

    //   creating the new user a JWT
      await setTokenCookie(res, safeUser);

      return res.status(201).json({
        user: safeUser
      });
    }
  );

module.exports = router;


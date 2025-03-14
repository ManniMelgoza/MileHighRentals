// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

// middleware
const router = express.Router();

// validation
// check properties of the request body
// to learn more google express-validator' to learn more about validation
const validateLogin = [
  // check credention property
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
  // store error message when validation fails
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
    // this will send the errors msg to the validation.js file that holds the middleware
  handleValidationErrors
];


// log in route
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
        // credentials username or password
      const { credential, password } = req.body;

      const user = await User.unscoped().findOne({
        where: {
            // find the infor in data
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });

    //   need to hash password
      if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        // if credentials fail and error will be thrown
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        // provide clear error message, but not to give sensitive info/clues for bad actors
        err.errors = { credential: 'The provided credentials were invalid.' };
        return next(err);
      }

    //   creating an obj
      const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
      };

    //   pass obhect to settoken function
      await setTokenCookie(res, safeUser);
    //   retunr info to user
      return res.json({
        user: safeUser
      });
    }
  );

  // Log out function
  router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
     return res.json({ message: 'success' });
    }
  );

  // Restore session user
  router.get(
    '/',
    (req, res) => {
      // checking if we have a user req obj
      const { user } = req;
      if (user) {
        // found user on the JWT
        const safeUser = {
          id: user.id,
          email: user.email,
          username: user.username,
        };
        return res.json({
          user: safeUser
        });
        // sends back null
      } else return res.json({ user: null });
    }
  );

module.exports = router;

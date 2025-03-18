// backend/routes/api/session.js
const express = require('express');
// sequelize
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
//
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// Helper functions
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

// middleware
const router = express.Router();

// validation
// check properties of the request body
// to learn more google express-validator' to learn more about validation
const validateLogin = [
  // check credention property from the req.body
  // The middleware is sending the errors to the array in the file utlis/validations.js file
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
  // store error message when validation fails
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
    // this will send the errors msg to the validation.js file that holds the middleware
    // you need this validation middleware
  handleValidationErrors
];


// log in route
      // TEST ENDPOINT
        // fetch('/api/session', {
        //   method: 'POST',
        //   headers: {
        //     "Content-Type": "application/json",
        //     "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
        //   },
        //   body: JSON.stringify({ credential: 'Demo-lition', password: 'password' })
        // }).then(res => res.json()).then(data => console.log(data));
router.post(
    '/',
    // this is the express validations array you created above
    validateLogin,
    async (req, res, next) => {
        // credentials username or password
      const { credential, password } = req.body;
      // helps to go around the default scope
      const user = await User.unscoped().findOne({
        where: {
            // find the info in data of either username or email
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

    //   pass obhect to settoken function this generates token
      await setTokenCookie(res, safeUser);
    //   return info to user
      return res.json({
        user: safeUser
      });
    }
  );

  // Log out function
        // TEST CODE for LOG IN
        // fetch('/api/session', {
        //   method: 'POST',
        //   headers: {
        //     "Content-Type": "application/json",
        //     "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
        //   },
        //   body: JSON.stringify({ credential: 'demo@user.io', password: 'password' })
        // }).then(res => res.json()).then(data => console.log(data));

  //  TEST FOR DELETE
// fetch('/api/session', {
//   method: 'DELETE',
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
//   }
// }).then(res => res.json()).then(data => console.log(data));


    router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
     return res.json({ message: 'success' });
    }
  );

  // Restore session user
  // login ussers info
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

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
// research express-validator for further understanding
// check properties of the request body
// to learn more google express-validator' to learn more about validation
const validateLogin = [
  // check credention property from the req.body
  // The middleware is sending the errors to the array in the file utlis/validations.js file
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Email or username is required"),
  check('password')
  // store error message when validation fails
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
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

// Try to login the demo user with the username first.
        // TEST CODE for LOG IN
        // fetch('/api/session', {
        //   method: 'POST',
        //   headers: {
        //     "Content-Type": "application/json",
        //     "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
        //   },
        //   body: JSON.stringify({ credential: 'demo@user.io', password: 'password' })
        // }).then(res => res.json()).then(data => console.log(data));

// Then try to login the demo user with the email next.
        // fetch('/api/session', {
        //   method: 'POST',
        //   headers: {
        //     "Content-Type": "application/json",
        //     "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
        //   },
        //   body: JSON.stringify({ credential: 'demo@user.io', password: 'password' })
        // }).then(res => res.json()).then(data => console.log(data));

// Now test an invalid user credential and password combination.
        // fetch('/api/session', {
        //   method: 'POST',
        //   headers: {
        //     "Content-Type": "application/json",
        //     "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
        //   },
        //   body: JSON.stringify({ credential: 'Demo-lition', password: 'Hello World!' })
        // }).then(res => res.json()).then(data => console.log(data));
//TEST FOR LOGOUT USER
        // fetch('/api/session', {
        //   method: 'DELETE',
        //   headers: {
        //     "Content-Type": "application/json",
        //     "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
        //   }
        // }).then(res => res.json()).then(data => console.log(data));

//  POST /api/session
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
        err.errors = { credential:  "Invalid credentials" };
        return next(err);
      }

    //   creating an obj with data that is safe exlcuding password and sencitive info
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
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

// LOG OUT user
    router.delete(
    '/',
    (_req, res) => {
      // Remove the cookie as token to be romoved
      res.clearCookie('token');
     return res.json({ message: 'success' });
    }
  );

  // Restore session user
  // login ussers info
  // GET /api/session
  router.get(
    '/',
    (req, res) => {
      // checking if we have a user req obj
      const { user } = req;
      if (user) {
        // found user on the JWT
        const safeUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
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

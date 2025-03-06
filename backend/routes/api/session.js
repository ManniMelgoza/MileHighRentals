// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

// middleware
const router = express.Router();

router.post(
    '/',
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

    //   need to hasd password
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


module.exports = router;

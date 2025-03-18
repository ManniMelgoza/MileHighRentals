const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');
// deconstructing
const { secret, expiresIn } = jwtConfig;

// Sends a JWT Cookie used to  log in and sim up users
const setTokenCookie = (res, user) => {
    // Create the token.
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    const token = jwt.sign(
      // payload being passed
      { data: safeUser },
      secret,
      { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie('token', token, {
      maxAge: expiresIn * 1000, // maxAge in milliseconds
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction && "Lax"
    });

    return token;
  };


  const restoreUser = (req, res, next) => {
    // token parsed from cookies
    // deconstructing token
    const { token } = req.cookies;
    req.user = null;

    // ÷user not loged in yet and that token has not being tampered
    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
      // this will help indicate that the user is nnot yet loggedin
      if (err) {

        return next();
      }

    //   try to find user from line 11
      try {
        // find the user
        const { id } = jwtPayload.data;
        // access users log in info with req.user
        req.user = await User.findByPk(id, {
          attributes: {
            // this info is being searched
            include: ['email', 'createdAt', 'updatedAt']
          }
        });
        // if user not found
      } catch (e) {
        // remove user token when user deleted
        res.clearCookie('token');
        return next();
      }

      if (!req.user) res.clearCookie('token');

      return next();
    });
  };

  // THIS WILL BE USED IN ANY ROUTER FILE THAT NEED PROTECTION FROM USERS THAT ARE NOT YET LOGGED IN (POST, PATH, DELETE)
  // If there is no current user, return an error
  const requireAuth = function (req, _res, next) {
    // check if req.user has being defined and go to endpoint being requested
    if (req.user) return next();

    //
    const err = new Error('Authentication required');
    err.title = 'Authentication required';
    err.errors = { message: 'Authentication required' };
    err.status = 401;
    return next(err);
  }

  module.exports = { setTokenCookie, restoreUser, requireAuth };

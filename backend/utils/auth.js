const jwt = require('jsonwebtoken');
//
const { jwtConfig } = require('../config');
const { User } = require('../db/models');
// deconstructing jwtConfig with the data that you need to extract, from .env file?
const { secret, expiresIn } = jwtConfig;

// Sends a JWT Cookie used to  log in and sim up users
const setTokenCookie = (res, user) => {
    // Create the safe token obj
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    const token = jwt.sign(
      // payload being passed
      { data: safeUser },
      secret,
      // This info is coming from the .env file
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
    // incase we need the token for something else we will return the token
    return token;
  };

// RESTORE USER // RESTORE USER// RESTORE USER// RESTORE USER// RESTORE USER// RESTORE USER // RESTORE USER// RESTORE USER// RESTORE USER// RESTORE USER
// RESTORE USER// RESTORE USER// RESTORE USER// RESTORE USER// RESTORE USER// RESTORE USER // RESTORE USER// RESTORE USER// RESTORE USER// RESTORE USER
// GLOBAL MIDDLEWARE

  const restoreUser = (req, res, next) => {
    // token parsed from cookies
    // deconstructing token from obj
    const { token } = req.cookies;
    req.user = null;

    // ÷user not loged in yet and that token has not being tampered via a CB func
    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
      // this will help indicate that the user is not yet loggedin or loged out
      if (err) {
        // allow the request to pass thorugh even though the user might not be logged in
        return next();
      }

    //   try to find user from line 11
      try {
        // find the user by destructuring and obtain data form the obj
        // the id is coming from the safeUser obj from above
        const { id } = jwtPayload.data;
        // access users log in info with req.user and setting it tot he return stuff from data returned
        // this is used when you want to access the users information that is currently loged in
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
      // This will help all request to go throughthe entire applicaiton
      return next();
    });
  };

  // THIS WILL BE USED IN ANY ROUTER FILE THAT NEED PROTECTION FROM USERS THAT ARE NOT YET LOGGED IN (POST, PATH, DELETE)
  // THIS IS NOT GLOBAL MIDDLEWARE
  // If there is no current user, return an error
  // This will be used to inport into routers that need protection
  const requireAuth = function (req, _res, next) {
    // check if req.user has being defined and go to endpoint being requested
    if (req.user) return next();

    const err = new Error('Authentication required');
    err.title = 'Authentication required';
    err.errors = { message: 'Authentication required' };
    err.status = 401;
    return next(err);
  }

  module.exports = { setTokenCookie, restoreUser, requireAuth };

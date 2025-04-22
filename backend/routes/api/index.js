// backend/routes/api/index.js
// All routes will be here like SPOTS, REVIEWS ect...

const router = require('express').Router();

const sessionRouter = require('./session.js');
const spotsRouter = require('./spots.js');
const usersRouter = require('./users.js');
const reviewsRouter = require('./reviews.js');
const { requireAuth } = require('../../utils/auth');

router.get('/test', requireAuth, (req, res) => {
  res.json({ message: 'success' })
})


// Global middleware
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
  // global middleware
  router.use(restoreUser);

  router.use('/session', sessionRouter);
  router.use('/users', usersRouter);
  router.use('/spots', spotsRouter);
  router.use('/reviews', reviewsRouter);


// test end point for mod 5 project for from end testing
// if any issues romove the fuinction word during testing for debugging
  // router.post('/test', function (req, res) => {
  //   res.json({ requestBody: req.body });
  // });

// test end point for mod 5 project for from end testing
  // router.post('/test', (req, res) => {
  //   res.json({ requestBody: req.body });
  // });

// THIS WAS FOR TESTING PURPOSES BELOW // THIS WAS FOR TESTING PURPOSES BELOW // THIS WAS FOR TESTING PURPOSES BELOW
// THIS WAS FOR TESTING PURPOSES BELOW // THIS WAS FOR TESTING PURPOSES BELOW // THIS WAS FOR TESTING PURPOSES BELOW

// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//     const user = await User.findOne({
//         where: { username: 'Demo-lition' }
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });
// });

// const { restoreUser } = require('../../utils/auth');
// router.get('/restore-user', restoreUser, (req, res) => {
//   return res.json(req.user);
// });

//
/*
// const { requireAuth } = require('../../utils/auth');
// router.get('/require-auth', requireAuth, (req, res) => {
//  return res.json(req.user);
// });
*/


module.exports = router;

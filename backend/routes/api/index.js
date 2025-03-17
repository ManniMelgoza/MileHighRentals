// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const spotRouter = require('./spots.js');
const usersRouter = require('./users.js');
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
  // global middleware
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotRouter);

// test end point for mod 5 project
router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;

// backend/routes/index.js
const express = require('express');
const router = express.Router();
// This is comming from the index file inside api index file
const apiRouter = require('./api');

// TESTING START
// backend/routes/index.js

router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

// GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'Demo-lition'
//     }
//   });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });



// Add a XSRF-TOKEN cookie TEST
// spots and routes endpoints will start wtih /api
// setting a cokking with 'XSRF-Token'
router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
  });


// This is comming from the index file inside api index file
// '/api' since its not identify what file to import it goes to the default
router.use('/api', apiRouter);

module.exports = router;

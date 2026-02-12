const express = require('express');
const connectionRouter = express.Router();
const { userAuth } = require('../middlewares/auth');

connectionRouter.post('/sendConnectionrequest', userAuth, async (req, res) => {
  console.log('Request Sent');
  res.send('Connect sent');
});

module.exports = connectionRouter;

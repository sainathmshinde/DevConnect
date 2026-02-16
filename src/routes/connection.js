const express = require('express');
const connectionRouter = express.Router();
const { userAuth } = require('../middlewares/auth');

const ConnectionRequest = require('../models/connectionRequest');

connectionRouter.post(
  '/request/send/:status/:toUserId',
  userAuth,
  async (req, res) => {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    res.json({
      message: 'Connection request sent successfully!',
      data,
    });

    console.log('Request Sent');
    res.send('Connect sent');
  }
);

module.exports = connectionRouter;

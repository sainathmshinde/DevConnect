const express = require('express');
const connectionRouter = express.Router();
const { userAuth } = require('../middlewares/auth');

const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');

connectionRouter.post(
  '/request/send/:status/:toUserId',
  userAuth,
  async (req, res) => {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ['ignored', 'interested'];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: 'Inavalid status',
        status,
      });
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      res.status(400).json({ message: 'User not found!' });
    }

    const existingConnection = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (existingConnection) {
      return res
        .status(400)
        .json({ message: 'Connection request already exist' });
    }

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

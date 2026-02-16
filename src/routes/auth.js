const express = require('express');
const authRouter = express.Router();
const { validateSignupData } = require('../utils/validation');
const bcrypt = require('bcrypt');
const User = require('../models/user');

authRouter.post('/signup', async (req, res) => {
  try {
    //validate signup data
    validateSignupData(req);

    const { firstName, lastName, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    // Creating a new instance of the User Model
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await user.save();
    res.send('User created successfully');
  } catch (error) {
    res.status(400).send('Error saving user: ' + error.message);
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      throw new Error('Email and password required');
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = await user.getJWT();

    res.cookie('token', token, {
      expires: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours
      httpOnly: true, // 🔐 prevents JS access
      secure: false, // true in production (HTTPS)
    });

    res.send('Login Successful!');
  } catch (error) {
    res.status(400).send('Error: ' + error.message);
  }
});

authRouter.post('/logout', async (req, res) => {
  res.cookie('token', null, {
    // or res.clearCookie('token');
    expires: new Date(Date.now()),
  });

  res.send('Logout Successsful!!');

  // or

  // res.cookie('token', null, {
  //   expires: new Date(Date.now()),
  // }).send();
});

module.exports = authRouter;

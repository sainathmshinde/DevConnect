const express = require('express');
const authRouter = express.Router();
const { validateSignupData } = require('../utils/validation');
const bcrypt = require('bcrypt');
const User = require('../models/user');

authRouter.post('/signup', async (req, res) => {
  debugger;
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
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isPasswordValid = await user?.validatePassword(password);
    if (isPasswordValid) {
      const token = await user?.getJWT();
      // res.cookie('token', 'dhfhgfhskfzjfhguadF.hjkcSBD>fbEAdSs');
      res.cookie('token', token, {
        expires: new Date(Date.now() + 1 * 3600000), // cookie will be removed after 8 hours
      });
      res.send('Login Successful!');
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    res.status(400).send('Error : ' + error.message);
  }
});

module.exports = authRouter;

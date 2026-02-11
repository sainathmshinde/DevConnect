require('dotenv').config();
const { validateSignupData } = require('./utils/validation');
const bcrypt = require('bcrypt');
const express = require('express');
const { connectDB } = require('./config/database');
const User = require('./models/user');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { userAuth } = require('./middlewares/auth');

const app = express();

//It is a built-in Express middleware that parses incoming JSON request bodies
// and makes the data available as  : req.body
app.use(express.json());
app.use(cookieParser());

app.post('/signup', async (req, res) => {
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

app.post('/login', async (req, res) => {
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

app.get('/profile', userAuth, async (req, res) => {
  console.log('req', req.user);

  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(400).send('Error : ' + error.message);
  }
});

app.post('/sendConnectionrequest', userAuth, async (req, res) => {
  console.log('Request Sent');
  res.send('Connect sent');
});

connectDB()
  .then(() => {
    console.log('Database connection established');

    app.listen(8080, () => {
      console.log('Server is successfully listening on port 8080...');
    });
  })
  .catch((err) => {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  });

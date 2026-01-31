require('dotenv').config();

const express = require('express');
const { connectDB } = require('./config/database');
const User = require('./models/user');

const app = express();

//It is a built-in Express middleware that parses incoming JSON request bodies
// and makes the data available as  : req.body
app.use(express.json());

app.post('/signup', async (req, res) => {
  // Creating a new instance of the User Model
  const user = new User(req.body);
  try {
    await user.save();
    res.send('User created successfully');
  } catch (error) {
    res.status(400).send('Error saving user: ' + err.message);
  }
});

app.get('/user', async (req, res) => {
  const userEmail = req.body.email;

  try {
    const users = await User.findOne({ email: userEmail });
    if (users.length === 0) {
      res.status(404).send('User not found');
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send('User not found');
  }
});

app.get('/userList', async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send('Users data fetched successfully');
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send('User not found');
  }
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

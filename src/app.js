require('dotenv').config();
const { validateSignupData } = require('./utils/validation');
const bcrypt = require('bcrypt');
const express = require('express');
const { connectDB } = require('./config/database');
const User = require('./models/user');

const app = express();

//It is a built-in Express middleware that parses incoming JSON request bodies
// and makes the data available as  : req.body
app.use(express.json());

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
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send('Login Successful!');
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    res.status(400).send('Error : ' + error.message);
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
      res.status(404).send('Users not found');
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send('User not found');
  }
});

app.get('/userById', async (req, res) => {
  try {
    const userId = req.body.userId;
    // const user = await User.findById({_id : userId}); or
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.status(201).send(user, 'User found successfully');
    }
  } catch (error) {
    res.status(400).send('User not found');
  }
});

// Delete user

app.delete('/user', async (req, res) => {
  try {
    const userId = req.body.userId;
    // const user = await User.findByIdAndDelete({_id : userId}); or
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.status(201).send('User Deleted successfully');
    }
  } catch (error) {
    res.status(400).send('User not found');
  }
});

app.patch('/user/:userId', async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ['photoUrl', 'about', 'gender', 'age', 'skills'];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error('Update not allowed');
    }
    if (data?.skills && data?.skills.length > 10) {
      return res.status(400).send('Maximum 10 skills allowed');
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: 'after', // defaukt is before, now log will return after db update data
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).send('User Update failed:' + error.message);
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

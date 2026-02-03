const mongoose = require('mongoose');

// const {Schema} = mongoose;

// const userSchem = new Schema({
// or

const userSchem = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, // avoid spaces
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    validate(value) {
      if (!['male', 'female', 'others'].includes(value)) {
        throw new Error('Gender not valid');
      }
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  photoUrl: {
    type: String,
  },
  about: {
    type: String,
    default: 'This is default value',
  },
  skills: [String],
});

module.exports = mongoose.model('User', userSchem);

// or

// const User = mongoose.model("User",userSchem);

// module.exports = User;

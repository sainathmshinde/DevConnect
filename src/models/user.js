const mongoose = require('mongoose');

// const {Schema} = mongoose;

// const userSchem = new Schema({
// or

const userSchem = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true, // avoid spaces
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 100,
      validate(value) {
        if (
          !value.match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          )
        ) {
          throw new Error(
            'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
          );
        }
      },
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
      default: 'https://via.placeholder.com/150',
    },
    about: {
      type: String,
      default: 'This is default value',
    },

    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchem);

// or

// const User = mongoose.model("User",userSchem);

// module.exports = User;

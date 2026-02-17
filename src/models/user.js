const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// const {Schema} = mongoose;

// const userSchem = new Schema({
// or

const userSchema = new mongoose.Schema(
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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Enter valid email' + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 100,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error('Enetr Strong Password');
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'others'],
        message: `{VALUE} is not a valid gender type`,
      },
      // validate(value) {
      //   if (!['male', 'female', 'others'].includes(value)) {
      //     throw new Error('Gender not valid');
      //   }
      // },
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
      maxlength: [10, 'Maximum 10 skills allowed'],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this; // this will have the instance of current user

  const token = jwt.sign({ _id: user?._id }, 'Dev@Connect$123', {
    expiresIn: '1d',
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );

  return isPasswordValid;
};

module.exports = mongoose.model('User', userSchema);

// or

// const User = mongoose.model("User",userSchem);

// module.exports = User;

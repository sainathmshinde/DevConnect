const validator = require('validator');

const validateSignupData = (req) => {
  if (!req.body) {
    throw new Error('Request body missing');
  }
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error('Name not valid!');
  } else if (!validator.isEmail(email)) {
    throw new Error('Email not valid');
  } else if (!validator.isStrongPassword(password)) {
    throw new Error('Enters strong valid password');
  }
};

module.exports = { validateSignupData };

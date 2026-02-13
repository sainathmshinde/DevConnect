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

const validateProfileData = (req) => {
  if (!req.body) {
    throw new Error('Please enter valid data');
  }
  const allowedEditFields = [
    'firstName',
    'lastName',
    'age',
    'photoUrl',
    'gender',
    'skills',
    'about',
  ];

  const isAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isAllowed;
};

module.exports = { validateSignupData, validateProfileData };

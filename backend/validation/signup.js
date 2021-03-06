const Validator = require('validator');
const { USER_TYPES, MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } = require('../constants/user-auth-constants');
const { validText, validDate } = require('./validitation-helpers');

module.exports = function validateSignupInput(data) {
  let errors = {};

  data.email = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';
  data.password2 = validText(data.password2) ? data.password2 : '';

  data.name = validText(data.name) ? data.name : '';
  data.birthDate = validDate(data.birthDate) ? new Date(data.birthDate) : null;
  data.accountType = validText(data.accountType) ? data.accountType : '';

  data.email = Validator.escape(data.email);
  data.name = Validator.escape(data.name);
  data.accountType = Validator.escape(data.accountType);

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { 
    min: MIN_PASSWORD_LENGTH, max: MAX_PASSWORD_LENGTH
  })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (!data.birthDate) {
    errors.date = "Birth date is invalid";
  }

  if (!USER_TYPES[data.accountType]) {
    errors.accountType = "Invalid user type";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
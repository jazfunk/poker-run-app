// import env from './env';
import bcrypt from 'bcrypt';

/**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
const isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

/**
   * validatePassword helper method
   * @param {string} password
   * @returns {Boolean} True or False
   */
const validatePassword = (password) => {
  if (password.length <= 5 || password === '') {
    return false;
  } return true;
};
/**
   * isEmpty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const isEmpty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
  if (input.replace(/\s/g, '').length) {
    return false;
  } return true;
};

/**
   * empty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const empty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
};

export {
  isValidEmail,
  validatePassword,
  isEmpty,
  empty
};


// isValidEmail() method uses regex(Regular Expression) in validating user's provided email address.
// Check this guide to learn more about Regex
// validatePassword — This method checks if the length of the password provided by a user at the time of signup or signin is less than or equal to 5 characters.
// isEmpty method checks if any input provided by a user is undefined or empty.
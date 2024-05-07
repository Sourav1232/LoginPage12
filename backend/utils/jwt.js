const jwt = require('jsonwebtoken');
const config = require('../config');

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };

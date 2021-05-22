const jwt = require('jsonwebtoken');

const { SECRET } = require('../config/keys');

const generateToken = user => {
  return jwt.sign({ user }, SECRET, { expiresIn: '7d' });
};

const verifyToken = token => {
  return jwt.verify(token, SECRET);
};

module.exports = { generateToken, verifyToken };

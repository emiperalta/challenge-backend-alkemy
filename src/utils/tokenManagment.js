const jwt = require('jsonwebtoken');

const { SECRET } = require('../config/keys');

const generateToken = user => {
  return jwt.sign({ user }, SECRET, { expiresIn: '7d' });
};

module.exports = { generateToken };

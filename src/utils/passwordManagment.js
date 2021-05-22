const bcrypt = require('bcryptjs');

const hashPassword = async password => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

module.exports = { hashPassword, comparePassword };

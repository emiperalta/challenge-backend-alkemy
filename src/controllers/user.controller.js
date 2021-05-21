const bcrypt = require('bcryptjs');

const { User } = require('../database');

const login = (req, res) => {
  res.status(200).json({ message: 'login endpoint' });
};

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await User.create({
      username,
      email,
      password: password ? await bcrypt.hash(req.body.password, 10) : '',
    });
    res.status(201).json(newUser);
  } catch (error) {
    //TODO: handle the error appropriately
    console.error({ error });
  }
};

module.exports = { login, register };

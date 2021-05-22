const { errorHandler } = require('../utils/errorHandler');
const { generateToken } = require('../utils/tokenManagment');
const { comparePassword, hashPassword } = require('../utils/passwordManagment');
const { sendEmail } = require('../utils/emailManagment');

const { User } = require('../database');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'email/password must not be empty' });
    }
    const user = await User.findOne({ where: { email } });
    const correctPassword = !user
      ? false
      : await comparePassword(password, user.password);
    if (correctPassword) {
      const token = generateToken(user.id);
      return res.status(200).json({ token });
    }
    res.status(400).json({ error: 'incorrect email or password' });
  } catch (err) {
    console.log(err);
  }
};

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await User.create({
      username,
      email,
      password: password ? await hashPassword(req.body.password) : '',
    });
    sendEmail(newUser.email);
    res.status(201).json(newUser);
  } catch (err) {
    const error = errorHandler(err);
    res.status(400).json({ error });
  }
};

module.exports = { login, register };

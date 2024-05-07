const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' });
};

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    const token = generateToken(user);
    res.json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while registering user', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = generateToken(user);
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while logging in', error: error.message });
  }
};

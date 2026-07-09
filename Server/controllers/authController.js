const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'aqibuddy_jwt_secret_key_123456789_secure', {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {

    console.log(req.body);

    const { name, email, state, city, password, confirm_password } = req.body;

    if (!name || !email || !city || !password) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user (confirm_password will NOT be stored as it's not defined in the UserSchema)
    const user = await User.create({
      name,
      email,
      state: state || '',
      city,
      password,
    });

    if (user) {
      res.status(201).json({
        token: generateToken(user._id),
        id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        state: user.state,
        city: user.city,
        Threshold: user.Threshold,
        journalEntries: user.journalEntries,
        cityList: user.cityList,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter email and password' });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // Validate password using instance method on user document
    if (user && (await user.comparePassword(password))) {
      res.json({
        token: generateToken(user._id),
        id: user._id,
        _id: user._id,
        name: user.name,
        email: user.email,
        state: user.state,
        city: user.city,
        Threshold: user.Threshold,
        journalEntries: user.journalEntries,
        cityList: user.cityList,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};

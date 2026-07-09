const User = require('../models/User');

// @desc    Get all users (json-server compatibility for client-side lookup)
// @route   GET /users
// @access  Public
const getAllUsers = async (req, res) => {
  try {
    // Select all fields except password
    const users = await User.find({}).select('-password');
    
    // Add virtual id mapped from _id for compatibility
    const reshapedUsers = users.map(user => {
      const uObj = user.toObject();
      uObj.id = uObj._id.toString();
      return uObj;
    });

    res.json(reshapedUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving users' });
  }
};

// @desc    Get single user by ID
// @route   GET /users/:id
// @access  Public
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const uObj = user.toObject();
    uObj.id = uObj._id.toString();

    res.json(uObj);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving user' });
  }
};

// @desc    Create new user (json-server registration compatibility)
// @route   POST /users
// @access  Public
const createUser = async (req, res) => {
  try {
    const { name, email, state, city, password, confirm_password } = req.body;

    if (!name || !email || !city || !password) {
      return res.status(400).json({ message: 'Please enter all required fields' });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // create user
    const user = await User.create({
      name,
      email,
      state: state || '',
      city,
      password, // Mongoose hook automatically hashes this
    });

    if (user) {
      const uObj = user.toObject();
      delete uObj.password;
      uObj.id = uObj._id.toString();
      res.status(201).json(uObj);
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating user' });
  }
};

// @desc    Update user by ID
// @route   PATCH /users/:id
// @access  Public
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if password update is requested
    if (req.body.password) {
      if (!req.body.currentPassword) {
        return res.status(400).json({ message: 'Current password is required' });
      }

      const isMatch = await user.comparePassword(req.body.currentPassword);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
    }

    const updateKeys = Object.keys(req.body);
    
    // Copy properties, ignoring id metadata, currentPassword, and confirm_password
    updateKeys.forEach((key) => {
      if (
        key !== 'id' &&
        key !== '_id' &&
        key !== 'confirm_password' &&
        key !== 'currentPassword'
      ) {
        user[key] = req.body[key];
      }
    });

    // Save user. If password key is updated, the pre-save hook will hash it.
    const updatedUser = await user.save();

    const uObj = updatedUser.toObject();
    delete uObj.password;
    uObj.id = uObj._id.toString();

    res.json(uObj);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating user' });
  }
};

// @desc    Delete user by ID
// @route   DELETE /users/:id
// @access  Public
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error deleting user' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

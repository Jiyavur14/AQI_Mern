const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

// Map compatibility routes to userController
router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/:id')
  .get(protect, getUserById)
  .patch(protect, updateUser)
  .delete(protect, deleteUser);

module.exports = router;

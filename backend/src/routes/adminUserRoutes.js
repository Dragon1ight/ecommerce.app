const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware'); // Assuming you have these

// Protect all admin routes and ensure user is an admin
router.use(protect);
router.use(authorize('admin'));

router.route('/')
  .get(userController.getUsers) // List all users (Admin)
  .post(userController.registerUser); // Create new user (Admin)

router.route('/:id')
  .get(userController.getUserById) // Get user by ID (Admin)
  .put(userController.updateUser) // Update user (Admin)
  .delete(userController.deleteUser); // Delete user (Admin)

module.exports = router; 
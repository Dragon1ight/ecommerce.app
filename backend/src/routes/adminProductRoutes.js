const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Protect all admin routes and ensure user is an admin
router.use(protect);
router.use(authorize('admin'));

router.route('/')
  .get(productController.getProducts) // List all products (Admin)
  .post(productController.createProduct); // Create new product (Admin)

router.route('/:id')
  .get(productController.getProductById) // Get product by ID (Admin)
  .put(productController.updateProduct) // Update product (Admin)
  .delete(productController.deleteProduct); // Delete product (Admin)

module.exports = router; 
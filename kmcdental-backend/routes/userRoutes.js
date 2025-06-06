const express = require('express');
const router = express.Router();
const { protect, dentist } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// Register a new user
router.post('/register', userController.registerUser);

// Login user
router.post('/login', userController.loginUser);

// Get user profile (protected route)
router.get('/profile', protect, userController.getUserProfile);

// Get all dentists
router.get('/dentists', userController.getDentists);

// Get patients for a dentist
router.get('/dentist/patients', protect, dentist, userController.getDentistPatients);

module.exports = router;
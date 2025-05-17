const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');
const { protect, dentist } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Create a new consultation with image uploads
router.post('/', protect, upload.array('images', 3), consultationController.createConsultation);

// Get user's consultations
router.get('/', protect, consultationController.getUserConsultations);

// Get consultations for dentist review
router.get('/dentist', protect, dentist, consultationController.getDentistConsultations);

// Update consultation with dentist feedback
router.put('/:id', protect, dentist, consultationController.updateConsultation);

module.exports = router;
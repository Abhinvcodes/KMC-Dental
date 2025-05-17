const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { protect, dentist } = require('../middleware/authMiddleware');

// Create a new appointment
router.post('/', protect, appointmentController.createAppointment);

// Get user's appointments
router.get('/', protect, appointmentController.getUserAppointments);

// Get dentist's appointments
router.get('/dentist', protect, dentist, appointmentController.getDentistAppointments);

// Update appointment status
router.put('/:id', protect, appointmentController.updateAppointment);

// Process payment for appointment
router.post('/:id/payment', protect, appointmentController.processPayment);

module.exports = router;
const { Appointment, User } = require('../models');
const { Op } = require('sequelize');

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Private
exports.createAppointment = async (req, res) => {
    try {
        const { dentistId, appointmentDate, reason } = req.body;

        // Check if dentist exists
        const dentist = await User.findOne({
            where: { id: dentistId, isDentist: true }
        });

        if (!dentist) {
            return res.status(404).json({ message: 'Dentist not found' });
        }

        const appointment = await Appointment.create({
            userId: req.user.id,
            dentistId,
            appointmentDate,
            reason,
            status: 'scheduled',
            paymentStatus: 'pending'
        });

        res.status(201).json(appointment);
    } catch (error) {
        console.error('Create appointment error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all appointments for a user
// @route   GET /api/appointments
// @access  Private
exports.getUserAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll({
            where: { userId: req.user.id },
            include: [
                {
                    model: User,
                    as: 'Dentist',
                    attributes: ['id', 'name', 'email', 'specialization']
                }
            ],
            order: [['appointmentDate', 'DESC']]
        });

        res.json(appointments);
    } catch (error) {
        console.error('Get appointments error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all appointments for a dentist
// @route   GET /api/appointments/dentist
// @access  Private/Dentist
exports.getDentistAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll({
            where: { dentistId: req.user.id },
            include: [
                {
                    model: User,
                    attributes: ['id', 'name', 'email', 'phoneNumber']
                }
            ],
            order: [['appointmentDate', 'DESC']]
        });

        res.json(appointments);
    } catch (error) {
        console.error('Get dentist appointments error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private
exports.updateAppointment = async (req, res) => {
    try {
        const { status } = req.body;

        const appointment = await Appointment.findByPk(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Check authorization
        if (appointment.userId !== req.user.id &&
            appointment.dentistId !== req.user.id &&
            !req.user.isAdmin) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        appointment.status = status || appointment.status;

        await appointment.save();

        res.json(appointment);
    } catch (error) {
        console.error('Update appointment error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Process payment for appointment
// @route   POST /api/appointments/:id/payment
// @access  Private
exports.processPayment = async (req, res) => {
    try {
        const { paymentDetails } = req.body;

        const appointment = await Appointment.findByPk(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        if (appointment.userId !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        appointment.paymentStatus = 'completed';
        appointment.paymentDetails = paymentDetails;

        await appointment.save();

        res.json({
            success: true,
            message: 'Payment processed successfully',
            appointment
        });
    } catch (error) {
        console.error('Payment processing error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
const { Consultation, User } = require('../models');

// @desc    Create a new consultation
// @route   POST /api/consultations
// @access  Private
exports.createConsultation = async (req, res) => {
    try {
        const { name, email, phone, dob, comments } = req.body;

        // Get file paths for uploaded images
        const imagePaths = req.files ? req.files.map(file => file.path) : [];

        const consultation = await Consultation.create({
            userId: req.user.id,
            name,
            email,
            phone,
            dob,
            comments,
            images: imagePaths,
            status: 'pending'
        });

        res.status(201).json(consultation);
    } catch (error) {
        console.error('Create consultation error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all consultations for a user
// @route   GET /api/consultations
// @access  Private
exports.getUserConsultations = async (req, res) => {
    try {
        const consultations = await Consultation.findAll({
            where: { userId: req.user.id },
            order: [['createdAt', 'DESC']]
        });

        res.json(consultations);
    } catch (error) {
        console.error('Get consultations error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get consultations for dentist review
// @route   GET /api/consultations/dentist
// @access  Private/Dentist
exports.getDentistConsultations = async (req, res) => {
    try {
        // Dentists see all pending consultations or ones they are assigned to
        const consultations = await Consultation.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { status: 'pending' },
                    { dentistId: req.user.id }
                ]
            },
            include: [
                {
                    model: User,
                    attributes: ['name', 'email', 'phoneNumber']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.json(consultations);
    } catch (error) {
        console.error('Get dentist consultations error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update consultation with dentist feedback
// @route   PUT /api/consultations/:id
// @access  Private/Dentist
exports.updateConsultation = async (req, res) => {
    try {
        const { dentistFeedback, status } = req.body;

        const consultation = await Consultation.findByPk(req.params.id);

        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }

        consultation.dentistFeedback = dentistFeedback || consultation.dentistFeedback;
        consultation.status = status || consultation.status;
        consultation.dentistId = req.user.id;

        await consultation.save();

        res.json(consultation);
    } catch (error) {
        console.error('Update consultation error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
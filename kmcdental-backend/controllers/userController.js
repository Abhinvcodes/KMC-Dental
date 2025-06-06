const { User } = require('../models');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, gender } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = await User.create({
            name,
            email,
            password, // Will be hashed by the User model hooks
            phoneNumber,
            gender
        });

        // Send back user data and token
        if (user) {
            res.status(201).json({
                id: user.id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                gender: user.gender,
                isAdmin: user.isAdmin,
                isDentist: user.isDentist,
                token: generateToken(user.id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ where: { email } });

        // Check if user exists and password matches
        if (user && (await user.matchPassword(password))) {
            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                gender: user.gender,
                isAdmin: user.isAdmin,
                isDentist: user.isDentist,
                token: generateToken(user.id)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = async (req, res) => {
    try {
        // req.user is set by the protect middleware
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all dentists
// @route   GET /api/users/dentists
// @access  Public
exports.getDentists = async (req, res) => {
    try {
        const dentists = await User.findAll({
            where: { isDentist: true },
            attributes: ['id', 'name', 'email', 'phoneNumber', 'specialization']
        });

        res.json(dentists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
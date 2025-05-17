const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Protect routes - verifies the JWT token
exports.protect = async (req, res, next) => {
  let token;

  // Check if token exists in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (Bearer token)
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user from token payload (id) but exclude password
      req.user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] }
      });

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

// Admin middleware - restricts access to admin users
exports.admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};

// Dentist middleware - restricts access to dentist users
exports.dentist = (req, res, next) => {
  if (req.user && req.user.isDentist) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as dentist' });
  }
};

// Resource owner middleware - ensures users can only access their own data
exports.checkOwnership = (paramIdField) => {
  return (req, res, next) => {
    const resourceId = parseInt(req.params[paramIdField]);

    // Admin can access all resources
    if (req.user.isAdmin) {
      return next();
    }

    // Users can only access their own resources
    if (req.user.id !== resourceId) {
      return res.status(403).json({
        message: 'Not authorized to access this resource'
      });
    }

    next();
  };
};
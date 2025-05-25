const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const sequelize = require('./config/db');
const { testConnection } = require('./config/db');
const { syncDatabase } = require('./models/index');
const { protect, admin } = require('./middleware/authMiddleware');
const userRoutes = require('./routes/userRoutes');
const consultationRoutes = require('./routes/consultationRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const { Op } = require('sequelize');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Sync models with database
syncDatabase();

app.use('/api/users', userRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/appointments', appointmentRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('KMC Dental API is running');
});

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working' });
});

// Test route that accepts both GET and POST
app.all('/api/test/register', (req, res) => {
    res.json({
        message: 'Registration test route works',
        method: req.method,
        body: req.body
    });
});

app.get('/api/protected', protect, (req, res) => {
    res.json({
        message: 'This is a protected route',
        user: req.user
    });
});

app.get('/api/admin', protect, admin, (req, res) => {
    res.json({ message: 'Admin access granted' });
});

// Synchronize database
sequelize.sync({ alter: true }).then(() => {
    console.log('Database synchronized');
});

// Add this function to check database tables
const checkTables = async () => {
    try {
        const [results] = await sequelize.query(`
      SELECT table_schema, table_name 
      FROM information_schema.tables 
      WHERE table_catalog = current_database()
    `);
        console.log('Available tables:', results);
    } catch (error) {
        console.error('Error checking tables:', error);
    }
};

// Wrap server startup in an async function
const startServer = async () => {
    try {
        // Check tables first (diagnostic)
        await checkTables();

        // Then sync database
        await syncDatabase();

        // Start the server after database operations complete
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

// Call the async function to start everything
startServer();
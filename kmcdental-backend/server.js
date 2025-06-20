const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const path = require('path');
require('dotenv').config();
const http = require('http');
const initSocket = require('./socket');
const { protect, admin } = require('./middleware/authMiddleware');
const userRoutes = require('./routes/userRoutes');
const consultationRoutes = require('./routes/consultationRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/appointments', appointmentRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('KMC Dental API is running');
});

// Test routes
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working' });
});

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

// Move this import AFTER db initialization
// const { syncDatabase } = require('./models');

// Keep only the startServer function that does everything in the right order
const startServer = async () => {
    try {
        // Initialize DB first
        await db.initialize();
        console.log('Database connection established successfully.');

        // NOW import models
        const { syncDatabase } = require('./models');

        // Sync all models
        //commenting sync because its creating problems
        await syncDatabase();

        // Create HTTP server
        const server = http.createServer(app);

        // Initialize socket.io
        initSocket(server);

        // Start the server after database operations complete
        server.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        console.error('Error details:', error.parent?.message || error);
    }
};

// Call the async function to start everything - ONLY THIS ONE
startServer();
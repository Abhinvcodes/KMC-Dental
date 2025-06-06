const { Sequelize } = require('sequelize');
require('dotenv').config();

// Define options for Sequelize
const options = {
    define: {
        freezeTableName: true,
        underscored: true
    }
};

// Use DATABASE_URL if available, otherwise use individual params
const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        schema: 'public',
        ...options  // Add this
    })
    : new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            dialect: 'postgres',
            ...options  // Add this
        }
    );

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('✅ Database connection has been established successfully.');
        console.log(`Connected to: ${process.env.DATABASE_URL ? 'Production database' : process.env.DB_NAME}`);
    })
    .catch(err => {
        console.error('❌ Unable to connect to the database:', err);
    });

module.exports = sequelize;
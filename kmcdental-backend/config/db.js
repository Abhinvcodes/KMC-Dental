const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    quoteIdentifiers: true,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
        ssl: process.env.NODE_ENV === 'production' ? {
            require: true,
            rejectUnauthorized: false // Render's Postgres requires this
        } : false
    }
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, testConnection };



/*
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create Sequelize instance with PostgreSQL connection
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false, // Set to console.log to see SQL queries
        quoteIdentifiers: true, // Important for case-sensitive names
        pool: {
            max: 5,  // Maximum number of connection in pool
            min: 0,  // Minimum number of connection in pool
            acquire: 30000, // Maximum time in ms to get a connection
            idle: 10000     // Maximum time in ms that a connection can be idle
        }
    }
);

// Function to test database connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log(`✅ Database connection to "${process.env.DB_NAME}" established successfully`);
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, testConnection };
*/
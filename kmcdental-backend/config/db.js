const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create Sequelize instance immediately
let sequelizeInstance = null;

// For remote database if DATABASE_URL exists
if (process.env.DATABASE_URL) {
    sequelizeInstance = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        schema: 'public',
        define: {
            freezeTableName: true,
            underscored: true
        },
        logging: console.log
    });
} else {
    // For local database
    sequelizeInstance = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            port: 5432,
            dialect: 'postgres',
            define: {
                freezeTableName: true,
                underscored: true
            },
            logging: (sql) => console.log(`[SQL] ${sql}`),
            benchmark: true,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        }
    );
}

// Track connection state
let isInitialized = false;

// Initialize database with fallback
const initialize = async () => {
    if (isInitialized) return sequelizeInstance;

    try {
        // Try remote connection if DATABASE_URL exists
        if (process.env.DATABASE_URL) {
            try {
                await sequelizeInstance.authenticate();
                console.log('✅ Connected to remote database successfully');
                isInitialized = true;
                return sequelizeInstance;
            } catch (error) {
                console.log('⚠️ Remote database connection failed, trying local database:', error.message);

                // Re-create sequelize for local connection
                sequelizeInstance = new Sequelize(
                    process.env.DB_NAME,
                    process.env.DB_USER,
                    process.env.DB_PASSWORD,
                    {
                        host: process.env.DB_HOST || 'localhost',
                        port: process.env.DB_PORT || 5432,
                        dialect: 'postgres',
                        define: {
                            freezeTableName: true,
                            underscored: true
                        },
                        logging: (sql) => console.log(`[SQL] ${sql}`),
                        benchmark: true
                    }
                );
            }
        }

        // Try local connection
        await sequelizeInstance.authenticate();
        console.log('✅ Connected to local database successfully');
        isInitialized = true;
        return sequelizeInstance;
    } catch (error) {
        console.error('❌ All database connection attempts failed:', error);
        throw error;
    }
};

// Simple module exports
module.exports = {
    sequelize: sequelizeInstance,
    initialize
};
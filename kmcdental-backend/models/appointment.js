const { DataTypes } = require('sequelize');
const db = require('../config/db');
const sequelize = db.sequelize;

const Appointment = sequelize.define('Appointment', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    dentistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    appointmentDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('scheduled', 'completed', 'cancelled'),
        defaultValue: 'scheduled'
    },
    paymentStatus: {
        type: DataTypes.ENUM('pending', 'completed'),
        defaultValue: 'pending'
    },
    paymentDetails: {
        type: DataTypes.JSON,
        allowNull: true
    }
}, {
    timestamps: true,
    schema: 'public',
    tableName: 'appointments'
});

module.exports = Appointment;
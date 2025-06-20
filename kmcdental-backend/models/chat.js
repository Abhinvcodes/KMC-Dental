const { DataTypes } = require('sequelize');
const db = require('../config/db');
const sequelize = db.sequelize;

const Chat = sequelize.define('Chat', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
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
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    sentBy: {
        type: DataTypes.ENUM('user', 'dentist'),
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'chats',
    schema: 'public'
});

module.exports = Chat;
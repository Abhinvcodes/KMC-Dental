const db = require('../config/db');

// Import models - these should be updated as shown below
const User = require('./user');
const Consultation = require('./consultation');
const Appointment = require('./appointment');
const Chat = require('./chat');

// Define associations
User.hasMany(Consultation, { foreignKey: 'userId' });
Consultation.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Appointment, { foreignKey: 'userId' });
Appointment.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Appointment, { foreignKey: 'dentistId', as: 'DentistAppointments' });
Appointment.belongsTo(User, { foreignKey: 'dentistId', as: 'Dentist' });

User.hasMany(Chat, { foreignKey: 'userId', as: 'UserChats' });
Chat.belongsTo(User, { foreignKey: 'userId', as: 'User' });

User.hasMany(Chat, { foreignKey: 'dentistId', as: 'DentistChats' });
Chat.belongsTo(User, { foreignKey: 'dentistId', as: 'Dentist' });

// Sync all models with database
const syncDatabase = async () => {
    try {
        await db.sequelize.sync({ alter: false });
        console.log('✅ Database synchronized');
    } catch (error) {
        console.error('❌ Error syncing database:', error);
        throw error;
    }
};

// Export models and database utilities
module.exports = {
    sequelize: db.sequelize,
    User,
    Consultation,
    Appointment,
    Chat,
    syncDatabase
};
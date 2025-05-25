const sequelize = require('../config/db');
const User = require('./user');
const Consultation = require('./consultation');
const Appointment = require('./appointment');

// Define associations
User.hasMany(Consultation, { foreignKey: 'userId' });
Consultation.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Appointment, { foreignKey: 'userId' });
Appointment.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Appointment, { foreignKey: 'dentistId', as: 'DentistAppointments' });
Appointment.belongsTo(User, { foreignKey: 'dentistId', as: 'Dentist' });

// Sync all models with database
const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('✅ Database models synced successfully');
    } catch (error) {
        console.error('❌ Error syncing database models:', error);
        console.error('Details: ', error.message);
    }
};

module.exports = {
    sequelize,
    User,
    Consultation,
    Appointment,
    syncDatabase
};
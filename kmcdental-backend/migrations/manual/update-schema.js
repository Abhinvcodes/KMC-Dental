const { sequelize } = require('./models');

async function updateUserTable() {
    const transaction = await sequelize.transaction();

    try {
        // Based on your current columns, we need to add the missing ones
        console.log('Updating users table schema...');

        // Add phoneNumber if missing
        await sequelize.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS phone_number VARCHAR(255) NULL
    `, { transaction });

        // Add isAdmin if missing
        await sequelize.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE
    `, { transaction });

        // Add isDentist if missing
        await sequelize.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS is_dentist BOOLEAN DEFAULT FALSE
    `, { transaction });

        // Check if specialization/specialisation column exists with either spelling
        const [columns] = await sequelize.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' 
      AND (column_name = 'specialization' OR column_name = 'specialisation')
    `, { transaction });

        if (columns.length === 0) {
            await sequelize.query(`
        ALTER TABLE users 
        ADD COLUMN specialization VARCHAR(255) NULL
      `, { transaction });
        } else if (columns[0].column_name === 'specialisation') {
            // Rename to match model if needed
            await sequelize.query(`
        ALTER TABLE users 
        RENAME COLUMN specialisation TO specialization
      `, { transaction });
        }

        // If profile_picture exists, drop it
        await sequelize.query(`
      ALTER TABLE users 
      DROP COLUMN IF EXISTS profile_picture
    `, { transaction });

        await transaction.commit();
        console.log('✅ User table updated successfully');
    } catch (error) {
        await transaction.rollback();
        console.error('❌ Failed to update user table:', error);
        console.error(error.stack);
    } finally {
        process.exit(0);
    }
}

updateUserTable();
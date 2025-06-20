// filename: postgres-test.js
const { Client } = require('pg');
require('dotenv').config();

const testConnection = async () => {
    // Minimal client
    const client = new Client({
        user: process.env.DB_USER,
        host: 'localhost',
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: 5432,
    });

    try {
        console.log('Connecting to PostgreSQL...');
        await client.connect();
        console.log('✅ Connected successfully');

        // Basic query test
        const res = await client.query('SELECT version()');
        console.log('PostgreSQL version:', res.rows[0].version);

        // Test creating a simple table
        console.log('Testing table creation...');
        await client.query(`
      CREATE TABLE IF NOT EXISTS test_table (
        id SERIAL PRIMARY KEY,
        name TEXT
      )
    `);
        console.log('✅ Table created successfully');

        // Test inserting data
        console.log('Testing data insertion...');
        await client.query(`
      INSERT INTO test_table (name) VALUES ('test')
    `);
        console.log('✅ Data inserted successfully');

        // Test querying data
        console.log('Testing data retrieval...');
        const data = await client.query('SELECT * FROM test_table');
        console.log('Retrieved data:', data.rows);

    } catch (err) {
        console.error('❌ Error in PostgreSQL test:', err);
    } finally {
        try {
            // Clean up - delete test table
            console.log('Cleaning up - deleting test table...');
            await client.query('DROP TABLE IF EXISTS test_table');
            console.log('✅ Test table deleted successfully');

            // Close connection
            await client.end();
            console.log('Connection closed');
        } catch (err) {
            console.error('Error during cleanup:', err);
        }
    }
};

testConnection();
// test the connection with the db by running "node test-db.js"
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: 'localhost',
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

async function testConnection() {
    try {
        const client = await pool.connect();
        const res = await client.query('SELECT NOW()');
        console.log('Connection successful:', res.rows[0]);
        client.release();
    } catch (err) {
        console.error('Connection error:', err);
    } finally {
        pool.end();
    }
}

testConnection();
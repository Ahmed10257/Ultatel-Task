import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
require('dotenv').config({
    path: __dirname + '/../.env',
});

// Load environment variables from .env file
// dotenv.config({ path: __dirname + '../.env' });

async function testConnection() {
    try {
        console.log('Connecting to the database with the following details:');
        console.log(`Host: ${process.env.DATABASE_HOST}`);
        console.log(`Port: ${process.env.DATABASE_PORT}`);
        console.log(`Username: ${process.env.DATABASE_USERNAME}`);
        console.log(`Password: ${process.env.DATABASE_PASSWORD}`);
        console.log(`Database: ${process.env.DATABASE_NAME}`);

        const connection = await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            port: +process.env.DATABASE_PORT,
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
        });

        console.log('Connected to the database successfully!');
        await connection.end();
    } catch (error) {
        console.error('Connection failed:', error);
    }
}

testConnection();

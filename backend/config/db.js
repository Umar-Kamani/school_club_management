let mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',     
    password: process.env.DB_PASSWORD || '', 
    database: process.env.DB_NAME || 'school_club_management',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.promise().getConnection()
    .then(connection => {
        console.log('✅ Successfully connected to phpMyAdmin Database!');
        connection.release();
    })
    .catch(err => {
        console.error('Database connection failed!');
        console.error('Error message:', err.message);
    });

module.exports = pool.promise();
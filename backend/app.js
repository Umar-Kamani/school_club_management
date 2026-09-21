const express = require('express');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// --- API ROUTES ---

// 1. Get all students
app.get('/api/students', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM students');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Get all clubs
app.get('/api/clubs', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM clubs');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Get all memberships
app.get('/api/memberships', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT m.membership_id, s.name as student_name, c.club_name, m.join_date 
            FROM memberships m
            JOIN students s ON m.student_id = s.student_id
            JOIN clubs c ON m.club_id = c.club_id
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Join a club (Create membership)
app.post('/api/memberships', async (req, res) => {
    const { student_id, club_id } = req.body;
    if (!student_id || !club_id) {
        return res.status(400).json({ error: 'student_id and club_id are required' });
    }
    try {
        const [result] = await db.query(
            'INSERT INTO memberships (student_id, club_id, join_date) VALUES (?, ?, CURDATE())', 
            [student_id, club_id]
        );
        res.status(201).json({ message: 'Membership created', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 ALCHE Backend running on http://localhost:${PORT}`);
});

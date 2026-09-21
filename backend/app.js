const express = require('express');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

const express = require('express');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();

// Import Routes
const clubRoutes = require('./routes/clubRoutes');
const studentRoutes = require('./routes/studentRoutes');
const membershipRoutes = require('./routes/membershipRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// --- MVC ROUTES ---
app.use('/api/clubs', clubRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/memberships', membershipRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 ALCHE Backend running on http://localhost:${PORT}`);
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 ALCHE Backend running on http://localhost:${PORT}`);
});

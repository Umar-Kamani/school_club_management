const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
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
// These tell Express: "If the URL starts with /api/clubs, use the clubRoutes file"
app.use('/api/clubs', clubRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/memberships', membershipRoutes);

// Root endpoint to check if server is alive
app.get('/', (req, res) => {
    res.send('ALCHE Club Management Server is Running!');
});

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: "School Club Management System API",
            version: "1.0.0",
            description: "This page serves as a documentation of our School Club Management System API "
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start Server
app.listen(PORT, () => {
  
    console.log(`ALCHE Backend running on http://localhost:${PORT}`);
    console.log(`API Base URL: http://localhost:${PORT}/api`);
    console.log(`Swagger Docs: http://localhost:${PORT}/api-docs`);
});
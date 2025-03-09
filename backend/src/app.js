const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Import auth routes
const codeExecutionRoutes = require('./routes/codeExecutionRoutes');

const app = express(); // Create an Express application

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/api/auth', authRoutes); // Route for authentication
app.use('/api/code-execution', codeExecutionRoutes);

// 404 Error Handling
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app; // Export the app instance for server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// const profileRoutes = require('./routes/profile');
const authRoutes = require('./routes/authRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const questionRoutes = require('./routes/questionRoutes');
// const productRoutes = require('./routes/product');

dotenv.config({ path: './src/.env' }); // Explicitly load the .env file in the src folder

const app = express();

// Middleware
app.use(express.json());  // This middleware is used to parse incoming JSON requests.
app.use(cors());
// app.use('/images', express.static(path.join(__dirname, '../frontend/public/assets/images')));

// Routes
app.use('/api/auth', authRoutes);   // Routes for authentication
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/questions', questionRoutes);
// app.use('/api/profile', profileRoutes); // Routes for profile
// app.use('/api/product', productRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

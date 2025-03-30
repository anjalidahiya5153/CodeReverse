const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust the path to your User model
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: './src/.env' }); 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB.');

        // Update all users without a 'score' field
        const result = await User.updateMany(
            { score: { $exists: false } }, // Match users without the score field
            { $set: { score: 0 } }        // Add the score field with a default value
        );

        console.log(`${result.modifiedCount} users updated with default score.`);
        mongoose.disconnect();
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });


// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('MongoDB connection error:', err));
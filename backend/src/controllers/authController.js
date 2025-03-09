const User = require('../models/User'); // Ensure the User model is correctly imported

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming req.user is set after token verification
        console.log('Fetching profile for user ID:', userId);
        
        const user = await User.findById(userId);
        
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('User profile:', user);
        res.json(user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

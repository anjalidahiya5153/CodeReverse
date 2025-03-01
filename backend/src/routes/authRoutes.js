const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

//signup route
router.post('/signup', async (req, res) => {
    const {username, email, password} = req.body;

    try{
        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create a new user
        const newUser = new User({
            username,
            email,
            password : hashedPassword,
        });
        await newUser.save();

        res.status(201).json({ message : 'User Created Successfully'})
    }catch(error){
        res.status(500).json({error : 'Error creating user'});
    }
});

//login route
router.post('/login', async (req, res) => {
    const {email, password} = req.body

    try{
        //check if the user exists
        const user = await User.findOne({ email });
        if(!user){
            console.log(`user not found for email ${email}`);
            return res.status(400).json({error : 'user not found'});
        }
        //log the user data
        console.log(`User found ${user.username}, Email : ${user.email}`);
        //compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            console.log(`password mismatch for user: ${user.email}`);
            return res.status(400).json({error: 'Invalid Credentials'});
        }
        //check if JWT_SECRET is set properly
        console.log('JWT Secret: ', process.env.JWT_SECRET);

        //genererate a JWT Token
        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {
            expiresIn : '1h',
        });
        console.log('token: ', {token});

        res.json({token});
    }catch (error){
        console.error('Error loggin in: ', error);
        res.status(500).json({error: 'Error logging in '});
    }
});



//profile route
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        console.log('user id from req.user: ', req.user); // 🛠️ Debug line
        
        const user = await User.findById(req.user)
            .populate('solvedQuestions')
            .populate('bookmarkedQuestions');
        
        if (!user) {
            console.log('User not found for ID:', req.user);
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('User fetched from DB in profile in backend:', user); // 🛠️ Debug line

        res.status(200).json({
            username: user.username,
            email: user.email,
            score: user.score,
            solvedQuestions: user.solvedQuestions,
            bookmarkedQuestions: user.bookmarkedQuestions
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Failed to fetch profile data..in authRoutes...' });
    }
});


module.exports = router;
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// // Generate JWT Token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
// };

// // Signup Controller
// exports.signup = async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists) return res.status(400).json({ message: 'User already exists' });

//     const user = await User.create({ username, email, password });

//     res.status(201).json({
//       message: 'User created successfully',
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating user', error: error.message });
//   }
// };

// // Login Controller
// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const isPasswordValid = await user.matchPassword(password);
//     if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = generateToken(user._id);

//     res.status(200).json({
//       token,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error logging in', error: error.message });
//   }
// };

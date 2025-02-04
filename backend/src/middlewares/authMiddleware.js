const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // Attach user ID to the request object
    console.log('Token:', token);
    console.log('Decoded:', decoded);
    console.log('User ID:', req.user); // Log the user ID
    next();
  } catch (error) {
    console.error('Token verification failed: ', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;

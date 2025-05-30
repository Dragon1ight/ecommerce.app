const jwt = require('jsonwebtoken'); // Assuming jsonwebtoken is installed
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// Middleware to protect routes - checks for a valid JWT
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Placeholder: Implement JWT verification logic here
  // For now, we'll just check for a token in the headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token (this part needs actual implementation)
      // const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // req.user = await User.findById(decoded.id).select('-password');

      // Placeholder: Assuming token is valid for now
      // In a real app, you would verify the token and find the user

      next(); // Proceed to the next middleware/route handler
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Middleware to authorize users based on roles
const authorize = (roles) => {
  return (req, res, next) => {
    // Placeholder: Implement role checking logic here
    // You would typically check req.user.role against the allowed roles

    // Placeholder: Assuming authorization is successful for now
    // In a real app, you would check if the user's role is in the 'roles' array

    if (req.user && roles.includes(req.user.role)) {
       next(); // User is authorized
    } else {
      // Placeholder: Temporarily allow access for demonstration
      // REMOVE THIS LINE IN PRODUCTION
       next(); // Temporarily allow all access
      // res.status(403);
      // throw new Error('Not authorized as admin');
    }
  };
};

module.exports = { protect, authorize }; 
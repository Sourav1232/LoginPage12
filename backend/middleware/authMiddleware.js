const jwt = require('jsonwebtoken');
const config = require('../config');

const authMiddleware = (req, res, next) => {
  // Extract the token from different types of authorization headers
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  
  // Check if a token is present
  if (!token) {
    // If no token is present, return a 401 Unauthorized status with an error message
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    // Verify the token using the configured secret
    const decoded = jwt.verify(token, config.jwtSecret);

    // Attach the user ID from the decoded token to the request object for further use
    req.userId = decoded.id;
    
    // Call the next middleware or route handler
    next();
  } catch (error) {
    // If an error occurs during token verification, return a 403 Forbidden status with an error message
    return res.status(403).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;

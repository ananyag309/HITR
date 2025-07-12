import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Authentication middleware to check for valid JWT
export const auth = async (req, res, next) => {
  console.log('🔑 Auth middleware triggered for:', req.method, req.path);
  
  // Get token from either cookies or Authorization header
  let token = req.cookies.token;
  
  // If not in cookies, check Authorization header
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    console.log('🔍 Auth header:', authHeader.substring(0, 20) + '...');
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7); // Remove 'Bearer ' prefix
    }
  }

  // Check if token exists
  if (!token) {
    console.log('❌ No token found in request');
    console.log('🔍 Cookies:', req.cookies);
    console.log('🔍 Auth header:', req.headers.authorization);
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    console.log('🔍 Verifying token:', token.substring(0, 20) + '...');
    
    // Verify token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token verified for user ID:', decoded.id);

    // Find user by ID and exclude password
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      console.log('❌ User not found in database:', decoded.id);
      return res.status(401).json({ error: 'User not found' });
    }

    console.log('✅ User authenticated:', req.user.username);
    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    console.error('❌ Auth middleware error:', err.message);
    if (err.name === 'TokenExpiredError') {
      console.log('⏰ Token expired at:', err.expiredAt);
    }
    res.status(401).json({ error: 'Token is not valid' });
  }
};

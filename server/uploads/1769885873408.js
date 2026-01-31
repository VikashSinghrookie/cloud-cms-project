// server/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // 1. Get token from header
    const token = req.header('Authorization');

    // 2. Check if no token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // 3. Verify token
    try {
        const cleanToken = token.replace('Bearer ', '');
        const decoded = jwt.verify(cleanToken, 'your_jwt_secret_key');
        req.user = decoded; 
        next(); 
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
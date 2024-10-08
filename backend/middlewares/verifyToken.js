const jwt = require('jsonwebtoken');
const sendResponse = require("../utils/sendResponse")

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
    // Extract JWT token from session
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return sendResponse(req, res, false, "Unauthorized - No token provided", null);

    }

    try {
        // Verify token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return sendResponse(req, res, false, "Unauthorized", null);
            }
            req.user = decoded; 
            next();
        });

    } catch (error) {
        // Token verification failed
        return sendResponse(req, res, false, "Unauthorized - Invalid token", null);

    }
};

module.exports = verifyToken;

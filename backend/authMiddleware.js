const jwt = require('jsonwebtoken');
const User = require('./models/User');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            req.user = null;
            return next();
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET || "Secret");
        } catch (err) {
            req.user = null;
            return next();
        }
        let userData = await User.findById(decoded.userId).select('profilePicture');
        req.user = userData ? userData.toObject() : null;
        return next();
    } catch (error) {
        console.error('Middleware error:', error);
        req.user = null;
        return next();
    }
};

module.exports = authMiddleware;

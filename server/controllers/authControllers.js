const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(/*process.env.CLIENT_ID*/"739869680076-jlv9amicing7jf86gasmar79v2hel8vb.apps.googleusercontent.com");

exports.validateToken = async (req, res) => {
    const user = req.user;
    res.json({
        message: 'Token is valid',
        user,
    });
};
exports.googleLogin = async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: /*process.env.CLIENT_ID*/"739869680076-jlv9amicing7jf86gasmar79v2hel8vb.apps.googleusercontent.com",
        });
        const payload = ticket.getPayload();

        const { name, email, picture } = payload;
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({
                name,
                email,
                profilePicture: picture,
            });
            await user.save();
        }
        const jwtToken = jwt.sign({ userId: user._id, role: 'user' }, /*process.env.JWT_SECRET*/"Secret", {
            expiresIn: '7d',
        });
        res.cookie('authToken', jwtToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'Strict',
        });
        res.status(200).json({
            message: 'Login successful',
            user: {
                _id: user._id,
                profilePicture: user.profilePicture,
                role: "user"
            },
        });
    } catch (error) {
        console.error('Google authentication error:', error);
        res.status(500).json({ message: 'Google authentication failed' });
    }
};


exports.logout = (req, res) => {
    res.clearCookie('authToken');
    res.json({ message: 'Logout successful' });
};
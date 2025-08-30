const express = require("express");
const authMiddleware = require("../authMiddleware");

const { googleLogin, validateToken, logout } = require("../controllers/authControllers");
const router = express.Router();

router.get('/validateToken', authMiddleware, validateToken);
router.post('/auth/google', googleLogin);
router.post('/logout', logout);

module.exports = router;
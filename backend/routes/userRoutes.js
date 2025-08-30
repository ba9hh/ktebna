const express = require("express");
const { fetchUserInformation, updateUserProfilePicture, updateUserName } = require("../controllers/userControllers");
const router = express.Router();
const authMiddleware = require("../authMiddleware.js");
router.get("/user", authMiddleware, fetchUserInformation);
router.put("/user/profile-picture", authMiddleware, updateUserProfilePicture);
router.put("/user/name", authMiddleware, updateUserName);

module.exports = router;
const express = require("express");
const { getUserConversations, checkConversationExists } = require("../controllers/conversationControllers.js");
const authMiddleware = require("../authMiddleware.js");

const router = express.Router();

router.get("/conversations", authMiddleware, getUserConversations);
router.get("/find/:user1/:user2", checkConversationExists);

module.exports = router;
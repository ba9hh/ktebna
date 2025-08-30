const express = require("express");
const { sendMessage, getMessages } = require("../controllers/messageControllers.js");

const router = express.Router();

// messages
router.post("/messages", sendMessage);
router.get("/messages/:conversationId", getMessages);
module.exports = router;
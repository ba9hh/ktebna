const Conversation = require("../models/Conversation.js");
const Message = require("../models/Message.js");

exports.sendMessage = async (req, res) => {
    try {
        const { firstUserId, secondUserId, userId, messageContent, conversationTopic, lastMessageContent, lastMessageSender } = req.body;

        // 1️⃣ Find or create conversation
        let conversation = await Conversation.findOne({
            $or: [
                { firstUserId, secondUserId },
                { firstUserId: secondUserId, secondUserId: firstUserId },
            ],
        });

        if (!conversation) {
            conversation = new Conversation({ firstUserId, secondUserId, conversationTopic, lastMessageContent, lastMessageSender });
            await conversation.save();
        } else {
            conversation.lastMessageContent = lastMessageContent;
            conversation.lastMessageSender = lastMessageSender;
            await conversation.save();
        }

        // 2️⃣ Check message limit (2 per user per conversation)
        const count = await Message.countDocuments({
            conversationId: conversation._id,
            userId,
        });

        if (count >= 2) {
            return res
                .status(403)
                .json({ error: "Message limit (2) reached for this conversation." });
        }

        // 3️⃣ Create message
        const message = new Message({
            conversationId: conversation._id,
            userId,
            messageContent,
        });

        await message.save();

        res.status(201).json({ conversation, message });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const messages = await Message.find({ conversationId }).populate("userId", "name profilePicture");
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

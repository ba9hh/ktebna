const Conversation = require("../models/Conversation.js");
const Message = require("../models/Message.js");

exports.getUserConversations = async (req, res) => {
    const userId = req.user._id;
    try {

        const conversations = await Conversation.find({
            $or: [
                { firstUserId: userId },
                { secondUserId: userId }
            ]
        })
            .populate("firstUserId", "name email profilePicture")   // adjust fields as per your User model
            .populate("secondUserId", "name email profilePicture")
            .sort({ updatedAt: -1 }); // latest conversations first
        res.status(200).json(conversations);
    } catch (error) {
        console.error("Error fetching conversations:", error);
        res.status(500).json({ message: "Server error while fetching conversations" });
    }
};
exports.checkConversationExists = async (req, res) => {
    const { user1, user2 } = req.params;
    try {
        const conversation = await Conversation.findOne({
            $or: [
                { firstUserId: user1, secondUserId: user2 },
                { firstUserId: user2, secondUserId: user1 }
            ]
        })
            .populate("firstUserId", "name email profilePicture")
            .populate("secondUserId", "name email profilePicture")
        res.json(conversation); // null if no conversation exists
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

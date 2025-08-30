const mongoose = require("mongoose");

const ConversationSchema = mongoose.Schema({
    firstUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    secondUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    conversationTopic: { type: String },
    lastMessageContent: { type: String },
    lastMessageSender: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

const ConversationModel = mongoose.model("Conversation", ConversationSchema);
module.exports = ConversationModel;
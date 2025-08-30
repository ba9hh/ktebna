const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    messageContent: { type: String, required: true },
}, { timestamps: true });

const MessageModel = mongoose.model("Message", MessageSchema);
module.exports = MessageModel;
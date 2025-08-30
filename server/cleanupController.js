const Conversation = require('./models/Conversation');
const Message = require('./models/Message');

exports.cleanupConversationsandMessages = async (req, res) => {
    try {
        await Message.deleteMany({});
        await Conversation.deleteMany({});
        console.log("done")
    } catch (error) {
        console.error("Error during cleanup:", error);
    }
}
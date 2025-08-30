const mongoose = require('mongoose');

const SavedPostSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    createdAt: { type: Date, default: Date.now }
})

const SavedPostModel = mongoose.model('SavedPost', SavedPostSchema);
module.exports = SavedPostModel;
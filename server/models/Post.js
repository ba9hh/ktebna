const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    bookName: {
        type: String,
        required: true,
        trim: true,
    },
    bookImage: {
        type: String,
        required: true,
    },
    bookCategory: {
        type: String,
        required: true,
    },
    bookDealType: {
        type: String,
        enum: ["sell", "exchange"],
        required: true,
    },
    bookPrice: {
        type: String,
        required: true,
    },
    postVisibility: {
        type: String,
        enum: ["public", "private"],
        default: "public",
    },
    bookLocation: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const PostModel = mongoose.model('Post', PostSchema);
module.exports = PostModel;

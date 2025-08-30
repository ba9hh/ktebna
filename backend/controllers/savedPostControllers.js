const SavedPost = require('../models/SavedPost');

exports.savePost = async (req, res) => {
    const { postId } = req.body;
    const userId = req.user._id;
    console.log("Saving post:", postId, "for user:", userId);
    try {
        const newSavedPost = new SavedPost({ userId, postId });
        await newSavedPost.save();
        res.status(201).json(newSavedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.unsavePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;
    try {
        const deleted = await SavedPost.findOneAndDelete({ userId, postId });
        if (!deleted) {
            return res.status(404).json({ message: 'Saved post not found' });
        }
        res.status(200).json({ message: 'Post unsaved successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.getSavedPosts = async (req, res) => {
    const userId = req.user._id;
    try {
        const savedPosts = await SavedPost.find({ userId }).populate('postId').sort({ createdAt: -1 });
        res.status(200).json(savedPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.getSavedPostsIds = async (req, res) => {
    const userId = req.user?._id;
    try {
        const savedPosts = await SavedPost.find({ userId })
            .select("postId -_id")
            .sort({ createdAt: -1 });

        const savedPostIds = savedPosts.map(sp => sp.postId);
        res.status(200).json(savedPostIds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.isPostSaved = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;
    try {
        const savedPost = await SavedPost.findOne({ userId, postId });
        res.status(200).json({ isSaved: !!savedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
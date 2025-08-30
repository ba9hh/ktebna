const Post = require("../models/Post");

exports.createPost = async (req, res) => {
    const userId = req.user._id;
    const {
        bookName,
        bookImage,
        bookCategory,
        bookDealType,
        bookPrice,
        bookLocation,
    } = req.body;
    try {
        if (!userId || !bookName || !bookImage || !bookCategory || !bookDealType || !bookPrice || !bookLocation) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newPost = new Post({
            userId,
            bookName,
            bookImage,
            bookCategory,
            bookDealType,
            bookPrice,
            bookLocation,
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getPostsByUser = async (req, res) => {
    const userId = req.user._id;
    try {
        const posts = await Post.find({ userId })
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.getPosts = async (req, res) => {
    const { dealType, location, category, search } = req.query;
    const userId = req.user?._id
    try {
        let query = {};
        if (dealType) query.bookDealType = dealType;
        if (location) query.bookLocation = location;
        if (category) query.bookCategory = category;
        if (userId) {
            query.userId = { $ne: userId };
        }
        if (search) {
            query.$or = [
                { bookName: { $regex: search, $options: "i" } },
            ];
        }
        const posts = await Post.find(query)
            .populate("userId", "name email profilePicture")
            .sort({ date: -1 });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
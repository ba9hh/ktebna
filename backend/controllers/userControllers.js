const User = require("../models/User");



exports.fetchUserInformation = async (req, res) => {
    const userId = req.user?._id
    try {
        const user = await User.findById(userId).select('name email profilePicture');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user information:", error);
        res.status(500).json({ message: "Failed to fetch user information", error });
    }
}
exports.updateUserProfilePicture = async (req, res) => {
    const userId = req.user?._id
    const { newProfilePicture } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePicture: newProfilePicture },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ error: 'Document not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.updateUserName = async (req, res) => {
    const userId = req.user?._id
    const { newName } = req.body
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name: newName },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ error: 'Document not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
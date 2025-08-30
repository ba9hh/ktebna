const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true },
        profilePicture: { type: String },
    });


const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
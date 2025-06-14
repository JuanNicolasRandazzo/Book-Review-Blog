const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    termsAccepted: {
        type: Boolean,
        required: [true, 'You must accept the terms and conditions to register.'],
    }
}, { timestamps: true });


module.exports = mongoose.model("User", UserSchema);
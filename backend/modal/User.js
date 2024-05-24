const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    status: {
        type: Boolean,
        required: true
    },
    verificationToken: {
        type: String
    },
    isVerified: {
        type: Boolean,
        required: true
    },
    isAdmin: {
        type: Boolean
    },
    createdAt: {
        type: String,
        value: Date.now()
    }
}, { timestamps: true })


exports.UserModal = mongoose.model('users', UserSchema)

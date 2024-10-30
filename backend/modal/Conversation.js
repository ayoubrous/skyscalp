const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    ownerID : { type: String, required: true },
    productID: { type: String, required: true },
    messages: [{ 
        senderID: { type: String, required: true },
        message: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
    }],
}, { timestamps: true });

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;

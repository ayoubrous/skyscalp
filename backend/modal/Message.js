const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    senderID: {
        type: String,
    },
    receiverID:{
        type:String,
    },
    // collectionReference: {
    //     type: String,
    // },
    // toAdmin: {
        //     type: Boolean,
        // },
        // phone: {
            //     type: String,
            // },
            // email: {
                //     type: String,
    // },
    message: {
        type: String
    },
    productID: {
        type: String,
    },
    // firstName: {
    //     type: String
    // },
    // lastName: {
    //     type: String
    // },
    timestamp: {
        type: String,
        value: Date.now()
    }

}, { timestamps: true })

const MessageModal = mongoose.model('messages', messageSchema);

module.exports = MessageModal;
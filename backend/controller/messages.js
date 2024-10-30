const MessageModal = require('../modal/Message')
var mongoose = require("mongoose");


const sendResponse = require("../utils/sendResponse")

const sendMessage = async (req, res) => {
    try {
        if (!req.body) {
            return sendResponse(req, res, false, "Invalid data provided", null);
        }
        console.log(req.body)

        const { senderID, receiverID, productID, message, collectionReference } = req.body;
        
        const _id = new mongoose.Types.ObjectId(senderID);
        const re_id = new mongoose.Types.ObjectId(receiverID);

        let Message = new MessageModal({senderID:_id,message:message,productID :productID, receiverID:re_id});
        let result = await Message.save();
        console.log(result)
        if (result) {
            sendResponse(req, res, true, "Message sent successfully", null);
        } else {
            sendResponse(req, res, false, "Error sending message, try again", null);
        }

    } catch (err) {
        console.error(err);
        sendResponse(req, res, false, "Error proceeding your request, try again", null);
    }
};


const getMessages = async (req, res) => {
    const { userID, productID } = req.query;

    try {
        // Find the ownerID based on the productID
        const product = await ProductModel.findById(productID); // Ensure you have the ProductModel imported
        const ownerID = product.ownerID; // Get ownerID from product

        // Retrieve messages where either the user is the owner or the owner is the user
        const messages = await MessageModel.find({
            $or: [
                { userID: userID, ownerID: ownerID },
                { userID: ownerID, ownerID: userID }
            ]
        }).sort({ createdAt: 1 }); // Sort by creation date

        return res.status(200).send({ status: true, data: messages });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: false, message: 'Error retrieving messages' });
    }

}

const getUserMessages = async (req, res) => {
    try {
        const userID = req.params.id

        console.log(req.params.id);
        

        if (!userID) {
            return sendResponse(req, res, false, "Invalid data provided", null);
        }

        let result = await MessageModal.find({ senderID: userID });
        console.log(result)
        console.log(userID)
        if (result && result.length > 0) {
            sendResponse(req, res, true, "Messages Found successfully", result);
        } else {
            sendResponse(req, res, false, "Error fetching messages, try again", null);
        }

    } catch (err) {
        console.error(err);
        sendResponse(req, res, false, "Error proceeding your request, try again", null);
    }
};

const getreceiverMessages = async (req, res) => {
    try {
        const userID = req.params.id

        console.log(req.params.id);
        

        if (!userID) {
            return sendResponse(req, res, false, "Invalid data provided", null);
        }

        let result = await MessageModal.find({ receiverID: userID });
        console.log(result)
        console.log(userID)
        if (result && result.length > 0) {
            sendResponse(req, res, true, "Messages Found successfully", result);
        } else {
            sendResponse(req, res, false, "Error fetching messages, try again", null);
        }

    } catch (err) {
        console.error(err);
        sendResponse(req, res, false, "Error proceeding your request, try again", null);
    }
};

const getMessagesToAdmin = async (req, res) => {
    try {

        let result = await MessageModal.find({ toAdmin: true });
        if (result) {
            sendResponse(req, res, true, "Messages Found successfully", result);
        } else {
            sendResponse(req, res, false, "Error fetching messages, try again", null);
        }

    } catch (err) {
        console.error(err);
        sendResponse(req, res, false, "Error proceeding your request, try again", null);
    }
};



module.exports = {
    sendMessage,
    getUserMessages, 
    getMessagesToAdmin,
    getMessages,
    getreceiverMessages
}
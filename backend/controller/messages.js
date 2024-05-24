const MessageModal = require('../modal/Message')
const sendResponse = require("../utils/sendResponse")

const sendMessage = async (req, res) => {
    try {
        if (!req.body) {
            return sendResponse(req, res, false, "Invalid data provided", null);
        }

        let message = new MessageModal(req.body);
        let result = await message.save();
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

const getUserMessages = async (req, res) => {
    try {
        const userID = req.query.id

        if (!userID) {
            return sendResponse(req, res, false, "Invalid data provided", null);
        }

        let result = await MessageModal.find({ userID: userID });
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
    getMessagesToAdmin
}
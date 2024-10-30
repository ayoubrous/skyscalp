const Conversation = require('../modal/Conversation');

const sendMessageConv = async (req, res) => {
    const { userID, ownerID, productID, content , sendermsjID } = req.body;

    try {
        let conversation = await Conversation.findOne({ 
            productID, 
            $or: [{ userID : userID , ownerID : ownerID }, { userID: ownerID, ownerID: userID }]
        });

        if (!conversation) {
            // Create a new conversation if it doesn't exist
            conversation = new Conversation({ userID, ownerID, productID, messages: [] });
        }

        if (!conversation.messages) {
            conversation.messages = []; // Ensure that messages is initialized
        }

        // Add the message to the conversation
        const message = {
            senderID : sendermsjID, // ID of the sender
            message : content,   // The actual message content
            timestamp: new Date() // Optional: include a timestamp
        };
        console.log(message);
        
        conversation.messages.push(message);
        await conversation.save();

        return res.status(200).json({ message: "Message sent successfully!", conversation });
    } catch (error) {
        console.error("Error sending message:", error);
        return res.status(500).json({ message: "Error sending message", error });
    }
};

const getMessagesConv = async (req, res) => {
    try {
        // Extract query parameters from the request
        const { userID, ownerID, productID } = req.query;  // Or use req.params for route parameters

        // Build the query object dynamically based on the provided parameters
        let query = {};
        if (userID) {
            query.userID = userID;
        }
        if (ownerID) {
            query.ownerID = ownerID;
        }
        if (productID) {
            query.productID = productID;
        }

        // Retrieve messages from the database based on the query
        const conv = await Conversation.findOne(query);

        // Send the retrieved messages back in the response
        if (conv.messages.length > 0) {
            console.log(conv.messages);
            
            res.status(200).json({
                success: true,
                message: 'Messages retrieved successfully',
                data: conv.messages,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'No messages found',
            });
        }
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Could not retrieve messages.',
        });
    }
};



const getAdminMessages = async (req, res) => {
    const { ownerID } = req.query;

    if (!ownerID) {
        return res.status(400).json({ status: false, message: "Owner ID is required" });
    }
    try {
        const conv = await Conversation.find({ ownerID :ownerID });
        if (conv.length > 0) {
            console.log(conv);
            
            res.status(200).json({
                success: true,
                message: 'Messages retrieved successfully',
                data: conv,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'No messages found',
            });
        }
    } catch (err) {
        res.status(500).json({ status: false, message: 'Error fetching messages' });
    }
}

const getUserMessages = async (req, res) => {
    const { senderID } = req.query;

    if (!senderID) {
        return res.status(400).json({ status: false, message: "Sender ID is required" });
    }
    try {
        const conv = await Conversation.find({ userID :senderID });
        if (conv.length > 0) {
            console.log(conv);
            
            res.status(200).json({
                success: true,
                message: 'Messages retrieved successfully',
                data: conv,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'No messages found',
            });
        }
    } catch (err) {
        res.status(500).json({ status: false, message: 'Error fetching messages' });
    }
}



module.exports = {
    sendMessageConv,
    getMessagesConv,
    getAdminMessages,
    getUserMessages
}
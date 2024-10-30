export async function sendMessage(senderID, receiverID, content,sendermsjID, productID) {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("Access-Control-Allow-Origin", "*");

        
        const raw = JSON.stringify({
            userID : senderID,
            ownerID : receiverID,
            productID,
            content,
            sendermsjID,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        console.log("Sending message with senderID:", senderID, "to receiverID:", receiverID);

        const response = await fetch(`http://localhost:5500/api/sendMessageConv`, requestOptions);

        if (!response.ok) {
            // Log the response body when an error occurs for better debugging
            const errorDetails = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}. Details: ${errorDetails}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error while sending message:", error);
        throw error; // You might want to throw the error again to handle it in the calling code
    }
}

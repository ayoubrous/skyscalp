export async function sendMessage(toAdmin,userID, productID, email, phone, firstName, lastName, message) {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            toAdmin,
            userID,
            productID,
            email,
            phone,
            firstName,
            lastName,
            message
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/sendMessage`, requestOptions);
        const result = await response.json();

        return result;
    } catch (error) {
        console.log(error)
    }
}
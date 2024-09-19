export async function addToFavourites(userID, productID, collectionReference) {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            userID: userID,
            productID: productID,
            collectionReference: collectionReference
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/addToFavourites`, requestOptions);
        const result = await response.json();

        return result;
    } catch (error) {
        console.error("Error:", error);
    }
}


export async function removeFromFavourites(userID, productID) {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            userID: userID,
            productID: productID
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/removeFromFavourites`, requestOptions);
        const result = await response.json();

        return result;
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function checkInFavourites(userID, productID) {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            userID: userID,
            productID: productID
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/checkInFavourites`, requestOptions);
        const result = await response.json();

        return result;
    } catch (error) {
        console.error("Error:", error);
    }
}


export async function addFavouriteToProduct(productID, favouriteID, action, isMaterial, collectionReference) {
    try {


        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        let apiUrl = `${process.env.REACT_APP_SERVER_URL}/api/updateProductFavourites/${collectionReference}/${productID}/${favouriteID}/${action}`
        const response = await fetch(apiUrl, requestOptions);
        const result = await response.json();

        return result;
    } catch (error) {
        console.error("Error:", error);
    }
}




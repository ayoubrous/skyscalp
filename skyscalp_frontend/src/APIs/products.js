export const getProductByID = async (id) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            redirect: "follow",
            headers: myHeaders
        };

        const response1 = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/getPropertyById/${id}`, requestOptions);
        const result1 = await response1.json();

        if (result1.status) {
            return [result1.data];
        }

        const response2 = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/getProductById/${id}`, requestOptions);
        const result2 = await response2.json();

        if (result2.status) {
            return [result2.data];
        }

        return [];
    } catch (err) {
        console.log(err);
        return [];
    }
};

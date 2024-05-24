export default function UpdateAnalytics() {
    fetch('https://ipapi.co/xml')
        .then(response => response.text())
        .then(async data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'application/xml');

            const ip = xmlDoc.querySelector('ip').textContent;
            const city = xmlDoc.querySelector('city').textContent;
            const country_name = xmlDoc.querySelector('country_name').textContent;
            const country = xmlDoc.querySelector('country').textContent;
            const browser = navigator.userAgent
            const user = JSON.parse(localStorage.getItem("user"))

            try {
                let analyticsData = {
                    date: Date.now(),
                    ip: ip,
                    city: city,
                    country: country_name,
                    countryCode: country,
                    useragent: browser,
                    userID: user.userID
                }

                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify(analyticsData);

                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow"
                };

                fetch(`${process.env.REACT_APP_SERVER_URL}/api/addAnalytics`, requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        if (result.status) {
                            // console.log(result.message)
                        }
                        else {
                            console.log(result.message)
                        }
                    })
                    .catch((error) => console.error(error));
            } catch (error) {
                console.log("Error adding analytics ", error)

            }

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

}

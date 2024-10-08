// const locations = [
//     {
//         name: "Casablanca",
//         label: "City",
//         group: "Morocco",
//         country: "Morocco",
//         state: "Grand Casablanca",
//         city: "Casablanca",
//         latitude: 33.5731,
//         longitude: -7.5898
//     },
//     {
//         name: "Grand Casablanca",
//         label: "State",
//         group: "Morocco",
//         country: "Morocco",
//         state: "Grand Casablanca",
//         city: "Casablanca",
//         latitude: 33.5731,
//         longitude: -7.5898
//     },
//     {
//         name: "Morocco",
//         label: "Country",
//         group: "World",
//         country: "Morocco",
//         state: null,
//         city: null,
//         latitude: 31.7917,
//         longitude: -7.0926
//     },
//     {
//         name: "France",
//         label: "Country",
//         group: "World",
//         country: "France",
//         state: null,
//         city: null,
//         latitude: 31.7917,
//         longitude: -7.0926
//     },
//     {
//         name: "Rue Mohammed V",
//         label: "Street",
//         group: "Casablanca",
//         country: "Morocco",
//         state: "Grand Casablanca",
//         city: "Casablanca",
//         latitude: 33.5951,
//         longitude: -7.6186
//     },
//     {
//         name: "Marrakech",
//         label: "City",
//         group: "Morocco",
//         country: "Morocco",
//         state: "Marrakech-Safi",
//         city: "Marrakech",
//         latitude: 31.6295,
//         longitude: -7.9811
//     },
//     {
//         name: "Marrakech-Safi",
//         label: "State",
//         group: "Morocco",
//         country: "Morocco",
//         state: "Marrakech-Safi",
//         city: "Marrakech",
//         latitude: 31.6295,
//         longitude: -7.9811
//     },
//     {
//         name: "Fes",
//         label: "City",
//         group: "Morocco",
//         country: "Morocco",
//         state: "Fes-Meknes",
//         city: "Fes",
//         latitude: 34.0181,
//         longitude: -5.0078
//     },
//     {
//         name: "Fes-Meknes",
//         label: "State",
//         group: "Morocco",
//         country: "Morocco",
//         state: "Fes-Meknes",
//         city: "Fes",
//         latitude: 34.0181,
//         longitude: -5.0078
//     },
//     {
//         name: "Tangier",
//         label: "City",
//         group: "Morocco",
//         country: "Morocco",
//         state: "Tanger-Tetouan-Al Hoceima",
//         city: "Tangier",
//         latitude: 35.7595,
//         longitude: -5.8330
//     },
//     {
//         name: "Tanger-Tetouan-Al Hoceima",
//         label: "State",
//         group: "Morocco",
//         country: "Morocco",
//         state: "Tanger-Tetouan-Al Hoceima",
//         city: "Tangier",
//         latitude: 35.7595,
//         longitude: -5.8330
//     },
//     {
//         name: "Rabat",
//         label: "City",
//         group: "Morocco",
//         country: "Morocco",
//         state: "Rabat-Sale-Kenitra",
//         city: "Rabat",
//         latitude: 34.0208,
//         longitude: -6.8416
//     },
//     {
//         name: "Rabat-Sale-Kenitra",
//         label: "State",
//         group: "Morocco",
//         country: "Morocco",
//         state: "Rabat-Sale-Kenitra",
//         city: "Rabat",
//         latitude: 34.0208,
//         longitude: -6.8416
//     },
//     {
//         name: "Agadir",
//         label: "City",
//         group: "Morocco",
//         country: "Morocco",
//         state: "Souss-Massa",
//         city: "Agadir",
//         latitude: 30.4220,
//         longitude: -9.5595
//     },
//     {
//         name: "Souss-Massa",
//         label: "State",
//         group: "Morocco",
//         country: "Morocco",
//         state: "Souss-Massa",
//         city: "Agadir",
//         latitude: 30.4220,
//         longitude: -9.5595
//     },
//     {
//         name: "Mohammed VI Avenue",
//         label: "Street",
//         group: "Casablanca",
//         country: "Morocco",
//         state: "Grand Casablanca",
//         city: "Casablanca",
//         latitude: 33.5885,
//         longitude: -7.6114
//     },
//     {
//         name: "Hassan II Avenue",
//         label: "Street",
//         group: "Casablanca",
//         country: "Morocco",
//         state: "Grand Casablanca",
//         city: "Casablanca",
//         latitude: 33.6036,
//         longitude: -7.6313
//     }
// ];

let locations = []


export function getLocations() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch(`${process.env.REACT_APP_SERVER_URL}/api/location/getAllLocations`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if (result.status) {
                locations.length = 0;  // Clear the array
                locations.push(...result.data);  // Update the array in place
            } else {
                console.log(result.message);
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

export default locations



// {
//     "regions": [
//       {
//         "name": "Tanger-Tétouan-Al Hoceïma",
//         "latitude": "35.7483",
//         "longitude": "-5.8441"
//       },
//       {
//         "name": "Oriental",
//         "latitude": "34.6856",
//         "longitude": "-2.4164"
//       },
//       {
//         "name": "Fès-Meknès",
//         "latitude": "33.9925",
//         "longitude": "-4.9783"
//       },
//       {
//         "name": "Rabat-Salé-Kénitra",
//         "latitude": "34.0209",
//         "longitude": "-6.8415"
//       },
//       {
//         "name": "Béni Mellal-Khénifra",
//         "latitude": "32.4939",
//         "longitude": "-6.3631"
//       },
//       {
//         "name": "Casablanca-Settat",
//         "latitude": "33.5731",
//         "longitude": "-7.5898"
//       },
//       {
//         "name": "Marrakech-Safi",
//         "latitude": "31.6258",
//         "longitude": "-7.9891"
//       },
//       {
//         "name": "Drâa-Tafilalet",
//         "latitude": "30.7138",
//         "longitude": "-5.9699"
//       },
//       {
//         "name": "Souss-Massa",
//         "latitude": "30.4422",
//         "longitude": "-9.2797"
//       },
//       {
//         "name": "Guelmim-Oued Noun",
//         "latitude": "28.9734",
//         "longitude": "-10.0612"
//       },
//       {
//         "name": "Laâyoune-Sakia El Hamra",
//         "latitude": "27.1493",
//         "longitude": "-13.199"
//       },
//       {
//         "name": "Dakhla-Oued Ed-Dahab",
//         "latitude": "23.7186",
//         "longitude": "-15.9633"
//       }
//     ]
//   }

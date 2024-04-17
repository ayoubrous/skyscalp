import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaAngleDown, FaXmark } from 'react-icons/fa6';
import * as geolib from 'geolib';

import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';

export default function FilterTagsBackup() {
    const [t] = useTranslation();
    // Example usage:
    const locations = [
        {
            name: "Casablanca",
            label: "City",
            group: "Morocco",
            country: "Morocco",
            state: "Grand Casablanca",
            city: "Casablanca",
            region: "Grand Casablanca",
            latitude: 33.5731,
            longitude: -7.5898
        },
        {
            name: "Grand Casablanca",
            label: "Region",
            group: "Morocco",
            country: "Morocco",
            state: "Grand Casablanca",
            city: "Casablanca",
            region: "Grand Casablanca",
            latitude: 33.5731,
            longitude: -7.5898
        },
        {
            name: "Morocco",
            label: "Country",
            group: "World",
            country: "Morocco",
            state: null,
            city: null,
            region: null,
            latitude: 31.7917,
            longitude: -7.0926
        },
        {
            name: "Rue Mohammed V",
            label: "Street",
            group: "Casablanca",
            country: "Morocco",
            state: "Grand Casablanca",
            city: "Casablanca",
            region: "Grand Casablanca",
            latitude: 33.5951,
            longitude: -7.6186
        },
        {
            name: "Marrakech",
            label: "City",
            group: "Morocco",
            country: "Morocco",
            state: "Marrakech-Safi",
            city: "Marrakech",
            region: "Marrakech-Safi",
            latitude: 31.6295,
            longitude: -7.9811
        },
        {
            name: "Marrakech-Safi",
            label: "Region",
            group: "Morocco",
            country: "Morocco",
            state: "Marrakech-Safi",
            city: "Marrakech",
            region: "Marrakech-Safi",
            latitude: 31.6295,
            longitude: -7.9811
        },
        {
            name: "Fes",
            label: "City",
            group: "Morocco",
            country: "Morocco",
            state: "Fes-Meknes",
            city: "Fes",
            region: "Fes-Meknes",
            latitude: 34.0181,
            longitude: -5.0078
        },
        {
            name: "Fes-Meknes",
            label: "Region",
            group: "Morocco",
            country: "Morocco",
            state: "Fes-Meknes",
            city: "Fes",
            region: "Fes-Meknes",
            latitude: 34.0181,
            longitude: -5.0078
        },
        {
            name: "Tangier",
            label: "City",
            group: "Morocco",
            country: "Morocco",
            state: "Tanger-Tetouan-Al Hoceima",
            city: "Tangier",
            region: "Tanger-Tetouan-Al Hoceima",
            latitude: 35.7595,
            longitude: -5.8330
        },
        {
            name: "Tanger-Tetouan-Al Hoceima",
            label: "Region",
            group: "Morocco",
            country: "Morocco",
            state: "Tanger-Tetouan-Al Hoceima",
            city: "Tangier",
            region: "Tanger-Tetouan-Al Hoceima",
            latitude: 35.7595,
            longitude: -5.8330
        },
        {
            name: "Rabat",
            label: "City",
            group: "Morocco",
            country: "Morocco",
            state: "Rabat-Sale-Kenitra",
            city: "Rabat",
            region: "Rabat-Sale-Kenitra",
            latitude: 34.0208,
            longitude: -6.8416
        },
        {
            name: "Rabat-Sale-Kenitra",
            label: "Region",
            group: "Morocco",
            country: "Morocco",
            state: "Rabat-Sale-Kenitra",
            city: "Rabat",
            region: "Rabat-Sale-Kenitra",
            latitude: 34.0208,
            longitude: -6.8416
        },
        {
            name: "Agadir",
            label: "City",
            group: "Morocco",
            country: "Morocco",
            state: "Souss-Massa",
            city: "Agadir",
            region: "Souss-Massa",
            latitude: 30.4220,
            longitude: -9.5595
        },
        {
            name: "Souss-Massa",
            label: "Region",
            group: "Morocco",
            country: "Morocco",
            state: "Souss-Massa",
            city: "Agadir",
            region: "Souss-Massa",
            latitude: 30.4220,
            longitude: -9.5595
        },
        {
            name: "Mohammed VI Avenue",
            label: "Street",
            group: "Casablanca",
            country: "Morocco",
            state: "Grand Casablanca",
            city: "Casablanca",
            region: "Grand Casablanca",
            latitude: 33.5885,
            longitude: -7.6114
        },
        {
            name: "Hassan II Avenue",
            label: "Street",
            group: "Casablanca",
            country: "Morocco",
            state: "Grand Casablanca",
            city: "Casablanca",
            region: "Grand Casablanca",
            latitude: 33.6036,
            longitude: -7.6313
        }
    ];
    
    // This dataset now includes the "state" field representing the administrative division associated with each location within Morocco.
    

    // This dataset now includes latitude and longitude coordinates for each location.
    const handleLocationSelect = async (value) => {
        try {
            const results = await geocodeByAddress(value);
            const latLng = await getLatLng(results[0]);

            const center = { latitude: latLng.lat, longitude: latLng.lng };
            const radiusInMeters = 2000; // 5 kilometers in meters

            // Filter locations to find those within the specified radius
            const locationsWithinRadius = locations.filter(location => {
                const locationCoords = { latitude: location.latitude, longitude: location.longitude };
                return geolib.isPointWithinRadius(locationCoords, center, radiusInMeters);
            });

            // Log locations within 5km
            console.log('Locations within 5km:', locationsWithinRadius);
        } catch (error) {
            console.error('Error selecting location:', error);
        }
    };

    return (
        <div className="">
            <button onClick={() => handleLocationSelect("Rabat")}>Search</button>
        </div>
    );
}
import React, { useEffect, useRef, useState } from 'react';
import * as geolib from 'geolib';

import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import locations from '../../assets/data/locations';

export default function LocationsByRadius() {
    // Example usage:

    // This dataset now includes latitude and longitude coordinates for each location.
    const handleLocationSelect = async (value) => {
        try {
            const results = await geocodeByAddress(value);
            const latLng = await getLatLng(results[0]);

            console.log(results)

            const center = { latitude: latLng.lat, longitude: latLng.lng };
            const radiusInMeters = 5000; // 5 kilometers in meters

            // Filter locations to find those within the specified radius
            const locationsWithinRadius = locations.filter(location => {
                const locationCoords = { latitude: location.latitude, longitude: location.longitude };
                return geolib.isPointWithinRadius(locationCoords, center, radiusInMeters);
            });

            // Log locations within 5km
            console.log(locationsWithinRadius);
        } catch (error) {
            console.error('Error selecting location:', error);
        }
    };

    return (
        <div className="">
            <button onClick={() => handleLocationSelect("Tangier")}>Search</button>
        </div>
    );
}

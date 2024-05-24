import * as geolib from 'geolib';

import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import locations from '../../assets/data/locations';

export const getLocationsInRadius = async (value, radius) => {
    try {
        const results = await geocodeByAddress(value);
        if (!results || results.length === 0) {
            throw new Error('No results found for the given address');
        }

        const latLng = await getLatLng(results[0]);
        const center = { latitude: latLng.lat, longitude: latLng.lng };

        // Filter locations to find those within the specified radius
        const locationsWithinRadius = locations.filter(location => {
            const locationCoords = { latitude: location.latitude, longitude: location.longitude };
            return geolib.isPointWithinRadius(locationCoords, center, (radius*1000));
        });

        return {
            data: locationsWithinRadius,
            status: true
        };
    } catch (error) {
        console.error('Error selecting location:', error.message);
        return {
            data: error.message,
            status: false
        };
    }
}

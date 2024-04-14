import React, { useState } from 'react';
import axios from 'axios';
import * as geolib from 'geolib';

const MapSearch = () => {
  const [location, setLocation] = useState('');
  const [areas, setAreas] = useState([]);

  const handleLocationSearch = async () => {
    try {
      console.log(location)
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`);
      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        const center = { latitude: parseFloat(lat), longitude: parseFloat(lon) };
        const radius = 5000; // 5 km radius

        // Calculate bounding box
        const boundingBox = geolib.getBoundsOfDistance(center, radius);


        // Extract coordinates
        const minLatitude = boundingBox[0].latitude;
        const minLongitude = boundingBox[0].longitude;
        const maxLatitude = boundingBox[1].latitude;
        const maxLongitude = boundingBox[1].longitude;

        // Create bounding box string in the format: minLatitude,minLongitude,maxLatitude,maxLongitude
        const bboxString = `${minLatitude},${minLongitude},${maxLatitude},${maxLongitude}`;

        // Fetch areas within the bounding box from OSM
        const areasResponse = await axios.get(
          `https://overpass-api.de/api/interpreter?data=node["place"](${bboxString});out;`
        );

        if (areasResponse.data) {
          setAreas(areasResponse.data);
        }
      }
    } catch (error) {
      console.error('Error fetching areas:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter a location..."
      />
      <button onClick={handleLocationSearch}>Search</button>

      <ul>
        {areas.map((area, index) => (
          <li key={index}>{area.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MapSearch;

import React from 'react'
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';

export default function GetLocationMap() {

    const handleClick = (e) => {
        console.log(e.latlng); // This will log the coordinates on click
    };
    function ClickHandler({ handleClick }) {
        const map = useMapEvents({
            click: (e) => {
                handleClick(e);
            },
        });

        return null;
    }
    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <ClickHandler handleClick={handleClick} />
        </MapContainer>
    )
}

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

export default function GetLocationMap({clickedPosition, setClickedPosition}) {
    // const [clickedPosition, setClickedPosition] = useState(null);

    const handleClick = (e) => {
        const { lat, lng } = e.latlng;
        setClickedPosition([lat, lng]);
        console.log(lat, lng)
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
        <>

            <MapContainer center={[34.020882, -6.841650]} zoom={15} style={{ height: '400px', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <ClickHandler handleClick={handleClick} />
                {clickedPosition && (
                    <Marker position={clickedPosition}>
                        <Popup>
                            A marker here! <br /> Clicked position: {clickedPosition[0]}, {clickedPosition[1]}
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </>

    );
}

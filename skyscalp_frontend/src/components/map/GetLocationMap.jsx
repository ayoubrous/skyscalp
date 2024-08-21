import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

export default function GetLocationMap({ clickedPosition, setClickedPosition, centerPosition }) {
    // const [clickedPosition, setClickedPosition] = useState(null);
    const [position, setPosition] = useState([centerPosition[0], centerPosition[1]])

    useEffect(() => {
        setPosition([centerPosition[0], centerPosition[1]])
    }, [centerPosition])
    const handleClick = (e) => {
        const { lat, lng } = e.latlng;
        setClickedPosition([lat, lng]);
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

            {/* <p>{position}</p> */}
            <MapContainer center={position} zoom={4} style={{ height: '400px', width: '100%' }}>
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

import React, { useEffect, useRef, useState } from 'react';
import locations from '../../assets/data/locations'

export default function CustomLocationsDropdown({handleLocationSelect, selectedLocations}) {
    const drpRef = useRef()
    const [showDrp, setShowDrp] = useState(false)
    const [inputText, setInputText] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedRad, setSelectedRad] = useState(null)

    const handleClickOutside = (e) => {
        if (drpRef.current && !drpRef.current.contains(e.target)) {
            setShowDrp(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleInputChange = (e) => {
        setShowDrp(true)
        const inputValue = e.target.value.trim(); // Trim input value to remove leading/trailing spaces
        setInputText(inputValue);

        // Filter locations based on input value (matching first letter)
        const filteredSuggestions = locations.filter(location =>
            location.name.toLowerCase().startsWith(inputValue.toLowerCase())
        );

        setSuggestions(filteredSuggestions);
    };

    const groupedSuggestions = {};

    // Group suggestions by label and group
    suggestions.forEach(location => {
        if (!groupedSuggestions[location.label]) {
            groupedSuggestions[location.label] = {};
        }

        if (!groupedSuggestions[location.label][location.group]) {
            groupedSuggestions[location.label][location.group] = [];
        }

        groupedSuggestions[location.label][location.group].push(location);
    });

    return (
        <>
            <input
                type="text"
                className='custom-input'
                value={inputText}
                onChange={handleInputChange}
                placeholder="Type to search locations..."
                style={{width: "100%"}}
            />
            {inputText && suggestions.length > 0 && (
                <div className={`custom-dropdown ${showDrp ? 'show': ''}`} ref={drpRef} style={{maxHeight: "250px"}}>
                    {Object.entries(groupedSuggestions).map(([label, groups]) => (
                        <div key={label}>
                            <p className='fw-bold px-2 py-1 color-primary'>{label}</p>
                            {Object.entries(groups).map(([group, locations]) => (
                                <div key={group}>
                                    <ul>
                                        {locations.map((location, index) => (
                                            <li className='custom-dropdown-item' key={index} onClick={()=> handleLocationSelect(location.name, label)}>
                                                {location.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ))}

                    <div className={`select-radius-strip ${selectedLocations.length > 1 ? 'disabled': ''}`}>
                        <p>Radius (Km)</p>
                        <div className="radius-options">
                            <span className={`rad-opt ${selectedRad === '2' ? 'active': ''}`} onClick={()=> setSelectedRad('2')}>2</span>
                            <span className={`rad-opt ${selectedRad === '5' ? 'active': ''}`} onClick={()=> setSelectedRad('5')}>5</span>
                            <span className={`rad-opt ${selectedRad === '10' ? 'active': ''}`} onClick={()=> setSelectedRad('10')}>10</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

import React, { useEffect, useRef, useState } from 'react';
import locations from '../../assets/data/locations'
import { getLocationsInRadius } from './getLocationsInRadius';
import { useTranslation } from 'react-i18next';

export default function CustomLocationsDropdown({ handleLocationSelect, selectedLocations, radius, handleRadiusChange }) {
    const [t] = useTranslation()
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
        setShowDrp(true);
        const inputValue = e.target.value.trim(); // Trim input value to remove leading/trailing spaces
        setInputText(inputValue);

        let selectedCountry = localStorage.getItem('country') || 'morocco';

        const filteredSuggestions = locations.filter(location =>
            // location.country.toLowerCase() === selectedCountry.toLowerCase() &&
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
                placeholder={t("searchLocationPlaceholder")}
                style={{ width: "100%" }}
            />
            {
                radius !== null && (
                    <p className='radiusChip' onClick={() => handleRadiusChange(null)}>{`+ ${radius} km`}</p>
                )
            }
            {inputText && suggestions.length > 0 && (
                <div className={`custom-dropdown ${showDrp ? 'show' : ''}`} ref={drpRef} style={{ maxHeight: "250px" }}>
                    {Object.entries(groupedSuggestions).map(([label, groups]) => (
                        <div key={label}>
                            <p className='fw-bold px-2 py-1 color-primary'>{t(label.toLowerCase())}</p>
                            {Object.entries(groups).map(([group, locations]) => (
                                <div key={group}>
                                    <ul>
                                        {locations.map((location, index) => (
                                            <li className='custom-dropdown-item' key={index} onClick={() => handleLocationSelect(location.name, label)}>
                                                {location.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ))}

                    <div className={`select-radius-strip ${selectedLocations.length === 1 ? '' : 'disabled'}`}>
                        <p>{t("Radius")} (Km)</p>
                        <div className="radius-options">
                            <span className={`rad-opt ${radius === 2 ? 'active' : ''}`} onClick={() => handleRadiusChange(2)}>2 Km</span>
                            <span className={`rad-opt ${radius === 5 ? 'active' : ''}`} onClick={() => handleRadiusChange(5)}>5 Km</span>
                            <span className={`rad-opt ${radius === 10 ? 'active' : ''}`} onClick={() => handleRadiusChange(10)}>10 Km</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

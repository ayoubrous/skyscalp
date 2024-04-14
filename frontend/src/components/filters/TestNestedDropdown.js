import React, { useState } from 'react';

export default function TestNestedDropdown() {
    const [inputText, setInputText] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const locations = [
        {
            name: "Casablanca",
            label: "City",
            group: "Morocco",
            country: "Morocco",
            state: "Grand Casablanca",
            city: "Casablanca",
            latitude: 33.5731,
            longitude: -7.5898
        },
        {
            name: "Grand Casablanca",
            label: "State",
            group: "Morocco",
            country: "Morocco",
            state: "Grand Casablanca",
            city: "Casablanca",
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
            latitude: 31.6295,
            longitude: -7.9811
        },
        {
            name: "Marrakech-Safi",
            label: "State",
            group: "Morocco",
            country: "Morocco",
            state: "Marrakech-Safi",
            city: "Marrakech",
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
            latitude: 34.0181,
            longitude: -5.0078
        },
        {
            name: "Fes-Meknes",
            label: "State",
            group: "Morocco",
            country: "Morocco",
            state: "Fes-Meknes",
            city: "Fes",
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
            latitude: 35.7595,
            longitude: -5.8330
        },
        {
            name: "Tanger-Tetouan-Al Hoceima",
            label: "State",
            group: "Morocco",
            country: "Morocco",
            state: "Tanger-Tetouan-Al Hoceima",
            city: "Tangier",
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
            latitude: 34.0208,
            longitude: -6.8416
        },
        {
            name: "Rabat-Sale-Kenitra",
            label: "State",
            group: "Morocco",
            country: "Morocco",
            state: "Rabat-Sale-Kenitra",
            city: "Rabat",
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
            latitude: 30.4220,
            longitude: -9.5595
        },
        {
            name: "Souss-Massa",
            label: "State",
            group: "Morocco",
            country: "Morocco",
            state: "Souss-Massa",
            city: "Agadir",
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
            latitude: 33.6036,
            longitude: -7.6313
        }
    ];

    // This dataset now includes the state names as label entries reflecting the administrative divisions used in the dataset.


    const handleInputChange = (e) => {
        const inputValue = e.target.value.trim(); // Trim input value to remove leading/trailing spaces
        setInputText(inputValue);

        // Filter locations based on input value (matching first letter)
        const filteredSuggestions = locations.filter(location =>
            location.name.toLowerCase().startsWith(inputValue.toLowerCase())
        );

        setSuggestions(filteredSuggestions);
    };

    const renderSuggestions = () => {
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
            <div className="custom-dropdown show">
                {Object.entries(groupedSuggestions).map(([label, groups]) => (
                    <div key={label}>
                        <p className='fw-bold'>{label}</p>
                        {Object.entries(groups).map(([group, locations]) => (
                            <div key={group}>
                                <ul>
                                    {locations.map((location, index) => (
                                        <li className='custom-dropdown-item' key={index}>
                                            {location.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ))}
                <div>
                    <p>Radius</p>
                </div>
            </div>
        );
    };

    return (
        <div className='all-locations' style={{ position: "relative" }}>
            <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Type to search locations..."
            />
            {inputText && suggestions.length > 0 && (
                renderSuggestions()
            )}
        </div>
    );
}

import React, { useState } from 'react';
import { services } from './assets/data/services';

export default function Test() {
    const [field, setField] = useState(null);
    const [experty, setExperty] = useState(null);
    const [filter1, setFilter1] = useState({
        filterName: null,
        selectedOption: null
    });
    const [filter2, setFilter2] = useState({
        filterName: null,
        selectedOption: null
    });
    const [filter3, setFilter3] = useState({
        filterName: null,
        selectedOption: null
    });

    // Handle the change for the field selection
    const handleFieldChange = (e) => {
        setField(e.target.value);
        setExperty(null); // Reset expertise when field changes
        setFilter1({ filterName: null, selectedOption: null });
        setFilter2({ filterName: null, selectedOption: null });
        setFilter3({ filterName: null, selectedOption: null });
    };

    // Handle the change for the expertise selection
    const handleExpertyChange = (e) => {
        setExperty(e.target.value);
        setFilter1({ filterName: null, selectedOption: null });
        setFilter2({ filterName: null, selectedOption: null });
        setFilter3({ filterName: null, selectedOption: null });
    };

    // Find the selected service based on the field
    const selectedService = services.find(service => service.field === field);

    // Find the selected expertise based on the expertise name
    const selectedExperty = selectedService?.expertise.find(expert => expert.expertyName === experty);

    // Handle filter selection and update the state accordingly
    const handleFilterChange = (filterKey, filterName, selectedOption) => {
        if (filterKey === 'filter1') {
            setFilter1({ filterName, selectedOption });
        } else if (filterKey === 'filter2') {
            setFilter2({ filterName, selectedOption });
        } else if (filterKey === 'filter3') {
            setFilter3({ filterName, selectedOption });
        }
    };

    return (
        <div>
            {/* Field Label and Select */}
            <label htmlFor="field">Field</label>
            <select id="field" onChange={handleFieldChange}>
                <option value="">Select Field</option>
                {services.map((service, index) => (
                    <option key={index} value={service.field}>{service.field}</option>
                ))}
            </select>
            <br />
            <br />

            {/* Expertise Label and Select */}
            {field && (
                <>
                    <label htmlFor="experty">Experty</label>
                    <select id="experty" onChange={handleExpertyChange}>
                        <option value="">Select Expertise</option>
                        {selectedService?.expertise.map((expert, index) => (
                            <option key={index} value={expert.expertyName}>{expert.expertyName}</option>
                        ))}
                    </select>
                </>
            )}
            <br />
            <br />

            {/* Filter 1 Label and Select */}
            {field && experty && (
                <>
                    <label htmlFor="filter1">{selectedExperty?.filter1.filterName}</label>
                    <select id="filter1" onChange={(e) => handleFilterChange('filter1', selectedExperty.filter1.filterName, e.target.value)}>
                        <option value="">Select {selectedExperty?.filter1.filterName}</option>
                        {selectedExperty?.filter1.options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </>
            )}

            <br />
            <br />

            {/* Filter 2 Label and Select */}
            {field && experty && (
                <>
                    <label htmlFor="filter2">{selectedExperty?.filter2.filterName}</label>
                    <select id="filter2" onChange={(e) => handleFilterChange('filter2', selectedExperty.filter2.filterName, e.target.value)}>
                        <option value="">Select {selectedExperty?.filter2.filterName}</option>
                        {selectedExperty?.filter2.options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </>
            )}
            <br />
            <br />

            {/* Filter 3 Label and Select */}
            {field && experty && (
                <>
                    <label htmlFor="filter3">{selectedExperty?.filter3.filterName}</label>
                    <select id="filter3" onChange={(e) => handleFilterChange('filter3', selectedExperty.filter3.filterName, e.target.value)}>
                        <option value="">Select {selectedExperty?.filter3.filterName}</option>
                        {selectedExperty?.filter3.options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </>
            )}

            <br /><br />
            {/* Display Selected Filters */}
            <div>
                <h3>Selected Filters:</h3>
                <p>Filter 1: {filter1.filterName} - {filter1.selectedOption}</p>
                <p>Filter 2: {filter2.filterName} - {filter2.selectedOption}</p>
                <p>Filter 3: {filter3.filterName} - {filter3.selectedOption}</p>
            </div>
        </div>
    );
}

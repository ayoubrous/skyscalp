import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaAngleDown, FaXmark } from 'react-icons/fa6';
import Select from 'react-select';

import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';

export default function HomeFilter() {
    const [t] = useTranslation();

    const categoryDropdownRef = useRef();

    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("")
    const [location, setLocation] = useState("")

    const formattedCategories = [
        { value: 'Excavators', label: 'Excavators' },
        { value: 'Bulldozers', label: 'Bulldozers' },
        { value: 'Cranes', label: 'Cranes' },
        { value: 'Loaders', label: 'Loaders' },
        { value: 'Backhoes', label: 'Backhoes' },
        { value: 'Dump Trucks', label: 'Dump Trucks' },
        { value: 'Pavers', label: 'Pavers' },
        { value: 'Residential', label: 'Residential' },
        { value: 'Commercial', label: 'Commercial' },
        { value: 'Industrial', label: 'Industrial' },
        { value: 'Agricultural', label: 'Agricultural' },
        { value: 'Vacant Land', label: 'Vacant Land' },
        { value: 'Rental', label: 'Rental' },
        { value: 'Condominium', label: 'Condominium' },
        { value: 'Townhouse', label: 'Townhouse' },
        { value: 'Multi-family', label: 'Multi-family' }
    ];


    const handleClickOutside = (e) => {
        if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target)) {
            setShowLocationDropdown(false);
        }
    };

    const handleCategoryChange = value => {
        setSelectedCategory(value)
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleLocationSelect = async value => {
        // const results = await geocodeByAddress(value);
        // const latLng = await getLatLng(results[0]);
        setLocation(value);
        // setCoordinates(latLng);
    };

    const handleFilter = () => {
        console.log(selectedCategory)
        console.log(location)
    }

    return (
        <div className="filter-area">
            <div className="custom-container">
                <p className="color-primary mb-2">Looking for something?</p>
                <div className="filter hero-filter">
                    <div className="split">
                        <div className="user-input">
                            <div className="search-input">
                                {/* <input type="text" className="custom-input" placeholder='Try Excavator, Apartment, Cement' value={selectedCategory} onChange={handleCategoryChange}/> */}
                                <Select
                                    className="custom-input bordor-0"
                                    classNamePrefix="select"
                                    placeholder="Select Category"
                                    name="color"
                                    options={formattedCategories}
                                    onChange={handleCategoryChange}
                                    value={selectedCategory}
                                    isClearable={true}
                                />
                            </div>
                            <div className="category-list" onClick={() => setShowLocationDropdown(!showLocationDropdown)}>
                                <PlacesAutocomplete
                                    value={location}
                                    onChange={setLocation}
                                    onSelect={handleLocationSelect}
                                >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <>

                                            <input className="custom-input location-input" {...getInputProps({ placeholder: "Type city" })} />

                                            <div className='category-dropdown show'>

                                                {suggestions.map(suggestion => {

                                                    return (
                                                        <>
                                                            <div className='dropdown-item' {...getSuggestionItemProps(suggestion, {})}>
                                                                {suggestion.description}
                                                            </div>
                                                        </>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    )}
                                </PlacesAutocomplete>
                            </div>
                        </div>
                        <div className="filter-btn">
                            <button className="custom-btn" onClick={handleFilter}>Search</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

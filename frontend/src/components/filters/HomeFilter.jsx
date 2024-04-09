import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaAngleDown, FaXmark } from 'react-icons/fa6';

export default function HomeFilter() {
    const [t] = useTranslation();

    const categoryDropdownRef = useRef();
    const searchDropdownRef = useRef();

    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(t("property"));
    const [selectedTypes, setSelectedTypes] = useState([])

    const types = [
        "Excavators",
        "Bulldozers",
        "Cranes",
        "Loaders",
        "Backhoes",
        "Dump Trucks",
        "Pavers",
        "Residential",
        "Commercial",
        "Industrial",
        "Agricultural",
        "Vacant Land",
        "Rental",
        "Condominium",
        "Townhouse",
        "Multi-family",
    ]

    const handleClickOutside = (e) => {
        if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target)) {
            setShowCategoryDropdown(false);
        }
        if (searchDropdownRef.current && !searchDropdownRef.current.contains(e.target)) {
            setShowSearchDropdown(false);
        }
    };

    const handleCategorySelect = category => {
        setShowCategoryDropdown(false);
        setSelectedCategory(category);
        document.removeEventListener("mousedown", handleClickOutside);
    };

    const handleTypeSelect = type => {
        setShowSearchDropdown(false);

        // include only unique types 
        if (!selectedTypes.includes(type)) {
            setSelectedTypes([...selectedTypes, type]);
        }
        document.removeEventListener("mousedown", handleClickOutside);
    };

    const removeTypeFilter = (index) => {
        // filtering out the item at the specified index
        const updatedTypes = selectedTypes.filter((_, i) => i !== index);
        setSelectedTypes(updatedTypes);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="filter-area">
            <div className="custom-container">
                <p className="color-primary mb-2">Looking for something?</p>
                <div className="filter hero-filter">
                    <div className="user-input">
                        <div className="search-input">
                            <input type="text" className="custom-input" placeholder='Try Excavator, Apartment, Cement' onClick={() => setShowSearchDropdown(!showSearchDropdown)} />

                            <div className={`search-dropdown ${showSearchDropdown ? 'show' : ''}`} ref={searchDropdownRef}>
                                {
                                    types.map((type, i) => {
                                        return (
                                            <p key={i} className="dropdown-item" onClick={() => handleTypeSelect(type)}>{type}</p>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="category-list" onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}>
                            <p className="color-primary">{selectedCategory}</p>
                            <FaAngleDown className='color-primary' />
                            <div ref={categoryDropdownRef} className={`category-dropdown ${showCategoryDropdown ? 'show' : ''}`}>
                                <p className="dropdown-item" onClick={() => handleCategorySelect(t("property"))}>Property</p>
                                <p className="dropdown-item" onClick={() => handleCategorySelect(t("machinery"))}>Machinery</p>
                                <p className="dropdown-item" onClick={() => handleCategorySelect(t("construction"))}>Construction</p>
                            </div>
                        </div>
                    </div>
                    <div className="filter-btn">
                        <button className="custom-btn">Search</button>
                    </div>
                </div>
                <div className="selected-filters">
                    {
                        selectedTypes.map((type, i) => {
                            return (
                                <span key={i} className='selected-filter'>{type} <FaXmark style={{ cursor: "pointer" }} onClick={() => removeTypeFilter(i)} /></span>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    );
}

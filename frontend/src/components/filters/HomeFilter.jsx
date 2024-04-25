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
import NestedDropdown from './NestedDropdown';

import { propertyCategories, machineryCategories, constructionCategories } from '../../assets/data/categories';
import CustomLocationsDropdown from './CustomLocationsDropdown';

export default function HomeFilter() {
    const [t] = useTranslation();

    const categoryDropdownRef = useRef();

    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("")
    const [location, setLocation] = useState("")
    const [checkedSubcategories, setCheckedSubcategories] = useState([]);
    const [showCategoriesDrp, setShowCategoriesDrp] = useState(false)
    const [activeTab, setActiveTab] = useState('property')
    const [activeCategories, setActiveCategories] = useState(propertyCategories)
    const [checkAll, setCheckAll] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState([])



    // filters for customLocationDropdown component 
    const [selectedCountries, setSelectedCountries] = useState([])
    const [selectedStates, setSelectedStates] = useState([])
    const [selectedCities, setSelectedCities] = useState([])
    const [selectedStreets, setSelectedStreets] = useState([])
    const [selectedAllLocations, setSelectedAllLocations] = useState([])

    const categoriesRef = useRef()

    useEffect(() => {
        if (activeTab === 'property') {
            setActiveCategories(propertyCategories)
        }
        else if (activeTab === 'machinery') {
            setActiveCategories(machineryCategories)
        }
        else if (activeTab === 'construction') {
            setActiveCategories(constructionCategories)
        }
    }, [activeTab])

    const handleClickOutside = (e) => {
        if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target)) {
            setShowLocationDropdown(false);
        }
        if (categoriesRef.current && !categoriesRef.current.contains(e.target)) {
            setShowCategoriesDrp(false);
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


    const handleFilter = () => {
        console.log(selectedCategory)
        console.log(location)
    }

    const handleActiveTab = (val) => {
        setActiveTab(val)
        setCheckedSubcategories([])
    }

    const removeTypeFilter = (index, name) => {
        // filtering out the item at the specified index
        const updatedTypes = selectedFilters.filter((_, i) => i !== index);
        setSelectedFilters(updatedTypes);

        if (selectedCountries.includes(name)) {
            setSelectedCountries(item => item.filter(item => item !== name));
        }
        if (selectedStates.includes(name)) {
            setSelectedStates(item => item.filter(item => item !== name));
        }
        if (selectedCities.includes(name)) {
            setSelectedCities(item => item.filter(item => item !== name));
        }
        if (selectedStreets.includes(name)) {
            setSelectedStreets(item => item.filter(item => item !== name));
        }
        if (selectedAllLocations.includes(name)) {
            setSelectedAllLocations(item => item.filter(item => item !== name));
        }




    };

    const handleLocationSelect = (location, type) => {
        console.log(location)
        console.log(type)



        if (!selectedFilters.includes(location)) {
            setSelectedFilters([...selectedFilters, location]);
            if (type === "Country") {
                setSelectedCountries([...selectedCountries, location]);
            }
            else if (type === "City") {
                setSelectedCities([...selectedCities, location]);

            }
            else if (type === "State") {
                setSelectedStates([...selectedStates, location]);

            }
            else if (type === "Street") {
                setSelectedStreets([...selectedStreets, location]);

            }
            setSelectedAllLocations([...selectedAllLocations, location]);


        }
    }

    const clearAllFilters = () => {
        setSelectedFilters([]);
        setCheckedSubcategories([]);
    }

    return (
        <div className="filter-area home-filter">
            <div className="custom-container">
                <p className="color-primary mb-2">Looking for something?</p>
                <div className="module-tabs ">
                    <div className={`module-tab ${activeTab === 'property' ? 'active' : ''}`} onClick={() => handleActiveTab('property')}>
                        <p>{t("property")}</p>
                    </div>
                    <div className={`module-tab ${activeTab === 'construction' ? 'active' : ''}`} onClick={() => handleActiveTab('construction')}>
                        <p>{t("construction")}</p>
                    </div>
                    <div className={`module-tab ${activeTab === 'machinery' ? 'active' : ''}`} onClick={() => handleActiveTab('machinery')}>
                        <p>{t("machinery")}</p>
                    </div>
                </div>
                <div className="filter hero-filter">
                    <div className="split">
                        <div className="user-input" >
                            <div className="custom-input" onClick={() => setShowCategoriesDrp(true)}>

                                <NestedDropdown
                                    show={showCategoriesDrp}
                                    categoriesRef={categoriesRef}
                                    categories={activeCategories}
                                    setCheckedSubcategories={setCheckedSubcategories}
                                    checkedSubcategories={checkedSubcategories}
                                    setCheckAll={setCheckAll}
                                    checkAll={checkAll}
                                />
                            </div>

                            <div className="category-list" onClick={() => setShowLocationDropdown(!showLocationDropdown)}>
                                <CustomLocationsDropdown selectedLocations={selectedAllLocations} handleLocationSelect={handleLocationSelect} />

                                {/* <PlacesAutocomplete
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
                                </PlacesAutocomplete> */}
                            </div>
                        </div>
                        <div className="filter-btn">
                            <button className="custom-btn" onClick={handleFilter}>Search</button>
                        </div>
                    </div>
                </div>
                <div className="selected-filters w-100">
                    <div className="d-flex justify-content-between gap-2 w-100">
                        <div className="tags">
                            {
                                selectedFilters.map((filter, i) => {
                                    return (
                                        <span key={i} className='selected-filter'>{filter} <FaXmark style={{ cursor: "pointer" }} onClick={() => removeTypeFilter(i, filter)} /></span>
                                    )
                                })
                            }
                        </div>
                        {
                            selectedFilters.length > 0 && (
                                <div className="selected-filter" style={{ cursor: "pointer" }} onClick={clearAllFilters}>Clear Filters</div>
                            )
                        }
                        </div>
                </div>

            </div>
        </div>
    );
}

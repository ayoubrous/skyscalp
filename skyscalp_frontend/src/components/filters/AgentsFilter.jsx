import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaAngleDown, FaXmark } from 'react-icons/fa6';
import Select from 'react-select';
import * as geolib from 'geolib';

import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import MapSearch from './MapSearch';
import TestNestedDropdown from './TestNestedDropdown';
import NestedDropdown from './NestedDropdown';
import CustomLocationsDropdown from './CustomLocationsDropdown';
import { furnitureCategories, machineryCategories } from '../../assets/data/categories';
import { furnitureBrands, furnitureTypes, machineryType, materialsBudget, yearBuildData } from '../../assets/data/filtersData';
import formatNumber from '../../utils/formatNumber';
import { getLocationsInRadius } from './getLocationsInRadius';



export default function AgentsFilter({
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    guarantee,
    setGuarantee,
    selectedBrands,
    setSelectedBrands,
    selectedCountries,
    setSelectedCountries,
    selectedStates,
    setSelectedStates,
    selectedCities,
    setSelectedCities,
    selectedStreets,
    setSelectedStreets,
    selectedConditions,
    setSelectedConditions,
    checkedSubcategories,
    setCheckedSubcategories,
    yearBuild,
    setYearBuild,
    selectedFilters,
    setSelectedFilters,
    selectedMaterialType,
    setSelectedMaterialType,
    applyFilters,
    clearAllFilters
}) {
    const [t] = useTranslation();

    const categoryDropdownRef = useRef();
    const minPriceRef = useRef();
    const brandRef = useRef();
    const condtionRef = useRef();
    const yearBuildRef = useRef();
    const categoriesRef = useRef()
    const machineryTypeRef = useRef()

    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [showCategoriesDrp, setShowCategoriesDrp] = useState(false)
    const [showPriceDrp, setShowPriceDrp] = useState(false);
    const [showBrandDrp, setShowBrandDrp] = useState(false);
    const [showConditionDrp, setShowConditionDrp] = useState(false);
    const [showYearDrp, setShowYearDrp] = useState(false)
    const [showMaterialType, setShowMaterialType] = useState(false)



    const [selectedAllLocations, setSelectedAllLocations] = useState([])

    const [checkAll, setCheckAll] = useState(false)
    const [radius, setRadius] = useState(null)


    const handleClickOutside = (e) => {
        if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target)) {
            setShowLocationDropdown(false);
        }
        if (minPriceRef.current && !minPriceRef.current.contains(e.target)) {
            setShowPriceDrp(false);
        }
        if (brandRef.current && !brandRef.current.contains(e.target)) {
            setShowBrandDrp(false);
        }
        if (condtionRef.current && !condtionRef.current.contains(e.target)) {
            setShowConditionDrp(false);
        }
        if (yearBuildRef.current && !yearBuildRef.current.contains(e.target)) {
            setShowYearDrp(false);
        }
        if (categoriesRef.current && !categoriesRef.current.contains(e.target)) {
            setShowCategoriesDrp(false);
        }
        if (machineryTypeRef.current && !machineryTypeRef.current.contains(e.target)) {
            setShowMaterialType(false);
        }
    };


    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleMinPrice = (e) => {
        // setShowMinPriceDrp(false)
        if (typeof e === 'string') {
            setMinPrice(e.replace(/\s+/g, ''));
        }
        else {
            setMinPrice(e)

        }
    }
    const handleMaxPrice = (e) => {
        setShowPriceDrp(false)
        if (typeof e === 'string') {
            setMaxPrice(e.replace(/\s+/g, ''));
        }
        else {
            setMaxPrice(e)
        }

    }


    const handleBrand = brand => {
        setShowBrandDrp(false)
        if (!selectedFilters.includes(brand)) {
            setSelectedFilters([...selectedFilters, brand]);
            setSelectedBrands([...selectedBrands, brand])
        }
        else {
            const updatedFilters = selectedFilters.filter(filter => filter !== brand);
            setSelectedFilters(updatedFilters);

            const updatedData = selectedBrands.filter(type => type !== brand);
            setSelectedBrands(updatedData);
        }
    }
    const handleCondtion = val => {
        setShowConditionDrp(false)
        if (!selectedFilters.includes(val)) {
            setSelectedFilters([...selectedFilters, val]);
            setSelectedConditions([...selectedConditions, val])
        }
        else {
            const updatedFilters = selectedFilters.filter(filter => filter !== val);
            setSelectedFilters(updatedFilters);

            const updatedData = selectedConditions.filter(type => type !== val);
            setSelectedConditions(updatedData);
        }
    }

    const handleYearBuild = (val) => {
        setShowYearDrp(false)
        // setYearBuild(val)
        if (!selectedFilters.includes(val)) {
            setSelectedFilters([...selectedFilters, val]);
            setYearBuild([...yearBuild, val])
        }
        else {
            const updatedFilters = selectedFilters.filter(filter => filter !== val);
            setSelectedFilters(updatedFilters);

            const updatedYearBuild = yearBuild.filter(type => type !== val);
            setYearBuild(updatedYearBuild);
        }
    }
    const handleMaterialType = (val) => {
        setShowMaterialType(false)
        const isAlreadySelected = selectedFilters.includes(val);

        if (isAlreadySelected) {
            const updatedFilters = selectedFilters.filter(filter => filter !== val);
            setSelectedFilters(updatedFilters);

            const updatedMachineryTypes = selectedMaterialType.filter(type => type !== val);
            setSelectedMaterialType(updatedMachineryTypes);
        } else {
            setSelectedFilters([...selectedFilters, val]);
            setSelectedMaterialType([...selectedMaterialType, val]);
        }
    };


    // for locations 
    const handleLocationSelect = (location, type) => {
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

    const handleRadiusChange = (rad) => {
        setRadius(rad)
        getLocationsInRadius(selectedAllLocations[0], rad)
            .then(res => {
                if (res.status) {
                    res.data.forEach(data => {
                        if (data.label === 'Country') {
                            if (!selectedCountries.includes(data.name)) {
                                setSelectedCountries([...selectedCountries, data.name])
                            }
                        }
                        if (data.label === 'State') {
                            if (!selectedStates.includes(data.name)) {
                                setSelectedStates([...selectedStates, data.name])
                            }
                        }
                        if (data.label === 'City') {
                            if (!selectedCities.includes(data.name)) {
                                setSelectedCities([...selectedCities, data.name])
                            }
                        }
                        if (data.label === 'Street') {
                            if (!selectedStreets.includes(data.name)) {
                                setSelectedStreets([...selectedStreets, data.name])
                            }
                        }
                    })
                }
                else {
                    console.log(res.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    const handleFilter = () => {
        applyFilters()
    }

    const removeTypeFilter = (index, name) => {
        // filtering out the item at the specified index
        const updatedTypes = selectedFilters.filter((_, i) => i !== index);
        setSelectedFilters(updatedTypes);

        if (selectedBrands.includes(name)) {
            setSelectedBrands(prevBrands => prevBrands.filter(item => item !== name));
        }
        if (selectedConditions.includes(name)) {
            setSelectedConditions(item => item.filter(item => item !== name));
        }
        if (selectedMaterialType.includes(name)) {
            setSelectedMaterialType(item => item.filter(item => item !== name));
        }
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
        if (yearBuild.includes(name)) {
            setYearBuild(item => item.filter(item => item !== name));
        }


        setRadius(null)
    };


    const handleClearFilters = () => {
        setSelectedFilters([]);
        setSelectedAllLocations([])
        setRadius(null)
        clearAllFilters()
    }

    return (
        <div className="filter-area my-4">
            <div className="custom-container">
                <p className="color-primary mb-2">Real Estate Experts, Legal or Financial Advisors: find what you need at the right price.</p>
                <div className="filter machinery-filter construction-filter">
                    <div className="split">

                        <div className="user-input">
                            <div className="category-list" onClick={() => setShowLocationDropdown(!showLocationDropdown)}>
                                {/* <CustomLocationsDropdown selectedLocations={selectedAllLocations} handleLocationSelect={handleLocationSelect} /> */}
                                <CustomLocationsDropdown selectedLocations={selectedAllLocations} handleLocationSelect={handleLocationSelect} radius={radius} handleRadiusChange={handleRadiusChange} />
                            </div>
                            <div className="search-input" onClick={() => setShowCategoriesDrp(true)}>
                                <NestedDropdown
                                    show={showCategoriesDrp}
                                    categoriesRef={categoriesRef}
                                    categories={furnitureCategories}
                                    setCheckedSubcategories={setCheckedSubcategories}
                                    checkedSubcategories={checkedSubcategories}
                                    checkAll={checkAll}
                                    setCheckAll={setCheckAll}
                                />
                            </div>
                        </div>
                        <div className="filter-btn">
                            <button className="custom-btn" onClick={handleFilter}>Search</button>
                        </div>
                    </div>
                    <div className="other-filters p-1 pt-3 pb-0" style={{ flexWrap: "wrap" }}>
                        <div className="d-flex gap-4">
                            <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowPriceDrp(!showPriceDrp)}>

                                    <div className='text-white'>
                                        {minPrice === '' && maxPrice === '' ? (
                                            <p className='filter-values'>Budget</p>
                                        ) : (
                                            <>
                                                {minPrice === '' ? (
                                                    <p className='fw-bolder filter-values'>All</p>
                                                ) : (
                                                    <>
                                                        <p className="fw-bolder filter-values">{formatNumber(minPrice)}</p>
                                                    </>
                                                )}
                                                <p className="filter-values"> - </p>
                                                {maxPrice === '' ? (
                                                    <>
                                                        <p className='fw-bolder' style={{ display: 'inline' }}> All </p>
                                                        <p style={{ display: 'inline' }}> (MAD) </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className="filter-values fw-bolder">{formatNumber(maxPrice)}</p>
                                                        <p style={{ display: 'inline' }}> (MAD) </p>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown budget-dropdown ${showPriceDrp ? 'show' : ''}`} ref={minPriceRef}>
                                    <div className="d-flex">
                                        <div className="side">
                                            <div className="custom-dropdown-item custom-dropdown-item-fixed">
                                                <input className='custom-input py-1' type="number" placeholder='Min' value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                                            </div>
                                            {
                                                materialsBudget.map((n, i) => {
                                                    return (
                                                        <p className="custom-dropdown-item" onClick={() => handleMinPrice(n)} key={i}>MAD {n}</p>
                                                    )
                                                })
                                            }
                                            <p className="custom-dropdown-item text-danger custom-dropdown-item-clear" onClick={() => setMinPrice('')}>Clear</p>

                                        </div>
                                        <div className="side">
                                            <div className="custom-dropdown-item custom-dropdown-item-fixed">
                                                <input className='custom-input py-1' type="number" placeholder='Max' value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                                            </div>
                                            {
                                                materialsBudget.map((n, i) => {
                                                    return (
                                                        <p className="custom-dropdown-item" onClick={() => handleMaxPrice(n)} key={i}>MAD {n}</p>
                                                    )
                                                })
                                            }
                                            <p className="custom-dropdown-item text-danger custom-dropdown-item-clear" onClick={() => setMaxPrice('')}>Clear</p>

                                        </div>
                                    </div>

                                </div>
                            </div>

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
                                <div className="selected-filter" style={{ cursor: "pointer" }} onClick={handleClearFilters}>Clear Filters</div>
                            )
                        }
                    </div>
                </div>

            </div>



        </div>
    );
}

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

export default function PropertyFilter() {
    const [t] = useTranslation();

    const categoryDropdownRef = useRef();
    const minPriceRef = useRef();
    const condtionRef = useRef();
    const yearBuildRef = useRef();
    const categoriesRef = useRef()
    const bedsRef = useRef()
    const sizeRef = useRef()

    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [showCategoriesDrp, setShowCategoriesDrp] = useState(false)
    const [showPriceDrp, setShowPriceDrp] = useState(false);
    const [showSizeDrp, setShowSizeDrp] = useState(false);
    const [showBedsDrp, setShowBedsDrp] = useState(false);
    const [showConditionDrp, setShowConditionDrp] = useState(false);
    const [showYearDrp, setShowYearDrp] = useState(false)

    const [type, setType] = useState('sale')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [minSize, setMinSize] = useState('')
    const [maxSize, setMaxSize] = useState('')
    const [minBeds, setMinBeds] = useState('')
    const [maxBeds, setMaxBeds] = useState('')
    const [available, setAvailable] = useState('')
    const [condition, setCondtion] = useState('')

    // all selected filters which will show as tags 
    const [selectedFilters, setSelectedFilters] = useState([])

    const [guarantee, setGuarantee] = useState('')
    const [yearBuild, setYearBuild] = useState([])

    const [selectedBrands, setSelectedBrands] = useState([])
    const [selectedCondtions, setSelectedConditions] = useState([])

    // filters for customLocationDropdown component 
    const [selectedCountries, setSelectedCountries] = useState([])
    const [selectedStates, setSelectedStates] = useState([])
    const [selectedCities, setSelectedCities] = useState([])
    const [selectedStreets, setSelectedStreets] = useState([])
    const [selectedAllLocations, setSelectedAllLocations] = useState([])


    // for nested dropdown 
    const [checkedSubcategories, setCheckedSubcategories] = useState([]);

    const realEstatePropertyData = [
        {
            categoryName: 'Land',
            subcategories: [
                'Residential',
                'Commercial',
                'Industrial',
                'Agricultural',
                'Vacant'
            ]
        },
        {
            categoryName: 'Buildings',
            subcategories: [
                'Residential',
                'Commercial',
                'Industrial',
                'Mixed-use',
                'Institutional (e.g., schools, hospitals)',
                'Apartments'
            ]
        },
        {
            categoryName: 'Infrastructure',
            subcategories: [
                'Roads and highways',
                'Bridges',
                'Tunnels',
                'Utilities (e.g., water, electricity)',
                'Railways'
            ]
        },
        {
            categoryName: 'Real Estate Development',
            subcategories: [
                'Residential subdivisions',
                'Commercial complexes',
                'Industrial parks',
                'Mixed-use developments',
                'Redevelopment projects'
            ]
        },
        {
            categoryName: 'Natural Resources',
            subcategories: [
                'Mineral rights',
                'Timber rights',
                'Water rights',
                'Oil and gas rights',
                'Conservation easements'
            ]
        }
    ];



    const sellType = [
        { value: "sale", label: "Sale" },
        { value: "rent", label: "Rent" },
    ]

    const budget = [
        0, 1000, 5000, 10000, 25000, 50000
    ]

    const size = [
        0, 20, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200, 250, 300
    ]


    const conditionData = [
        'Excellent', 'Good', 'Fair', 'Poor'
    ]
    const yearBuildData = [
        "Less than 1 year",
        "1 to 3 years",
        "3 to 5 years",
        "5 to 10 years",
        "10 to 15 years",
        "More than 15 years"
    ];
    const numbers = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    ]

    const handleClickOutside = (e) => {
        if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target)) {
            setShowLocationDropdown(false);
        }
        if (minPriceRef.current && !minPriceRef.current.contains(e.target)) {
            setShowPriceDrp(false);
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
        if (bedsRef.current && !bedsRef.current.contains(e.target)) {
            setShowBedsDrp(false);
        }
        if (sizeRef.current && !sizeRef.current.contains(e.target)) {
            setShowSizeDrp(false);
        }
    };


    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleType = (value) => {
        setType(value)
    }
    const handleMinPrice = (e) => {
        // setShowMinPriceDrp(false)
        setMinPrice(e)
    }
    const handleMaxPrice = (e) => {
        setShowPriceDrp(false)
        setMaxPrice(e)
    }

    const handleMinBeds = (e) => {
        // setShowMinPriceDrp(false)
        setMinBeds(e)
    }
    const handleMaxBeds = (e) => {
        setShowBedsDrp(false)
        setMaxBeds(e)
    }



    const handleMinSize = (e) => {
        // setShowMinPriceDrp(false)
        setMinSize(e)
    }
    const handleMaxSize = (e) => {
        setShowSizeDrp(false)
        setMaxSize(e)
    }


    const handleCondtion = val => {
        setShowConditionDrp(false)
        if (!selectedFilters.includes(val)) {
            setSelectedFilters([...selectedFilters, val]);
            setSelectedConditions([...selectedCondtions, val])

        }
    }

    const handleYearBuild = (val) => {
        setShowYearDrp(false)
        // setYearBuild(val)
        if (!selectedFilters.includes(val)) {
            setSelectedFilters([...selectedFilters, val]);
            setYearBuild([...yearBuild, val])
        }
    }


    // for locations 
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


    const handleFilter = () => {
        console.log(checkedSubcategories)
        console.log(selectedFilters)
        // console.log(location)

        // console.log(selectedBrands)
        // console.log(selectedCondtions)
        // console.log(selectedAllLocations)
    }

    const removeTypeFilter = (index, name) => {
        // filtering out the item at the specified index
        const updatedTypes = selectedFilters.filter((_, i) => i !== index);
        setSelectedFilters(updatedTypes);

        if (selectedCondtions.includes(name)) {
            setSelectedConditions(item => item.filter(item => item !== name));
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
        if (selectedAllLocations.includes(name)) {
            setYearBuild(item => item.filter(item => item !== name));
        }




    };


    const clearAllFilters = () => {
        setType('sale');
        setMinPrice('');
        setMaxPrice('');
        setAvailable('');
        setCondtion('');
        setSelectedFilters([]);
        setGuarantee('');
        setYearBuild([]);
        setSelectedConditions([]);
        setCheckedSubcategories([]);
    }

    // only for cities 
    // const searchOptions = {
    //     types: ['(cities)'] // Restrict to city type
    // };

    // for countries and cities 
    const searchOptions = {
        types: ['(regions)'] // Restrict to regions (which can include countries)
    };
    return (
        <div className="filter-area my-4">
            <div className="custom-container">
                <p className="color-primary mb-2">Looking for something?</p>
                <div className="filter machinery-filter">
                    <div className="split">

                        <div className="user-input">
                            <div className="type-select">
                                <Select
                                    className="custom-input bordor-0"
                                    classNamePrefix="select"
                                    placeholder='Type'
                                    name="color"
                                    options={sellType}
                                    defaultValue={[sellType[1]]}
                                    onChange={handleType}
                                    value={type}
                                    isClearable={true}
                                />
                            </div>
                            <div className="category-list" onClick={() => setShowLocationDropdown(!showLocationDropdown)}>
                                <CustomLocationsDropdown selectedLocations={selectedAllLocations} handleLocationSelect={handleLocationSelect} />
                                {/* <PlacesAutocomplete
                                    searchOptions={searchOptions}
                                    value={location}
                                    onChange={setLocation}
                                    onSelect={handleLocationSelect}
                                >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <>

                                            <input className="custom-input location-input" {...getInputProps({ placeholder: "Type city" })} />

                                            <div className='category-dropdown show'>

                                                {suggestions.map((suggestion, i) => {

                                                    return (
                                                        <>
                                                            <div key={i} className='dropdown-item' {...getSuggestionItemProps(suggestion, {})}>
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
                            <div className="search-input" onClick={() => setShowCategoriesDrp(true)}>

                                {
                                    checkedSubcategories.length < 1 ?
                                        (
                                            <p>Select Category</p>
                                        )
                                        :
                                        (
                                            <p> Categories ({checkedSubcategories.length} Selections)</p>
                                        )
                                }

                                <FaAngleDown />

                                <NestedDropdown show={showCategoriesDrp} categoriesRef={categoriesRef} categories={realEstatePropertyData} setCheckedSubcategories={setCheckedSubcategories} checkedSubcategories={checkedSubcategories} />
                            </div>
                        </div>
                        <div className="filter-btn">
                            <button className="custom-btn" onClick={handleFilter}>Search</button>
                        </div>
                    </div>
                    <div className="other-filters p-1 pt-3 pb-0">
                        <div className="d-flex gap-4">

                            {/* Budget Filter  */}
                            <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowPriceDrp(!showPriceDrp)}>
                                    <p className='text-white'>
                                        {(minPrice === '' && maxPrice === '') ?
                                            'Budget' :
                                            `${minPrice === '' ? 'All' : minPrice} ${minPrice === '' ? '' : '(MAD/unit)'} - ${maxPrice === '' ? 'All' : maxPrice} ${maxPrice === '' ? '' : '(MAD/unit)'}`}
                                    </p>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown budget-dropdown ${showPriceDrp ? 'show' : ''}`} ref={minPriceRef}>
                                    <div className="d-flex">
                                        <div className="side">
                                            <div className="custom-dropdown-item custom-dropdown-item-fixed">
                                                <input className='custom-input py-1' type="number" placeholder='Min' value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                                            </div>
                                            {
                                                budget.map((n, i) => {
                                                    return (
                                                        <p className="custom-dropdown-item" onClick={() => handleMinPrice(n)} key={i}>MAD {n}</p>
                                                    )
                                                })
                                            }
                                            <p className="custom-dropdown-item text-danger" onClick={() => setMinPrice('')}>Clear</p>

                                        </div>
                                        <div className="side">
                                            <div className="custom-dropdown-item custom-dropdown-item-fixed">
                                                <input className='custom-input py-1' type="number" placeholder='Max' value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                                            </div>
                                            {
                                                budget.map((n, i) => {
                                                    return (
                                                        <p className="custom-dropdown-item" onClick={() => handleMaxPrice(n)} key={i}>MAD {n}</p>
                                                    )
                                                })
                                            }
                                            <p className="custom-dropdown-item text-danger" onClick={() => setMaxPrice('')}>Clear</p>

                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Size Filter  */}
                            <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowSizeDrp(!showSizeDrp)}>
                                    <p className='text-white'>
                                        {(minSize === '' && maxSize === '') ?
                                            'Size/Area' :
                                            `${minSize === '' ? 'All' : minSize} ${minSize === '' ? '' : 'Sq ft'} - ${maxSize === '' ? 'All' : maxSize} ${maxSize === '' ? '' : 'Sq ft'}`}
                                    </p>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown budget-dropdown ${showSizeDrp ? 'show' : ''}`} ref={sizeRef}>
                                    <div className="d-flex">
                                        <div className="side">
                                            <div className="custom-dropdown-item custom-dropdown-item-fixed">
                                                <input className='custom-input py-1' type="number" placeholder='Min' value={minSize} onChange={(e) => setMinSize(e.target.value)} />
                                            </div>
                                            {
                                                size.map((n, i) => {
                                                    return (
                                                        <p className="custom-dropdown-item" onClick={() => handleMinSize(n)} key={i}>{n} sq ft</p>
                                                    )
                                                })
                                            }
                                            <p className="custom-dropdown-item text-danger" onClick={() => setMinSize('')}>Clear</p>

                                        </div>
                                        <div className="side">
                                            <div className="custom-dropdown-item custom-dropdown-item-fixed">
                                                <input className='custom-input py-1' type="number" placeholder='Max' value={maxSize} onChange={(e) => setMaxSize(e.target.value)} />
                                            </div>
                                            {
                                                size.map((n, i) => {
                                                    return (
                                                        <p className="custom-dropdown-item" onClick={() => handleMaxSize(n)} key={i}>{n} sq ft</p>
                                                    )
                                                })
                                            }
                                            <p className="custom-dropdown-item text-danger" onClick={() => setMaxSize('')}>Clear</p>

                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Beds filter  */}
                            <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowBedsDrp(!showBedsDrp)}>
                                    <p className='text-white'>
                                        {(minBeds === '' && maxBeds === '') ?
                                            'Beds' :
                                            `${minBeds === '' ? 'All' : minBeds} ${minBeds === '' ? '' : 'Beds'} - ${maxBeds === '' ? 'All' : maxBeds} ${maxBeds === '' ? '' : 'Beds'}`}
                                    </p>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown budget-dropdown ${showBedsDrp ? 'show' : ''}`} ref={bedsRef}>
                                    <div className="d-flex">
                                        <div className="side">
                                            <div className="custom-dropdown-item custom-dropdown-item-fixed">
                                                <input className='custom-input py-1' type="number" placeholder='Min' value={minBeds} onChange={(e) => setMinBeds(e.target.value)} />
                                            </div>
                                            {
                                                numbers.map((n, i) => {
                                                    return (
                                                        <p className="custom-dropdown-item" onClick={() => handleMinBeds(n)} key={i}>{n}</p>
                                                    )
                                                })
                                            }
                                            <p className="custom-dropdown-item text-danger" onClick={() => setMinPrice('')}>Clear</p>

                                        </div>
                                        <div className="side">
                                            <div className="custom-dropdown-item custom-dropdown-item-fixed">
                                                <input className='custom-input py-1' type="number" placeholder='Max' value={maxBeds} onChange={(e) => setMaxBeds(e.target.value)} />
                                            </div>
                                            {
                                                numbers.map((n, i) => {
                                                    return (
                                                        <p className="custom-dropdown-item" onClick={() => handleMaxBeds(n)} key={i}>{n}</p>
                                                    )
                                                })
                                            }
                                            <p className="custom-dropdown-item text-danger" onClick={() => setMaxBeds('')}>Clear</p>

                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* condition  */}
                            <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowConditionDrp(!showConditionDrp)}>
                                    <p className='text-white'>{condition === '' ? 'Condition' : `Condition: ${condition}`}</p>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown ${showConditionDrp ? 'show' : ''}`} ref={condtionRef}>
                                    {
                                        conditionData.map((data, i) => {
                                            return (
                                                <p key={i} className="custom-dropdown-item" onClick={() => handleCondtion(data)}>{data}</p>

                                            )
                                        })
                                    }
                                </div>
                            </div>

                            {/* Build  */}
                            <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowYearDrp(!showYearDrp)}>
                                    <p className='text-white'>Build</p>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown ${showYearDrp ? 'show' : ''}`} ref={yearBuildRef}>
                                    {
                                        yearBuildData.map((data, i) => {
                                            return (
                                                <p key={i} className="custom-dropdown-item" onClick={() => handleYearBuild(data)}>{data}</p>

                                            )
                                        })
                                    }
                                </div>
                            </div>


                            {/* <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }}>
                                    <label htmlFor="guarantee" className='text-white' style={{ fontSize: "12px" }}>Guarantee</label>
                                    <input type="checkbox" name="" id="guarantee" onChange={() => setGuarantee(!guarantee)} />
                                </div>
                            </div> */}


                            <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} >
                                    <label htmlFor="available" className='text-white' style={{ fontSize: "12px" }}>Availability</label>
                                    <input type="checkbox" name="available" id="available" onChange={() => setAvailable(!available)} />
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
                        <div className="selected-filter" style={{ cursor: "pointer" }} onClick={clearAllFilters}>Clear Filters</div>
                    </div>
                </div>

            </div>



        </div>
    );
}

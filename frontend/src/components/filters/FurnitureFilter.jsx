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
import { furnitureBrands, furnitureTypes, machineryType } from '../../assets/data/filtersData';
import formatNumber from '../../utils/formatNumber';



export default function FurnitureFilter() {
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
    const [showMachineryType, setShowMachineryType] = useState(false)

    const [type, setType] = useState('buy')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [available, setAvailable] = useState('')
    const [condition, setCondtion] = useState('')

    // all selected filters which will show as tags 
    const [selectedFilters, setSelectedFilters] = useState([])

    const [guarantee, setGuarantee] = useState('')
    const [yearBuild, setYearBuild] = useState([])

    const [selectedBrands, setSelectedBrands] = useState([])
    const [selectedCondtions, setSelectedConditions] = useState([])
    const [selectedMachineryType, setSelectedMachineryType] = useState([])

    // filters for customLocationDropdown component 
    const [selectedCountries, setSelectedCountries] = useState([])
    const [selectedStates, setSelectedStates] = useState([])
    const [selectedCities, setSelectedCities] = useState([])
    const [selectedStreets, setSelectedStreets] = useState([])
    const [selectedAllLocations, setSelectedAllLocations] = useState([])


    // for nested dropdown 
    const [checkedSubcategories, setCheckedSubcategories] = useState([]);
    const [checkAll, setCheckAll] = useState(false)


    const sellType = [
        { value: "buy", label: "Buy" },
        { value: "rent", label: "Rent" },
    ]

    const budget = [
        '0', '1000', '5000', '10 000', '25 000', '50 000'
    ]

    const brands = [
        "Caterpillar",
        "Komatsu",
        "Volvo",
        "John-Deere",
        "Hitachi",
        "Liebherr",
        "Liebherr",
        "Liebherr",
        "Liebherr",
        "Liebherr",
        "Bobcat",
        "JCB",
        "Doosan",
        "Kubota"
    ];

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
            setShowMachineryType(false);
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
        // if (!selectedFilters.includes(e)) {
        //     setSelectedFilters([...selectedFilters, (`Min Price: ${e}`)]);
        // }
    }
    const handleMaxPrice = (e) => {
        setShowPriceDrp(false)
        setMaxPrice(e)
        // if (!selectedFilters.includes(e)) {
        //     setSelectedFilters([...selectedFilters, (`Max Price: ${e}`)]);
        // }
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
            setSelectedConditions([...selectedCondtions, val])
        }
        else {
            const updatedFilters = selectedFilters.filter(filter => filter !== val);
            setSelectedFilters(updatedFilters);

            const updatedData = selectedCondtions.filter(type => type !== val);
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
    const handleMachineryType = (val) => {
        setShowMachineryType(false)
        const isAlreadySelected = selectedFilters.includes(val);

        if (isAlreadySelected) {
            const updatedFilters = selectedFilters.filter(filter => filter !== val);
            setSelectedFilters(updatedFilters);

            const updatedMachineryTypes = selectedMachineryType.filter(type => type !== val);
            setSelectedMachineryType(updatedMachineryTypes);
        } else {
            setSelectedFilters([...selectedFilters, val]);
            setSelectedMachineryType([...selectedMachineryType, val]);
        }
    };


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

        const minPriceInt = parseInt(minPrice.replace(/\s/g, ''), 10);
        const maxPriceInt = parseInt(maxPrice.replace(/\s/g, ''), 10);
        // console.log(location)

        // console.log(selectedBrands)
        // console.log(selectedCondtions)
        // console.log(selectedAllLocations)
    }

    const removeTypeFilter = (index, name) => {
        // filtering out the item at the specified index
        const updatedTypes = selectedFilters.filter((_, i) => i !== index);
        setSelectedFilters(updatedTypes);

        if (selectedBrands.includes(name)) {
            setSelectedBrands(prevBrands => prevBrands.filter(item => item !== name));
        }
        if (selectedCondtions.includes(name)) {
            setSelectedConditions(item => item.filter(item => item !== name));
        }
        if (selectedMachineryType.includes(name)) {
            setSelectedMachineryType(item => item.filter(item => item !== name));
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
        setType('buy');
        setMinPrice('');
        setMaxPrice('');
        setAvailable('');
        setCondtion('');
        setSelectedFilters([]);
        setGuarantee('');
        setYearBuild([]);
        setSelectedBrands([]);
        setSelectedConditions([]);
        setCheckedSubcategories([]);
        setSelectedMachineryType([]);
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
                <p className="color-primary mb-2">Cranes, paints or helmets: find what you need at the right price.</p>
                <div className="filter machinery-filter construction-filter">
                    <div className="split">

                        <div className="user-input">
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
                                                budget.map((n, i) => {
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
                                                budget.map((n, i) => {
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

                            <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowBrandDrp(!showBrandDrp)}>
                                    <p className='text-white'>Brand</p>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown ${showBrandDrp ? 'show' : ''}`} ref={brandRef}>
                                    {
                                        furnitureBrands.map((data, i) => {
                                            return (
                                                <div key={i} className='custom-dropdown-item d-flex align-items-center justify-content-between' onClick={() => handleBrand(data)}>
                                                    <p htmlFor={data} id={`label-${data}`}>{data}</p>
                                                    <input
                                                        type="checkbox"
                                                        name={data}
                                                        id={`checkbox-${data}`}
                                                        checked={selectedFilters.includes(data)}
                                                        onChange={() => handleBrand(data)}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            {/* <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowConditionDrp(!showConditionDrp)}>
                                    <p className='text-white'>{condition === '' ? 'Condition' : `Condition: ${condition}`}</p>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown ${showConditionDrp ? 'show' : ''}`} ref={condtionRef}>
                                    {
                                        conditionData.map((data, i) => {
                                            return (
                                                <div key={i} className='custom-dropdown-item d-flex align-items-center justify-content-between' onClick={() => handleCondtion(data)}>
                                                    <p htmlFor={data} id={`label-${data}`}>{data}</p>
                                                    <input
                                                        type="checkbox"
                                                        name={data}
                                                        id={`checkbox-${data}`}
                                                        checked={selectedFilters.includes(data)}
                                                        onChange={() => handleCondtion(data)}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div> */}

                            <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowYearDrp(!showYearDrp)}>
                                    <p className='text-white'>Year</p>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown ${showYearDrp ? 'show' : ''}`} ref={yearBuildRef}>
                                    {
                                        yearBuildData.map((data, i) => {
                                            return (
                                                <div key={i} className='custom-dropdown-item d-flex align-items-center justify-content-between' onClick={() => handleYearBuild(data)}>
                                                    <p htmlFor={data} id={`label-${data}`}>{data}</p>
                                                    <input
                                                        type="checkbox"
                                                        name={data}
                                                        id={`checkbox-${data}`}
                                                        checked={selectedFilters.includes(data)}
                                                        onChange={() => handleYearBuild(data)}
                                                    />
                                                </div>
                                            )

                                        })
                                    }
                                </div >
                            </div>

                            <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowMachineryType(!showMachineryType)}>
                                    <p className='text-white'>Type</p>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown squeeze-left ${showMachineryType ? 'show' : ''}`} ref={machineryTypeRef}>
                                    {
                                        machineryType.map((data, i) => {
                                            return (
                                                <div key={i} className='custom-dropdown-item d-flex align-items-center justify-content-between' onClick={() => handleMachineryType(data)}>
                                                    <p htmlFor={data} id={`label-${data}`}>{data}</p>
                                                    <input
                                                        type="checkbox"
                                                        name={data}
                                                        id={`checkbox-${data}`}
                                                        checked={selectedFilters.includes(data)}
                                                        onChange={() => handleMachineryType(data)}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>


                            <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }}>
                                    <label htmlFor="guarantee" className='text-white' style={{ fontSize: "12px" }}>Guarantee</label>
                                    <input type="checkbox" name="" id="guarantee" onChange={() => setGuarantee(!guarantee)} />
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
                                <div className="selected-filter" style={{ cursor: "pointer" }} onClick={clearAllFilters}>Clear Filters</div>
                            )
                        }
                    </div>
                </div>

            </div>



        </div>
    );
}

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
import { useLocation, useNavigate } from 'react-router-dom';
import { propertyCategories } from '../../assets/data/categories';
import formatNumber from '../../utils/formatNumber';
import { conditionData, featuresData, propertyBudget, propertyYearBuildData, proximityData } from '../../assets/data/filtersData';
import { getLocationsInRadius } from './getLocationsInRadius';



export default function PropertyFilter({
    type,
    setType,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    minSize,
    setMinSize,
    maxSize,
    setMaxSize,
    minBeds,
    setMinBeds,
    maxBeds,
    setMaxBeds,
    minBath,
    setMinBath,
    maxBath,
    setMaxBath,
    yearBuild,
    setYearBuild,
    proximities,
    setProximities,
    features,
    setFeatures,
    selectedCountries,
    setSelectedCountries,
    selectedStates,
    setSelectedStates,
    selectedCities,
    setSelectedCities,
    selectedStreets,
    setSelectedStreets,
    checkedSubcategories,
    setCheckedSubcategories,
    selectedCondtions,
    setSelectedConditions,
    selectedFilters,
    setSelectedFilters,
    applyFilters,
    clearAllFilters
}) {
    const [t] = useTranslation();

    const categoryDropdownRef = useRef();
    const minPriceRef = useRef();
    const condtionRef = useRef();
    const yearBuildRef = useRef();
    const categoriesRef = useRef()
    const bedsRef = useRef()
    const bathRef = useRef()
    const sizeRef = useRef()
    const proximityRef = useRef()
    const featureRef = useRef()

    const [showCategoriesDrp, setShowCategoriesDrp] = useState(false)
    const [showPriceDrp, setShowPriceDrp] = useState(false);
    const [showSizeDrp, setShowSizeDrp] = useState(false);
    const [showBedsDrp, setShowBedsDrp] = useState(false);
    const [showBathDrp, setShowBathDrp] = useState(false);
    const [showConditionDrp, setShowConditionDrp] = useState(false);
    const [showYearDrp, setShowYearDrp] = useState(false)
    const [showProximityDrp, setShowProximityDrp] = useState(false)
    const [showFeatureDrp, setShowFeatureDrp] = useState(false)

    const [selectedAllLocations, setSelectedAllLocations] = useState([])

    const [radius, setRadius] = useState(null)

    // for nested dropdown 
    // const [checkedSubcategories, setCheckedSubcategories] = useState([]);
    const [checkAll, setCheckAll] = useState(false)

    const sellType = [
        { value: "buy", label: "Sale" },
        { value: "rent", label: "Rent" },
        // { value: "", label: "Any" },
    ]

    const size = [
        0, 20, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200, 250, 300
    ]

    const numbers = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    ]


    const location = useLocation();
    const navigate = useNavigate()
    // useEffect(() => {
    //     const queryParams = new URLSearchParams(location.search);

    //     const type = queryParams.get('type') || 'buy';
    //     setType(type)
    // }, [location])

    const handleClickOutside = (e) => {
        if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target)) {
            setShowCategoriesDrp(false);
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
        if (bathRef.current && !bathRef.current.contains(e.target)) {
            setShowBathDrp(false);
        }
        if (sizeRef.current && !sizeRef.current.contains(e.target)) {
            setShowSizeDrp(false);
        }
        if (proximityRef.current && !proximityRef.current.contains(e.target)) {
            setShowProximityDrp(false);
        }
        if (featureRef.current && !featureRef.current.contains(e.target)) {
            setShowFeatureDrp(false);
        }
    };


    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleType = (selectedOption) => {
        const newType = selectedOption ? selectedOption.value : ''; // Handle clearing selection
        setType(newType);

        // Update URL query parameter with the selected type
        // const updatedParams = new URLSearchParams(location.search);
        // updatedParams.set('type', newType);
        // navigate(location.pathname + '?' + updatedParams.toString());
    };
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

    const handleMinBeds = (e) => {
        // setShowMinPriceDrp(false)
        setMinBeds(e)
    }
    const handleMaxBeds = (e) => {
        setShowBedsDrp(false)
        setMaxBeds(e)
    }


    const handleMinBath = (e) => {
        // setShowMinPriceDrp(false)
        setMinBath(e)
    }
    const hanldeMaxBath = (e) => {
        setShowBathDrp(false)
        setMaxBath(e)
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
    const handleProximity = (val) => {
        setShowProximityDrp(false)
        // setYearBuild(val)
        if (!selectedFilters.includes(val)) {
            setSelectedFilters([...selectedFilters, val]);
            setProximities([...proximities, val])
        }
        else {
            const updatedFilters = selectedFilters.filter(filter => filter !== val);
            setSelectedFilters(updatedFilters);

            const updatedYearBuild = proximities.filter(type => type !== val);
            setProximities(updatedYearBuild);
        }
    }
    const handleFeature = (val) => {
        setShowFeatureDrp(false)
        // setYearBuild(val)
        if (!selectedFilters.includes(val)) {
            setSelectedFilters([...selectedFilters, val]);
            setFeatures([...features, val])
        }
        else {
            const updatedFilters = selectedFilters.filter(filter => filter !== val);
            setSelectedFilters(updatedFilters);

            const updatedYearBuild = features.filter(type => type !== val);
            setFeatures(updatedYearBuild);
        }
    }


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

        if (selectedCondtions.includes(name)) {
            setSelectedConditions(item => item.filter(item => item !== name));
        }
        if (proximities.includes(name)) {
            setProximities(item => item.filter(item => item !== name));
        }
        if (features.includes(name)) {
            setFeatures(item => item.filter(item => item !== name));
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
        if (checkedSubcategories.includes(name)) {
            setCheckedSubcategories(item => item.filter(item => item !== name));
        }


        // reset radius 
        setRadius(null)


    };


    const handleClearFilters = () => {
        setSelectedFilters([]);
        setSelectedAllLocations([])
        setRadius(null)
        clearAllFilters()
    }

    const handleDivClick = (e) => {
        e.stopPropagation();
        setShowCategoriesDrp(!showCategoriesDrp);
      };
      
      const handleHideDrp = () => {
        setShowCategoriesDrp(false);
      };
    return (
        <div className="filter-area my-4">
            <div className="custom-container">
                <p className="color-primary mb-2">{t("propertyFilterTitle")}</p>
                <div className="filter machinery-filter">
                    <div className="split">

                        <div className="user-input">
                            <div className="type-select">
                                <Select
                                    className="custom-input bordor-0  type-select-dropdown"
                                    classNamePrefix="select"
                                    placeholder='Sale/Rent'
                                    name="color"
                                    options={sellType}
                                    onChange={handleType}
                                    value={type === 'buy' ? sellType[0] : sellType[1]}
                                />

                            </div>
                            <div className="category-list" >
                                <CustomLocationsDropdown selectedLocations={selectedAllLocations} handleLocationSelect={handleLocationSelect} radius={radius} handleRadiusChange={handleRadiusChange} />
                            </div>
                            <div
                                className="search-input"
                                onClick={handleDivClick}
                            >
                                <NestedDropdown
                                    show={showCategoriesDrp}
                                    categoriesRef={categoriesRef}
                                    categories={propertyCategories}
                                    setCheckedSubcategories={setCheckedSubcategories}
                                    checkedSubcategories={checkedSubcategories}
                                    checkAll={checkAll}
                                    setCheckAll={setCheckAll}
                                />
                            </div>
                        </div>
                        <div className="filter-btn">
                            <button className="custom-btn" onClick={handleFilter}>{t("search")}</button>
                        </div>
                    </div>
                    <div className="other-filters p-1 pt-3 pb-0" style={{ flexWrap: "wrap" }}>
                        <div className="d-flex gap-4">

                            {/* Budget Filter  */}
                            <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowPriceDrp(!showPriceDrp)}>

                                    <div className='text-white'>
                                        {minPrice === '' && maxPrice === '' ? (
                                            <p className='filter-values'>{t("budget")}</p>
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
                                                <input className='custom-input py-1' min={0} type="number" placeholder='Min' value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                                            </div>
                                            {
                                                propertyBudget.map((n, i) => {
                                                    return (
                                                        <p className="custom-dropdown-item" onClick={() => handleMinPrice(n)} key={i}>MAD {n}</p>
                                                    )
                                                })
                                            }
                                            <p className="custom-dropdown-item text-danger custom-dropdown-item-clear" onClick={() => setMinPrice('')}>Clear</p>

                                        </div>
                                        <div className="side">
                                            <div className="custom-dropdown-item custom-dropdown-item-fixed">
                                                <input className='custom-input py-1' min={0} type="number" placeholder='Max' value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                                            </div>
                                            {
                                                propertyBudget.map((n, i) => {
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

                            {/* Size Filter  */}
                            <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowSizeDrp(!showSizeDrp)}>
                                    <div className='text-white'>
                                        {minSize === '' && maxSize === '' ? (
                                            <p className="filter-values">{t("area")}</p>
                                        ) : (
                                            <>
                                                {minSize === '' ? (
                                                    <p className='fw-bolder filter-values'>All</p>
                                                ) : (
                                                    <>
                                                        <p className='fw-bolder filter-values'>{minSize}</p>
                                                    </>
                                                )}
                                                <p className='filter-values'> - </p>

                                                {maxSize === '' ? (
                                                    <>
                                                        <p className="fw-bolder" style={{ display: 'inline' }}> All </p>
                                                        <p style={{ display: 'inline' }}>(m <sup>2</sup>)</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className='fw-bolder filter-values'>{maxSize}</p>
                                                        <p style={{ display: 'inline' }}> m <sup>2</sup> </p>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown budget-dropdown ${showSizeDrp ? 'show' : ''}`} ref={sizeRef}>
                                    <div className="d-flex">
                                        <div className="side">
                                            <div className="custom-dropdown-item custom-dropdown-item-fixed">
                                                <input className='custom-input py-1' min={0} type="number" placeholder='Min' value={minSize} onChange={(e) => setMinSize(e.target.value)} />
                                            </div>
                                            {
                                                size.map((n, i) => {
                                                    return (
                                                        <p className="custom-dropdown-item" onClick={() => handleMinSize(n)} key={i}>{n} m<sup>2</sup></p>
                                                    )
                                                })
                                            }
                                            <p className="custom-dropdown-item text-danger custom-dropdown-item-clear" onClick={() => setMinSize('')}>Clear</p>

                                        </div>
                                        <div className="side">
                                            <div className="custom-dropdown-item custom-dropdown-item-fixed">
                                                <input className='custom-input py-1' min={0} type="number" placeholder='Max' value={maxSize} onChange={(e) => setMaxSize(e.target.value)} />
                                            </div>
                                            {
                                                size.map((n, i) => {
                                                    return (
                                                        <p className="custom-dropdown-item" onClick={() => handleMaxSize(n)} key={i}>{n} m<sup>2</sup></p>
                                                    )
                                                })
                                            }
                                            <p className="custom-dropdown-item text-danger custom-dropdown-item-clear" onClick={() => setMaxSize('')}>Clear</p>

                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Beds filter  */}
                            <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowBedsDrp(!showBedsDrp)}>
                                    <div className='text-white'>
                                        {minBeds === '' && maxBeds === '' ? (
                                            <p className="filter-values">{t("rooms")}</p>
                                        ) : (
                                            <>
                                                {minBeds === '' ? (
                                                    <p className="filter-values fw-bolder">All</p>
                                                ) : (
                                                    <>
                                                        <p className='fw-bolder filter-values'>{minBeds}</p>
                                                    </>
                                                )}
                                                <p className='filter-values'> - </p>
                                                {maxBeds === '' ? (
                                                    <>
                                                        <p style={{ display: 'inline' }} className='fw-bolder'>All </p>
                                                        <p style={{ display: 'inline' }}> Rooms </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className='fw-bolder filter-values'>{maxBeds}</p>
                                                        <p style={{ display: 'inline' }}> Rooms </p>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown budget-dropdown ${showBedsDrp ? 'show' : ''}`} ref={bedsRef}>
                                    <div className="d-flex">
                                        <div className="side">
                                            <div className="custom-dropdown-item custom-dropdown-item-fixed">
                                                <input className='custom-input py-1' min={0} type="number" placeholder='Min' value={minBeds} onChange={(e) => setMinBeds(e.target.value)} />
                                            </div>
                                            {
                                                numbers.map((n, i) => {
                                                    return (
                                                        <p className="custom-dropdown-item" onClick={() => handleMinBeds(n)} key={i}>{n}</p>
                                                    )
                                                })
                                            }
                                            <p className="custom-dropdown-item text-danger custom-dropdown-item-clear" onClick={() => setMinBeds('')}>Clear</p>

                                        </div>
                                        <div className="side">
                                            <div className="custom-dropdown-item custom-dropdown-item-fixed">
                                                <input className='custom-input py-1' min={0} type="number" placeholder='Max' value={maxBeds} onChange={(e) => setMaxBeds(e.target.value)} />
                                            </div>
                                            {
                                                numbers.map((n, i) => {
                                                    return (
                                                        <p className="custom-dropdown-item" onClick={() => handleMaxBeds(n)} key={i}>{n}</p>
                                                    )
                                                })
                                            }
                                            <p className="custom-dropdown-item text-danger custom-dropdown-item-clear" onClick={() => setMaxBeds('')}>Clear</p>

                                        </div>
                                    </div>

                                </div>
                            </div>


                            <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowBathDrp(!showBathDrp)}>
                                    <div className='text-white'>
                                        {minBath === '' && maxBath === '' ? (
                                            <p className="filter-values">{t("bathrooms")}</p>
                                        ) : (
                                            <>
                                                {minBath === '' ? (
                                                    <p className="filter-values fw-bolder">All</p>
                                                ) : (
                                                    <>
                                                        <p className='fw-bolder filter-values'>{minBath}</p>
                                                    </>
                                                )}
                                                <p className='filter-values'> - </p>

                                                {maxBath === '' ? (
                                                    <>
                                                        <p className='fw-bolder filter-values'> All </p>
                                                        <p style={{ display: 'inline' }}> Bathrooms </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className='fw-bolder filter-values'>{maxBath}</p>
                                                        <p style={{ display: 'inline' }}> Bathrooms </p>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown budget-dropdown ${showBathDrp ? 'show' : ''}`} ref={bathRef}>
                                    <div className="d-flex">
                                        <div className="side">
                                            <div className="custom-dropdown-item custom-dropdown-item-fixed">
                                                <input className='custom-input py-1' min={0} type="number" placeholder='Min' value={minBath} onChange={(e) => setMinBath(e.target.value)} />
                                            </div>
                                            {
                                                numbers.map((n, i) => {
                                                    return (
                                                        <p className="custom-dropdown-item" onClick={() => handleMinBath(n)} key={i}>{n}</p>
                                                    )
                                                })
                                            }
                                            <p className="custom-dropdown-item text-danger custom-dropdown-item-clear" onClick={() => setMinBath('')}>Clear</p>

                                        </div>
                                        <div className="side">
                                            <div className="custom-dropdown-item custom-dropdown-item-fixed">
                                                <input className='custom-input py-1' min={0} type="number" placeholder='Max' value={maxBath} onChange={(e) => setMaxBath(e.target.value)} />
                                            </div>
                                            {
                                                numbers.map((n, i) => {
                                                    return (
                                                        <p className="custom-dropdown-item" onClick={() => hanldeMaxBath(n)} key={i}>{n}</p>
                                                    )
                                                })
                                            }
                                            <p className="custom-dropdown-item text-danger custom-dropdown-item-clear" onClick={() => setMaxBath('')}>Clear</p>

                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* condition  */}
                            <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowConditionDrp(!showConditionDrp)}>
                                    <p className='text-white'>{t("condition")}</p>
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
                            </div>

                            {/* Build  */}
                            <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowYearDrp(!showYearDrp)}>
                                    <p className='text-white'>{t("year")}</p>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown ${showYearDrp ? 'show' : ''}`} ref={yearBuildRef}>
                                    {
                                        propertyYearBuildData.map((data, i) => {
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
                                </div>
                            </div>

                            <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowProximityDrp(!showProximityDrp)}>
                                    <p className='text-white'>{t("proximity")}</p>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown ${showProximityDrp ? 'show' : ''}`} ref={proximityRef}>
                                    {
                                        proximityData.map((data, i) => {
                                            return (
                                                <div key={i} className='custom-dropdown-item d-flex align-items-center justify-content-between' onClick={() => handleProximity(data)}>
                                                    <p htmlFor={data} id={`label-${data}`}>{data}</p>
                                                    <input
                                                        type="checkbox"
                                                        name={data}
                                                        id={`checkbox-${data}`}
                                                        checked={selectedFilters.includes(data)}
                                                        onChange={() => handleProximity(data)}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>


                            <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowFeatureDrp(!showFeatureDrp)}>
                                    <p className='text-white'>{t("features")}</p>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown squeeze-left ${showFeatureDrp ? 'show' : ''}`} ref={featureRef}>
                                    {
                                        featuresData.map((data, i) => {
                                            return (
                                                <div key={i} className='custom-dropdown-item d-flex align-items-center justify-content-between' onClick={() => handleFeature(data)}>
                                                    <p htmlFor={data} id={`label-${data}`}>{data}</p>
                                                    <input
                                                        type="checkbox"
                                                        name={data}
                                                        id={`checkbox-${data}`}
                                                        checked={selectedFilters.includes(data)}
                                                        onChange={() => handleFeature(data)}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
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

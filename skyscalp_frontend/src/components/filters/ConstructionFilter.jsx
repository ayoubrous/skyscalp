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
import { constructionCategories } from '../../assets/data/categories';
import formatNumber from '../../utils/formatNumber';
import { getLocationsInRadius } from './getLocationsInRadius';
import { conditionData, constructionBrands, constructionBudget, materialsBudget } from '../../assets/data/filtersData';
import { materialCategories, materials } from '../../assets/data/materialsCategory';

export default function ConstructionFilter({
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    guarantee,
    setGuarantee,
    materialItemType,
    setMaterialItemType,
    selectedCountries,
    setSelectedCountries,
    selectedStates,
    setSelectedStates,
    selectedCities,
    setSelectedCities,
    selectedStreets,
    setSelectedStreets,
    selectedMaterials,
    setSelectedMaterials,
    checkedSubcategories,
    setCheckedSubcategories,
    selectedFilters,
    setSelectedFilters,
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

    const budgetLabelRef = useRef()
    const brandLabelRef = useRef()
    const conditionLabelRef = useRef()
    const yearLabelRef = useRef()

    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [showCategoriesDrp, setShowCategoriesDrp] = useState(false)
    const [showPriceDrp, setShowPriceDrp] = useState(false);
    const [showBrandDrp, setShowBrandDrp] = useState(false);
    const [showConditionDrp, setShowConditionDrp] = useState(false);
    const [showYearDrp, setShowYearDrp] = useState(false)


    const [selectedAllLocations, setSelectedAllLocations] = useState([])
    const [checkAll, setCheckAll] = useState(false)

    const [radius, setRadius] = useState(null)



    const handleClickOutside = (e) => {
        if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target)) {
            setShowLocationDropdown(false);
        }
        if (minPriceRef.current && !minPriceRef.current.contains(e.target) && !budgetLabelRef.current.contains(e.target)) {
            setShowPriceDrp(false);
        }
        if (brandRef.current && !brandRef.current.contains(e.target) && !brandLabelRef.current.contains(e.target)) {
            setShowBrandDrp(false);
        }
        if (condtionRef.current && !condtionRef.current.contains(e.target) && !conditionLabelRef.current.contains(e.target)) {
            setShowConditionDrp(false);
        }
        if (yearBuildRef.current && !yearBuildRef.current.contains(e.target) && !yearLabelRef.current.contains(e.target)) {
            setShowYearDrp(false);
        }
        if (categoriesRef.current && !categoriesRef.current.contains(e.target)) {
            setShowCategoriesDrp(false);
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



    // assume brands and related are materials
    const handleMaterials = brand => {
        // setShowBrandDrp(false)
        if (!selectedFilters.includes(brand)) {
            setSelectedFilters([...selectedFilters, brand]);
            setSelectedMaterials([...selectedMaterials, brand])
        }
        else {
            const updatedFilters = selectedFilters.filter(filter => filter !== brand);
            setSelectedFilters(updatedFilters);

            const updatedData = selectedMaterials.filter(type => type !== brand);
            setSelectedMaterials(updatedData);
        }
    }

    // assume condition are types for all the page now
    const handleTypes = val => {
        // setShowConditionDrp(false)
        if (!selectedFilters.includes(val)) {
            setSelectedFilters([...selectedFilters, val]);
            setMaterialItemType([...materialItemType, val])
        }
        else {
            const updatedFilters = selectedFilters.filter(filter => filter !== val);
            setSelectedFilters(updatedFilters);

            const updatedData = materialItemType.filter(type => type !== val);
            setMaterialItemType(updatedData);
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

        if (materialItemType.includes(name)) {
            setMaterialItemType(prevBrands => prevBrands.filter(item => item !== name));
        }
        if (selectedMaterials.includes(name)) {
            setSelectedMaterials(item => item.filter(item => item !== name));
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
        if (checkedSubcategories.includes(name)) {
            setCheckedSubcategories(item => item.filter(item => item !== name));
        }

        setRadius(null)
    };


    const handleClearFilters = () => {
        window.location.reload()
        
        setSelectedFilters([]);
        setSelectedAllLocations([])
        setRadius(null)
        clearAllFilters()
        setCheckAll(false)
    }


    // formatting categories for nested dropdown required format 
    let formattedCategories = materialCategories.map((cat, i) => {
        return {
            id: i,
            categoryName: cat.application,
            subcategories: cat.categories.map(subCat => {
                return subCat.materialName
            })
        }
    })


    // code for showing types on condition 
    const [types, setTypes] = useState([]);
    const [itemUnits, setItemUnits] = useState([]);

    useEffect(() => {
        const newTypesSet = new Set();
        const newUnitsSet = new Set();

        materialCategories.forEach(data => {
            data.categories.forEach(category => {
                checkedSubcategories.forEach(currentCat => {
                    if (category.materialName === currentCat) {
                        category.types.forEach(type => newTypesSet.add(type));
                        newUnitsSet.add(category.unit);
                    }
                });
            });
        });

        setTypes(Array.from(newTypesSet));
        setItemUnits(Array.from(newUnitsSet)); // Add this line

    }, [checkedSubcategories]);




    return (
        <div className="filter-area my-4">
            <div className="custom-container">
                <p className="color-primary mb-2">{t("constructionFilterTitle")}</p>
                <div className="filter machinery-filter construction-filter">
                    <div className="split">

                        <div className="user-input">
                            <div className="category-list" onClick={() => setShowLocationDropdown(!showLocationDropdown)}>
                                {/* <CustomLocationsDropdown selectedLocations={selectedAllLocations} handleLocationSelect={handleLocationSelect} /> */}
                                <CustomLocationsDropdown selectedLocations={selectedAllLocations} handleLocationSelect={handleLocationSelect} radius={radius} handleRadiusChange={handleRadiusChange} />

                            </div>
                            <div className="search-input" onClick={() => setShowCategoriesDrp(true)}>
                                {/* <input type="text" className="custom-input" placeholder='Try Excavator, Apartment, Cement' value={selectedCategory} onChange={handleCategoryChange}/> */}
                                {/* <Select
                                    className="custom-input bordor-0"
                                    classNamePrefix="select"
                                    placeholder="Select Category"
                                    name="color"
                                    isMulti
                                    options={formattedCategories}
                                    onChange={handleCategoryChange}
                                    value={selectedCategory}
                                    isClearable={true}
                                /> */}


                                <NestedDropdown
                                    show={showCategoriesDrp}
                                    categoriesRef={categoriesRef}
                                    categories={formattedCategories}
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
                    <div className="other-filters p-1 pt-3 pb-0">
                        <div className="d-flex gap-4" style={{ flexWrap: "wrap" }}>
                            <div className="other-filter">
                                <div ref={budgetLabelRef} className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowPriceDrp(!showPriceDrp)}>
                                    <div className='text-white'>
                                        {minPrice === '' && maxPrice === '' ? (
                                            <p className='filter-values'>
                                                {t("budget")}
                                                {itemUnits.length > 0 && (
                                                    <>
                                                        ({itemUnits.map((unit, i) => (
                                                            <React.Fragment key={i}>
                                                                {i > 0 && ", "}
                                                                {unit}
                                                            </React.Fragment>
                                                        ))})
                                                    </>
                                                )}
                                            </p>
                                        ) : (
                                            <>
                                                {minPrice === '' ? (
                                                    <p className='fw-bolder filter-values'>{t("all")}</p>
                                                ) : (
                                                    <>
                                                        <p className="fw-bolder filter-values">{formatNumber(minPrice)}</p>
                                                    </>
                                                )}
                                                <p className="filter-values"> - </p>
                                                {maxPrice === '' ? (
                                                    <>
                                                        <p className='fw-bolder' style={{ display: 'inline' }}>{t("all")}</p>
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
                                                constructionBudget.map((n, i) => {
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
                                <div ref={brandLabelRef} className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowBrandDrp(!showBrandDrp)}>
                                    <p className='text-white'>{t("material")}</p>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown ${showBrandDrp ? 'show' : ''}`} ref={brandRef}>
                                    {
                                        materials.map((data, i) => {
                                            return (
                                                <div key={i} className='custom-dropdown-item d-flex align-items-center justify-content-between' onClick={() => handleMaterials(data)}>
                                                    <p htmlFor={data} id={`label-${data}`}>{t(data)}</p>
                                                    <input
                                                        type="checkbox"
                                                        name={data}
                                                        id={`checkbox-${data}`}
                                                        checked={selectedFilters.includes(data)}
                                                        onChange={() => handleMaterials(data)}
                                                    />
                                                </div>)
                                        })
                                    }
                                </div>
                            </div>

                            <div className="other-filter">
                                <div ref={conditionLabelRef} className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowConditionDrp(!showConditionDrp)}>
                                    <p className='text-white'>{t("type")}</p>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown ${showConditionDrp ? 'show' : ''}`} ref={condtionRef}>
                                    {
                                        types.map((data, i) => {
                                            return (
                                                <div key={i} className='custom-dropdown-item d-flex align-items-center justify-content-between' onClick={() => handleTypes(data)}>
                                                    <p htmlFor={data} id={`label-${data}`}>{t(data)}</p>
                                                    <input
                                                        type="checkbox"
                                                        name={data}
                                                        id={`checkbox-${data}`}
                                                        checked={selectedFilters.includes(data)}
                                                        onChange={() => handleTypes(data)}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            {/* <div className="other-filter">
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
                            </div> */}


                            <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }}>
                                    <label htmlFor="guarantee" className='text-white' style={{ fontSize: "12px" }}>{t("guarantee")}</label>
                                    <input type="checkbox" name="" id="guarantee" checked={guarantee} onChange={() => setGuarantee(!guarantee)} />
                                </div>
                            </div>


                        </div>

                    </div>

                </div>

                <div className="selected-filters w-100">
                    <div className="d-flex justify-content-between align-items-start gap-2 w-100">
                        <div className="tags">
                            {
                                selectedFilters.map((filter, i) => {
                                    return (
                                        <span key={i} className='selected-filter'>{t(filter)} <FaXmark style={{ cursor: "pointer" }} onClick={() => removeTypeFilter(i, filter)} /></span>
                                    )
                                })
                            }
                            {
                                checkedSubcategories.map((filter, i) => {
                                    return (
                                        <span key={i} className='selected-filter'>{t(filter)} <FaXmark style={{ cursor: "pointer" }} onClick={() => removeTypeFilter(i, filter)} /></span>
                                    )
                                })
                            }
                        </div>
                        {
                            // selectedFilters.length > 0 && (
                            <div className="selected-filter" style={{ cursor: "pointer" }} onClick={handleClearFilters}>{t("reset")}</div>
                            // )
                        }
                    </div>
                </div>

            </div>



        </div >
    );
}

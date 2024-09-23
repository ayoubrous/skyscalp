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
import { furnitureCategories } from '../../assets/data/furnitureCategories';
import { furnitureBrands, furnitureConditionData, furnitureTypes, machineryType, materialsBudget, yearBuildData } from '../../assets/data/filtersData';
import formatNumber from '../../utils/formatNumber';
import { getLocationsInRadius } from './getLocationsInRadius';
import ExpertsNestedDropdown from './ExpertsNestedDropdown';
import { availibilityData, educationData, experienceList, languageData, serviceFeesData, services } from '../../assets/data/services';
import ExpertsNestedDropdown2 from './ExpertsNestedDropdown2';



export default function ExpertsFilter({
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    selectedLanguages,
    setSelectedLanguages,
    selectedCountries,
    setSelectedCountries,
    selectedStates,
    setSelectedStates,
    selectedCities,
    setSelectedCities,
    selectedStreets,
    setSelectedStreets,
    selectedExperience,
    setSelectedExperience,
    checkedSubcategories,
    setCheckedSubcategories,
    availibilities,
    setAvailibilities,
    selectedFilters,
    setSelectedFilters,
    selectedEducations,
    setSelectedEducations,

    filter1,
    filter2,
    filter3,
    setFilter1,
    setFilter2,
    setFilter3,

    selectedFilters1,
    selectedFilters2,
    selectedFilters3,

    setSelectedFilters1,
    setSelectedFilters2,
    setSelectedFilters3,

    applyFilters,
    clearAllFilters
}) {
    const [t] = useTranslation();

    const categoryDropdownRef = useRef();
    const categoriesLabelRef = useRef();
    const minPriceRef = useRef();
    const languageRef = useRef();
    const experienceRef = useRef();
    const availabilityRef = useRef();
    const categoriesRef = useRef()
    const educationRef = useRef()
    const filter1Ref = useRef()
    const filter2Ref = useRef()
    const filter3Ref = useRef()

    // refs for labels of filters/dropdowns 
    const budgetLabelRef = useRef()
    const langLabelRef = useRef()
    const experienceLabelRef = useRef()
    const availibilityLabelRef = useRef()
    const educationLabelRef = useRef()
    const filter1LabelRef = useRef()
    const filter2LabelRef = useRef()
    const filter3LabelRef = useRef()

    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [showCategoriesDrp, setShowCategoriesDrp] = useState(false)
    const [showPriceDrp, setShowPriceDrp] = useState(false);
    const [showLanguageDrp, setShowLanguageDrp] = useState(false);
    const [showExperienceDrp, setShowExperienceDrp] = useState(false);
    const [showAvailabilityDrp, setShowAvailabilityDrp] = useState(false)
    const [showEducationDrp, setShowEducationDrp] = useState(false)

    const [showFilter1Drp, setShowFilter1Drp] = useState(false)
    const [showFilter2Drp, setShowFilter2Drp] = useState(false)
    const [showFilter3Drp, setShowFilter3Drp] = useState(false)



    const [selectedAllLocations, setSelectedAllLocations] = useState([])

    const [checkAll, setCheckAll] = useState(false)
    const [radius, setRadius] = useState(null)




    // useEffect(() => {
    //     if (checkedSubcategories.length > 0) {
    //         services.forEach(service => {
    //             let matchedExpertise = service.expertise.find(expertise => expertise.expertyName === checkedSubcategories[0]);

    //             if (matchedExpertise) {

    //                 setFilter1(matchedExpertise.filter1)
    //                 setFilter3(matchedExpertise.filter2)
    //                 setFilter2(matchedExpertise.filter3)

    //             }
    //         });
    //     }
    // }, [checkedSubcategories])


    const handleClickOutside = (e) => {
        // if (categoryDropdownRef.current  && !categoryDropdownRef.current.contains(e.target)) {
        //     setShowLocationDropdown(false);
        // }
        if (minPriceRef.current && !minPriceRef.current.contains(e.target) && !budgetLabelRef.current.contains(e.target)) {
            setShowPriceDrp(false);
        }
        if (languageRef.current && !languageRef.current.contains(e.target) && !langLabelRef.current.contains(e.target)) {
            setShowLanguageDrp(false);
        }
        if (experienceRef.current && !experienceRef.current.contains(e.target) && !experienceLabelRef.current.contains(e.target)) {
            setShowExperienceDrp(false);
        }
        if (availabilityRef.current && !availabilityRef.current.contains(e.target) && !availibilityLabelRef.current.contains(e.target)) {
            setShowAvailabilityDrp(false);
        }
        if (categoriesRef.current && !categoriesRef.current.contains(e.target) && !categoriesLabelRef.current.contains(e.target)) {
            setShowCategoriesDrp(false);
        }
        if (educationRef.current && !educationRef.current.contains(e.target) && !educationLabelRef.current.contains(e.target)) {
            setShowEducationDrp(false);
        }
        if (filter1Ref.current && !filter1Ref.current.contains(e.target) && !filter1LabelRef.current.contains(e.target)) {
            setShowFilter1Drp(false);
        }
        if (filter2Ref.current && !filter2Ref.current.contains(e.target) && !filter2LabelRef.current.contains(e.target)) {
            setShowFilter2Drp(false);
        }
        if (filter3Ref.current && !filter3Ref.current.contains(e.target) && !filter3LabelRef.current.contains(e.target)) {
            setShowFilter3Drp(false);
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

    const handleExperience = val => {
        setShowExperienceDrp(false)
        if (!selectedFilters.includes(val)) {
            setSelectedFilters([...selectedFilters, val]);
            setSelectedExperience([...selectedExperience, val])
        }
        else {
            const updatedFilters = selectedFilters.filter(filter => filter !== val);
            setSelectedFilters(updatedFilters);

            const updatedData = selectedExperience.filter(type => type !== val);
            setSelectedExperience(updatedData);
        }
    }

    const handleLanguage = language => {
        setShowLanguageDrp(false);
        const updatedLanguages = selectedLanguages.includes(language)
            ? selectedLanguages.filter(lang => lang !== language)
            : [...selectedLanguages, language];
        setSelectedLanguages(updatedLanguages);
        // updateSelectedFilters('language', updatedLanguages);
    };

    const handleAvailibility = (val) => {
        setShowAvailabilityDrp(false);
        const updatedAvailabilities = availibilities.includes(val)
            ? availibilities.filter(avail => avail !== val)
            : [...availibilities, val];
        setAvailibilities(updatedAvailabilities);
        // updateSelectedFilters('availability', updatedAvailabilities);
    };

    const handleEducation = (val) => {
        setShowEducationDrp(false);
        const updatedEducations = selectedEducations.includes(val)
            ? selectedEducations.filter(edu => edu !== val)
            : [...selectedEducations, val];
        setSelectedEducations(updatedEducations);
        // updateSelectedFilters('education', updatedEducations);
    };


    const handleFiltersSelection = (filterNum, val) => {
        if (filterNum === 1) {
            setShowFilter1Drp(false);
            const updatedFilters = selectedFilters1?.selectedOption?.includes(val)
                ? selectedFilters1.selectedOption.filter(item => item !== val)
                : [...(selectedFilters1.selectedOption || []), val];
            setSelectedFilters1({ filterName: filter1.filterName, selectedOption: updatedFilters });
        }
        else if (filterNum === 2) {
            setShowFilter2Drp(false);
            const updatedFilters = selectedFilters2?.selectedOption?.includes(val)
                ? selectedFilters2.selectedOption.filter(item => item !== val)
                : [...(selectedFilters2.selectedOption || []), val];
            setSelectedFilters2({ filterName: filter2.filterName, selectedOption: updatedFilters });
        }
        else if (filterNum === 3) {
            setShowFilter3Drp(false);
            const updatedFilters = selectedFilters3?.selectedOption?.includes(val)
                ? selectedFilters3.selectedOption.filter(item => item !== val)
                : [...(selectedFilters3.selectedOption || []), val];
            setSelectedFilters3({ filterName: filter3.filterName, selectedOption: updatedFilters });
        }
    };



    const updateSelectedFilters = (filterType, updatedValues) => {
        const otherFilters = selectedFilters.filter(filter =>
            !languageData.includes(filter) &&
            !availibilityData.includes(filter) &&
            !educationData.includes(filter)
        );
        setSelectedFilters([...otherFilters, ...updatedValues]);
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
        // const updatedTypes = selectedFilters.filter((_, i) => i !== index);
        // setSelectedFilters(updatedTypes);


        // const updatedFilters = selectedFilters.filter((_, i) => i !== index);
        // setSelectedFilters(updatedFilters);

        if (selectedLanguages.includes(name)) {
            setSelectedLanguages(prev => prev.filter(item => item !== name));
        }
        if (availibilities.includes(name)) {
            setAvailibilities(prev => prev.filter(item => item !== name));
        }
        if (selectedEducations.includes(name)) {
            setSelectedEducations(prev => prev.filter(item => item !== name));
        }

        if (selectedExperience.includes(name)) {
            setSelectedExperience(item => item.filter(item => item !== name));
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


        if (selectedFilters1?.selectedOption?.includes(name)) {
            setSelectedFilters1(prev => ({
                ...prev,
                selectedOption: prev.selectedOption.filter(item => item !== name)
            }));
        }
        
        if (selectedFilters2?.selectedOption?.includes(name)) {
            setSelectedFilters2(prev => ({
                ...prev,
                selectedOption: prev.selectedOption.filter(item => item !== name)
            }));
        }
        
        if (selectedFilters3?.selectedOption?.includes(name)) {
            setSelectedFilters3(prev => ({
                ...prev,
                selectedOption: prev.selectedOption.filter(item => item !== name)
            }));
        }


        setRadius(null)
    };


    const handleClearFilters = () => {
        setSelectedFilters([]);
        setSelectedAllLocations([])
        setRadius(null)
        clearAllFilters()
        setCheckAll(false)


    }


    let formattedCategories = furnitureCategories.reduce((acc, curr) => {
        let category = acc.find(item => item.categoryName === curr.cateogry);

        if (category) {
            category.subcategories.push(curr.article);
        } else {
            acc.push({
                id: curr.id,
                categoryName: curr.cateogry,
                subcategories: [curr.article]
            });
        }

        return acc;
    }, []);



    const expertsList = []

    services.forEach(service => {
        service.expertise.forEach(experty => {
            expertsList.push(experty.expertyName)
        })
    })

    let expertsFields = services.map((service, i) => {
        return (
            {
                id: i,
                categoryName: service.field,
                subcategories: service.expertise.map(expert => expert.expertyName)
            }
        )
    })

    return (
        <div className="filter-area my-4">
            <div className="custom-container">
                <p className="color-primary mb-2">{t("Connect with experts from every field, all in one place.")}</p>

                <div className="filter machinery-filter construction-filter">
                    <div className="split">

                        <div className="user-input">
                            <div className="category-list" onClick={() => setShowLocationDropdown(!showLocationDropdown)}>
                                {/* <CustomLocationsDropdown selectedLocations={selectedAllLocations} handleLocationSelect={handleLocationSelect} /> */}
                                <CustomLocationsDropdown selectedLocations={selectedAllLocations} handleLocationSelect={handleLocationSelect} radius={radius} handleRadiusChange={handleRadiusChange} />
                            </div>
                            <div className="search-input" onClick={() => setShowCategoriesDrp(!showCategoriesDrp)}  ref={categoriesLabelRef}> 
                                <ExpertsNestedDropdown2
                                    show={showCategoriesDrp}
                                    categoriesRef={categoriesRef}
                                    categories={expertsFields && expertsFields}
                                    setCheckedSubcategories={setCheckedSubcategories}
                                    checkedSubcategories={checkedSubcategories}
                                    categoriesLabelRef={categoriesLabelRef}
                                />
                            </div>
                        </div>
                        <div className="filter-btn">
                            <button className="custom-btn" onClick={handleFilter}>{t("search")}</button>
                        </div>
                    </div>
                    <div className="other-filters p-1 pt-3 pb-0" style={{ flexWrap: "wrap" }}>
                        <div className="d-flex gap-4">
                            <div className="other-filter">
                                <div ref={budgetLabelRef} className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowPriceDrp(!showPriceDrp)}>

                                    <div className='text-white'>
                                        {minPrice === '' && maxPrice === '' ? (
                                            <p className='filter-values'>{t("Consultation Fee/hour")}</p>
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
                                                serviceFeesData.map((n, i) => {
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
                                                serviceFeesData.map((n, i) => {
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
                            {/* filter 1 */}
                            {
                                filter1 &&
                                (

                                    <div className="other-filter">
                                        <div ref={filter1LabelRef} className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowFilter1Drp(!showFilter1Drp)}>
                                            <p className='text-white'>{t(filter1.filterName)}</p>
                                            <FaAngleDown className='text-white' />
                                        </div>

                                        <div className={`custom-dropdown ${showFilter1Drp ? 'show' : ''}`} ref={filter1Ref}>
                                            {
                                                filter1.options.map((data, i) => {
                                                    return (
                                                        <div key={i} className='custom-dropdown-item d-flex align-items-center justify-content-between' onClick={() => handleFiltersSelection(1, data)}>
                                                            <p htmlFor={data} id={`label-${data}`}>{t(data)}</p>
                                                            <input
                                                                type="checkbox"
                                                                name={data}
                                                                id={`checkbox-${data}`}
                                                                checked={selectedFilters1?.selectedOption?.includes(data)}
                                                                onChange={() => handleLanguage(data)}
                                                            />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            }

                            {/* filter 2 */}
                            {
                                filter2 &&
                                (

                                    <div className="other-filter">
                                        <div ref={filter2LabelRef} className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowFilter2Drp(!showFilter2Drp)}>
                                            <p className='text-white'>{t(filter2.filterName)}</p>
                                            <FaAngleDown className='text-white' />
                                        </div>

                                        <div className={`custom-dropdown ${showFilter2Drp ? 'show' : ''}`} ref={filter2Ref}>
                                            {
                                                filter2.options.map((data, i) => {
                                                    return (
                                                        <div key={i} className='custom-dropdown-item d-flex align-items-center justify-content-between' onClick={() => handleFiltersSelection(2, data)}>
                                                            <p htmlFor={data} id={`label-${data}`}>{t(data)}</p>
                                                            <input
                                                                type="checkbox"
                                                                name={data}
                                                                id={`checkbox-${data}`}
                                                                checked={selectedFilters2?.selectedOption?.includes(data)}
                                                                onChange={() => handleLanguage(data)}
                                                            />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            }
                            {/* filter 3  */}
                            {
                                filter3 &&
                                (

                                    <div className="other-filter">
                                        <div ref={filter3LabelRef} className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowFilter3Drp(!showFilter3Drp)}>
                                            <p className='text-white'>{t(filter3.filterName)}</p>
                                            <FaAngleDown className='text-white' />
                                        </div>

                                        <div className={`custom-dropdown ${showFilter3Drp ? 'show' : ''}`} ref={filter3Ref}>
                                            {
                                                filter3.options.map((data, i) => {
                                                    return (
                                                        <div key={i} className='custom-dropdown-item d-flex align-items-center justify-content-between' onClick={() => handleFiltersSelection(3, data)}>
                                                            <p htmlFor={data} id={`label-${data}`}>{t(data)}</p>
                                                            <input
                                                                type="checkbox"
                                                                name={data}
                                                                id={`checkbox-${data}`}
                                                                checked={selectedFilters3?.selectedOption?.includes(data)}
                                                                onChange={() => handleLanguage(data)}
                                                            />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            }

                            {/* // language */}
                            <div className="other-filter">
                                <div ref={langLabelRef} className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowLanguageDrp(!showLanguageDrp)}>
                                    <p className='text-white'>{t("Language")}</p>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown ${showLanguageDrp ? 'show' : ''}`} ref={languageRef}>
                                    {
                                        languageData.map((data, i) => {
                                            return (
                                                <div key={i} className='custom-dropdown-item d-flex align-items-center justify-content-between' onClick={() => handleLanguage(data)}>
                                                    <p htmlFor={data} id={`label-${data}`}>{t(data)}</p>
                                                    <input
                                                        type="checkbox"
                                                        name={data}
                                                        id={`checkbox-${data}`}
                                                        checked={selectedLanguages.includes(data)}
                                                        onChange={() => handleLanguage(data)}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            <div className="other-filter">
                                <div ref={experienceLabelRef} className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowExperienceDrp(!showExperienceDrp)}>
                                    <p className='text-white'>{`${t("Experience")}`}</p>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown  ${showExperienceDrp ? 'show' : ''}`} ref={experienceRef}>
                                    {
                                        experienceList.map((data, i) => {
                                            return (
                                                <div key={i} className='custom-dropdown-item d-flex align-items-center justify-content-between' onClick={() => handleExperience(data)}>
                                                    <p htmlFor={data} id={`label-${data}`}>{t(data)}</p>
                                                    <input
                                                        type="checkbox"
                                                        name={data}
                                                        id={`checkbox-${data}`}
                                                        checked={selectedFilters.includes(data)}
                                                        onChange={() => handleExperience(data)}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            <div className="other-filter">
                                <div ref={availibilityLabelRef} className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowAvailabilityDrp(!showAvailabilityDrp)}>
                                    <p className='text-white'>{t("Availibility")}</p>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown ${showAvailabilityDrp ? 'show' : ''}`} ref={availabilityRef}>
                                    {
                                        availibilityData.map((data, i) => {
                                            return (
                                                <div key={i} className='custom-dropdown-item d-flex align-items-center justify-content-between' onClick={() => handleAvailibility(data)}>
                                                    <p htmlFor={data} id={`label-${data}`}>{t(data)}</p>
                                                    <input
                                                        type="checkbox"
                                                        name={data}
                                                        id={`checkbox-${data}`}
                                                        checked={availibilities.includes(data)}
                                                        onChange={() => handleAvailibility(data)}
                                                    />
                                                </div>
                                            )

                                        })
                                    }
                                </div >
                            </div>

                            <div className="other-filter">
                                <div ref={educationLabelRef} className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowEducationDrp(!showEducationDrp)}>
                                    <p className='text-white'>{t("Education")}</p>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown ${showEducationDrp ? 'show' : ''}`} ref={educationRef}>
                                    {
                                        educationData.map((data, i) => {
                                            return (
                                                <div key={i} className='custom-dropdown-item d-flex align-items-center justify-content-between' onClick={() => handleEducation(data)}>
                                                    <p htmlFor={data} id={`label-${data}`}>{t(data)}</p>
                                                    <input
                                                        type="checkbox"
                                                        name={data}
                                                        id={`checkbox-${data}`}
                                                        checked={selectedEducations.includes(data)}
                                                        onChange={() => handleEducation(data)}
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
                    <div className="d-flex justify-content-between align-items-start gap-2 w-100">
                        <div className="tags">

                            {/* {
                                selectedFilters.map((filter, i) => {
                                    return (
                                        <span key={i} className='selected-filter'>{t(filter)} <FaXmark style={{ cursor: "pointer" }} onClick={() => removeTypeFilter(i, filter)} /></span>
                                    )
                                })
                            } */}
                            {
                                checkedSubcategories && checkedSubcategories.map((filter, i) => {
                                    return (
                                        <span key={i} className='selected-filter'>{t(filter)} <FaXmark style={{ cursor: "pointer" }} onClick={() => removeTypeFilter(i, filter)} /></span>
                                    )
                                })
                            }
                            {
                                selectedCountries.map((filter, i) => {
                                    return (
                                        <span key={i} className='selected-filter'>{t(filter)} <FaXmark style={{ cursor: "pointer" }} onClick={() => removeTypeFilter(i, filter)} /></span>
                                    )
                                })
                            }
                            {
                                selectedStates.map((filter, i) => {
                                    return (
                                        <span key={i} className='selected-filter'>{t(filter)} <FaXmark style={{ cursor: "pointer" }} onClick={() => removeTypeFilter(i, filter)} /></span>
                                    )
                                })
                            }
                            {
                                selectedCities.map((filter, i) => {
                                    return (
                                        <span key={i} className='selected-filter'>{t(filter)} <FaXmark style={{ cursor: "pointer" }} onClick={() => removeTypeFilter(i, filter)} /></span>
                                    )
                                })
                            }
                            {
                                selectedStreets.map((filter, i) => {
                                    return (
                                        <span key={i} className='selected-filter'>{t(filter)} <FaXmark style={{ cursor: "pointer" }} onClick={() => removeTypeFilter(i, filter)} /></span>
                                    )
                                })
                            }


                            {
                                selectedFilters1?.selectedOption &&
                                selectedFilters1?.selectedOption.map((filter, i) => {
                                    return (
                                        <span key={i} className='selected-filter'>{t(filter)} <FaXmark style={{ cursor: "pointer" }} onClick={() => removeTypeFilter(i, filter)} /></span>
                                    )
                                })
                            }

                            {
                                selectedFilters2?.selectedOption &&
                                selectedFilters2?.selectedOption.map((filter, i) => {
                                    return (
                                        <span key={i} className='selected-filter'>{t(filter)} <FaXmark style={{ cursor: "pointer" }} onClick={() => removeTypeFilter(i, filter)} /></span>
                                    )
                                })
                            }

                            {
                                selectedFilters3?.selectedOption &&
                                selectedFilters3?.selectedOption.map((filter, i) => {
                                    return (
                                        <span key={i} className='selected-filter'>{t(filter)} <FaXmark style={{ cursor: "pointer" }} onClick={() => removeTypeFilter(i, filter)} /></span>
                                    )
                                })
                            }
                            {
                                selectedLanguages.map((filter, i) => {
                                    return (
                                        <span key={i} className='selected-filter'>{t(filter)} <FaXmark style={{ cursor: "pointer" }} onClick={() => removeTypeFilter(i, filter)} /></span>
                                    )
                                })
                            }
                            {
                                selectedExperience.map((filter, i) => {
                                    return (
                                        <span key={i} className='selected-filter'>{t(filter)} <FaXmark style={{ cursor: "pointer" }} onClick={() => removeTypeFilter(i, filter)} /></span>
                                    )
                                })
                            }
                            {
                                availibilities.map((filter, i) => {
                                    return (
                                        <span key={i} className='selected-filter'>{t(filter)} <FaXmark style={{ cursor: "pointer" }} onClick={() => removeTypeFilter(i, filter)} /></span>
                                    )
                                })
                            }
                            {
                                selectedEducations.map((filter, i) => {
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



        </div>
    );
}


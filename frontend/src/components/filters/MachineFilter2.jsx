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

export default function MachineryFilter() {
    const [t] = useTranslation();

    const categoryDropdownRef = useRef();
    const minPriceRef = useRef();
    const maxPriceRef = useRef();
    const brandRef = useRef();
    const availableRef = useRef();
    const condtionRef = useRef();
    const guaranteeRef = useRef();
    const yearBuildRef = useRef();
    const categoriesRef = useRef()

    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [showCategoriesDrp, setShowCategoriesDrp] = useState(false)
    const [showMinPriceDrp, setShowMinPriceDrp] = useState(false);
    const [showMaxPriceDrp, setShowMaxPriceDrp] = useState(false);
    const [showBrandDrp, setShowBrandDrp] = useState(false);
    const [showAvailableDrp, setShowAvailableDrp] = useState(false);
    const [showConditionDrp, setShowConditionDrp] = useState(false);
    const [showGuaranteeDrp, setShowGuaranteeDrp] = useState(false)
    const [showYearDrp, setShowYearDrp] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("")
    const [location, setLocation] = useState("")

    const [type, setType] = useState('sale')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [available, setAvailable] = useState('')
    const [condition, setCondtion] = useState('')
    const [selectedFilters, setSelectedFilters] = useState([])
    const [guarantee, setGuarantee] = useState('')
    const [yearBuild, setYearBuild] = useState('')

    const [selectedBrands, setSelectedBrands] = useState([])
    const [selectedCondtions, setSelectedConditions] = useState([])
    // for nested dropdown 
    const [checkedSubcategories, setCheckedSubcategories] = useState([]);

    const machineryData = [
        {
            categoryName: 'Foundation',
            subcategories: [
                'Excavator shovel',
                'Dump truck',
                'Cement mixer',
                'Vibrator',
                'Formwork'
            ]
        },
        {
            categoryName: 'Construction of walls and posts',
            subcategories: [
                'Crane',
                'Cherry picker',
                'Concrete blocks or concrete blocks',
                'Mortar',
                'Coatings'
            ]
        },
        {
            categoryName: 'Installation of slabs and floors',
            subcategories: [
                'Steel or concrete beams',
                'Collaborative floors',
                'Formwork',
                'Cement mixer',
                'Float'
            ]
        },
        {
            categoryName: 'Frame and roofing',
            subcategories: [
                'Lumber',
                'Tiles or slates',
                'Scaffolding',
                'Carpenter tools',
                'Miter saw'
            ]
        },
        {
            categoryName: 'Earthworks and excavation work',
            subcategories: [
                'Excavator shovel',
                'Bulldozer',
                'Dump truck',
                'Compactor',
                'Level'
            ]
        }
    ];



    const formattedCategories = [
        { value: 'Excavators', label: 'Excavators' },
        { value: 'Bulldozers', label: 'Bulldozers' },
        { value: 'Cranes', label: 'Cranes' },
        { value: 'Loaders', label: 'Loaders' },
        { value: 'Backhoes', label: 'Backhoes' },
        { value: 'Dump Trucks', label: 'Dump Trucks' },
        { value: 'Pavers', label: 'Pavers' },
    ];


    const sellType = [
        { value: "sale", label: "Sale" },
        { value: "rent", label: "Rent" },
    ]

    const budget = [
        0, 1000, 5000, 10000, 25000, 50000
    ]

    const brands = [
        "Caterpillar",
        "Komatsu",
        "Volvo",
        "John-Deere",
        "Hitachi",
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
            setShowMinPriceDrp(false);
        }
        if (maxPriceRef.current && !maxPriceRef.current.contains(e.target)) {
            setShowMaxPriceDrp(false);
        }
        if (brandRef.current && !brandRef.current.contains(e.target)) {
            setShowBrandDrp(false);
        }
        if (availableRef.current && !availableRef.current.contains(e.target)) {
            setShowAvailableDrp(false);
        }
        if (condtionRef.current && !condtionRef.current.contains(e.target)) {
            setShowConditionDrp(false);
        }
        if (guaranteeRef.current && !guaranteeRef.current.contains(e.target)) {
            setShowGuaranteeDrp(false);
        }
        if (yearBuildRef.current && !yearBuildRef.current.contains(e.target)) {
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

    const getAddressComponents = (place) => {
        const addressComponents = {};
        place.address_components.forEach((component) => {
            const types = component.types;
            if (types.includes('country')) {
                addressComponents.country = component.long_name;
            } else if (types.includes('locality') || types.includes('administrative_area_level_1')) {
                addressComponents.city = component.long_name;
            } else if (types.includes('route')) {
                addressComponents.street = component.long_name;
            }
        });
        return addressComponents;
    };

    const handleLocationSelect = async value => {
        console.log(value)
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setLocation(value);

    };

    const handleType = (value) => {
        setType(value)
    }
    const handleMinPrice = (e) => {
        setShowMinPriceDrp(false)
        setMinPrice(e)
    }
    const handleMaxPrice = (e) => {
        setShowMaxPriceDrp(false)
        setMaxPrice(e)
    }
    const handleBrand = brand => {
        setShowBrandDrp(false)
        if (!selectedFilters.includes(brand)) {
            setSelectedFilters([...selectedFilters, brand]);
            setSelectedBrands([...selectedBrands, brand])
        }
    }
    const handleAvailability = val => {
        setShowAvailableDrp(false)
        setAvailable(val)
    }
    const handleCondtion = val => {
        setShowConditionDrp(false)
        setCondtion(val)
        if (!selectedFilters.includes(val)) {
            setSelectedFilters([...selectedFilters, val]);
        }
    }

    const handleGuarantee = (val) => {
        setShowGuaranteeDrp(false)
        setGuarantee(val)
    }
    const handleYearBuild = (val) => {
        setShowYearDrp(false)
        setYearBuild(val)
    }


    const handleFilter = () => {
        console.log(selectedCategory)
        console.log(location)
    }

    const removeTypeFilter = (index) => {
        // filtering out the item at the specified index
        const updatedTypes = selectedFilters.filter((_, i) => i !== index);
        setSelectedFilters(updatedTypes);
    };


    const [extendedCategory, setExtendedCategory] = useState(null)
    const [checkedCategory, setCheckedCategory] = useState(null)
    const handleCategoryCheck = (index) => {
        setCheckedCategory(index)
    }

    const clearAllFilters = () => {
        setSelectedCategory("");
        setLocation("");
        setType('sale');
        setMinPrice('');
        setMaxPrice('');
        setAvailable('');
        setCondtion('');
        setSelectedFilters([]);
        setGuarantee('');
        setYearBuild('');
        setSelectedBrands([]);
        setSelectedConditions([]);
        setCheckedSubcategories([])
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
                                <PlacesAutocomplete
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
                                </PlacesAutocomplete>
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

                                {
                                    checkedSubcategories.length < 1 ?
                                        (
                                            <p>Select Category</p>
                                        )
                                        :
                                        (
                                            <p>{checkedSubcategories.length} Categories Selected</p>
                                        )
                                }

                                <FaAngleDown />

                                <NestedDropdown show={showCategoriesDrp} categoriesRef={categoriesRef} categories={machineryData} setCheckedSubcategories={setCheckedSubcategories} checkedSubcategories={checkedSubcategories} />
                            </div>
                        </div>
                        <div className="filter-btn">
                            <button className="custom-btn" onClick={handleFilter}>Search</button>
                        </div>
                    </div>
                    <div className="other-filters p-1 pt-3 pb-0">
                        <div className="d-flex gap-4">
                            <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowMinPriceDrp(!showMinPriceDrp)}>
                                    <p className='text-white'>{minPrice === '' ? 'Min. Budget' : `Min. Budget: ${minPrice}`}</p>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown ${showMinPriceDrp ? 'show' : ''}`} ref={minPriceRef}>
                                    <div className="custom-dropdown-item">
                                        <input className='custom-input py-1' type="number" placeholder='Any' value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                                    </div>
                                    {
                                        budget.map((n, i) => {
                                            return (
                                                <p className="custom-dropdown-item" onClick={() => handleMinPrice(n)} key={i}>MAD {n}</p>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowMaxPriceDrp(!showMaxPriceDrp)}>
                                    <p className='text-white'>{maxPrice === '' ? 'Max. Budget' : `Max. Budget: ${maxPrice}`}</p>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown ${showMaxPriceDrp ? 'show' : ''}`} ref={maxPriceRef}>
                                    <div className="custom-dropdown-item">
                                        <input className='custom-input py-1' type="number" placeholder='Any' value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                                    </div>
                                    {
                                        budget.map((n, i) => {
                                            return (
                                                <>
                                                    <p className="custom-dropdown-item" onClick={() => handleMaxPrice(n)} key={i}>MAD {n}</p>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowBrandDrp(!showBrandDrp)}>
                                    <p className='text-white'>Brand</p>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown ${showBrandDrp ? 'show' : ''}`} ref={brandRef}>
                                    {
                                        brands.map((n, i) => {
                                            return (
                                                <p className="custom-dropdown-item" onClick={() => handleBrand(n)} key={i}>{n}</p>
                                            )
                                        })
                                    }
                                </div>
                            </div>

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

                            <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowYearDrp(!showYearDrp)}>
                                    <p className='text-white'>{yearBuild === '' ? 'Build' : `Build: ${yearBuild}`}</p>
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


                            <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowGuaranteeDrp(!showGuaranteeDrp)}>
                                    <p className='text-white'>{guarantee === '' ? 'Guarantee' : `Guarantee: ${guarantee}`}</p>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown ${showGuaranteeDrp ? 'show' : ''}`} ref={guaranteeRef}>
                                    <p className="custom-dropdown-item" onClick={() => handleGuarantee('Yes')}>Yes</p>
                                    <p className="custom-dropdown-item" onClick={() => handleGuarantee('No')}>No</p>
                                </div>
                            </div>


                            <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowAvailableDrp(!showAvailableDrp)}>
                                    <p className='text-white'>{available === '' ? 'Availablity' : `Available: ${available}`}</p>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown ${showAvailableDrp ? 'show' : ''}`} ref={availableRef}>
                                    <p className="custom-dropdown-item" onClick={() => handleAvailability('Yes')}>Yes</p>
                                    <p className="custom-dropdown-item" onClick={() => handleAvailability('No')}>No</p>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="selected-filters w-100">
                    <div className="d-flex justify-content-between gap-2 w-100">
                        <div className="tags">
                            {
                                selectedFilters.map((type, i) => {
                                    return (
                                        <span key={i} className='selected-filter'>{type} <FaXmark style={{ cursor: "pointer" }} onClick={() => removeTypeFilter(i)} /></span>
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

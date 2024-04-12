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

export default function MachineryFilter() {
    const [t] = useTranslation();

    const categoryDropdownRef = useRef();
    const minPriceRef = useRef();
    const maxPriceRef = useRef();
    const brandRef = useRef();
    const availableRef = useRef();
    const condtionRef = useRef();

    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [showMinPriceDrp, setShowMinPriceDrp] = useState(false);
    const [showMaxPriceDrp, setShowMaxPriceDrp] = useState(false);
    const [showBrandDrp, setShowBrandDrp] = useState(false);
    const [showAvailableDrp, setShowAvailableDrp] = useState(false);
    const [showConditionDrp, setShowConditionDrp] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("")
    const [location, setLocation] = useState("")

    const [type, setType] = useState('sale')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [available, setAvailable] = useState('')
    const [condition, setCondtion] = useState('')
    const [selectedBrands, setSelectedBrands] = useState([])

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
        'Caterpillar', 'Hitachi', 'Zoomlion', 'Doosan'
    ]

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
        if (!selectedBrands.includes(brand)) {
            setSelectedBrands([...selectedBrands, brand]);
        }
    }
    const handleAvailability = val => {
        setShowAvailableDrp(false)
        setAvailable(val)
    }
    const handleCondtion = val => {
        setShowConditionDrp(false)
        setCondtion(val)
    }

    const handleFilter = () => {
        console.log(selectedCategory)
        console.log(location)
    }

    const removeTypeFilter = (index) => {
        // filtering out the item at the specified index
        const updatedTypes = selectedBrands.filter((_, i) => i !== index);
        setSelectedBrands(updatedTypes);
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
                                    name="color"
                                    options={sellType}
                                    defaultValue={[sellType[0]]}
                                    onChange={handleType}
                                    value={type}
                                    isClearable={true}
                                />
                            </div>
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
                    <div className="other-filters p-1 pt-3 pb-0">
                        <div className="d-flex gap-4">
                            <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowMinPriceDrp(!showMinPriceDrp)}>
                                    <p className='text-white'>{minPrice === '' ? 'Min. Budget' : `Min. Budget: ${minPrice}`}</p>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown ${showMinPriceDrp ? 'show' : ''}`} ref={minPriceRef}>
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
                                    {
                                        budget.map((n, i) => {
                                            return (
                                                <p className="custom-dropdown-item" onClick={() => handleMaxPrice(n)} key={i}>MAD {n}</p>
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
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowAvailableDrp(!showAvailableDrp)}>
                                    <p className='text-white'>{available === '' ? 'Availablity' : `Available: ${available}`}</p>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown ${showAvailableDrp ? 'show' : ''}`} ref={availableRef}>
                                    <p className="custom-dropdown-item" onClick={() => handleAvailability('yes')}>Yes</p>
                                    <p className="custom-dropdown-item" onClick={() => handleAvailability('no')}>No</p>
                                </div>
                            </div>

                            <div className="other-filter">
                                <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowConditionDrp(!showConditionDrp)}>
                                    <p className='text-white'>{condition === '' ? 'Condtion' : `Condition: ${condition}`}</p>
                                    <FaAngleDown className='text-white' />
                                </div>

                                <div className={`custom-dropdown ${showConditionDrp ? 'show' : ''}`} ref={condtionRef}>
                                    <p className="custom-dropdown-item" onClick={() => handleCondtion('new')}>New</p>
                                    <p className="custom-dropdown-item" onClick={() => handleCondtion('used')}>Used</p>
                                </div>
                            </div>


                        </div>

                    </div>

                </div>

                <div className="selected-filters">
                    {
                        selectedBrands.map((type, i) => {
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

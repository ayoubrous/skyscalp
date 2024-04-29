import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { FaBuilding, FaEye, FaRegTrashCan, FaTrash, FaUser, FaXmark } from 'react-icons/fa6'
import { FaCloudUploadAlt, FaEdit, FaTools } from 'react-icons/fa'
import { BsBuildingsFill } from 'react-icons/bs'
import { TbCarCrane } from 'react-icons/tb'
import logo from '../assets/images/profile/user-1.jpg'
import { Link } from 'react-router-dom'
import Select from 'react-select';
import locations from '../../assets/data/locations'

import { machineryType, propertyBudget, constructionBudget, machineryBudget, yearBuildData, propertyYearBuildData, conditionData, constructionBrands, proximityData, featuresData, featuresDataObj } from '../../assets/data/filtersData'
import { propertyCategories } from '../../assets/data/categories'
import GetLocationMap from '../../components/map/GetLocationMap'

export default function AddProperty() {

    const imageUploadRef = useRef()

    const [showUploadedImages, setShowUploadedImages] = useState(false)
    const [uploadedImageViews, setUploadedImageViews] = useState([])
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [street, setStreet] = useState('')
    const [title, setTitle] = useState('')
    const [budget, setBudget] = useState('')
    const [area, setArea] = useState('')
    const [build, setBuild] = useState('')
    const [application, setApplication] = useState('')
    const [category, setCategory] = useState('')
    const [type, setType] = useState('')
    const [rooms, setRooms] = useState('')
    const [bathrooms, setBathrooms] = useState('')
    const [kitchen, setKitchen] = useState('')
    const [garage, setGarage] = useState('')
    const [pool, setPool] = useState('')
    const [description, setDescription] = useState('')
    const [condition, setCondition] = useState('')
    const [proximity, setProximity] = useState('')
    const [features, setFeatures] = useState('')
    const [mapLocation, setMapLocation] = useState(null)

    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [streets, setStreets] = useState([])

    function getCountries(locationsArray) {
        const countryLocations = locationsArray.filter(location => location.label === "Country");
        const uniqueCountries = [...new Set(countryLocations.map(location => location.country))];
        return uniqueCountries.map(country => ({ value: country, label: country }));
    }

    function getStates(locationsArray, selectedCountry) {
        const stateLocations = locationsArray.filter(location => location.label === "State" && location.country === selectedCountry);
        const uniqueStates = [...new Set(stateLocations.map(location => location.state))];
        return uniqueStates.map(state => ({ value: state, label: state }));
    }

    function getCities(locationsArray, selectedState) {
        const cityLocations = locationsArray.filter(location => location.label === "City" && location.state === selectedState);
        const uniqueCities = [...new Set(cityLocations.map(location => location.city))];
        return uniqueCities.map(city => ({ value: city, label: city }));
    }

    function getStreets(locationsArray, selectedCity) {
        const streetLocations = locationsArray.filter(location => location.label === "Street" && location.city === selectedCity);
        const uniqueStreets = [...new Set(streetLocations.map(location => location.name))];
        return uniqueStreets.map(street => ({ value: street, label: street }));
    }

    useEffect(() => {
        setCountries(getCountries(locations));
    }, [locations]);

    const handleCountryChange = (val) => {
        setCountry(val);
        setStates(getStates(locations, val));
        console.log(states)
    }

    const handleStateChange = (val) => {
        setState(val);
        setCities(getCities(locations, val));
    }

    const handleCityChange = (val) => {
        setCity(val);
        setStreets(getStreets(locations, val));
    }

    const handleFeaturesChange = (value) => {
        setFeatures(value)
    }

    const hanldeUploadClick = () => {
        imageUploadRef.current.click()
    }
    const handleImageChange = (e) => {
        const files = e.target.files;
        setShowUploadedImages(true);

        // first upload the images and then fill the array with images 
        Array.from(files).forEach(img => {
            const ImgView = {
                image: URL.createObjectURL(img),
                id: img.lastModified
            };
            setUploadedImageViews(prevViews => [...prevViews, ImgView]);
        });
    };

    const removeImage = (lastModified) => {
        setUploadedImageViews(prevViews =>
            prevViews.filter(image => image.id !== lastModified)
        );
    }
    return (
        <>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">
                <Sidebar />

                <div className="body-wrapper">
                    <Header />
                    <div className="container-fluid">
                        <h2 className='fw-bolder'>Publish New Property</h2>
                        <small className='mb-3'>Fill out all the required fields</small>

                        <div className="d-flex justify-content-end">
                            <a href=""></a>
                            <Link to='/'>
                                {/* <button className="outline-btn py-1 px-2">+ Add New</button> */}
                            </Link>
                        </div>

                        <div className="card px-3 py-4 my-4 publish-form">
                            <form action="" className="form">
                                <div className="row mb-3">
                                    <div className="form-group col-6">
                                        <label htmlFor="" className='mb-1'>Title*</label>
                                        <input type="text" className="custom-input" onChange={e => setTitle(e.target.value)} value={title} />
                                    </div>
                                    <div className="form-group col-6">
                                        <label htmlFor="" className='mb-1'>Budget (MAD)*</label>
                                        <input type="number" min={0} className="custom-input" onChange={e => setBudget(e.target.value)} value={budget} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="form-group col-4">
                                        <label htmlFor="" className='mb-1'>Country*</label>
                                        <Select
                                            className="custom-input react-select"
                                            classNamePrefix="select"
                                            placeholder='Select Country'
                                            name="color"
                                            options={countries}
                                            onChange={handleCountryChange}
                                        />
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="" className='mb-1'>State*</label>
                                        <Select
                                            className="custom-input react-select"
                                            classNamePrefix="select"
                                            placeholder='Select Country'
                                            name="color"
                                            options={states && states}
                                            onChange={handleStateChange}

                                        />
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="" className='mb-1'>City*</label>
                                        <Select
                                            className="custom-input react-select"
                                            classNamePrefix="select"
                                            placeholder='Select Country'
                                            name="color"
                                            options={cities}
                                            onChange={handleCityChange}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="form-group col-4">
                                        <label htmlFor="" className='mb-1'>Street Address (optional)</label>
                                        <Select
                                            className="custom-input react-select"
                                            classNamePrefix="select"
                                            placeholder='Select Country'
                                            name="color"
                                            options={streets}
                                            defaultValue={[streets[1]]}
                                        />
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="" className='mb-1'>Area (m <sup>2</sup>)*</label>
                                        <input type="number" min={0} className="custom-input" onChange={e => setArea(e.target.value)} value={area} />
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="" className='mb-1'>Year Build</label>
                                        <select name="" id="" className="custom-input" onChange={e => setBuild(e.target.value)} value={build}>
                                            <option value="">Select Year Build</option>
                                            {
                                                propertyYearBuildData.map((data, i) => {
                                                    return (
                                                        <option value={data} key={i}>{data}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="form-group col-4">
                                        <label htmlFor="" className='mb-1'>Application*</label>
                                        <select name="" id="" className="custom-input" onChange={e => setBuild(e.target.value)} value={build}>
                                            <option value="">Select Applicaion</option>
                                            {
                                                propertyCategories.map((data, i) => {
                                                    return (
                                                        <option value={data.categoryName} key={i}>{data.categoryName}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="" className='mb-1'>Category*</label>
                                        <select name="" id="" className="custom-input" onChange={e => setBuild(e.target.value)} value={build}>
                                            <option value="">Select Category</option>
                                            {
                                                propertyCategories.map((data) => (
                                                    data.subcategories.map((subCat, i) => (
                                                        <option value={subCat} key={i}>{subCat}</option>
                                                    ))
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="" className='mb-1'>Type*</label>
                                        <select name="" id="" className="custom-input" onChange={e => setBuild(e.target.value)} value={build}>
                                            <option value="">Select Type</option>
                                            <option value="rent">Rent</option>
                                            <option value="buy">Sale</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="form-group col-3">
                                        <label htmlFor="" className='mb-1'>Rooms</label>
                                        <input type="number" min={0} placeholder="" className="custom-input" onChange={e => setRooms(e.target.value)} value={rooms} />
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="" className='mb-1'>Bathrooms</label>
                                        <input type="number" min={0} placeholder="" className="custom-input" onChange={e => setBudget(e.target.value)} value={budget} />
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="" className='mb-1'>Kitchen</label>
                                        <input type="number" min={0} placeholder="" className="custom-input" onChange={e => setKitchen(e.target.value)} value={kitchen} />
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="" className='mb-1'>Garage</label>
                                        <input type="number" min={0} placeholder="" className="custom-input" onChange={e => setGarage(e.target.value)} value={garage} />
                                    </div>
                                </div>
                                <div className="row mb-3">

                                    <div className="form-group col-3">
                                        <label htmlFor="" className='mb-1'>Pool</label>
                                        <input type="number" min={0} placeholder="1" className="custom-input" onChange={e => setPool(e.target.value)} value={pool} />
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="" className='mb-1'>Condition</label>
                                        <select name="" id="" className="custom-input" onChange={e => setCondition(e.target.value)} value={condition}>
                                            <option value="">Select Condition</option>
                                            {
                                                conditionData.map((data, i) => {
                                                    return (
                                                        <option value={data} key={i}>{data}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="" className='mb-1'>Proximity</label>
                                        <select name="" id="" className="custom-input" onChange={e => setProximity(e.target.value)} value={proximity}>
                                            <option value="">Select Proximity</option>
                                            {
                                                proximityData.map((data, i) => {
                                                    return (
                                                        <option value={data} key={i}>{data}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="" className='mb-1'>Features</label>
                                        <Select
                                            className="custom-input react-select"
                                            classNamePrefix="select"
                                            placeholder='Select Country'
                                            name="color"
                                            options={featuresDataObj}
                                            isMulti
                                            onChange={handleFeaturesChange}
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="form-group col-12">
                                        <label htmlFor="" className='mb-1'>Description* <small>(max 200 chars)</small></label>
                                        <textarea name="" id="" cols="30" rows="5" className="custom-input" onChange={e => setDescription(e.target.value)} value={description} maxLength={200} style={{ maxHeight: "200px" }}></textarea>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-12 images-section">
                                        <div className="upload-image" onClick={hanldeUploadClick}>
                                            <input type="file" accept='image/*' onChange={handleImageChange} multiple name="" id="" className='invisible' ref={imageUploadRef} />
                                            <FaCloudUploadAlt />
                                            <p>Upload Images</p>
                                        </div>
                                        <div className={`uploaded-images ${showUploadedImages ? 'show' : ''}`}>
                                            {uploadedImageViews &&
                                                uploadedImageViews.map((image, i) => {
                                                    return (
                                                        <div className="image" key={i}>
                                                            <FaXmark onClick={() => removeImage(image.id)} />
                                                            <img src={image.image} alt="" />
                                                        </div>
                                                    );
                                                })
                                            }

                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3 mt-3">
                                    <div className="col-12">
                                        <h5>Add location by map</h5>
                                        <small>Click on the location address in map</small>
                                        <GetLocationMap clickedPosition={mapLocation} setClickedPosition={setMapLocation}/>
                                    </div>
                                </div>

                                <div className="row mb-2">
                                    <div className="form-group d-flex align-items-center justify-content-end gap-2">
                                        <button className="outline-btn py-2">Reset</button>
                                        <button className="custom-btn" type='submit'>Publish</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="py-0 px-6 ">
                            <small className="mb-0 color-secondary">Developed by <a href="" className="pe-1 text-primary text-decoration-underline">MA-Tech</a></small>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

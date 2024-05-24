import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { FaBuilding, FaEye, FaRegTrashCan, FaTrash, FaUser, FaXmark } from 'react-icons/fa6'
import { FaCloudUploadAlt, FaEdit, FaTools } from 'react-icons/fa'
import { BsBuildingsFill } from 'react-icons/bs'
import { TbCarCrane, TbListSearch } from 'react-icons/tb'
import logo from '../assets/images/profile/user-1.jpg'
import { Link, useLocation, useParams } from 'react-router-dom'
import Select from 'react-select';
import locations from '../../assets/data/locations'
import loader from '../../assets/images/skyscalp-loader.json'

import { machineryType as machineryTypesDropdown, propertyBudget, constructionBudget, machineryBudget, yearBuildData, propertyYearBuildData, conditionData, constructionBrands, proximityData, featuresData, featuresDataObj } from '../../assets/data/filtersData'
import { constructionCategories, machineryCategories, propertyCategories } from '../../assets/data/categories'
import GetLocationMap from '../../components/map/GetLocationMap'
import toast, { Toaster } from 'react-hot-toast';
import { uploadImage } from '../utils/uploadImage'
import ClipLoader from "react-spinners/ClipLoader";
import { Line } from 'rc-progress';
import Lottie from 'lottie-react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Editor from '../components/Editor'
import Footer from '../components/Footer'


export default function AddConstruction() {


    const imageUploadRef = useRef()

    const [constructionID, setConstructionID] = useState('')
    const [showUploadedImages, setShowUploadedImages] = useState(false)
    const [uploadedImages, setUploadedImages] = useState([])
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [street, setStreet] = useState('')
    const [title, setTitle] = useState('')
    const [budget, setBudget] = useState('')
    const [application, setApplication] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [mapLocation, setMapLocation] = useState(null)
    const [guarantee, setGuarantee] = useState(false)
    const [guaranteePeriod, setGuaranteePeriod] = useState('')
    const [unit, setUnit] = useState('')
    const [weight, setWeight] = useState('')
    const [available, setAvailable] = useState(true)
    const [size, setSize] = useState('')
    const [dimensions, setDimensions] = useState('')
    const [brand, setBrand] = useState('')
    const [condition, setCondition] = useState('')
    const [color, setColor] = useState('')
    const [quality, setQuality] = useState('')
    const [quantity, setQuantity] = useState('')


    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [streets, setStreets] = useState([])

    const [isLoading, setIsLoading] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [updatePage, setUpdatePage] = useState(false)
    const location = useLocation()


    let params = useParams()
    useEffect(() => {
        const { pathname } = location;
        if (pathname !== '/app/add-construction') {
            setIsLoading(true)
            setUpdatePage(true)
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };

            fetch(`${process.env.REACT_APP_SERVER_URL}/api/getProductById/${params.id}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setIsLoading(false)
                    if (result.status) {
                        console.log(result)
                        setConstructionID(result.data._id);
                        setCountry(result.data.country);
                        setState(result.data.state);
                        setCity(result.data.city);
                        setStreet(result.data.street);
                        setTitle(result.data.title);
                        setBudget(result.data.budget);
                        setApplication(result.data.application);
                        setCategory(result.data.category);
                        setDescription(result.data.description);
                        setCondition(result.data.condition);
                        setMapLocation(result.data.mapLocation);
                        setGuarantee(result.data.guarantee);
                        setGuaranteePeriod(result.data.guaranteePeriod);
                        setUnit(result.data.unit);
                        setWeight(result.data.weight);
                        setAvailable(result.data.available);
                        setSize(result.data.size);
                        setBrand(result.data.brand);
                        setColor(result.data.color);
                        setDimensions(result.data.dimensions);
                        setQuality(result.data.quality);
                        setQuantity(result.data.quantity);
                        setUploadedImages(result.data.images.map((img, i) => {
                            return ({
                                id: i,
                                url: img,
                            })
                        }))
                        setShowUploadedImages(true)
                        loadStates(result.data.country)
                        loadCities(result.data.state)
                        loadStreets(result.data.city)


                    }
                    else {
                        toast.error(result.message)
                    }
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.error(error);
                });
        }

    }, [])

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/location/getCountries`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    const countriesArray = result.data.map(country => ({
                        label: country.name,
                        value: country.name
                    }));
                    setCountries(countriesArray)
                }
                else {
                    toast.error("Error getting countries data")
                }
            })
            .catch((error) => console.error(error));
    }, [])


    const loadStates = country => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/location/getStatesByCountry?country=${country}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    const statesArray = result.data.map(country => ({
                        label: country.name,
                        value: country.name
                    }));
                    setStates(statesArray)
                }
                else {
                    toast.error("Error getting states data")
                }
            })
            .catch((error) => console.error(error));
    }

    const loadCities = stateName => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/location/getCitiesByState?state=${stateName}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    const citiesArray = result.data.map(city => ({
                        label: city.name,
                        value: city.name
                    }));
                    setCities(citiesArray)
                }
                else {
                    toast.error("Error getting states data")
                }
            })
            .catch((error) => console.error(error));
    }

    const loadStreets = cityName => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/location/getStreetsByCity?city=${cityName}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    const streetsArray = result.data.map(city => ({
                        label: city.name,
                        value: city.name
                    }));
                    setStreets(streetsArray)
                }
                else {
                    toast.error("Error getting states data")
                }
            })
            .catch((error) => console.error(error));
    }

    const handleCountryChange = (val) => {
        setCountry(val.value);
        loadStates(val.value)
    }

    const handleStateChange = (val) => {
        setState(val.value);
        loadCities(val.value)
    }

    const handleCityChange = (val) => {
        setCity(val.value);
        loadStreets(val.value)
    }

    const handleStreetChange = (val) => {
        setStreet(val.value);
    }

    const handleFeaturesChange = (value) => {
        const selectedValues = value.map(feature => feature.value);

        // setFeatures(prevFeatures => {
        //     // Remove values not present in the new selection
        //     const updatedFeatures = prevFeatures.filter(feature => selectedValues.includes(feature));

        //     // Add new values that are not already in the state
        //     value.forEach(feature => {
        //         if (!updatedFeatures.includes(feature.value)) {
        //             updatedFeatures.push(feature.value);
        //         }
        //     });

        //     // console.log(updatedFeatures); 
        //     return updatedFeatures;
        // });
    };



    const hanldeUploadClick = () => {
        imageUploadRef.current.click()
    }

    const handleImageChange = async (e) => {
        const files = e.target.files;
        setShowUploadedImages(true);
        setUploadingImage(true);

        try {
            const responses = await Promise.all(
                Array.from(files).map(uploadImage)
            );

            const uploadedImageUrls = responses.filter(res => res.status).map(res => res.url);
            setUploadedImages(prevImages => [
                ...prevImages,
                ...uploadedImageUrls.map((url, index) => ({ url, id: index }))
            ]);

        } catch (error) {
            console.error("Error uploading images:", error);
        }

        setUploadingImage(false);
    };

    const removeImage = (id) => {
        setUploadedImages(prevImages =>
            prevImages.filter(image => image.id !== id)
        );
    };

    const validateFields = () => {
        console.log(mapLocation)
        if (
            country === "" ||
            state === "" ||
            city === "" ||
            title === "" ||
            budget === "" ||
            unit === "" ||
            application === "" ||
            category === "" ||
            description === "" ||
            mapLocation === null ||
            uploadedImages.length === 0
        ) {
            return false
        }
        else {
            return true
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (!validateFields()) {
            toast.error("Fill out required fields to continue")
        }
        else {
            setIsLoading(true)
            let user = JSON.parse(localStorage.getItem('user'));
            const data = {
                userID: user.userID,
                materialGroup: 'construction',
                images: uploadedImages.map(imageObj => imageObj.url),
                country: country,
                state: state,
                city: city,
                street: street,
                title: title,
                budget: budget,
                application: application,
                category: category,
                description: description,
                condition: condition,
                mapLocation: mapLocation,
                guarantee: guarantee,
                guaranteePeriod: guaranteePeriod,
                unit: unit,
                weight: weight,
                available: available,
                size: size,
                brand: brand,
                color: color,
                dimensions: dimensions,
                quality: quality,
                quantity: quantity,
                status: true
            };


            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify(data);

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch(`${process.env.REACT_APP_SERVER_URL}/api/addProduct`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setIsLoading(false)
                    if (result.status) {
                        toast.success(result.message)
                    }
                    else {
                        toast.error(result.message)
                    }
                })
                .catch((error) => {
                    console.error(error)
                    setIsLoading(false)
                });

        }
    }

    const handleUpdate = e => {
        e.preventDefault()

        if (!validateFields()) {
            toast.error("Fill out required fields to continue")
        }
        else {
            setIsLoading(true)
            let user = JSON.parse(localStorage.getItem('user'));
            const data = {
                userID: user.userID,
                materialGroup: 'construction',
                images: uploadedImages.map(imageObj => imageObj.url),
                country: country,
                state: state,
                city: city,
                street: street,
                title: title,
                budget: budget,
                application: application,
                category: category,
                description: description,
                condition: condition,
                mapLocation: mapLocation,
                guarantee: guarantee,
                guaranteePeriod: guaranteePeriod,
                unit: unit,
                weight: weight,
                available: available,
                size: size,
                brand: brand,
                color: color,
                dimensions: dimensions,
                quality: quality,
                quantity: quantity,
                status: true
            };


            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            console.log(data)
            const raw = JSON.stringify(data);

            const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch(`${process.env.REACT_APP_SERVER_URL}/api/updateProduct/${constructionID}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setIsLoading(false)
                    if (result.status) {
                        toast.success(result.message)
                    }
                    else {
                        toast.error(result.message)
                    }
                })
                .catch((error) => {
                    console.error(error)
                    setIsLoading(false)
                });

        }
    }

    const resetAllFields = () => {
        setShowUploadedImages(false);
        setUploadedImages([]);
        setCountry('');
        setState('');
        setCity('');
        setStreet('');
        setTitle('');
        setBudget('');
        setApplication('');
        setCategory('');
        setDescription('');
        setCondition('');
        setMapLocation(null);
        setGuarantee(false);
        setGuaranteePeriod('');
        setUnit('');
        setWeight('');
        setAvailable(false);
        setSize('');
        setBrand('');
        setColor('');
        setDimensions('')
        setQuality('')
        setQuantity('')
    }


    const handleDescriptionChange = (event, editor) => {
        const data = editor.getData();
        // setDescription(data);
        console.log(data)
    };

    const toolbar = [
        'bold',
        'italic',
        '|',
        'numberedList',
        'bulletedList',
        '|',
        'heading',
        'blockQuote',
        '|',
    ];

    return (
        <>
            <Toaster />
            <div className={`lottie-wrapper ${isLoading ? 'show' : ''}`}>
                <Lottie className='loader' animationData={loader} loop={true} />
            </div>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">
                <Sidebar />

                <div className="body-wrapper">
                    <Header />
                    <div className="container-fluid">
                        {
                            updatePage ?
                                (
                                    <>
                                        <h2 className='fw-bolder'>Update Product</h2>
                                        <small className='mb-3'>Update the desired fields and retain others</small>
                                    </>

                                ) :
                                (
                                    <>
                                        <h2 className='fw-bolder'>Publish New Construction Product</h2>
                                        <small className='mb-3'>Fill out all the required fields</small>
                                    </>
                                )
                        }


                        <div className="d-flex justify-content-end">
                            <a href=""></a>
                            <Link to='/'>
                                {/* <button className="outline-btn py-1 px-2">+ Add New</button> */}
                            </Link>
                        </div>

                        <div className="card px-3 py-4 my-4 publish-form">
                            <form action="" className="form" onSubmit={updatePage ? handleUpdate : handleSubmit}>
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
                                            value={
                                                countries.filter(option =>
                                                    option.label === country
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="" className='mb-1'>State*</label>
                                        <Select
                                            className="custom-input react-select"
                                            classNamePrefix="select"
                                            placeholder='Select State'
                                            name="color"
                                            options={states && states}
                                            onChange={handleStateChange}
                                            value={
                                                states.filter(option =>
                                                    option.label === state
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="" className='mb-1'>City*</label>
                                        <Select
                                            className="custom-input react-select"
                                            classNamePrefix="select"
                                            placeholder='Select City'
                                            name="color"
                                            options={cities && cities}
                                            onChange={handleCityChange}
                                            value={
                                                cities.filter(option =>
                                                    option.label === city
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="form-group col-4">
                                        <label htmlFor="" className='mb-1'>Street Address (optional)</label>
                                        <Select
                                            className="custom-input react-select"
                                            classNamePrefix="select"
                                            placeholder='Select Street'
                                            name="color"
                                            options={streets && streets}
                                            onChange={handleStreetChange}
                                            value={
                                                streets.filter(option =>
                                                    option.label === street
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="" className='mb-1'>Sell Unit <small>(per Item, per Day, per Month)</small>*</label>
                                        <input type="text" className="custom-input" onChange={e => setUnit(e.target.value)} value={unit} />
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="" className='mb-1'>Brand*</label>
                                        <select name="" id="" className="custom-input" onChange={e => setBrand(e.target.value)} value={brand}>
                                            <option value="">Select brand</option>
                                            {
                                                constructionBrands.map((data, i) => {
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
                                        <select name="" id="" className="custom-input" onChange={e => setApplication(e.target.value)} value={application}>
                                            <option value="">Select Applicaion</option>
                                            {
                                                constructionCategories.map((data, i) => {
                                                    return (
                                                        <option value={data.categoryName} key={i}>{data.categoryName}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="" className='mb-1'>Category*</label>
                                        <select name="" id="" className="custom-input" onChange={e => setCategory(e.target.value)} value={category}>
                                            <option value="">Select Category</option>
                                            {
                                                constructionCategories.map((data) => (
                                                    data.subcategories.map((subCat, i) => (
                                                        <option value={subCat} key={i}>{subCat}</option>
                                                    ))
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="" className='mb-1'>Condition*</label>
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
                                </div>

                                <div className="row mb-3">
                                    <div className="form-group col-3">
                                        <label htmlFor="" className='mb-1'>Weight <small>(In kg)</small></label>
                                        <input type="number" placeholder="eg 2000" className="custom-input" onChange={e => setWeight(e.target.value)} value={weight} />
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="" className='mb-1'>Color</label>
                                        <input type="text" placeholder="eg Brown" className="custom-input" onChange={e => setColor(e.target.value)} value={color} />
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="" className='mb-1'>Quality</label>
                                        <input type="text" placeholder="eg Supreme" className="custom-input" onChange={e => setQuality(e.target.value)} value={quality} />
                                    </div>
                                    <div className="form-group col-3">
                                        <label htmlFor="" className='mb-1'>Quantity</label>
                                        <input type="text" placeholder="eg 20kg" className="custom-input" onChange={e => setQuantity(e.target.value)} value={quantity} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="form-group col-6">
                                        <label htmlFor="" className='mb-1'>Size <small>(In m)</small></label>
                                        <input type="number" placeholder="eg 12" className="custom-input" onChange={e => setSize(e.target.value)} value={size} />

                                    </div>
                                    <div className="form-group col-6">
                                        <label htmlFor="" className='mb-1'>Dimensions <small>(In m)</small></label>
                                        <input type="text" placeholder="12x18" className="custom-input" onChange={e => setDimensions(e.target.value)} value={dimensions} />
                                    </div>

                                </div>

                                <div className="row mb-3">
                                    <div className="form-group col-3">
                                        <div className="d-flex align-items-center mt-4">
                                            <label htmlFor="" className='mb-1'>Available</label>
                                            <input type="checkbox" className="custom-input" onChange={e => setAvailable(!available)} checked={available} />
                                        </div>
                                    </div>
                                    <div className="form-group col-3">
                                        <div className="d-flex align-items-center mt-4">
                                            <label htmlFor="" className='mb-1'>Guarantee</label>
                                            <input type="checkbox" className="custom-input" onChange={e => setGuarantee(!guarantee)} checked={guarantee} />
                                        </div>
                                    </div>

                                    {
                                        guarantee && (
                                            <div className="form-group col-4">
                                                <label htmlFor="" className='mb-1'>Guranatee Period <small>(1 Month, 1 Year etc)</small></label>
                                                <input type="text" placeholder="" className="custom-input" onChange={e => setGuaranteePeriod(e.target.value)} value={guaranteePeriod} />
                                            </div>
                                        )
                                    }

                                </div>

                                <div className="row mb-3">
                                    <div className="form-group col-12">
                                        <label htmlFor="" className='mb-1'>Description*</label>
                                        <Editor description={description} setDescription={setDescription} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-12 images-section">
                                        <div className="upload-image" onClick={hanldeUploadClick}>
                                            <input type="file" accept='image/*' onChange={handleImageChange} multiple name="" id="" className='invisible' ref={imageUploadRef} />
                                            <FaCloudUploadAlt />
                                            <p>Upload Images</p>
                                        </div>
                                        {
                                            uploadingImage && (
                                                <>
                                                    <ClipLoader
                                                        color="#076C8F"
                                                        loading={uploadingImage}
                                                        size={20}
                                                        aria-label="Loading Spinner"
                                                        data-testid="loader"
                                                        className='mt-1'
                                                    />
                                                    <p>Uploading Images </p>
                                                </>

                                            )
                                        }

                                        <div className={`uploaded-images ${showUploadedImages ? 'show' : ''}`}>
                                            {uploadedImages &&
                                                uploadedImages.map((image, i) => (
                                                    <div className="image" key={i}>
                                                        <FaXmark onClick={() => removeImage(image.id)} />
                                                        <img src={image.url} alt="" />
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3 mt-5">
                                    <div className="col-12">
                                        <h5>Add location by map*</h5>
                                        <small>Click on the location address in map</small>

                                        {
                                            !isLoading && updatePage ? (
                                                <>
                                                    <GetLocationMap centerPosition={mapLocation && mapLocation} clickedPosition={mapLocation} setClickedPosition={setMapLocation} />
                                                </>
                                            ) : (
                                                <>
                                                    <GetLocationMap centerPosition={["34.020882", "-6.841650"]} clickedPosition={mapLocation} setClickedPosition={setMapLocation} />
                                                </>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className="row mb-2">
                                    <div className="form-group d-flex align-items-center justify-content-end gap-2">
                                        <div className="outline-btn py-2" onClick={resetAllFields}>Reset</div>
                                        {/* <button className="custom-btn" type='submit'>Publish</button> */}
                                        <button className="custom-btn" type='submit'>
                                            <div className='d-flex align-items-center justify-content-center'>
                                                <ClipLoader
                                                    color="#fff"
                                                    loading={isLoading}
                                                    size={20}
                                                    aria-label="Loading Spinner"
                                                    data-testid="loader"
                                                />
                                                {
                                                    !isLoading && ("Publish")
                                                }

                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )
}

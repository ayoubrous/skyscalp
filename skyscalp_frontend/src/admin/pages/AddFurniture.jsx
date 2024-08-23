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

import { machineryType as machineryTypesDropdown, propertyBudget, constructionBudget, machineryBudget, yearBuildData, propertyYearBuildData, conditionData, constructionBrands, proximityData, featuresData, featuresDataObj, furnitureBrands, furnitureConditionData, machineryGuarantee } from '../../assets/data/filtersData'
import { furnitureCategories } from '../../assets/data/furnitureCategories'
import GetLocationMap from '../../components/map/GetLocationMap'
import { ToastContainer, toast } from 'react-toastify';

import { uploadImage } from '../utils/uploadImage'
import ClipLoader from "react-spinners/ClipLoader";
import { Line } from 'rc-progress';
import Lottie from 'lottie-react'
import Editor from '../components/Editor'
import Footer from '../components/Footer'
import { useTranslation } from 'react-i18next'


export default function AddFurniture() {

    const [t] = useTranslation()

    const imageUploadRef = useRef()

    const [furnitureID, setFurnitureID] = useState('')
    const [showUploadedImages, setShowUploadedImages] = useState(false)
    const [uploadedImages, setUploadedImages] = useState([])

    const [country, setCountry] = useState('')
    const [state, setState] = useState('') // calling it as region below
    const [city, setCity] = useState('')
    const [street, setStreet] = useState('') // calling it as district below
    const [title, setTitle] = useState('')
    const [budget, setBudget] = useState('')
    const [category, setCategory] = useState('') // calling it as article below
    const [description, setDescription] = useState('')
    const [condition, setCondition] = useState('')
    const [mapLocation, setMapLocation] = useState(null)
    const [guarantee, setGuarantee] = useState(false)
    const [guaranteePeriod, setGuaranteePeriod] = useState('')
    const [brand, setBrand] = useState('')
    const [color, setColor] = useState('')
    const [dimensions, setDimensions] = useState('')
    const [style, setStyle] = useState('')
    const [feature, setFeature] = useState('')
    const [quantity, setQuantity] = useState('')
    const [article, setArticle] = useState('')


    const [otherFeature, setOtherFeature] = useState('')
    const [otherBrand, setOtherBrand] = useState('')
    const [otherColor, setOtherColor] = useState('')

    const [showOtherFeature, setShowOtherFeature] = useState(false)
    const [showOtherBrand, setShowOtherBrand] = useState(false)
    const [showOtherColor, setShowOtherColor] = useState(false)


    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [streets, setStreets] = useState([])

    const [isLoading, setIsLoading] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [updatePage, setUpdatePage] = useState(false)
    const location = useLocation()


    const updateOtherFields = (data) => {
        setShowOtherColor(data.otherColor === "Other");
        setShowOtherBrand(data.otherBrand === "Other");
        setShowOtherFeature(data.otherFeature === "Other");
    };

    let params = useParams()
    useEffect(() => {
        const { pathname } = location;
        if (pathname !== '/app/add-furniture') {
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
                        setFurnitureID(result.data._id);

                        setCountry(result.data.country);
                        setState(result.data.state);
                        setCity(result.data.city);
                        setStreet(result.data.street);
                        setMapLocation(result.data.mapLocation);

                        setTitle(result.data.title);
                        setBudget(result.data.budget);
                        setQuantity(result.data.quantity);
                        setDescription(result.data.description);

                        setArticle(result.data.article);
                        setCategory(result.data.category);
                        setCondition(result.data.condition);
                        setGuarantee(result.data.guarantee);
                        setGuaranteePeriod(result.data.guaranteePeriod);
                        setBrand(result.data.brand);
                        setColor(result.data.color);
                        setDimensions(result.data.dimensions);
                        setFeature(result.data.feature);
                        setStyle(result.data.style);


                        setOtherColor(result.data.otherColor)
                        setOtherBrand(result.data.otherBrand)
                        setOtherFeature(result.data.otherFeature)
                        updateOtherFields({
                            otherColor: result.data.color,
                            otherFeature: result.data.feature,
                            otherBrand: result.data.brand
                        })


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

    const MAX_IMAGES = 10;

    const handleImageChange = async (e) => {
        const files = e.target.files;
        setShowUploadedImages(true);
        setUploadingImage(true);

        try {
            // Get the current number of uploaded images
            setUploadedImages(prevImages => {
                // If adding all new files would exceed the max limit, limit the number of files to add
                const totalImages = prevImages.length + files.length;
                if (totalImages > MAX_IMAGES) {
                    const availableSlots = MAX_IMAGES - prevImages.length;
                    return [...prevImages]; // Do not add images here, just return the previous state
                }
                return [...prevImages]; // Do not add images here, just return the previous state
            });

            // Limit the files that will be uploaded
            const limitedFiles = Array.from(files).slice(0, MAX_IMAGES - uploadedImages.length);

            // Upload the allowed number of images
            const responses = await Promise.all(
                limitedFiles.map(uploadImage)
            );

            const uploadedImageUrls = responses.filter(res => res.status).map(res => res.url);

            // Update state with successfully uploaded images
            setUploadedImages(prevImages => [
                ...prevImages,
                ...uploadedImageUrls.map((url, index) => ({ url, id: prevImages.length + index }))
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
        const missingFields = [];

        if (!uploadedImages.length) missingFields.push('cmages');
        if (!country) missingFields.push('country');
        if (!title) missingFields.push('title');
        if (!budget) missingFields.push('budget');
        if (category === "") missingFields.push('category');
        if (description === "") missingFields.push('descripiton');
        if (article === "") missingFields.push('article');
        // if (category === "") missingFields.push('Tool');

        if (missingFields.length > 0) {
            const translatedFields = missingFields.map(field => t(field)).join(', ');
            toast.error(`${t("Fill in the following fields:")} ${translatedFields} ${t("to continue")}`);

            return false;
        }

        return true;
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (!validateFields()) {
            // toast.error("Fill out required fields to continue")
            return
        }
        else {
            setIsLoading(true)
            let user = JSON.parse(localStorage.getItem('user'));
            const data = {
                userID: user.userID,
                materialGroup: 'furniture',
                images: uploadedImages.map(imageObj => imageObj.url),
                country: country,
                state: state,
                city: city,
                street: street,
                title: title,
                budget: budget,
                quantity: quantity,
                category: category,
                article: article,
                description: description,
                condition: condition,
                mapLocation: mapLocation,
                guarantee: guarantee,
                guaranteePeriod: guaranteePeriod,
                brand: brand,
                color: color,
                feature: feature,
                dimensions: dimensions,
                style: style,
                otherBrand,
                otherFeature,
                otherColor,
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
                        resetAllFields()
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
            // toast.error("Fill out required fields to continue")
            return
        }
        else {
            setIsLoading(true)
            let user = JSON.parse(localStorage.getItem('user'));
            const data = {
                userID: user.userID,
                materialGroup: 'furniture',
                images: uploadedImages.map(imageObj => imageObj.url),
                country: country,
                state: state,
                city: city,
                street: street,
                title: title,
                budget: budget,
                quantity: quantity,
                category: category,
                article: article,
                description: description,
                condition: condition,
                mapLocation: mapLocation,
                guarantee: guarantee,
                guaranteePeriod: guaranteePeriod,
                brand: brand,
                color: color,
                feature: feature,
                dimensions: dimensions,
                style: style,
                otherBrand,
                otherFeature,
                otherColor,
                status: true
            };


            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify(data);

            const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch(`${process.env.REACT_APP_SERVER_URL}/api/updateProduct/${furnitureID}`, requestOptions)
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
        setState(''); // or setRegion('');
        setCity('');
        setStreet(''); // or setDistrict('');
        setTitle('');
        setBudget('');
        setCategory(''); // or setArticle('');
        setDescription('');
        setCondition('');
        setMapLocation(null);
        setGuarantee(false);
        setGuaranteePeriod('');
        setBrand('');
        setColor('');
        setDimensions('');
        setStyle('');
        setFeature('');
        setQuantity('');
        setArticle('');
        setOtherBrand('')
        setOtherColor('')
        setOtherFeature('')

        setShowOtherBrand(false)
        setShowOtherFeature(false)
        setShowOtherColor(false)
    }

    const handleBudgetCheck = (e) => {
        if (e.target.value < 0) {
            toast.error("Price cannot be negative")
            setBudget(0)
            return
        }
        setBudget(e.target.value)
    }
    const handleQuantityCheck = (e) => {
        if (e.target.value < 0) {
            toast.error("Quantity cannot be negative")
            setQuantity(0)
            return
        }
        setQuantity(e.target.value)
    }


    const uniqueCategories = [...new Set(furnitureCategories.map(item => item.cateogry))];
    return (
        <>
            <ToastContainer />
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
                                        <h5 className='fw-bolder'>{t("Update Product")}</h5>
                                        <small className='mb-3'>{t("Update the desired fields and retain others")}</small>
                                    </>

                                ) :
                                (
                                    <>
                                        <h5 className='fw-bolder'>{t("Publish New Furniture, Appliances Product")}</h5>
                                        <small className='mb-3'>{t("Fill out all the required fields")}</small>
                                    </>
                                )
                        }


                        <div className="d-flex justify-content-end">
                            <a href=""></a>
                            <Link to='/'>
                                {/* <button className="outline-btn py-1 px-2">+ Add New</button> */}
                            </Link>
                        </div>

                        <div className="my-4 publish-form">
                            <form action="" className="form furnitureForm publishForm" onSubmit={updatePage ? handleUpdate : handleSubmit}>

                                <div className="split">

                                    <div className="formSide side_2">
                                        <div className="info">{t("Category and pricing")}</div>
                                        <div className="form-group form-group-sm mb-3">

                                            <label htmlFor="" className='mb-1'>{t("category")}*</label>
                                            <select name="" id="" className="custom-input" onChange={e => setCategory(e.target.value)} value={category}>
                                                <option value="">Select {t("category")}</option>
                                                {
                                                    uniqueCategories.map((data, i) => {
                                                        return (
                                                            <option value={data} key={i}>{t(data)}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="form-group form-group-sm mb-3">
                                            <label htmlFor="" className='mb-1'>{t("article")}*</label>
                                            <select name="" id="" className="custom-input" onChange={e => setArticle(e.target.value)} value={article}>
                                                <option value="">{t("select")} {t("article")}</option>
                                                {
                                                    furnitureCategories.map((data, i) => (
                                                        category === data.cateogry ? (
                                                            <option value={data.article} key={i}>{t(data.article)}</option>
                                                        ) : (
                                                            null
                                                        )

                                                    ))
                                                }
                                            </select>
                                        </div>


                                        <div className="form-group form-group-sm mb-4">
                                            <label htmlFor="" className='mb-1'>Budget (MAD)/item*</label>
                                            <input type="number" min={0} className="custom-input" onChange={e => setBudget(e.target.value)} onBlur={handleBudgetCheck} value={budget} />
                                            <small style={{ fontSize: "10px" }}>{t("Specify Budget (MAD) per")} {t("item")}</small>
                                        </div>

                                        <div className="form-group form-group-sm mb-4">
                                            <label htmlFor="" className='mb-1'>{t("quantity")}</label>
                                            <input type="number" className="custom-input" min={1} onChange={e => setQuantity(e.target.value)} onBlur={handleQuantityCheck} value={quantity} />
                                        </div>
                                    </div>

                                    <div className="formSide side_3">
                                        <div className="info">{t("product")} {t("information")}</div>

                                        <div className="form-group form-group-sm mb-3">
                                            <label htmlFor="" className='mb-1'>{t("title")}* <small>({t("max")} 100 {t("characters")})</small></label>
                                            <input type="text" maxLength={100} className="custom-input" onChange={e => setTitle(e.target.value)} value={title} />
                                        </div>

                                        <div className="form-group form-group-sm mb-3 ">
                                            <label htmlFor="" className='mb-1'>{t("description")}* <small>({t("max")} 1000 {t("characters")})</small></label>
                                            <Editor description={description} setDescription={setDescription} maximumLength={1000} />
                                        </div>

                                        <div className="col-12 images-section">
                                            <div className="upload-image" onClick={hanldeUploadClick}>
                                                <input type="file" accept='image/*' onChange={handleImageChange} multiple name="" id="" className='invisible' ref={imageUploadRef} />
                                                <FaCloudUploadAlt />
                                                <p style={{ fontSize: "10px" }}>{t("imagesUpload")}* </p>
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
                                                        <p>{t("uploading")} </p>
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

                                </div>
                                <div className="d-flex gap-3 mt-4">
                                    <div className="w-25 formSide">
                                        <div className="info">{t("Characteristics")}</div>
                                        <div className="form-group form-group-sm mb-3">
                                            <label htmlFor="" className='mb-1'>{t("select")} Color</label>
                                            <select name="" id="" className="custom-input" onChange={e => {
                                                setColor(e.target.value)
                                                e.target.value === "Other" ?
                                                    setShowOtherColor(true) :
                                                    setShowOtherColor(false)
                                            }} value={color}>
                                                <option value="">{t("select")} Color</option>
                                                {
                                                    furnitureCategories.some(data => data.article === article) ?
                                                        furnitureCategories
                                                            .filter(data => data.article === article)
                                                            .flatMap(data => data.colors)
                                                            .map((subCat, i) => (
                                                                <option value={subCat} key={i}>{t(subCat)}</option>
                                                            ))
                                                        :
                                                        <option value="">{t("select")} {t("Category to view more options")}</option>
                                                }
                                            </select>

                                        </div>

                                        {
                                            showOtherColor && (
                                                <div className="form-group form-group-sm mb-3">
                                                    <label htmlFor="" className='mb-1'>{t("Please specify")}</label>
                                                    <input type="text" className="custom-input" onChange={e => setOtherColor(e.target.value)} value={otherColor} />
                                                </div>
                                            )
                                        }

                                        <div className="form-group form-group-sm mb-3">
                                            <label htmlFor="" className='mb-1'>{t("select")} {("dimensions")}</label>
                                            <select name="" id="" className="custom-input" onChange={e => setDimensions(e.target.value)} value={dimensions}>
                                                <option value="">{t("select")} {("dimension")}</option>
                                                {
                                                    furnitureCategories.some(data => data.article === article) ?
                                                        furnitureCategories
                                                            .filter(data => data.article === article)
                                                            .flatMap(data => data.dimensions)
                                                            .map((subCat, i) => (
                                                                <option value={subCat} key={i}>{t(subCat)}</option>
                                                            ))
                                                        :
                                                        <option value="">{t("select")} {t("Category to view more options")}</option>
                                                }
                                            </select>
                                        </div>

                                        <div className="form-group form-group-sm mb-3">
                                            <label htmlFor="" className='mb-1'>{t("select")} {t("Styles")}</label>
                                            <select name="" id="" className="custom-input" onChange={e => setStyle(e.target.value)} value={style}>
                                                <option value="">{t("select")} {t("Style")}</option>
                                                {
                                                    furnitureCategories.some(data => data.article === article) ?
                                                        furnitureCategories
                                                            .filter(data => data.article === article)
                                                            .flatMap(data => data.styles)
                                                            .map((subCat, i) => (
                                                                <option value={subCat} key={i}>{t(subCat)}</option>
                                                            ))
                                                        :
                                                        <option value="">{t("select")} {t("Category to view more options")}</option>
                                                }
                                            </select>
                                        </div>

                                        <div className="form-group form-group-sm mb-3">
                                            <label htmlFor="" className='mb-1'>{t("select")} {t("feature")}</label>
                                            <select name="" id="" className="custom-input" onChange={e => {
                                                setFeature(e.target.value)
                                                e.target.value === "Other" ?
                                                    setShowOtherFeature(true) :
                                                    setShowOtherFeature(false)
                                            }} value={feature}>
                                                <option value="">{t("select")} {t("feature")}</option>
                                                {
                                                    furnitureCategories.some(data => data.article === article) ?
                                                        furnitureCategories
                                                            .filter(data => data.article === article)
                                                            .flatMap(data => data.features)
                                                            .map((subCat, i) => (
                                                                <option value={subCat} key={i}>{t(subCat)}</option>
                                                            ))
                                                        :
                                                        <option value="">{t("select")} {t("Category to view more options")}</option>
                                                }
                                            </select>
                                        </div>

                                        {
                                            showOtherFeature && (
                                                <div className="form-group form-group-sm mb-3">
                                                    <label htmlFor="" className='mb-1'>{t("Please specify")}</label>
                                                    <input type="text" className="custom-input" onChange={e => setOtherFeature(e.target.value)} value={otherFeature} />
                                                </div>
                                            )
                                        }

                                        <div className="form-group form-group-sm mb-3">
                                            <label htmlFor="" className='mb-1'>{t("select")} {t("Brand")}</label>
                                            <select name="" id="" className="custom-input" onChange={e => {
                                                setBrand(e.target.value)
                                                e.target.value === "Other" ?
                                                    setShowOtherBrand(true) :
                                                    setShowOtherBrand(false)
                                            }} value={brand}>
                                                <option value="">{t("select")} {t("Brand")}</option>
                                                {
                                                    furnitureCategories.some(data => data.article === article) ?
                                                        furnitureCategories
                                                            .filter(data => data.article === article)
                                                            .flatMap(data => data.brands)
                                                            .map((subCat, i) => (
                                                                <option value={subCat} key={i}>{t(subCat)}</option>
                                                            ))
                                                        :
                                                        <option value="">{t("select")} {t("Category to view more options")}</option>
                                                }
                                            </select>
                                        </div>

                                        {
                                            showOtherBrand && (
                                                <div className="form-group form-group-sm mb-3">
                                                    <label htmlFor="" className='mb-1'>{t("Please specify")}</label>
                                                    <input type="text" className="custom-input" onChange={e => setOtherBrand(e.target.value)} value={otherBrand} />
                                                </div>
                                            )
                                        }

                                        <div className="form-group form-group-sm mb-3">
                                            <label htmlFor="" className='mb-1'>{t("select")} {t("condition")}</label>
                                            <select name="" id="" className="custom-input" onChange={e => setCondition(e.target.value)} value={condition}>
                                                <option value="">{t("select")} {t("condition")}</option>
                                                {
                                                    furnitureConditionData
                                                        .map((data, i) => (
                                                            <option value={data} key={i}>{t(data)}</option>
                                                        ))
                                                }
                                            </select>

                                        </div>

                                        <div className="form-group form-group-sm mb-1">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <label htmlFor="guaranteeCheck" className='mb-1' t>{t("guarantee")}</label>
                                                <input type="checkbox" id='guaranteeCheck' className="" onChange={e => setGuarantee(!guarantee)} checked={guarantee} />
                                            </div>
                                        </div>

                                        {
                                            guarantee && (
                                                <div className="form-group form-group-sm">
                                                    <select name="" id="" className="custom-input" onChange={e => setGuaranteePeriod(e.target.value)} value={guaranteePeriod}>
                                                        <option value="">{t("select")} {t("guarantee")}</option>
                                                        {
                                                            machineryGuarantee.map((data, i) => {
                                                                return (
                                                                    <option value={data} key={i}>{data}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="w-50 formSide">
                                        <div className="info">{t("location")}</div>

                                        <div className="form-group form-group-sm mb-3">
                                            <label htmlFor="" className='mb-1'>{t("country")}*</label>
                                            <Select
                                                className="custom-input react-select"
                                                classNamePrefix="select"
                                                placeholder={`${t("select")} ${t("country")}`}
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
                                        <div className="form-group form-group-sm mb-3">
                                            <label htmlFor="" className='mb-1'>{t("region")}</label>
                                            <Select
                                                className="custom-input react-select"
                                                classNamePrefix="select"
                                                placeholder={`${t("select")} ${t("region")}`}
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
                                        <div className="form-group form-group-sm mb-3">
                                            <label htmlFor="" className='mb-1'>{t("city")}</label>
                                            <Select
                                                className="custom-input react-select"
                                                classNamePrefix="select"
                                                placeholder={`${t("select")} ${t("city")}`}
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

                                        <div className="form-group form-group-sm">
                                            <label htmlFor="" className='mb-1'>{t("district")}</label>
                                            <Select
                                                className="custom-input react-select"
                                                classNamePrefix="select"
                                                placeholder={`${t("select")} ${t("district")}`}
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
                                    </div>
                                    <div className="w-50 formSide">
                                        <div className="info">{t("locationByMap")}</div>

                                        <div className="col-12">
                                            <p style={{ fontSize: "12px" }}>{t("add")} {t("locationByMap")}*</p>
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
                                            <small>{t("clickOnTheLocationAddressInMap")}</small>

                                        </div>
                                    </div>
                                </div>

                                <div>

                                    <div className="row mb-2 mt-4">
                                        <div className="form-group form-group-sm d-flex align-items-center justify-content-end gap-2">
                                            <div className="outline-btn py-2" onClick={resetAllFields}>{t("reset")}</div>
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
                                                        !isLoading && t("publish")
                                                    }

                                                </div>
                                            </button>
                                        </div>
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

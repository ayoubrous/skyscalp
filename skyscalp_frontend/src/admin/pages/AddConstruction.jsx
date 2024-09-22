import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { FaBuilding, FaEye, FaInvision, FaRegTrashCan, FaTrash, FaUser, FaXmark } from 'react-icons/fa6'
import { FaCloudUploadAlt, FaEdit, FaTools } from 'react-icons/fa'
import { BsBuildingsFill } from 'react-icons/bs'
import { TbCarCrane, TbListSearch } from 'react-icons/tb'
import logo from '../assets/images/profile/user-1.jpg'
import { Link, useLocation, useParams } from 'react-router-dom'
import Select from 'react-select';
import locations from '../../assets/data/locations'
import loader from '../../assets/images/skyscalp-loader.json'

import { machineryType as machineryTypesDropdown, propertyBudget, constructionBudget, machineryBudget, yearBuildData, propertyYearBuildData, conditionData, constructionBrands, machineryGuarantee } from '../../assets/data/filtersData'
import { constructionCategories, machineryCategories, propertyCategories } from '../../assets/data/categories'
import GetLocationMap from '../../components/map/GetLocationMap'
import { ToastContainer, toast } from 'react-toastify';

import { uploadImage } from '../utils/uploadImage'
import ClipLoader from "react-spinners/ClipLoader";
import Lottie from 'lottie-react'
import Editor from '../components/Editor'
import Footer from '../components/Footer'
import { materialBases, materialCategories, materialColors, materialFinish, materials, materialSizes, materialThickness, materialVoltage } from '../../assets/data/materialsCategory'
import { useTranslation } from 'react-i18next'


export default function AddConstruction() {
    const [t] = useTranslation()

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
    const [description, setDescription] = useState('')
    const [mapLocation, setMapLocation] = useState(null)
    const [guarantee, setGuarantee] = useState(false)
    const [guaranteePeriod, setGuaranteePeriod] = useState('')


    const [application, setApplication] = useState('')
    const [category, setCategory] = useState('')
    const [unit, setUnit] = useState('')

    const [size, setSize] = useState('')
    const [dimensions, setDimensions] = useState('')
    const [condition, setCondition] = useState('')
    const [color, setColor] = useState('')
    const [quantity, setQuantity] = useState('')

    const [material, setMaterial] = useState('')
    const [base, setBase] = useState('')
    const [thickness, setThickness] = useState('')
    const [finish, setFinish] = useState('')
    const [voltage, setVoltage] = useState('')
    const [type, setType] = useState('')

    const [otherMaterial, setOtherMaterial] = useState('');
    const [otherSize, setOtherSize] = useState('');
    const [otherBase, setOtherBase] = useState('');
    const [otherThickness, setOtherThickness] = useState('');
    const [otherFinish, setOtherFinish] = useState('');
    const [otherVoltage, setOtherVoltage] = useState('');
    const [otherType, setOtherType] = useState('');
    const [otherColor, setOtherColor] = useState('');

    const [showOtherMaterial, setShowOtherMaterial] = useState(false);
    const [showOtherSize, setShowOtherSize] = useState(false);
    const [showOtherBase, setShowOtherBase] = useState(false);
    const [showOtherThickness, setShowOtherThickness] = useState(false);
    const [showOtherFinish, setShowOtherFinish] = useState(false);
    const [showOtherVoltage, setShowOtherVoltage] = useState(false);
    const [showOtherType, setShowOtherType] = useState(false);
    const [showOtherColor, setShowOtherColor] = useState(false);



    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [streets, setStreets] = useState([])

    const [isLoading, setIsLoading] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [updatePage, setUpdatePage] = useState(false)
    const location = useLocation()


    const updateOtherFields = (data) => {
        setShowOtherBase(data.otherBase === "Other");
        setShowOtherColor(data.otherColor === "Other");
        setShowOtherFinish(data.otherFinish === "Other");
        setShowOtherMaterial(data.otherMaterial === "Other");
        setShowOtherSize(data.otherSize === "Other");
        setShowOtherThickness(data.otherThickness === "Other");
        setShowOtherType(data.otherType === "Other");
        setShowOtherVoltage(data.otherVoltage === "Other");
    };


    let params = useParams()
    useEffect(() => {
        const { pathname } = location;
        if (pathname !== '/app/add-material') {
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
                        setConstructionID(result.data._id);
                        setCountry(result.data.country);
                        setState(result.data.state);
                        setCity(result.data.city);
                        setStreet(result.data.street);
                        setTitle(result.data.title);
                        setBudget(result.data.budget);
                        setDescription(result.data.description);
                        setMapLocation(result.data.mapLocation);
                        setGuarantee(result.data.guarantee);
                        setGuaranteePeriod(result.data.guaranteePeriod);

                        setApplication(result.data.application);
                        setCategory(result.data.category);
                        setUnit(result.data.unit);
                        setSize(result.data.size);
                        setColor(result.data.color);
                        setQuantity(result.data.quantity);
                        setType(result.data.type)
                        setMaterial(result.data.material)
                        setBase(result.data.base)
                        setThickness(result.data.thickness)
                        setFinish(result.data.finish)
                        setVoltage(result.data.voltage)

                        setOtherBase(result.data.otherBase)
                        setOtherColor(result.data.otherColor)
                        setOtherFinish(result.data.otherFinish)
                        setOtherMaterial(result.data.otherMaterial)
                        setOtherSize(result.data.otherSize)
                        setOtherThickness(result.data.otherThickness)
                        setOtherType(result.data.otherType)
                        setOtherVoltage(result.data.otherVoltage)
                        updateOtherFields({
                            otherBase: result.data.base,
                            otherColor: result.data.color,
                            otherFinish: result.data.finish,
                            otherMaterial: result.data.material,
                            otherSize: result.data.size,
                            otherThickness: result.data.thickness,
                            otherType: result.data.type,
                            otherVoltage: result.data.voltage
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

        if (!uploadedImages.length) missingFields.push('images');
        if (!title) missingFields.push('title');
        if (!budget) missingFields.push('budget');
        if (!country) missingFields.push('country');
        if (description === "") missingFields.push('description');
        if (category === "") missingFields.push('category');
        if (application === "") missingFields.push('application');

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
                materialGroup: 'construction',
                images: uploadedImages.map(imageObj => imageObj.url),
                country: country,
                state: state,
                city: city,
                street: street,
                title: title,
                budget: budget,
                description: description,
                mapLocation: mapLocation,
                guaranteePeriod: guaranteePeriod,
                guarantee: guarantee,

                application: application,
                category: category,
                unit: unit,
                size: size,
                color: color,
                quantity: quantity,
                type: type,
                material: material,
                base: base,
                thickness: thickness,
                finish: finish,
                voltage: voltage,
                otherBase,
                otherColor,
                otherFinish,
                otherMaterial,
                otherSize,
                otherThickness,
                otherType,
                otherVoltage,
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
                        // toast.success(result.message)
                        toast.success(t("Product Published Successfully"))
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
                materialGroup: 'construction',
                images: uploadedImages.map(imageObj => imageObj.url),
                country: country,
                state: state,
                city: city,
                street: street,
                title: title,
                budget: budget,
                description: description,
                mapLocation: mapLocation,
                guaranteePeriod: guaranteePeriod,
                guarantee: guarantee,

                application: application,
                category: category,
                unit: unit,

                size: size,
                color: color,
                quantity: quantity,
                type: type,
                material: material,
                base: base,
                thickness: thickness,
                finish: finish,
                voltage: voltage,

                otherBase,
                otherColor,
                otherFinish,
                otherMaterial,
                otherSize,
                otherThickness,
                otherType,
                otherVoltage,
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

            fetch(`${process.env.REACT_APP_SERVER_URL}/api/updateProduct/${constructionID}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setIsLoading(false)
                    if (result.status) {
                        // toast.success(result.message)
                        toast.success(t("Product Published Successfully"))

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
        setDescription('');
        setMapLocation(null);
        setGuarantee(false);
        setGuaranteePeriod('');

        setApplication('');
        setCategory('');
        setUnit('');

        setSize('');
        setDimensions('');
        setCondition('');
        setColor('');
        setQuantity('');

        setMaterial('');
        setBase('');
        setThickness('');
        setFinish('');
        setVoltage('');
        setType('');

        setOtherMaterial('');
        setOtherSize('');
        setOtherBase('');
        setOtherThickness('');
        setOtherFinish('');
        setOtherVoltage('');
        setOtherType('');
        setOtherColor('');

        setShowOtherMaterial(false);
        setShowOtherSize(false);
        setShowOtherBase(false);
        setShowOtherThickness(false);
        setShowOtherFinish(false);
        setShowOtherVoltage(false);
        setShowOtherType(false);
        setShowOtherColor(false);
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


    const [disabledFields, setDisabledFields] = useState([])

    useEffect(() => {
        if (application && category) {
            const selectedCategory = materialCategories.find(cat => cat.application === application);
            if (selectedCategory) {
                const selectedSubCategory = selectedCategory.categories.find(cat => cat.materialName === category);
                setDisabledFields(selectedSubCategory.ignoreProperties)
                
                console.log(selectedSubCategory)

            } else {
                // console.log("No matching category found.");
                setDisabledFields([])
            }
        }
    }, [category]);


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
                                        <h5 className='fw-bolder'>{t("Publish New Construction Material")}</h5>
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

                        <div className="py-4 my-4 publish-form">
                            <form action="" className="form furnitureForm publishForm" onSubmit={updatePage ? handleUpdate : handleSubmit}>


                                <div className="split">

                                    <div className="formSide side_2">
                                        <div className="info">{t("Category and pricing")}</div>
                                        <div className="form-group form-group-sm mb-3">
                                            <label htmlFor="" className='mb-1'>{t("application")}*</label>
                                            <select name="" id="" className="custom-input" onChange={e => setApplication(e.target.value)} value={application}>
                                                <option value="">{t("select")} {t("application")}</option>
                                                {
                                                    materialCategories.map((data, i) => {
                                                        return (
                                                            <option value={data.application} key={i}>{t(data.application)}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="form-group form-group-sm mb-3">
                                            <label htmlFor="" className='mb-1'>{t("Construction Material")}*</label>
                                            <select
                                                name="category"
                                                id="category"
                                                className="custom-input"
                                                onChange={e => {
                                                    const selectedMaterial = e.target.value;
                                                    setCategory(e.target.value);

                                                    // Find the unit based on the selected material
                                                    const foundMaterial = materialCategories
                                                        .filter(data => data.application === application)
                                                        .flatMap(data => data.categories)
                                                        .find(material => material.materialName === selectedMaterial);

                                                    setUnit(foundMaterial ? foundMaterial.unit : '');
                                                }}
                                                value={category}
                                            >
                                                <option value="">{t("select")} {t("Construction Material")}</option>
                                                {
                                                    materialCategories
                                                        .filter(data => data.application === application)
                                                        .flatMap(data => data.categories)
                                                        .map((material, i) => (
                                                            <option value={material.materialName} key={i}>
                                                                {t(material.materialName)}
                                                            </option>
                                                        ))
                                                }
                                            </select>
                                        </div>

                                        {/* <div className="form-group form-group-sm mb-3">
                                            <label htmlFor="" className='mb-1'>Unit*</label>
                                            <input type="text" className="custom-input" readOnly value={unit} />
                                        </div> */}

                                        <div className="form-group form-group-sm mb-4">
                                            <label htmlFor="" className='mb-1'>Budget* (MAD){unit !== "" ? "/" : ""} {unit}</label>
                                            <input type="number" min={0} className="custom-input" onChange={e => setBudget(e.target.value)} onBlur={handleBudgetCheck} value={budget} />
                                            <small style={{ fontSize: "10px" }}>{t("Specify Budget (MAD) per")} {unit}</small>
                                        </div>

                                        <div className="form-group form-group-sm mb-4">
                                            <label htmlFor="" className='mb-1'>{t("quantity")} {unit !== "" ? "/" : ""} {unit}</label>
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
                                            <label htmlFor="" className='mb-1'>{t("select")} {t("type")}</label>
                                            <select name="type" id="type" className="custom-input" value={type} onChange={e => {
                                                setType(e.target.value)
                                                e.target.value === "Other" ?
                                                    setShowOtherType(true) :
                                                    setShowOtherType(false)
                                            }}>

                                                <option value="">{t("select")} {t("type")}</option>
                                                {
                                                    materialCategories
                                                        .filter(data => data.application === application)
                                                        .flatMap(data => data.categories)
                                                        .filter(material => material.materialName === category)
                                                        .flatMap(material => material.types)
                                                        .map((type, i) => (
                                                            <option value={type} key={i}>
                                                                {t(type)}
                                                            </option>
                                                        ))
                                                }
                                            </select>
                                        </div>

                                        {
                                            showOtherType && (
                                                <div className="form-group form-group-sm mb-3">
                                                    <label htmlFor="" className='mb-1'>{t("Please specify")}</label>
                                                    <input type="text" className="custom-input" onChange={e => setOtherType(e.target.value)} value={otherType} />
                                                </div>
                                            )
                                        }

                                        {
                                            !disabledFields.includes('size') && (
                                                <>
                                                    <div className="form-group form-group-sm mb-3">
                                                        <label htmlFor="" className='mb-1'>{t("select")} {t("size")}</label>
                                                        <select name="" id="" className="custom-input" onChange={e => {
                                                            setSize(e.target.value)
                                                            e.target.value === "Other" ?
                                                                setShowOtherSize(true) :
                                                                setShowOtherSize(false)
                                                        }} value={size}>
                                                            <option value="">{t("select")} {t("size")}</option>
                                                            {
                                                                materialSizes
                                                                    .map((data, i) => (
                                                                        <option value={data} key={i}>{t(data)}</option>
                                                                    ))
                                                            }
                                                        </select>
                                                    </div> {
                                                        showOtherSize && (
                                                            <div className="form-group form-group-sm mb-3">
                                                                <label htmlFor="" className='mb-1'>{t("Please specify")}</label>
                                                                <input type="text" className="custom-input" onChange={e => setOtherSize(e.target.value)} value={otherSize} />
                                                            </div>
                                                        )
                                                    }
                                                </>
                                            )
                                        }


                                        {
                                            !disabledFields.includes('color') && (
                                                <>
                                                    <div className="form-group form-group-sm mb-3">
                                                        <label htmlFor="" className='mb-1'>{t("select")} {t("color")}</label>
                                                        <select name="" id="" className="custom-input" onChange={e => {
                                                            setColor(e.target.value)
                                                            e.target.value === "Other" ?
                                                                setShowOtherColor(true) :
                                                                setShowOtherColor(false)
                                                        }} value={color}>
                                                            <option value="">{t("select")} {t("color")}</option>
                                                            {
                                                                materialColors
                                                                    .map((data, i) => (
                                                                        <option value={data} key={i}>{t(data)}</option>
                                                                    ))
                                                            }
                                                        </select>
                                                    </div> {
                                                        showOtherColor && (
                                                            <div className="form-group form-group-sm mb-3">
                                                                <label htmlFor="" className='mb-1'>{t("Please specify")}</label>
                                                                <input type="text" className="custom-input" onChange={e => setOtherColor(e.target.value)} value={otherColor} />
                                                            </div>
                                                        )
                                                    }
                                                </>
                                            )
                                        }

                                        {
                                            !disabledFields.includes('material') && (
                                                <>

                                                    <div className="form-group form-group-sm mb-3">
                                                        <label htmlFor="" className='mb-1'>{t("select")} {t("material")}</label>
                                                        <select name="" id="" className="custom-input" onChange={e => {
                                                            setMaterial(e.target.value)
                                                            e.target.value === "Other" ?
                                                                setShowOtherMaterial(true) :
                                                                setShowOtherMaterial(false)
                                                        }} value={material}>
                                                            <option value="">{t("select")} {t("material")}</option>
                                                            {
                                                                materials
                                                                    .map((data, i) => (
                                                                        <option value={data} key={i}>{t(data)}</option>
                                                                    ))
                                                            }
                                                        </select>
                                                    </div> {
                                                        showOtherMaterial && (
                                                            <div className="form-group form-group-sm mb-3">
                                                                <label htmlFor="" className='mb-1'>{t("Please specify")}</label>
                                                                <input type="text" className="custom-input" onChange={e => setOtherMaterial(e.target.value)} value={otherMaterial} />
                                                            </div>
                                                        )
                                                    }
                                                </>
                                            )
                                        }


                                        {
                                            !disabledFields.includes('base') && (
                                                <>
                                                    <div className="form-group form-group-sm mb-3">
                                                        <label htmlFor="" className='mb-1'>{t("select")} {t("base")}</label>
                                                        <select name="" id="" className="custom-input" onChange={e => {
                                                            setBase(e.target.value)
                                                            e.target.value === "Other" ?
                                                                setShowOtherBase(true) :
                                                                setShowOtherBase(false)
                                                        }} value={base}>
                                                            <option value="">{t("select")} {t("base")}</option>
                                                            {
                                                                materialBases
                                                                    .map((data, i) => (
                                                                        <option value={data} key={i}>{t(data)}</option>
                                                                    ))
                                                            }
                                                        </select>
                                                    </div> {
                                                        showOtherBase && (
                                                            <div className="form-group form-group-sm mb-3">
                                                                <label htmlFor="" className='mb-1'>{t("Please specify")}</label>
                                                                <input type="text" className="custom-input" onChange={e => setOtherBase(e.target.value)} value={otherBase} />
                                                            </div>
                                                        )
                                                    }
                                                </>
                                            )
                                        }


                                        {
                                            !disabledFields.includes('thickness') && (
                                                <>
                                                    <div className="form-group form-group-sm mb-3">
                                                        <label htmlFor="" className='mb-1'>{t("select")} {t("thickness")}</label>
                                                        <select name="" id="" className="custom-input" onChange={e => {
                                                            setThickness(e.target.value)
                                                            e.target.value === "Other" ?
                                                                setShowOtherThickness(true) :
                                                                setShowOtherThickness(false)
                                                        }} value={thickness}>
                                                            <option value="">{t("select")} {t("thickness")}</option>
                                                            {
                                                                materialThickness
                                                                    .map((data, i) => (
                                                                        <option value={data} key={i}>{t(data)}</option>
                                                                    ))
                                                            }
                                                        </select>
                                                    </div>
                                                    {
                                                        showOtherThickness && (
                                                            <div className="form-group form-group-sm mb-3">
                                                                <label htmlFor="" className='mb-1'>{t("Please specify")}</label>
                                                                <input type="text" className="custom-input" onChange={e => setOtherThickness(e.target.value)} value={otherThickness} />
                                                            </div>
                                                        )
                                                    }
                                                </>
                                            )
                                        }


                                        {
                                            !disabledFields.includes('finish') && (
                                                <>
                                                    <div className="form-group form-group-sm mb-3">
                                                        <label htmlFor="" className='mb-1'>{t("select")} {t("Finish")}</label>
                                                        <select name="" id="" className="custom-input" onChange={e => {
                                                            setFinish(e.target.value)
                                                            e.target.value === "Other" ?
                                                                setShowOtherFinish(true) :
                                                                setShowOtherFinish(false)
                                                        }} value={finish}>
                                                            <option value="">{t("select")} {t("Finish")}</option>
                                                            {
                                                                materialFinish
                                                                    .map((data, i) => (
                                                                        <option value={data} key={i}>{t(data)}</option>
                                                                    ))
                                                            }
                                                        </select>
                                                    </div> {
                                                        showOtherFinish && (
                                                            <div className="form-group form-group-sm mb-3">
                                                                <label htmlFor="" className='mb-1'>{t("Please specify")}</label>
                                                                <input type="text" className="custom-input" onChange={e => setOtherFinish(e.target.value)} value={otherFinish} />
                                                            </div>
                                                        )
                                                    }
                                                </>
                                            )
                                        }


                                        {
                                            !disabledFields.includes('voltage') && (
                                                <>
                                                    <div className="form-group form-group-sm mb-3">
                                                        <label htmlFor="" className='mb-1'>{t("select")} {t("Voltage")}</label>
                                                        <select
                                                            className="custom-input"
                                                            onChange={e => {
                                                                setVoltage(e.target.value)
                                                                setShowOtherVoltage(e.target.value === "Other")
                                                            }}
                                                            value={voltage}
                                                        >
                                                            <option value="">{t("select")} {t("Voltage")}</option>
                                                            {materialVoltage.map((data, i) => (
                                                                <option value={data} key={i}>{t(data)}</option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    {
                                                        showOtherVoltage && (
                                                            <div className="form-group form-group-sm mb-3">
                                                                <label htmlFor="" className='mb-1'>{t("Please specify")}</label>
                                                                <input type="text" className="custom-input" onChange={e => setOtherVoltage(e.target.value)} value={otherVoltage} />
                                                            </div>
                                                        )
                                                    }
                                                </>
                                            )
                                        }

                                        <div className="form-group form-group-sm mb-1">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <label htmlFor="guaranteeCheck" className='mb-1'>{t("guarantee")}</label>
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
                                                                    <option value={data} key={i}>{t(data)}</option>
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
                                            <p style={{ fontSize: "12px" }}>{t("add")} {t("locationByMap")}</p>
                                            {
                                                !isLoading && updatePage ? (
                                                    <>
                                                        <GetLocationMap centerPosition={mapLocation ? mapLocation : ["34.020882", "-6.841650"]} clickedPosition={mapLocation} setClickedPosition={setMapLocation} />
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


                                <div className="row mb-2 mt-4">
                                    <div className="form-group form-group-sm d-flex align-items-center justify-content-end gap-2">
                                        <div className="outline-btn py-2" onClick={resetAllFields}>{t("resetFields")}</div>
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
                            </form>
                        </div>

                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )
}

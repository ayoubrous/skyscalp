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

import { machineryType as machineryTypesDropdown, propertyBudget, constructionBudget, machineryBudget, yearBuildData, propertyYearBuildData, conditionData, constructionBrands, machineryGuarantee, furnitureConditionData } from '../../assets/data/filtersData'
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
import { availibilityData, educationData, languageData, services } from '../../assets/data/services'


export default function AddExpert() {
    const [t] = useTranslation()

    const imageUploadRef = useRef()


    const [showUploadedImages, setShowUploadedImages] = useState(false)
    const [uploadedImages, setUploadedImages] = useState([])
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [street, setStreet] = useState('')

    const [expertID, setExpertID] = useState('')
    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [budget, setBudget] = useState('')
    const [description, setDescription] = useState('')
    const [mapLocation, setMapLocation] = useState(null)

    const [education, setEducation] = useState(null)
    const [experience, setExperience] = useState(null)
    const [language, setLanguage] = useState(null)
    const [availibility, setAvailibility] = useState(null)

    const [field, setField] = useState('')
    const [experty, setExperty] = useState('')


    const [filter1, setFilter1] = useState({
        filterName: null,
        selectedOption: null
    });

    const [filter2, setFilter2] = useState({
        filterName: null,
        selectedOption: null
    });

    const [filter3, setFilter3] = useState({
        filterName: null,
        selectedOption: null
    });




    const [otherFilter1Value, setOtherFilter1Value] = useState(null);
    const [otherFilter2Value, setOtherFilter2Value] = useState(null);
    const [otherFilter3Value, setOtherFilter3Value] = useState(null);
    const [showOtherFilter1, setShowOtherFilter1] = useState(false);
    const [showOtherFilter2, setShowOtherFilter2] = useState(false);
    const [showOtherFilter3, setShowOtherFilter3] = useState(false);


    const [showOtherAvailibility, setShowOtherAvailibility] = useState(false)
    const [showOtherEducation, setShowOtherEducation] = useState(false)
    const [showOtherLanguage, setShowOtherLanguage] = useState(false)

    const [otherAvailibility, setOtherAvailibility] = useState('')
    const [otherEducation, setOtherEducation] = useState('')
    const [otherLanguage, setOtherLanguage] = useState('')




    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [streets, setStreets] = useState([])

    const [isLoading, setIsLoading] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [updatePage, setUpdatePage] = useState(false)
    const location = useLocation()


    const updateOtherFields = (data) => {
        setShowOtherAvailibility(data.availibility === "Other");
        setShowOtherEducation(data.education === "Other");
        setShowOtherLanguage(data.language === "Other");

        setShowOtherFilter1(data.filter1Value === "Other");
        setShowOtherFilter2(data.filter2Value === "Other");
        setShowOtherFilter3(data.filter3Value === "Other");
    };


    let params = useParams()
    useEffect(() => {
        const { pathname } = location;
        if (pathname !== '/app/add-expert') {
            setIsLoading(true)
            setUpdatePage(true)
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };

            fetch(`${process.env.REACT_APP_SERVER_URL}/api/getServiceById/${params.id}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setIsLoading(false)
                    console.log(result.data)
                    if (result.status) {
                        setExpertID(result.data._id);
                        setCountry(result.data.country);
                        setState(result.data.state);
                        setCity(result.data.city);
                        setStreet(result.data.street);
                        setBudget(result.data.budget);
                        setDescription(result.data.description);
                        setMapLocation(result.data.mapLocation);


                        setEducation(result.data.education || null);
                        setExperience(result.data.experience || null);
                        setLanguage(result.data.language || null);
                        setAvailibility(result.data.availibility || null);
                        setName(result.data.name || null);
                        setTitle(result.data.title || null);

                        setExperty(result.data.experty || '');
                        setField(result.data.field);

                        // const filter1Data = JSON.parse(result.data.filter1)
                        // const filter2Data = JSON.parse(result.data.filter2)
                        // const filter3Data = JSON.parse(result.data.filter3)


                        const filter1Data = result.data.filter1Data
                        const filter2Data = result.data.filter2Data
                        const filter3Data = result.data.filter3Data

                        setFilter1({
                            filterName: filter1Data?.filterName || null,
                            selectedOption: filter1Data?.selectedOption || null
                        });

                        setFilter2({
                            filterName: filter2Data?.filterName || null,
                            selectedOption: filter2Data?.selectedOption || null
                        });

                        setFilter3({
                            filterName: filter3Data?.filterName || null,
                            selectedOption: filter3Data?.selectedOption || null
                        });

                        setOtherFilter1Value(result.data.otherFilter1Value || null);
                        setOtherFilter2Value(result.data.otherFilter2Value || null);
                        setOtherFilter3Value(result.data.otherFilter3Value || null);

                        // setShowOtherFilter1(result.data.showOtherFilter1 || false);
                        // setShowOtherFilter2(result.data.showOtherFilter2 || false);
                        // setShowOtherFilter3(result.data.showOtherFilter3 || false);

                        // setShowOtherAvailibility(result.data.showOtherAvailibility || false);
                        // setShowOtherEducation(result.data.showOtherEducation || false);
                        // setShowOtherLanguage(result.data.showOtherLanguage || false);

                        setOtherAvailibility(result.data.otherAvailibility || '');
                        setOtherEducation(result.data.otherEducation || '');
                        setOtherLanguage(result.data.otherLanguage || '');


                        updateOtherFields({
                            availibility: result.data.availibility,
                            education: result.data.education,
                            language: result.data.language,

                            filter1Value: filter1Data.selectedOption,
                            filter2Value: filter2Data.selectedOption,
                            filter3Value: filter3Data.selectedOption,
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


    const handleFieldChange = (e) => {
        setField(e.target.value);
        setExperty(null); // Reset expertise when field changes
        setFilter1({ filterName: null, selectedOption: null });
        setFilter2({ filterName: null, selectedOption: null });
        setFilter3({ filterName: null, selectedOption: null });
    };

    // Handle the change for the expertise selection
    const handleExpertyChange = (e) => {
        setExperty(e.target.value);
        setFilter1({ filterName: null, selectedOption: null });
        setFilter2({ filterName: null, selectedOption: null });
        setFilter3({ filterName: null, selectedOption: null });
    };

    const selectedService = services.find(service => service.field === field);

    const selectedExperty = selectedService?.expertise.find(expert => expert.expertyName === experty);

    const handleFilterChange = (filterKey, filterName, selectedOption) => {
        if (filterKey === 'filter1') {
            setFilter1({ filterName, selectedOption });
            if (selectedOption === "Other") {
                setShowOtherFilter1(true)
            }
            else {
                setShowOtherFilter1(false)
            }
        } else if (filterKey === 'filter2') {
            setFilter2({ filterName, selectedOption });
            if (selectedOption === "Other") {
                setShowOtherFilter2(true)
            }
            else {
                setShowOtherFilter2(false)
            }
        } else if (filterKey === 'filter3') {
            setFilter3({ filterName, selectedOption });
            if (selectedOption === "Other") {
                setShowOtherFilter3(true)
            }
            else {
                setShowOtherFilter3(false)
            }
        }
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
        if (experty === "") missingFields.push('Experty');
        if (field === "") missingFields.push('Field');


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
                images: uploadedImages.map(imageObj => imageObj.url),
                country: country,
                state: state,
                city: city,
                street: street,
                budget: parseInt(budget),
                description: description,
                mapLocation: mapLocation,

                name,
                title,
                field,
                experty,
                // filter1: JSON.stringify(filter1),
                // filter2: JSON.stringify(filter2),
                // filter3: JSON.stringify(filter3),

                filter1Data: {
                    filterName: filter1.filterName,
                    selectedOption: filter1.selectedOption
                },
                filter2Data: {
                    filterName: filter2.filterName,
                    selectedOption: filter2.selectedOption
                },
                filter3Data: {
                    filterName: filter3.filterName,
                    selectedOption: filter3.selectedOption
                },
                otherFilter1Value,
                otherFilter2Value,
                otherFilter3Value,
                experience,
                language,
                education,
                availibility,

                otherLanguage,
                otherEducation,
                otherAvailibility,

                status: true
            };

            console.log(data)


            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify(data);

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch(`${process.env.REACT_APP_SERVER_URL}/api/addService`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setIsLoading(false)
                    if (result.status) {
                        // toast.success(result.message)
                        toast.success(t("Expert Published Successfully"))
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
                images: uploadedImages.map(imageObj => imageObj.url),
                country: country,
                state: state,
                city: city,
                street: street,
                budget: parseInt(budget),
                description: description,
                mapLocation: mapLocation,

                name,
                title,
                field,
                experty,
                // filter1: JSON.stringify(filter1),
                // filter2: JSON.stringify(filter2),
                // filter3: JSON.stringify(filter3),
                filter1Data: {
                    filterName: filter1.filterName,
                    selectedOption: filter1.selectedOption
                },
                filter2Data: {
                    filterName: filter2.filterName,
                    selectedOption: filter2.selectedOption
                },
                filter3Data: {
                    filterName: filter3.filterName,
                    selectedOption: filter3.selectedOption
                },
                otherFilter1Value,
                otherFilter2Value,
                otherFilter3Value,
                experience,
                language,
                education,
                availibility,

                otherLanguage,
                otherEducation,
                otherAvailibility,

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

            fetch(`${process.env.REACT_APP_SERVER_URL}/api/updateService/${expertID}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setIsLoading(false)
                    if (result.status) {
                        // toast.success(result.message)
                        toast.success(t("Expert Published Successfully"))

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

        setExpertID('');
        setName('');
        setTitle('');
        setBudget('');
        setDescription('');
        setMapLocation(null);

        setEducation(null);
        setExperience(null);
        setLanguage(null);
        setAvailibility(null);

        setField('');
        setExperty('');

        setFilter1({
            filterName: null,
            selectedOption: null
        });

        setFilter2({
            filterName: null,
            selectedOption: null
        });

        setFilter3({
            filterName: null,
            selectedOption: null
        });

        setOtherFilter1Value(null);
        setOtherFilter2Value(null);
        setOtherFilter3Value(null);
        setShowOtherFilter1(false);
        setShowOtherFilter2(false);
        setShowOtherFilter3(false);

        setShowOtherAvailibility(false);
        setShowOtherEducation(false);
        setShowOtherLanguage(false);

        setOtherAvailibility('');
        setOtherEducation('');
        setOtherLanguage('');

        setCountries([]);
        setStates([]);
        setCities([]);
        setStreets([]);

        setIsLoading(false);
        setUploadingImage(false);
        setUpdatePage(false);

    }

    const handleBudgetCheck = (e) => {
        if (e.target.value < 0) {
            toast.error(t("Price cannot be negative"))
            setBudget(0)
            return
        }
        setBudget(e.target.value)
    }
    const handleExperienceCheck = (e) => {
        if (e.target.value < 0) {
            toast.error(t("Price cannot be negative"))
            setExperience(0)
            return
        }
        setExperience(e.target.value)
    }



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
                                        <h5 className='fw-bolder'>{t("Update Expert")}</h5>
                                        <small className='mb-3'>{t("Update the desired fields and retain others")}</small>
                                    </>

                                ) :
                                (
                                    <>
                                        <h5 className='fw-bolder'>{t("Publish New Expert Profile")}</h5>
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
                                        <div className="info">{t("Field and pricing")}</div>
                                        <div className="form-group form-group-sm mb-3">
                                            <label htmlFor="" className='mb-1'>{t("Field")}*</label>
                                            <select name="" id="" className="custom-input" onChange={handleFieldChange} value={field}>
                                                <option value="">{t("select")} {t("Field")}</option>
                                                {services.map((service, index) => (
                                                    <option key={index} value={service.field}>{t(service.field)}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {
                                            field && (
                                                <div className="form-group form-group-sm mb-3">
                                                    <label htmlFor="" className='mb-1'>{t("Experty")}*</label>
                                                    <select
                                                        name="category"
                                                        id="category"
                                                        className="custom-input"
                                                        onChange={handleExpertyChange}
                                                        value={experty}
                                                    >
                                                        <option value="">{t("select")} {t("Experty")}</option>
                                                        {selectedService?.expertise.map((expert, index) => (
                                                            <option key={index} value={expert.expertyName}>{t(expert.expertyName)}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )
                                        }



                                        <div className="form-group form-group-sm mb-3">
                                            {field && experty && (
                                                <>
                                                    <label htmlFor="filter1">{t(selectedExperty?.filter1.filterName)}</label>
                                                    <select id="filter1" className="custom-input" onChange={(e) => handleFilterChange('filter1', selectedExperty.filter1.filterName, e.target.value)} value={filter1.selectedOption}>
                                                        <option value="">{t("select")} {t(selectedExperty?.filter1.filterName)}</option>
                                                        {selectedExperty?.filter1.options.map((option, index) => (
                                                            <option key={index} value={option}>{t(option)}</option>
                                                        ))}
                                                    </select>
                                                </>
                                            )}
                                        </div>
                                        {
                                            showOtherFilter1 && (
                                                <div className="form-group form-group-sm mb-3">
                                                    <label htmlFor="" className='mb-1'>{t("Please specify")}</label>
                                                    <input type="text" className="custom-input" onChange={e => setOtherFilter1Value(e.target.value)} value={otherFilter1Value} />
                                                </div>
                                            )
                                        }

                                        <div className="form-group form-group-sm mb-3">
                                            {field && experty && (
                                                <>
                                                    <label htmlFor="filter2">{t(selectedExperty?.filter2.filterName)}</label>
                                                    <select id="filter2" className="custom-input" onChange={(e) => handleFilterChange('filter2', selectedExperty.filter2.filterName, e.target.value)} value={filter2.selectedOption}>
                                                        <option value="">{t("select")} {t(selectedExperty?.filter2.filterName)}</option>
                                                        {selectedExperty?.filter2.options.map((option, index) => (
                                                            <option key={index} value={option}>{t(option)}</option>
                                                        ))}
                                                    </select>
                                                </>
                                            )}
                                        </div>

                                        {
                                            showOtherFilter2 && (
                                                <div className="form-group form-group-sm mb-3">
                                                    <label htmlFor="" className='mb-1'>{t("Please specify")}</label>
                                                    <input type="text" className="custom-input" onChange={e => setOtherFilter2Value(e.target.value)} value={otherFilter2Value} />
                                                </div>
                                            )
                                        }

                                        <div className="form-group form-group-sm mb-3">
                                            {field && experty && (
                                                <>
                                                    <label htmlFor="filter3">{t(selectedExperty?.filter3.filterName)}</label>
                                                    <select id="filter3" className="custom-input" onChange={(e) => handleFilterChange('filter3', selectedExperty.filter3.filterName, e.target.value)} value={filter3.selectedOption}>
                                                        <option value="">{t("select")} {t(selectedExperty?.filter3.filterName)}</option>
                                                        {selectedExperty?.filter3.options.map((option, index) => (
                                                            <option key={index} value={option}>{t(option)}</option>
                                                        ))}
                                                    </select>
                                                </>
                                            )}
                                        </div>

                                        {
                                            showOtherFilter3 && (
                                                <div className="form-group form-group-sm mb-3">
                                                    <label htmlFor="" className='mb-1'>{t("Please specify")}</label>
                                                    <input type="text" className="custom-input" onChange={e => setOtherFilter3Value(e.target.value)} value={otherFilter3Value} />
                                                </div>
                                            )
                                        }


                                        <div className="form-group form-group-sm mb-4">
                                            <label htmlFor="" className='mb-1'>{t("Consultation fee (MAD) per hour")}</label>
                                            <input type="number" min={0} className="custom-input" onChange={e => setBudget(e.target.value)} onBlur={handleBudgetCheck} value={budget} />
                                            {/* <small style={{ fontSize: "10px" }}>{t("Consultation fee (MAD) per hour")} </small> */}
                                        </div>
                                    </div>


                                    <div className="formSide side_3">
                                        <div className="info">{t("Expert Information")}</div>

                                        <div className="form-group form-group-sm mb-3">
                                            <label htmlFor="" className='mb-1'>{t("title")}* <small>({t("max")} 100 {t("characters")})</small></label>
                                            <input type="text" maxLength={100} className="custom-input" onChange={e => setTitle(e.target.value)} value={title} />
                                        </div>

                                        <div className="form-group form-group-sm mb-3">
                                            <label htmlFor="" className='mb-1'>{t("Name")}* <small>({t("max")} 100 {t("characters")})</small></label>
                                            <input type="text" maxLength={100} className="custom-input" onChange={e => setName(e.target.value)} value={name} />
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
                                            <label htmlFor="" className='mb-1'>{t("Experience")} {t("in year")}</label>
                                            <input type="number" min={0} className="custom-input" onChange={e => setExperience(e.target.value)} onBlur={handleExperienceCheck} value={experience} />
                                        </div>

                                        <div className="form-group form-group-sm mb-3">
                                            <label htmlFor="" className='mb-1'>{t("Language")} </label>
                                            <select name="" id="" className="custom-input" onChange={e => {
                                                setLanguage(e.target.value)
                                                e.target.value === "Other" ?
                                                    setShowOtherLanguage(true) :
                                                    setShowOtherLanguage(false)
                                            }} value={language}>
                                                <option value="">{t("select")} {t("Language")}</option>
                                                {
                                                    languageData
                                                        .map((data, i) => (
                                                            <option value={data} key={i}>{t(data)}</option>
                                                        ))
                                                }
                                            </select>
                                        </div>

                                        {
                                            showOtherLanguage && (
                                                <div className="form-group form-group-sm mb-3">
                                                    <label htmlFor="" className='mb-1'>{t("Please specify")}</label>
                                                    <input type="text" className="custom-input" onChange={e => setOtherLanguage(e.target.value)} value={otherLanguage} />
                                                </div>
                                            )
                                        }

                                        <div className="form-group form-group-sm mb-3">
                                            <label htmlFor="" className='mb-1'>{t("Education")} </label>
                                            <select name="" id="" className="custom-input" onChange={e => {
                                                setEducation(e.target.value)
                                                e.target.value === "Other" ?
                                                    setShowOtherEducation(true) :
                                                    setShowOtherEducation(false)
                                            }} value={education}>
                                                <option value="">{t("select")} {t("Education")}</option>
                                                {
                                                    educationData
                                                        .map((data, i) => (
                                                            <option value={data} key={i}>{t(data)}</option>
                                                        ))
                                                }
                                            </select>
                                        </div>

                                        {
                                            showOtherEducation && (
                                                <div className="form-group form-group-sm mb-3">
                                                    <label htmlFor="" className='mb-1'>{t("Please specify")}</label>
                                                    <input type="text" className="custom-input" onChange={e => setOtherEducation(e.target.value)} value={otherEducation} />
                                                </div>
                                            )
                                        }

                                        <div className="form-group form-group-sm mb-3">
                                            <label htmlFor="" className='mb-1'>{t("Availibility")} </label>
                                            <select name="" id="" className="custom-input" onChange={e => {
                                                setAvailibility(e.target.value)
                                                e.target.value === "Other" ?
                                                    setShowOtherAvailibility(true) :
                                                    setShowOtherAvailibility(false)
                                            }} value={availibility}>
                                                <option value="">{t("select")} {t("Availibility")}</option>
                                                {
                                                    availibilityData
                                                        .map((data, i) => (
                                                            <option value={data} key={i}>{t(data)}</option>
                                                        ))
                                                }
                                            </select>
                                        </div>
                                        {
                                            showOtherAvailibility && (
                                                <div className="form-group form-group-sm mb-3">
                                                    <label htmlFor="" className='mb-1'>{t("Please specify")}</label>
                                                    <input type="text" className="custom-input" onChange={e => setOtherAvailibility(e.target.value)} value={otherAvailibility} />
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

import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Breadcrumb from '../components/sections/Breadcrumb'
import { useTranslation } from 'react-i18next'
import ContactUs from '../components/sections/ContactUs'
import Footer from '../components/sections/Footer'
import BlogSection from '../components/sections/BlogSection'
import sellerImage from '../assets/images/sellerImage.png'
import { FaAngleLeft, FaAngleRight, FaBath, FaBed, FaBuilding, FaEnvelope, FaHeart, FaPhone, FaRegHeart, FaRoadSpikes, FaShare, FaShareNodes } from 'react-icons/fa6'
import MessageOwner from '../components/utils/MessageOwner'
import { FaRegArrowAltCircleRight, FaSwimmingPool } from 'react-icons/fa'

import { LuBath } from "react-icons/lu";
import { BsBuildings } from "react-icons/bs";
import { TbBed, TbCar } from 'react-icons/tb'
import { PiFlowerTulip } from "react-icons/pi";
import { MdOutlinePool } from "react-icons/md";
import { MdOutlineGarage } from "react-icons/md";
import loader from '../assets/images/skyscalp-loader.json'


import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Map from '../components/map/Map'
import Properties from '../components/sections/Properties'
import SimilarProperties from '../components/sections/SimilarProperties'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import ShareProduct from '../components/utils/ShareProduct'
import toast, { Toaster } from 'react-hot-toast'
import { formatPrice } from '../utils/formatPrice'
import Lottie from 'lottie-react'
import { checkInFavourites } from '../APIs/favourites'
import handleProductFavourite from '../components/utils/manangeFavourite'
import PropertyCard from '../components/cards/PropertyCard'

export default function ViewProperty() {

    const [userID, setUserID] = useState('')
    const [propertyID, setPropertyID] = useState('')
    const [showUploadedImages, setShowUploadedImages] = useState(false)
    const [uploadedImages, setUploadedImages] = useState([])
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
    const [garden, setGarden] = useState('')
    const [description, setDescription] = useState('')
    const [condition, setCondition] = useState('')
    const [proximity, setProximity] = useState('')
    const [features, setFeatures] = useState([])
    const [mapLocation, setMapLocation] = useState(null)
    const [userInfo, setUserInfo] = useState({})

    const [isLoading, setIsLoading] = useState(false)


    const [similarProperties, setSimilarProducts] = useState([])

    let params = useParams()

    const loadPropertyData = () => {
        setIsLoading(true)
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/getPropertyById/${params.id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setIsLoading(false)
                if (result.status) {
                    setUserID(result.data.userID);
                    setPropertyID(result.data._id);
                    setTitle(result.data.title);
                    setDescription(result.data.description);
                    setCountry(result.data.country);
                    setState(result.data.state);
                    setCity(result.data.city);
                    setStreet(result.data.street);
                    setBudget(result.data.budget);
                    setArea(result.data.area);
                    setBuild(result.data.build);
                    setApplication(result.data.application);
                    setCategory(result.data.category);
                    setType(result.data.type);
                    setRooms(result.data.rooms);
                    setBathrooms(result.data.bathrooms);
                    setKitchen(result.data.kitchen);
                    setGarage(result.data.garage);
                    setPool(result.data.pool);
                    setGarden(result.data.garden);
                    setCondition(result.data.condition);
                    setProximity(result.data.proximity);
                    setFeatures(result.data.features);
                    setMapLocation(result.data.mapLocation);
                    setUploadedImages(result.data.images)
                    setUserInfo(result.data.user)
                    setShowUploadedImages(true)
                    // loadPropertiesByFilters()


                    // check if the product is in favourites 
                    const user = JSON.parse(localStorage.getItem("user"))
                    if (user) {
                        checkInFavourites(user.userID, result.data._id)
                            .then(res => {
                                if (!res.status) {
                                    setFavourite(false)
                                }
                                else {
                                    setFavourite(true)
                                }
                            }).catch(err => {
                                console.log(err)
                                setFavourite(false)
                            })

                    }
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

    const loadPropertiesByFilters = () => {
        setIsLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let similarPropertyFilters = {
            type: type,
            selectedConditions: [],
            yearBuild: [],
            proximities: [],
            features: [],
            selectedCountries: [country],
            selectedStates: [],
            selectedCities: [],
            selectedStreets: [],
            checkedSubcategories: [category]
        }

        const raw = JSON.stringify(similarPropertyFilters);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/getPropertiesByFilters`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setIsLoading(false)
                // console.log(result)
                if (result.status) {
                    setSimilarProducts(result.data.documents)
                }
                else {
                    setSimilarProducts([])
                    console.log(result.message)
                }
            })
            .catch((error) => {
                setIsLoading(false);
                console.error(error);
            });
    }
    useEffect(() => {
        loadPropertyData()
    }, [params])

    useEffect(() => {
        loadPropertiesByFilters()
    }, [type, country, category])

    const [t] = useTranslation()
    const [favourite, setFavourite] = useState(false)

    const [mainImageIndex, setMainImageIndex] = useState(0);

    const handleImageClick = (index) => {
        setMainImageIndex(index);
    };

    const handlePreviousImage = () => {
        const newIndex = (mainImageIndex - 1 + uploadedImages.length) % uploadedImages.length;
        setMainImageIndex(newIndex);
    };

    const handleNextImage = () => {
        const newIndex = (mainImageIndex + 1) % uploadedImages.length;
        setMainImageIndex(newIndex);
    };



    const handleFavourite = () => {
        handleProductFavourite(favourite, setFavourite, propertyID, false)
    }


    // const handleImageClick = (image) => {
    //     setMainImage(image);
    // };

    return (
        <>
            <div className={`lottie-wrapper ${isLoading ? 'show' : ''}`}>
                <Lottie className='loader' animationData={loader} loop={true} />
            </div>
            <Toaster />
            <Navbar />
            <Breadcrumb title={title && title} link={t("property")} />

            <section className="details-section">
                <div className="custom-container">
                    <div className="split">
                        <div className="product-details side-lg">

                            <div className="side images mb-2">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <Link to='../properties'>
                                        <p className="color-secondary">&lt; Back to list</p>
                                    </Link>
                                    <ShareProduct />
                                </div>
                                <div className="main-image">
                                    <div className="arrow left-arrow" onClick={handlePreviousImage}>
                                        <FaAngleLeft className='arrow-icon' />
                                    </div>
                                    <div className="arrow right-arrow" onClick={handleNextImage}>
                                        <FaAngleRight className='arrow-icon' />
                                    </div>
                                    <img src={uploadedImages[mainImageIndex]} alt="" />
                                </div>
                                <div className="more-images">
                                    {uploadedImages.map((image, i) => (
                                        <div key={i} className={`image ${mainImageIndex === i ? 'active' : ''}`} onClick={() => handleImageClick(i)}>
                                            <img src={image} alt="" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="side basic-information mb-2">
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <h5 className="color-primary fw-bolder">MAD {formatPrice(budget)}</h5>
                                    <div className="custom-badge">{type && type.charAt(0).toUpperCase() + type.slice(1)}</div>
                                </div>

                                <h4 className="fw-bolder mb-2">{title && title}</h4>
                                <p className='paragraph mb-0 '>{application && application}, ({area && area} m<sup>2</sup>)</p>
                                <p className='paragraph color-secondary my-2 '>{street && street}</p>

                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <p className=''>{city && city}, {country && country}</p>
                                    {favourite ? (
                                        <FaHeart className="icon favourite-icon filled" onClick={handleFavourite} />
                                    ) : (
                                        <FaRegHeart className="icon favourite-icon" onClick={handleFavourite} />
                                    )}
                                </div>

                                <hr />

                                <div className="info-icons mt-2">
                                    {
                                        rooms > 0 &&
                                        (
                                            <div className="d-flex align-items-center gap-2">
                                                <TbBed className='color-secondary' />
                                                <small className="color-secondary">{rooms && rooms} {t("bedrooms")}</small>
                                            </div>
                                        )
                                    }
                                    {
                                        bathrooms > 0 &&
                                        (
                                            <div className="d-flex align-items-center gap-2">
                                                <LuBath className='color-secondary' />
                                                <small className="color-secondary">{bathrooms && bathrooms} {t("baths")}</small>
                                            </div>
                                        )
                                    }
                                    {
                                        area > 0 &&
                                        (
                                            <div className="d-flex align-items-center gap-2">
                                                <BsBuildings className='color-secondary' />
                                                <small className="color-secondary">{area && area} sq ft</small>
                                            </div>
                                        )
                                    }
                                    {
                                        garden > 0 &&
                                        (
                                            <div className="d-flex align-items-center gap-2">
                                                <PiFlowerTulip className='color-secondary' />
                                                <small className="color-secondary">{rooms && rooms} {t("garden")}</small>
                                            </div>
                                        )
                                    }
                                    {
                                        garage > 0 &&
                                        (
                                            <div className="d-flex align-items-center gap-2">
                                                <TbCar className='color-secondary' />
                                                <small className="color-secondary">{garage && garage} {t("garage")}</small>
                                            </div>
                                        )
                                    }
                                    {
                                        pool > 0 &&
                                        (
                                            <div className="d-flex align-items-center gap-2">
                                                <MdOutlinePool className='color-secondary' />
                                                <small className="color-secondary">{pool && pool} {t("pool")}</small>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>

                            <div className="side description mb-2">
                                <h4 className="fw-bolder mb-3">{t("description")}</h4>
                                <div className="paragraph mb-2" dangerouslySetInnerHTML={{ __html: description }} />

                            </div>

                            <div className="side more-details mb-2">
                                <h4 className="fw-bolder mb-4">{t("moreDetails")}</h4>

                                <div className="features-grid">

                                    {
                                        rooms && category !== '' &&
                                        (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("category")}</p>
                                                </div>
                                                <p className="paragraph">{category}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        parseInt(area) > 0 &&
                                        (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("sizeArea")}</p>
                                                </div>
                                                <p className="paragraph">{area} m<sup>2</sup></p>
                                            </div>
                                        )
                                    }
                                    {
                                        parseInt(rooms) > 0 &&
                                        (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("bedrooms")}</p>
                                                </div>
                                                <p className="paragraph">{rooms}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        parseInt(bathrooms) > 0 &&
                                        (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("baths")}</p>
                                                </div>
                                                <p className="paragraph">{bathrooms}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        parseInt(garage) > 0 &&
                                        (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("garden")}</p>
                                                </div>
                                                <p className="paragraph">{garage}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        parseInt(pool) > 0 &&
                                        (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("pool")}</p>
                                                </div>
                                                <p className="paragraph">{pool}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        parseInt(garden) > 0 &&
                                        (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("garage")}</p>
                                                </div>
                                                <p className="paragraph">{garage}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("transaction")}</p>
                                                </div>
                                                <p className="paragraph">{type}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        build !== "" &&
                                        (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("year")}</p>
                                                </div>
                                                <p className="paragraph">{build}</p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>

                            <div className="side map mb-2">
                                <h3 className="fw-bolder mb-4">{t("viewOnMap")}</h3>
                                {!isLoading && mapLocation && (
                                    <Map location={mapLocation} />
                                )}

                                <p className="color-secondary my-2">{street && street}, {city && city}, {country && country}</p>
                                <p className="color-secondary my-2">Reference ID: {propertyID}</p>
                            </div>


                        </div>


                        <div className="seller-details side-sm">
                            <div className="side mb-2">
                                <div className="seller-info mb-3">
                                    <div className="image">
                                        <img src={userInfo && userInfo.profileImage} alt="" />
                                    </div>
                                    <div className="content">
                                        <h5 className="fw-bolder">{userInfo && userInfo.username}</h5>
                                        {/* <p className="color-secondary">{userInfo && userInfo.email.slice(0, 20)}{userInfo.email.length > 20 ? '...': ''}</p> */}
                                        <p className="color-secondary" style={{ fontSize: "11px" }}>{userInfo && userInfo.email}</p>
                                    </div>
                                </div>
                                <button className="outline-btn mb-2 w-100" style={{ fontSize: "13px" }}><FaPhone className='me-1' />{userInfo && userInfo.phone}</button>
                                <button className="outline-btn mb-2 w-100 d-flex justify-content-center align-items-center" style={{ fontSize: "13px" }}>
                                    <FaEnvelope className='me-1' />{userInfo && userInfo.email}</button>
                            </div>
                            <MessageOwner userID={userID} />
                        </div>


                    </div>
                </div>
            </section>

            <section className="similar">
                <div className="custom-container">
                    <h3 className='my-3 fw-bolder'>{t("similar")}</h3>
                    <div className="cards-grid">
                        {
                            similarProperties && similarProperties.slice(0, 3).map((item) => {
                                return (
                                    <PropertyCard key={item._id} propertyData={item} />
                                )
                            })
                        }
                    </div>
                </div>
            </section>


            <BlogSection />
            <ContactUs supportTitle={t("propertySupportTitle")} supportDescription={t("propertySupportDescription")} />
            <Footer />
        </>
    )
}
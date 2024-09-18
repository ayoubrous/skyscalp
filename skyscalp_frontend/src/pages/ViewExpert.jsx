import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Breadcrumb from '../components/sections/Breadcrumb'
import { useTranslation } from 'react-i18next'
import ContactUs from '../components/sections/ContactUs'
import Footer from '../components/sections/Footer'
import BlogSection from '../components/sections/BlogSection'
import sellerImage from '../assets/images/sellerImage.png'
import { FaBath, FaBed, FaBuilding, FaEnvelope, FaHeart, FaPhone, FaRegHeart, FaRoadSpikes } from 'react-icons/fa6'
import MessageOwner from '../components/utils/MessageOwner'
import { Link, useParams } from 'react-router-dom'
import ShareProduct from '../components/utils/ShareProduct'
import Map from '../components/map/Map'
import { FaAngleLeft, FaAngleRight, FaRegCheckSquare } from 'react-icons/fa'
import { GrStatusInfo } from 'react-icons/gr'
import { IoIosColorPalette } from 'react-icons/io'
import { checkInFavourites } from '../APIs/favourites'
import handleProductFavourite from '../components/utils/manangeFavourite'
import { formatPrice } from '../utils/formatPrice'
import FurnitureCard from '../components/cards/FurnitureCard'

import loader from '../assets/images/skyscalp-loader.json'
import Lottie from 'lottie-react'
import ExpertCard from '../components/cards/ExpertCard'

export default function ViewExpert() {
    const [isLoading, setIsLoading] = useState(false)


    const [userID, setUserID] = useState('')
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


    const [filter1Data, setFilter1Data] = useState({})
    const [filter2Data, setFilter2Data] = useState({})
    const [filter3Data, setFilter3Data] = useState({})

    const [otherFilter1Value, setOtherFilter1Value] = useState(null);
    const [otherFilter2Value, setOtherFilter2Value] = useState(null);
    const [otherFilter3Value, setOtherFilter3Value] = useState(null);

    const [otherAvailibility, setOtherAvailibility] = useState('')
    const [otherEducation, setOtherEducation] = useState('')
    const [otherLanguage, setOtherLanguage] = useState('')


    const [createdAt, setCreatedAt] = useState('')
    const [userInfo, setUserInfo] = useState('')

    const [similarProducts, setSimilarProducts] = useState([])

    let params = useParams()

    const loadData = () => {
        setIsLoading(true)
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/getServiceById/${params.id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                setIsLoading(false)
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

                    // old proceedure of saving filters data as a string 
                    // const filter1Data = JSON.parse(result.data.filter1)
                    // const filter2Data = JSON.parse(result.data.filter2)
                    // const filter3Data = JSON.parse(result.data.filter3)

                    setFilter1Data(result.data.filter1Data)
                    setFilter2Data(result.data.filter2Data)
                    setFilter3Data(result.data.filter3Data)


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

                    setOtherAvailibility(result.data.otherAvailibility || '');
                    setOtherEducation(result.data.otherEducation || '');
                    setOtherLanguage(result.data.otherLanguage || '');
                    setCreatedAt(result.data.createdAt);


                    setUploadedImages(result.data.images)
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
                    console.log(result.message)
                }
            })
            .catch((error) => {
                setIsLoading(false);
                console.error(error);
            });
    }

    const loadSimilarProducts = () => {
        setIsLoading(true);


        const searchFilters = {
            selectedLanguages: [],
            selectedEducations: [],
            selectedAvailibilities: [],
            selectedCountries: [country],
            selectedField: field,
            selectedStates: [],
            selectedCities: [],
            selectedStreets: [],
        };

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(searchFilters);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/getFilteredServices`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setIsLoading(false);
                if (result.status) {
                    setSimilarProducts(result.data.documents)
                } else {
                    console.log(result.message);
                    setSimilarProducts([])
                }
            })
            .catch((error) => {
                setIsLoading(false);
                console.error(error);
            });
    };


    useEffect(() => {
        loadData()
    }, [params])

    useEffect(() => {
        loadSimilarProducts()
    }, [country, field])

    const [t] = useTranslation()
    const [favourite, setFavourite] = useState(false)
    const [mainImage, setMainImage] = useState(uploadedImages[0]);
    const [mainImageIndex, setMainImageIndex] = useState(0);


    const handleImageClick = (image) => {
        setMainImage(image);
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
        handleProductFavourite(favourite, setFavourite, expertID, true)
    }
    return (
        <>
            <div className={`lottie-wrapper ${isLoading ? 'show' : ''}`}>
                <Lottie className='loader' animationData={loader} loop={true} />
            </div>
            <Navbar />
            <Breadcrumb title={title} link={t("Experts")} />
            <section className="details-section">
                <div className="custom-container">
                    <div className="split">
                        <div className="product-details side-lg">

                            <div className="side images mb-2">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <Link to='../experts'>
                                        <p className="color-secondary">&lt; {t("backToList")}</p>

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
                                    {/* <OwlCarousel id="" className="owl-carousel owl-theme" {...options}> */}
                                    {uploadedImages.map((image, i) => (
                                        <div key={i} className={`image ${mainImageIndex === i ? 'active' : ''}`} onClick={() => handleImageClick(i)}>
                                            <img src={image} alt="" />
                                        </div>
                                    ))}


                                    {/* </OwlCarousel> */}
                                </div>
                            </div>

                            <div className="side basic-information mb-2">
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <h5 className="color-primary fw-bolder">MAD {formatPrice(budget)}/hr</h5>
                                </div>

                                <h4 className="fw-bolder mb-2">{title}</h4>
                                <p className='paragraph mb-1 '>{name}</p>
                                <p className='paragraph mb-1 '>{t("Field")}: {t(field)}</p>
                                <p className='paragraph mb-1 '>{t("Experty")}: {t(experty)}</p>

                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <p className=''>{city}{city && ','} {country}</p>
                                    {favourite ? (
                                        <FaHeart className="icon favourite-icon filled" onClick={handleFavourite} />
                                    ) : (
                                        <FaRegHeart className="icon favourite-icon" onClick={handleFavourite} />
                                    )}
                                </div>

                                <div className="info-icons mt-2">
                                    <small className='color-secondary '>Date: {createdAt && new Intl.DateTimeFormat('en-GB').format(new Date(createdAt))}</small>
                                </div>
                                {/* <hr /> */}

                                <div className="info-icons mt-2">
                                    {/* <div className="d-flex align-items-center gap-2">
                                        <small className="color-secondary">{t("year")}:</small>
                                        <small className="color-secondary">2021</small>
                                    </div> */}
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
                                        field !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("Field")}</p>
                                                </div>

                                                <p className="paragraph">{t(field)}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        experty !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("Experty")}</p>
                                                </div>
                                                <p className="paragraph">{t(experty)}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        filter1Data && filter1Data.filterName !== "" && filter1Data.selectedOption && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t(filter1Data.filterName)}</p>
                                                </div>

                                                <p className="paragraph">
                                                    {
                                                        (filter1Data.selectedOption.toLowerCase() === "other" || filter1Data.selectedOption.toLowerCase() === "others") && otherFilter1Value
                                                            ? t(otherFilter1Value)
                                                            : t(filter1Data.selectedOption)
                                                    }
                                                </p>
                                            </div>
                                        )
                                    }
                                    {
                                        filter2Data && filter2Data.filterName !== "" && filter2Data.selectedOption && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t(filter2Data.filterName)}</p>
                                                </div>

                                                <p className="paragraph">
                                                    {
                                                        (filter2Data.selectedOption.toLowerCase() === "other" || filter2Data.selectedOption.toLowerCase() === "others") && otherFilter2Value
                                                            ? t(otherFilter2Value)
                                                            : t(filter2Data.selectedOption)
                                                    }
                                                </p>
                                            </div>
                                        )
                                    }
                                    {
                                        filter3Data && filter3Data.filterName !== "" && filter3Data.selectedOption && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t(filter3Data.filterName)}</p>
                                                </div>

                                                <p className="paragraph">
                                                    {
                                                        (filter3Data.selectedOption.toLowerCase() === "other" || filter3Data.selectedOption.toLowerCase() === "others") && otherFilter3Value
                                                            ? t(otherFilter3Value)
                                                            : t(filter3Data.selectedOption)
                                                    }
                                                </p>
                                            </div>
                                        )
                                    }


                                    {/* {
                                        brand && brand !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("brand")}</p>
                                                </div>
                                                <p className="paragraph">
                                                    {
                                                        (brand.toLowerCase() === "other" || brand.toLowerCase() === "others") && otherBrand
                                                            ? t(otherBrand)
                                                            : t(brand)
                                                    }
                                                </p>
                                            </div>
                                        )
                                    } */}

                                    {
                                        education && education !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("Education")}</p>
                                                </div>
                                                <p className="paragraph">
                                                    {
                                                        (education.toLowerCase() === "other" || education.toLowerCase() === "others") && otherEducation
                                                            ? t(otherEducation)
                                                            : t(education)
                                                    }
                                                </p>
                                            </div>
                                        )
                                    }
                                    {
                                        experience !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("Experience")}</p>
                                                </div>
                                                <p className="paragraph">{t(experience)} {t("year")}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        language && language !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("Language")}</p>
                                                </div>
                                                <p className="paragraph">
                                                    {
                                                        (language.toLowerCase() === "other" || language.toLowerCase() === "others") && otherLanguage
                                                            ? t(otherLanguage)
                                                            : t(language)
                                                    }
                                                </p>
                                            </div>
                                        )
                                    }
                                    {
                                        availibility && availibility !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("Availibility")}</p>
                                                </div>
                                                <p className="paragraph">
                                                    {
                                                        (availibility.toLowerCase() === "other" || availibility.toLowerCase() === "others") && otherAvailibility
                                                            ? t(otherAvailibility)
                                                            : t(availibility)
                                                    }
                                                </p>
                                            </div>
                                        )
                                    }



                                </div>
                            </div>

                            <div className="side map mb-2">
                                {!isLoading && mapLocation && (
                                    <>
                                        <h3 className="fw-bolder mb-4">{t("viewOnMap")}</h3>
                                        <Map location={mapLocation} />
                                    </>
                                )}


                                <p className="color-secondary my-2">{street}</p>
                                <p className="color-secondary my-2">{t("ReferenceID")}: {expertID}</p>
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
                                        {/* <p className="color-secondary" style={{ fontSize: "11px" }}>{userInfo && userInfo.email}</p> */}
                                        <p className="color-secondary" style={{ fontSize: "11px" }}>Test.owner@skyscalp.com</p>
                                    </div>
                                </div>
                                {/* <button className="outline-btn mb-2 w-100" style={{ fontSize: "13px" }}><FaPhone className='me-1' />{userInfo && userInfo.phone}</button> */}
                                <button className="outline-btn mb-2 w-100" style={{ fontSize: "13px" }}><FaPhone className='me-1' />+212625818117</button>
                                <button className="outline-btn mb-2 w-100 d-flex justify-content-center align-items-center" style={{ fontSize: "13px" }}>
                                    {/* <FaEnvelope className='me-1' />{userInfo && userInfo.email}</button> */}
                                    <FaEnvelope className='me-1' />Test.owner@skyscalp.com</button>

                            </div>

                            <MessageOwner userID={userID} />
                        </div>


                    </div>
                </div>
            </section>


            <section className="similar">
                <div className="custom-container">
                    <h3 className='my-3 fw-bolder'>{t("similar")}</h3>
                    <div className="cards-grid agents-cards-grid">
                        {
                            similarProducts && similarProducts.length === 0 && (
                                <h5 className='my-4'>{t("noItemsFound")}</h5>
                            )
                        }
                        {
                            similarProducts && similarProducts.slice(0, 3).map((item) => {
                                return (
                                    <ExpertCard key={item._id} data={item} />
                                )
                            })
                        }
                    </div>
                </div>
            </section>

            <BlogSection />
            <ContactUs supportTitle={t("homeSupportTitle")} supportDescription={t("homeSupportDescription")} contactEmail={"information.marketplace@skyscalp.com"} contactPhone={"+33771759956"} />
            <Footer />
        </>
    )
}
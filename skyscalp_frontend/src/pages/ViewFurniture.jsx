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

export default function ViewFurniture() {
    const [isLoading, setIsLoading] = useState(false)


    const [furnitureID, setFurnitureID] = useState('')
    const [userID, setUserID] = useState('')
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

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/getProductById/${params.id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setIsLoading(false)
                if (result.status) {
                    setFurnitureID(result.data._id);
                    setUserID(result.data.userID);
                    setCountry(result.data.country);
                    setState(result.data.state);
                    setCity(result.data.city);
                    setStreet(result.data.street);
                    setTitle(result.data.title);
                    setBudget(result.data.budget);
                    setQuantity(result.data.quantity);
                    setArticle(result.data.article);
                    setCategory(result.data.category);
                    setDescription(result.data.description);
                    setCondition(result.data.condition);
                    setMapLocation(result.data.mapLocation);
                    setGuarantee(result.data.guarantee);
                    setGuaranteePeriod(result.data.guaranteePeriod);
                    setBrand(result.data.brand);
                    setColor(result.data.color);
                    setDimensions(result.data.dimensions);
                    setStyle(result.data.style);
                    setFeature(result.data.feature);
                    setUploadedImages(result.data.images)
                    setCreatedAt(result.data.createdAt)
                    setUserInfo(result.data.user)

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
            checkedSubcategories: [],
            selectedMachineryType: [],
            selectedMaterialType: [],
            selectedBrands: [],
            selectedConditions: [],
            yearBuild: [],
            selectedCountries: [country],
            checkedSubcategories: [category],
            selectedStates: [],
            selectedCities: [],
            selectedStreets: [],
            materialItemType: [],
            selectedMaterials: [],
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

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/getProductsByFilters?materialGroup=${'machinery'}`, requestOptions)
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
    }, [country, category])

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
        handleProductFavourite(favourite, setFavourite, furnitureID, true)
    }
    return (
        <>
            <div className={`lottie-wrapper ${isLoading ? 'show' : ''}`}>
                <Lottie className='loader' animationData={loader} loop={true} />
            </div>
            <Navbar />
            <Breadcrumb title={title} link={t("furnitureAppliances")} />
            <section className="details-section">
                <div className="custom-container">
                    <div className="split">
                        <div className="product-details side-lg">

                            <div className="side images mb-2">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <Link to='../marketplace?market=3'>
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
                                    <h5 className="color-primary fw-bolder">MAD {formatPrice(budget)}</h5>
                                </div>

                                <h4 className="fw-bolder mb-2">{title}</h4>
                                <p className='paragraph mb-1 '>{t("quantity")}: {quantity}/{t("piece")}</p>
                                <p className='paragraph mb-1 '>{t("Article")}: {t(category)}</p>

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
                                <hr />

                                <div className="info-icons mt-2">
                                    {/* <div className="d-flex align-items-center gap-2">
                                        <small className="color-secondary">{t("year")}:</small>
                                        <small className="color-secondary">2021</small>
                                    </div> */}
                                    {
                                        guaranteePeriod !== '' && (
                                            <div className="d-flex align-items-center gap-2">
                                                <FaRegCheckSquare className='color-secondary' />
                                                <small className="color-secondary">{t("guarantee")}</small>
                                            </div>
                                        )
                                    }
                                    {
                                        condition !== '' && (
                                            <div className="d-flex align-items-center gap-2">
                                                <GrStatusInfo className='color-secondary' />
                                                <small className="color-secondary">{t(condition)}</small>
                                            </div>
                                        )
                                    }

                                    {
                                        color !== '' && (
                                            <div className="d-flex align-items-center gap-2">
                                                <IoIosColorPalette className='color-secondary' />
                                                <small className="color-secondary">{t(color)}</small>
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
                                        category !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("category")}</p>
                                                </div>

                                                <p className="paragraph">{t(category)}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        article !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("Article")}</p>
                                                </div>
                                                <p className="paragraph">{t(article)}</p>
                                            </div>
                                        )
                                    }

                                    {
                                        brand !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("brand")}</p>
                                                </div>
                                                <p className="paragraph">{t(brand)}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        feature !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("feature")}</p>
                                                </div>
                                                <p className="paragraph">{t(feature)}</p>
                                            </div>
                                        )
                                    }

                                    {
                                        style !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("Style")}</p>
                                                </div>
                                                <p className="paragraph">{t(style)}</p>
                                            </div>
                                        )
                                    }


                                    {
                                        dimensions !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("dimension")}</p>
                                                </div>
                                                <p className="paragraph">{t(dimensions)}</p>
                                            </div>
                                        )
                                    }

                                    {
                                        color !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("color")}</p>
                                                </div>
                                                <p className="paragraph">{t(color)}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        guaranteePeriod !== '' && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("guarantee")}</p>
                                                </div>
                                                <p className="paragraph">{guaranteePeriod}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        condition !== '' && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("condition")}</p>
                                                </div>
                                                <p className="paragraph">{t(condition)}</p>
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
                                <p className="color-secondary my-2">{t("ReferenceID")}: {furnitureID}</p>
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
                    <div className="cards-grid">
                        {
                            similarProducts && similarProducts.length === 0 && (
                                <h5 className='my-4'>{t("noItemsFound")}</h5>
                            )
                        }
                        {
                            similarProducts && similarProducts.slice(0, 3).map((item) => {
                                return (
                                    <FurnitureCard key={item._id} data={item} />
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
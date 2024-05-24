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
import SimilarProperties from '../components/sections/SimilarProperties'
import { Link, useParams } from 'react-router-dom'
import ShareProduct from '../components/utils/ShareProduct'
import Map from '../components/map/Map'
import { FaAngleLeft, FaAngleRight, FaRegCheckSquare } from 'react-icons/fa'
import { TbCar } from 'react-icons/tb'
import { GrStatusInfo } from 'react-icons/gr'
import { IoIosColorPalette } from 'react-icons/io'
import toast from 'react-hot-toast'
import { checkInFavourites } from '../APIs/favourites'
import handleProductFavourite from '../components/utils/manangeFavourite'
import { formatPrice } from '../utils/formatPrice'


export default function ViewFurniture() {
    const [isLoading, setIsLoading] = useState(false)


    const [furnitureID, setFurnitureID] = useState('')
    const [userID, setUserID] = useState('')
    const [showUploadedImages, setShowUploadedImages] = useState(false)
    const [uploadedImages, setUploadedImages] = useState([])
    const [country, setCountry] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [street, setStreet] = useState('')
    const [title, setTitle] = useState('')
    const [budget, setBudget] = useState('')
    const [build, setBuild] = useState('')
    const [application, setApplication] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [condition, setCondition] = useState('')
    const [mapLocation, setMapLocation] = useState(null)
    const [guarantee, setGuarantee] = useState(false)
    const [guaranteePeriod, setGuaranteePeriod] = useState('')
    const [unit, setUnit] = useState('')
    const [model, setModel] = useState('')
    const [weight, setWeight] = useState('')
    const [available, setAvailable] = useState(true)
    const [size, setSize] = useState('')
    const [furnitureType, setFurnitureType] = useState('')
    const [brand, setBrand] = useState('')
    const [color, setColor] = useState('')
    const [dimensions, setDimensions] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [userInfo, setUserInfo] = useState('')


    let params = useParams()
    useEffect(() => {
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
                    setBuild(result.data.build);
                    setApplication(result.data.application);
                    setCategory(result.data.category);
                    setDescription(result.data.description);
                    setCondition(result.data.condition);
                    setMapLocation(result.data.mapLocation);
                    setGuarantee(result.data.guarantee);
                    setGuaranteePeriod(result.data.guaranteePeriod);
                    setUnit(result.data.unit);
                    setModel(result.data.model);
                    setWeight(result.data.weight);
                    setAvailable(result.data.available);
                    setSize(result.data.size);
                    setFurnitureType(result.data.materialType);
                    setBrand(result.data.brand);
                    setColor(result.data.color);
                    setDimensions(result.data.dimensions);
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
                    toast.error(result.message)
                }
            })
            .catch((error) => {
                setIsLoading(false);
                console.error(error);
            });

    }, [])

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
            <Navbar />
            <Breadcrumb title={title} link={t("construction")} />

            <section className="details-section">
                <div className="custom-container">
                    <div className="split">
                        <div className="product-details side-lg">

                            <div className="side images mb-2">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <Link to='../marketplace?market=3'>
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
                                <p className='paragraph mb-1 '>{t("category")} {category}</p>

                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <p className=''>{city}, {country}</p>
                                    {favourite ? (
                                        <FaHeart className="icon favourite-icon filled" onClick={handleFavourite} />
                                    ) : (
                                        <FaRegHeart className="icon favourite-icon" onClick={handleFavourite} />
                                    )}
                                </div>

                                <div className="info-icons mt-2">
                                    <small className='color-secondary '>Date Posted: {createdAt && new Date(createdAt).toDateString()}</small>
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
                                                <small className="color-secondary">{guaranteePeriod}</small>
                                            </div>
                                        )
                                    }
                                    {
                                        condition !== '' && (
                                            <div className="d-flex align-items-center gap-2">
                                                <GrStatusInfo className='color-secondary' />
                                                <small className="color-secondary">{condition}</small>
                                            </div>
                                        )
                                    }

                                    {
                                        color !== '' && (
                                            <div className="d-flex align-items-center gap-2">
                                                <IoIosColorPalette className='color-secondary' />
                                                <small className="color-secondary">{color}</small>
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
                                                    <p className="color-secondary">{t("subcategory")}</p>
                                                </div>

                                                <p className="paragraph">{category}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        model !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("modal")}</p>
                                                </div>
                                                <p className="paragraph">{model}</p>
                                            </div>
                                        )
                                    }

                                    {
                                        furnitureType !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("type")}</p>
                                                </div>
                                                <p className="paragraph">{furnitureType}</p>
                                            </div>
                                        )
                                    }

                                    {
                                        build !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("year")}</p>
                                                </div>
                                                <p className="paragraph">{build}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        unit !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("unit")}</p>
                                                </div>
                                                <p className="paragraph">{unit}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        dimensions !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("dimension")}</p>
                                                </div>
                                                <p className="paragraph">{dimensions} m</p>
                                            </div>
                                        )
                                    }
                                    {
                                        color !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("color")}</p>
                                                </div>
                                                <p className="paragraph">{color}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        weight !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("weight")}</p>
                                                </div>
                                                <p className="paragraph">{parseInt(weight) > 1000 ? `${weight} ton` : `${weight} kg`}</p>

                                            </div>
                                        )
                                    }
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("available")}</p>
                                        </div>
                                        <p className="paragraph">{available ? 'Yes' : 'No'}</p>
                                    </div>
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
                                                <p className="paragraph">{condition}</p>
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


                                <p className="color-secondary my-2">{street}</p>
                                <p className="color-secondary my-2">Reference ID: {furnitureID}</p>
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


            <SimilarProperties />
            <BlogSection />
            <ContactUs supportTitle={t("constructionSupportTitle")} supportDescription={t("constructionSupportDesc")} />
            <Footer />
        </>
    )
}
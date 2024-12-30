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
import { IoChatbubbleSharp } from "react-icons/io5";
import { TbCar } from 'react-icons/tb'
import { GrStatusInfo } from 'react-icons/gr'
import toast from 'react-hot-toast'
import { formatPrice } from '../utils/formatPrice'
import { checkInFavourites } from '../APIs/favourites'
import handleProductFavourite from '../components/utils/manangeFavourite'
import ConstructionCard from '../components/cards/ConstructionCard'
import ChatComponent from '../components/utils/ChatComponent'


import loader from '../assets/images/skyscalp-loader.json'
import Lottie from 'lottie-react'
import { IoIosColorPalette } from 'react-icons/io'

export default function ViewConstruction() {

    const [t] = useTranslation()
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
    const [dimenstions, setDimensions] = useState('')
    const [brand, setBrand] = useState('')
    const [condition, setCondition] = useState('')
    const [color, setColor] = useState('')
    const [quality, setQuality] = useState('')
    const [quantity, setQuantity] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [userInfo, setUserInfo] = useState('')
    const [userID, setUserID] = useState('')
    const [ownerID , setOwnerID] = useState('')

    const [otherMaterial, setOtherMaterial] = useState('');
    const [otherSize, setOtherSize] = useState('');
    const [otherBase, setOtherBase] = useState('');
    const [otherThickness, setOtherThickness] = useState('');
    const [otherFinish, setOtherFinish] = useState('');
    const [otherVoltage, setOtherVoltage] = useState('');
    const [otherType, setOtherType] = useState('');
    const [otherColor, setOtherColor] = useState('');

    const [material, setMaterial] = useState('')
    const [base, setBase] = useState('')
    const [thickness, setThickness] = useState('')
    const [finish, setFinish] = useState('')
    const [voltage, setVoltage] = useState('')
    const [type, setType] = useState('')
    const [isLoading, setIsLoading] = useState(false)


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
                console.log(result)
                if (result.status) {
                    setConstructionID(result.data._id);
                    setUserID(result.data.userID);
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
                    setUploadedImages(result.data.images)
                    setCreatedAt(result.data.createdAt)
                    setUserInfo(result.data.user)

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


                    // check if the product is in favourites 
                    const user = JSON.parse(localStorage.getItem("user"))
                    if (user) {
                        setOwnerID(user.userID)
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

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/getProductsByFilters?materialGroup=${'construction'}`, requestOptions)
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
        handleProductFavourite(favourite, setFavourite, constructionID, true)
    }

    const [isChatVisible, setIsChatVisible] = useState(false);

    const toggleChat = () => {
        setIsChatVisible(!isChatVisible);
    };
    return (
        <>
            <div className={`lottie-wrapper ${isLoading ? 'show' : ''}`}>
                <Lottie className='loader' animationData={loader} loop={true} />
            </div>
            <Navbar />
            <Breadcrumb title={title} link={t("material")} />

            <section className="details-section">
                <div className="custom-container">
                    <div className="split">
                        <div className="product-details side-lg">

                            <div className="side images mb-2">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <Link to='../marketplace?market=2'>
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
                                    <h5 className="color-primary fw-bolder">MAD {formatPrice(budget)} / {unit}</h5>
                                </div>

                                <h4 className="fw-bolder mb-2">{title}</h4>
                                <p className='paragraph mb-1 '>{t("quantity")}: {quantity} / {unit}</p>
                                <p className='paragraph mb-1 '>{t("application")} {t(application)}</p>
                                <p className='paragraph mb-1 '>{t("material")} {t(category)}</p>

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
                                    {
                                        guaranteePeriod !== '' && (
                                            <div className="d-flex align-items-center gap-2">
                                                <FaRegCheckSquare className='color-secondary' />
                                                <small className="color-secondary">{t("guarantee")}</small>
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
                                        application !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("application")}</p>
                                                </div>
                                                <p className="paragraph">{t(application)}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        category !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("Construction Material")}</p>
                                                </div>
                                                <p className="paragraph">{t(category)}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        type !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("type")}</p>
                                                </div>
                                                <p className="paragraph">
                                                    {
                                                        (type.toLowerCase() === "other" || type.toLowerCase() === "others") && otherType
                                                            ? t(otherType)
                                                            : t(type)
                                                    }
                                                </p>

                                            </div>
                                        )
                                    }
                                    {
                                        quantity !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("quantity")}</p>
                                                </div>
                                                <p className="paragraph">{quantity}/{unit}</p>
                                            </div>
                                        )
                                    }


                                    {
                                        size !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("size")}</p>
                                                </div>
                                                <p className="paragraph">
                                                    {
                                                        (size.toLowerCase() === "other" || size.toLowerCase() === "others") && otherSize
                                                            ? t(otherSize)
                                                            : t(size)
                                                    }
                                                </p>
                                            </div>
                                        )
                                    }

                                    {
                                        material !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("material")}</p>
                                                </div>
                                                <p className="paragraph">
                                                    {
                                                        (material.toLowerCase() === "other" || material.toLowerCase() === "others") && otherMaterial
                                                            ? t(otherMaterial)
                                                            : t(material)
                                                    }
                                                </p>
                                            </div>
                                        )
                                    }
                                    {
                                        base !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("base")}</p>
                                                </div>
                                                <p className="paragraph">
                                                    {
                                                        (base.toLowerCase() === "other" || base.toLowerCase() === "others") && otherSize
                                                            ? t(otherSize)
                                                            : t(base)
                                                    }
                                                </p>
                                            </div>
                                        )
                                    }
                                    {
                                        thickness !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("thickness")}</p>
                                                </div>
                                                <p className="paragraph">
                                                    {
                                                        (thickness.toLowerCase() === "other" || thickness.toLowerCase() === "others") && otherThickness
                                                            ? t(otherThickness)
                                                            : t(thickness)
                                                    }
                                                </p>
                                            </div>
                                        )
                                    }
                                    {
                                        finish !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("finish")}</p>
                                                </div>
                                                <p className="paragraph">
                                                    {
                                                        (finish.toLowerCase() === "other" || finish.toLowerCase() === "others") && otherFinish
                                                            ? t(otherFinish)
                                                            : t(finish)
                                                    }
                                                </p>
                                            </div>
                                        )
                                    }
                                    {
                                        material !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("material")}</p>
                                                </div>
                                                <p className="paragraph">
                                                    {
                                                        (material.toLowerCase() === "other" || material.toLowerCase() === "others") && otherMaterial
                                                            ? t(otherMaterial)
                                                            : t(material)
                                                    }
                                                </p>
                                            </div>
                                        )
                                    }
                                    {
                                        voltage !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("voltage")}</p>
                                                </div>
                                                <p className="paragraph">
                                                    {
                                                        (voltage.toLowerCase() === "other" || voltage.toLowerCase() === "others") && otherVoltage
                                                            ? t(otherVoltage)
                                                            : t(voltage)
                                                    }
                                                </p>
                                            </div>
                                        )
                                    }

                                    {
                                        color !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("color")}</p>
                                                </div>
                                                <p className="paragraph">
                                                    {
                                                        (color.toLowerCase() === "other" || color.toLowerCase() === "others") && otherColor
                                                            ? t(otherColor)
                                                            : t(color)
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
                                <p className="color-secondary my-2">{t("ReferenceID")}: {constructionID}</p>
                            </div>

                        </div>


                        <div className="seller-details side-sm">
                            {/* <div className="side mb-2">
                                <div className="seller-info mb-3">
                                    <div className="image">
                                        <img src={userInfo && userInfo.profileImage} alt="" />
                                    </div>
                                    <div className="content">
                                        <h5 className="fw-bolder">{userInfo && userInfo.username}</h5>
                                        <p className="color-secondary" style={{ fontSize: "11px" }}>Test.owner@skyscalp.com</p>
                                    </div>
                                </div>
                                <button className="outline-btn mb-2 w-100" style={{ fontSize: "13px" }}><FaPhone className='me-1' />+212625818117</button>
                                <button className="outline-btn mb-2 w-100 d-flex justify-content-center align-items-center" style={{ fontSize: "13px" }}>
                                    <FaEnvelope className='me-1' />Test.owner@skyscalp.com</button>

                            </div> */}
                                        {/* <p className="color-secondary">{userInfo && userInfo.email.slice(0, 20)}{userInfo.email.length > 20 ? '...': ''}</p> */}
                                        {/* <p className="color-secondary" style={{ fontSize: "11px" }}>{userInfo && userInfo.email}</p> */}
                                {/* <button className="outline-btn mb-2 w-100" style={{ fontSize: "13px" }}><FaPhone className='me-1' />{userInfo && userInfo.phone}</button> */}
                                    {/* <FaEnvelope className='me-1' />{userInfo && userInfo.email}</button> */}
                            {/* {ownerID !== userID ? <ChatComponent collectionRef={"materials"} /> : null} */}
                            {ownerID !== userID ? <div className='fixed-bottom-left-div'><IoChatbubbleSharp className='chat-icon-style' onClick={toggleChat}/> <ChatComponent isVisible={isChatVisible} isFixed={true}/> </div>: null}

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
                                    <ConstructionCard key={item._id} data={item} />
                                )
                            })
                        }
                    </div>
                </div>
            </section>
            <BlogSection />
            {/* <ContactUs supportTitle={t("homeSupportTitle")} supportDescription={t("homeSupportDescription")} contactEmail={"information.marketplace@skyscalp.com"} contactPhone={"+33771759956"} /> */}
            <Footer />
        </>
    )
}
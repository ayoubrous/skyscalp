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
import toast from 'react-hot-toast'
import { formatPrice } from '../utils/formatPrice'
import { checkInFavourites } from '../APIs/favourites'
import handleProductFavourite from '../components/utils/manangeFavourite'
import ConstructionCard from '../components/cards/ConstructionCard'


import loader from '../assets/images/skyscalp-loader.json'
import Lottie from 'lottie-react'

export default function ViewAgent() {

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
            selectedStreets: []
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

    let demoImages = [
        'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20201203211256/8-Important-Business-Skills-For-an-IT-Professional.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTvliJyxqzUC4vp475_zxMo7oI6ovRou42X9NztLui2s7N7GOfnvZbnlIUUpTWwzeN_eI&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVjkcPZvBT4KW0h6s3nGrUWT0CRIEYp33GBg&s',
    ]
    return (
        <>
            <div className={`lottie-wrapper ${isLoading ? 'show' : ''}`}>
                <Lottie className='loader' animationData={loader} loop={true} />
            </div>
            <Navbar />
            {/* <Breadcrumb title={} link={t("agent")} /> */}
            <Breadcrumb title="I will provide best legal services" link={t("agent")} />

            <section className="details-section">
                <div className="custom-container">
                    <div className="split">
                        <div className="product-details side-lg">

                            <div className="side images mb-2">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <Link to='../marketplace?market=2'>
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
                                    <img src={demoImages[mainImageIndex]} alt="" />

                                </div>

                                <div className="more-images">
                                    {/* <OwlCarousel id="" className="owl-carousel owl-theme" {...options}> */}
                                    {demoImages.map((image, i) => (
                                        <div key={i} className={`image ${mainImageIndex === i ? 'active' : ''}`} onClick={() => handleImageClick(i)}>
                                            <img src={image} alt="" />
                                        </div>
                                    ))}


                                    {/* </OwlCarousel> */}
                                </div>
                            </div>

                            <div className="side basic-information mb-2">
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    {/* <h5 className="color-primary fw-bolder">MAD {formatPrice(budget)}</h5> */}
                                    <h5 className="color-primary fw-bolder">MAD 120</h5>
                                </div>

                                {/* <h4 className="fw-bolder mb-2">{title}</h4> */}
                                <h4 className="fw-bolder mb-2">I will provide best legal services</h4>
                                {/* <p className='paragraph mb-1 '>{t("category")} {category}</p> */}
                                <p className='paragraph mb-1 '>{t("category")} Legal</p>
                                <p className=''>Experience 12 years</p>
                                <p className=''>Fee Structure: Per Month</p>

                                <div className="d-flex align-items-center justify-content-between mb-2 mt-2">
                                    {/* <p className=''>{city}, {country}</p> */}
                                    <div>

                                        <p className=''>Tangier, Morocco</p>

                                    </div>
                                    {favourite ? (
                                        <FaHeart className="icon favourite-icon filled" onClick={handleFavourite} />
                                    ) : (
                                        <FaRegHeart className="icon favourite-icon" onClick={handleFavourite} />
                                    )}
                                </div>

                                <div className="info-icons mt-2">
                                    {/* <small className='color-secondary '>Date Posted: {createdAt && new Date(createdAt).toDateString()}</small> */}
                                    <small className='color-secondary '>Date Posted: 12 May 2023</small>
                                </div>
                            </div>

                            <div className="side description mb-2">
                                <h4 className="fw-bolder mb-3">{t("description")}</h4>
                                {/* <div className="paragraph mb-2" dangerouslySetInnerHTML={{ __html: description }} /> */}
                                <div className="paragraph mb-2">
                                    If you want to display only those properties which have the featured property set to true, you can filter the properties array before mapping through it. Here's how you can modify the code: If you want to display only those properties which have the featured property set to true, you can filter the properties array before mapping through it. Here's how you can modify the code: If you want to display only those properties which have the featured property set to true, you can filter the properties array before mapping through it. Here's how you can modify the code:
                                </div>
                            </div>

                            <div className="side more-details mb-2">
                                <h4 className="fw-bolder mb-4">{t("moreDetails")}</h4>

                                <div className="features-grid">
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("category")}</p>
                                        </div>
                                        <p className="paragraph">Legal</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("subcategory")}</p>
                                        </div>
                                        <p className="paragraph">Lawyer subcat</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">Experience</p>
                                        </div>
                                        <p className="paragraph">12 Years</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">Fee Structure</p>
                                        </div>
                                        <p className="paragraph">Per Month</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">Office Address</p>
                                        </div>
                                        <p className="paragraph">Street 3 abc road tangier</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">Specialization</p>
                                        </div>
                                        <p className="paragraph">Lawyer in court</p>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="side more-details mb-2">
                                <h4 className="fw-bolder mb-4">{t("moreDetails")}</h4>

                                <div className="features-grid">
                                    {
                                        category !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("category")}</p>
                                                </div>
                                                <p className="paragraph">{category}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        quality !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("quality")}</p>
                                                </div>
                                                <p className="paragraph">{quality}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        quantity !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("quantity")}</p>
                                                </div>
                                                <p className="paragraph">{quantity} kg</p>
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
                                        size !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("size")}</p>
                                                </div>
                                                <p className="paragraph">{size} m</p>
                                            </div>
                                        )
                                    }

                                    {
                                        dimenstions !== "" && (
                                            <div className="feature">
                                                <div className="label">
                                                    <p className="color-secondary">{t("dimension")}</p>
                                                </div>
                                                <p className="paragraph">{dimenstions}</p>
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
                                </div>
                            </div> */}

                            {/* <div className="side map mb-2">
                                <h3 className="fw-bolder mb-4">{t("viewOnMap")}</h3>
                                {!isLoading && mapLocation && (
                                    <Map location={mapLocation} />
                                )}

                                <p className="color-secondary my-2">{street}</p>
                                <p className="color-secondary my-2">Reference ID: {constructionID}</p>
                            </div> */}

                        </div>


                        <div className="seller-details side-sm">
                            <div className="side mb-2">
                                <div className="seller-info mb-3">
                                    <div className="image">
                                        <img src={userInfo && userInfo.profileImage} alt="" />
                                    </div>
                                    <div className="content">
                                        {/* <h5 className="fw-bolder">{userInfo && userInfo.username}</h5> */}
                                        <h5 className="fw-bolder">{"erhan"}</h5>
                                        {/* <p className="color-secondary">{userInfo && userInfo.email.slice(0, 20)}{userInfo.email.length > 20 ? '...': ''}</p> */}
                                        {/* <p className="color-secondary" style={{ fontSize: "11px" }}>{userInfo && userInfo.email}</p> */}
                                        <p className="color-secondary" style={{ fontSize: "11px" }}>{"Email@gmail.com"}</p>
                                    </div>
                                </div>
                                {/* <button className="outline-btn mb-2 w-100" style={{ fontSize: "13px" }}><FaPhone className='me-1' />{userInfo && userInfo.phone}</button> */}
                                <button className="outline-btn mb-2 w-100" style={{ fontSize: "13px" }}><FaPhone className='me-1' />{"+233 292388"}</button>
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
                            similarProducts && similarProducts.length === 0 && (
                                <h5 className='my-4'>No Similar Products Found</h5>
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
            
            <ContactUs
                supportTitle={"Communicate directly with your advisor for getting Agents services"}
                supportDescription={"Communicate directly with your advisor for getting Agents services"}
            />
            <Footer />
        </>
    )
}
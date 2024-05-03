import React, { useState } from 'react'
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
import { Link } from 'react-router-dom'
import ShareProduct from '../components/utils/ShareProduct'
import Map from '../components/map/Map'
import { FaAngleLeft, FaAngleRight, FaRegCheckSquare } from 'react-icons/fa'
import { TbCar } from 'react-icons/tb'
import { GrStatusInfo } from 'react-icons/gr'
import { IoIosColorPalette } from 'react-icons/io'


export default function ViewFurniture() {

    const propertyImages = [
        "https://homefactree.com/wp-content/uploads/2021/07/CADIZ-WARDROBE-HF.jpg",
        "https://img.lovepik.com/photo/48012/2630.jpg_wh860.jpg",

    ];
    const [t] = useTranslation()
    const [favourite, setFavourite] = useState(false)
    const [mainImage, setMainImage] = useState(propertyImages[0]);
    const [mainImageIndex, setMainImageIndex] = useState(0);


    const handleImageClick = (image) => {
        setMainImage(image);
    };


    const handlePreviousImage = () => {
        const newIndex = (mainImageIndex - 1 + propertyImages.length) % propertyImages.length;
        setMainImageIndex(newIndex);
    };

    const handleNextImage = () => {
        const newIndex = (mainImageIndex + 1) % propertyImages.length;
        setMainImageIndex(newIndex);
    };
    return (
        <>
            <Navbar />
            <Breadcrumb title="Best Cupboard for hanging purpose" link={t("construction")} />

            <section className="details-section">
                <div className="custom-container">
                    <div className="split">
                        <div className="product-details side-lg">

                            <div className="side images mb-2">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <Link to='../construction'>
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
                                    <img src={propertyImages[mainImageIndex]} alt="" />

                                </div>

                                <div className="more-images">
                                    {/* <OwlCarousel id="" className="owl-carousel owl-theme" {...options}> */}
                                    {propertyImages.map((image, i) => (
                                        <div key={i} className={`image ${mainImageIndex === i ? 'active' : ''}`} onClick={() => handleImageClick(i)}>
                                            <img src={image} alt="" />
                                        </div>
                                    ))}


                                    {/* </OwlCarousel> */}
                                </div>
                            </div>

                            <div className="side basic-information mb-2">
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <h5 className="color-primary fw-bolder">MAD 23,000</h5>
                                </div>

                                <h4 className="fw-bolder mb-2">Best cupboard for hanging purpose</h4>
                                <p className='paragraph mb-1 '>{t("category")} Cupboards</p>

                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <p className=''>Caroline, USA</p>
                                    {
                                        favourite ? (<FaHeart className='icon favourite-icon filled' onClick={() => { setFavourite(!favourite) }} />) : (<FaRegHeart className='icon favourite-icon' onClick={() => { setFavourite(!favourite) }} />)
                                    }
                                </div>

                                <div className="info-icons mt-2">
                                    <small className='color-secondary '>Date Posted: 12 March 2024</small>
                                </div>
                                <hr />

                                <div className="info-icons mt-2">
                                    <div className="d-flex align-items-center gap-2">
                                        <small className="color-secondary">{t("year")}:</small>
                                        <small className="color-secondary">2021</small>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <FaRegCheckSquare className='color-secondary' />
                                        <small className="color-secondary">2 Years</small>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <GrStatusInfo className='color-secondary' />
                                        <small className="color-secondary">New</small>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <IoIosColorPalette className='color-secondary' />
                                        <small className="color-secondary">Brown</small>
                                    </div>
                                </div>
                            </div>

                            <div className="side description mb-2">
                                <h4 className="fw-bolder mb-3">{t("description")}</h4>
                                <p className="paragraph color-secondary mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora autem ratione nobis ipsa deleniti amet delectus obcaecati qui nihil sed at, mollitia minus recusandae soluta? Nesciunt a fuga veritatis cumque quidem nulla deleniti.</p>
                                <p className="paragraph color-secondary mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora autem ratione nobis ipsa deleniti amet delectus obcaecati qui nihil sed at, mollitia minus recusandae soluta? Nesciunt a fuga veritatis cumque quidem nulla deleniti.</p>
                                <p className="paragraph color-secondary mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora autem ratione nobis ipsa deleniti amet delectus obcaecati qui nihil sed at, mollitia minus recusandae soluta? Nesciunt a fuga veritatis cumque quidem nulla deleniti.</p>

                            </div>

                            <div className="side more-details mb-2">
                                <h4 className="fw-bolder mb-4">{t("moreDetails")}</h4>

                                <div className="features-grid">
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("application")}</p>
                                        </div>
                                        <p className="paragraph">Application</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("category")}</p>
                                        </div>
                                        <p className="paragraph">Cubboards</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("brand")}</p>
                                        </div>
                                        <p className="paragraph">Brand</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("modal")}</p>
                                        </div>
                                        <p className="paragraph">Modal</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">Furniture Type</p>
                                        </div>
                                        <p className="paragraph">Electric</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("year")}</p>
                                        </div>
                                        <p className="paragraph">1 to 3 years</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("unit")}</p>
                                        </div>
                                        <p className="paragraph">Per Item</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("dimension")}</p>
                                        </div>
                                        <p className="paragraph">12 x 23</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("color")}</p>
                                        </div>
                                        <p className="paragraph">Brown</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("available")}</p>
                                        </div>
                                        <p className="paragraph">Yes</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("garantee")}</p>
                                        </div>
                                        <p className="paragraph">2 Years</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("transaction")}</p>
                                        </div>
                                        <p className="paragraph">Rent</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("condition")}</p>
                                        </div>
                                        <p className="paragraph">New</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("weight")}</p>
                                        </div>
                                        <p className="paragraph">20 kg</p>
                                    </div>
                                </div>
                            </div>

                            <div className="side map mb-2">
                                <h3 className="fw-bolder mb-4">{t("viewOnMap")}</h3>
                                <Map />

                                <p className="color-secondary my-2">5232 North Carolina Ave. 21BC</p>
                                <p className="color-secondary my-2">Reference ID: 23828830</p>
                            </div>

                        </div>


                        <div className="seller-details side-sm">
                            <div className="side mb-2">
                                <div className="seller-info mb-3">
                                    <div className="image">
                                        <img src={sellerImage} alt="" />
                                    </div>
                                    <div className="content">
                                        <h5 className="fw-bolder">Alisa Perry</h5>
                                        <p className="color-secondary">Profession</p>
                                    </div>
                                </div>
                                <button className="outline-btn mb-2 w-100"><FaPhone className='me-1' /> +33 44 55 332</button>
                                <button className="outline-btn mb-2 w-100"><FaEnvelope className='me-1' /> account@gmail.com</button>
                            </div>

                            <MessageOwner />
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
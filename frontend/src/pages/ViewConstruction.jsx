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


export default function ViewConstruction() {

    const propertyImages = [
        "https://media.istockphoto.com/id/1165384568/photo/europe-modern-complex-of-residential-buildings.jpg?s=612x612&w=0&k=20&c=iW4NBiMPKEuvaA7h8wIsPHikhS64eR-5EVPfjQ9GPOA=",
        "https://img.lovepik.com/photo/48012/2630.jpg_wh860.jpg",
        "https://assets.architecturaldesigns.com/plan_assets/3199/original/3199D_front_1557350260.jpg"

    ];
    const [t] = useTranslation()
    const [favourite, setFavourite] = useState(false)
    const [mainImage, setMainImage] = useState(propertyImages[0]);


    const handleImageClick = (image) => {
        setMainImage(image);
    };

    return (
        <>
            <Navbar />
            <Breadcrumb title="Beautiful Modern House with Stunning Views" link={t("construction")} />

            <section className="details-section">
                <div className="custom-container">
                    <div className="split">
                        <div className="product-details side-lg">

                            <div className="side images mb-2">
                                <div className="main-image">
                                    <img src={mainImage} alt="" />
                                </div>

                                <div className="more-images">
                                    {/* <OwlCarousel id="" className="owl-carousel owl-theme" {...options}> */}
                                    {propertyImages.map((image, i) => (
                                        <div key={i} className={`image ${mainImage === image ? 'active' : ''}`} onClick={() => handleImageClick(image)}>
                                            <img src={image} alt="" />
                                        </div>
                                    ))}


                                    {/* </OwlCarousel> */}
                                </div>
                            </div>

                            <div className="side basic-information mb-2">
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <h5 className="color-primary fw-bolder">MAD 23,000</h5>
                                    <div className="custom-badge">Rent</div>
                                </div>

                                <h4 className="fw-bolder mb-2">Beautiful Modern House with Stunning Views</h4>
                                <p className='paragraph mb-1 '>{t("category")} Cement</p>

                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <p className=''>Caroline, USA</p>
                                    {
                                        favourite ? (<FaHeart className='icon favourite-icon filled' onClick={() => { setFavourite(!favourite) }} />) : (<FaRegHeart className='icon favourite-icon' onClick={() => { setFavourite(!favourite) }} />)
                                    }
                                </div>

                                <hr />

                                <div className="info-icons mt-2">
                                    <small className='color-secondary'>Date Posted: 12 March 2024</small>
                                </div>
                            </div>

                            <div className="side description mb-2">
                                <h4 className="fw-bolder mb-3">{t("description")}</h4>
                                <p className="paragraph color-secondary mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora autem ratione nobis ipsa deleniti amet delectus obcaecati qui nihil sed at, mollitia minus recusandae soluta? Nesciunt a fuga veritatis cumque quidem nulla deleniti.</p>
                                <p className="paragraph color-secondary mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora autem ratione nobis ipsa deleniti amet delectus obcaecati qui nihil sed at, mollitia minus recusandae soluta? Nesciunt a fuga veritatis cumque quidem nulla deleniti.</p>
                                <p className="paragraph color-secondary mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora autem ratione nobis ipsa deleniti amet delectus obcaecati qui nihil sed at, mollitia minus recusandae soluta? Nesciunt a fuga veritatis cumque quidem nulla deleniti.</p>

                            </div>

                            <div className="side more-details">
                                <h4 className="fw-bolder mb-4">{t("moreDetails")}</h4>

                                <div className="features-grid">
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("category")}</p>
                                        </div>
                                        <p className="paragraph">Cement</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("quality")}</p>
                                        </div>
                                        <p className="paragraph">High</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("quantity")}</p>
                                        </div>
                                        <p className="paragraph">40 kg</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("unit")}</p>
                                        </div>
                                        <p className="paragraph">Per Bag</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("size")}</p>
                                        </div>
                                        <p className="paragraph">12 kg</p>
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
                                        <p className="paragraph">Grey</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("available")}</p>
                                        </div>
                                        <p className="paragraph">Yes</p>
                                    </div>
                                </div>
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
            <ContactUs supportTitle={t("homeSupportTitle")} supportDescription={t("homeSupportDescription")} />
            <Footer />
        </>
    )
}
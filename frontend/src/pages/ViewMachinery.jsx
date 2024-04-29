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
import { FaAngleLeft, FaAngleRight, FaRegArrowAltCircleRight, FaRegCheckSquare, FaSwimmingPool } from 'react-icons/fa'
import { TbBed, TbCar } from 'react-icons/tb'
import { GrStatusInfo } from "react-icons/gr";



import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import SimilarProperties from '../components/sections/SimilarProperties'
import ShareProduct from '../components/utils/ShareProduct'
import { Link } from 'react-router-dom'
import Map from '../components/map/Map'

export default function ViewMachinery() {

    const propertyImages = [
        "https://media.istockphoto.com/id/1165384568/photo/europe-modern-complex-of-residential-buildings.jpg?s=612x612&w=0&k=20&c=iW4NBiMPKEuvaA7h8wIsPHikhS64eR-5EVPfjQ9GPOA=",
        "https://img.lovepik.com/photo/48012/2630.jpg_wh860.jpg",
        "https://assets.architecturaldesigns.com/plan_assets/3199/original/3199D_front_1557350260.jpg"

    ];
    const [t] = useTranslation()
    const [favourite, setFavourite] = useState(false)
    const [mainImage, setMainImage] = useState(propertyImages[0]);
    const [mainImageIndex, setMainImageIndex] = useState(0);

    const options = {
        loop: true,
        center: false,
        items: 1,
        margin: 10,
        autoplay: false,
        dots: true,
        autoplayTimeout: 8500,
        smartSpeed: 450,
        nav: true,
        responsive: {
            0: {
                items: 3
            },
            700: {
                items: 4
            },
            1000: {
                items: 4
            }
        }
    };

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
            <Breadcrumb title="Beautiful Modern House with Stunning Views" link={t("machinery")} />

            <section className="details-section">
                <div className="custom-container">
                    <div className="split">
                        <div className="product-details side-lg">

                            <div className="side images mb-2">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <Link to='../machinery'>
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
                                    <div className="custom-badge">Rent</div>
                                </div>

                                <h4 className="fw-bolder mb-2">Beautiful Modern House with Stunning Views</h4>
                                <p className='paragraph mb-1 '>{t("category")} Excovators</p>

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
                                            <p className="color-secondary">{t("category")}</p>
                                        </div>
                                        <p className="paragraph">Excavators</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("modal")}</p>
                                        </div>
                                        <p className="paragraph">2024</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("application")}</p>
                                        </div>
                                        <p className="paragraph">Working</p>
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
                                        <p className="paragraph">12 Ton</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("power")}</p>
                                        </div>
                                        <p className="paragraph">12 hp</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("fuelType")}</p>
                                        </div>
                                        <p className="paragraph">Diesel</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("available")}</p>
                                        </div>
                                        <p className="paragraph">Yes</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("type")}</p>
                                        </div>
                                        <p className="paragraph">Rent</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("sizeOfMachine")}</p>
                                        </div>
                                        <p className="paragraph">20x10 feet</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("machineType")}</p>
                                        </div>
                                        <p className="paragraph">Electric</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("brand")}</p>
                                        </div>
                                        <p className="paragraph">Caterpillar</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("build")}</p>
                                        </div>
                                        <p className="paragraph">2022</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("certification")}</p>
                                        </div>
                                        <p className="paragraph">ISO certified</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("guarantee")}</p>
                                        </div>
                                        <p className="paragraph">Yes</p>
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
            <ContactUs supportTitle={t("machinerySupportTitle")} supportDescription={t("machinerySupportDescription")} />
            <Footer />
        </>
    )
}
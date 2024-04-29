import React, { useState } from 'react'
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


import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Map from '../components/map/Map'
import Properties from '../components/sections/Properties'
import SimilarProperties from '../components/sections/SimilarProperties'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import ShareProduct from '../components/utils/ShareProduct'

export default function ViewProperty() {

    const propertyImages = [
        "https://media.istockphoto.com/id/1165384568/photo/europe-modern-complex-of-residential-buildings.jpg?s=612x612&w=0&k=20&c=iW4NBiMPKEuvaA7h8wIsPHikhS64eR-5EVPfjQ9GPOA=",
        "https://img.lovepik.com/photo/48012/2630.jpg_wh860.jpg",
        "https://assets.architecturaldesigns.com/plan_assets/3199/original/3199D_front_1557350260.jpg"

    ];
    const [t] = useTranslation()
    const [favourite, setFavourite] = useState(false)

    const [mainImageIndex, setMainImageIndex] = useState(0);

    const handleImageClick = (index) => {
        setMainImageIndex(index);
    };

    const handlePreviousImage = () => {
        const newIndex = (mainImageIndex - 1 + propertyImages.length) % propertyImages.length;
        setMainImageIndex(newIndex);
    };

    const handleNextImage = () => {
        const newIndex = (mainImageIndex + 1) % propertyImages.length;
        setMainImageIndex(newIndex);
    };

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



    // const handleImageClick = (image) => {
    //     setMainImage(image);
    // };

    return (
        <>
            <Navbar />
            <Breadcrumb title="Beautiful Modern House with Stunning Views" link={t("property")} />

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
                                    <img src={propertyImages[mainImageIndex]} alt="" />
                                </div>
                                <div className="more-images">
                                    {propertyImages.map((image, i) => (
                                        <div key={i} className={`image ${mainImageIndex === i ? 'active' : ''}`} onClick={() => handleImageClick(i)}>
                                            <img src={image} alt="" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="side basic-information mb-2">
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <h5 className="color-primary fw-bolder">MAD 23,000</h5>
                                    <div className="custom-badge">Rent</div>
                                </div>

                                <h4 className="fw-bolder mb-2">Beautiful Modern House with Stunning Views</h4>
                                <p className='paragraph mb-0 '>Appartment, (200 sq ft)</p>
                                <p className='paragraph color-secondary my-2 '>5232 North Carolina Ave. 21BC</p>

                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <p className=''>Caroline, USA</p>
                                    {
                                        favourite ? (<FaHeart className='icon favourite-icon filled' onClick={() => { setFavourite(!favourite) }} />) : (<FaRegHeart className='icon favourite-icon' onClick={() => { setFavourite(!favourite) }} />)
                                    }
                                </div>

                                <hr />

                                <div className="info-icons mt-2">
                                    <div className="d-flex align-items-center gap-2">
                                        <TbBed className='color-secondary' />
                                        <small className="color-secondary">2 {t("bedrooms")}</small>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <LuBath className='color-secondary' />
                                        <small className="color-secondary">2 {t("baths")}</small>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <BsBuildings className='color-secondary' />
                                        <small className="color-secondary">2 sq ft</small>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <PiFlowerTulip className='color-secondary' />
                                        <small className="color-secondary">2 {t("garden")}</small>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <TbCar className='color-secondary' />
                                        <small className="color-secondary">2 {t("garage")}</small>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <MdOutlinePool className='color-secondary' />
                                        <small className="color-secondary">2 {t("pool")}</small>
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
                                        <p className="paragraph">Apartment</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("sizeArea")}</p>
                                        </div>
                                        <p className="paragraph">200 sq ft</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("bedrooms")}</p>
                                        </div>
                                        <p className="paragraph">4</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("baths")}</p>
                                        </div>
                                        <p className="paragraph">2</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("garden")}</p>
                                        </div>
                                        <p className="paragraph">1</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("pool")}</p>
                                        </div>
                                        <p className="paragraph">1</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("garage")}</p>
                                        </div>
                                        <p className="paragraph">2</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("type")}</p>
                                        </div>
                                        <p className="paragraph">Sale</p>
                                    </div>
                                    <div className="feature">
                                        <div className="label">
                                            <p className="color-secondary">{t("buildYear")}</p>
                                        </div>
                                        <p className="paragraph">2022</p>
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
            <ContactUs supportTitle={t("propertySupportTitle")} supportDescription={t("propertySupportDescription")} />
            <Footer />
        </>
    )
}
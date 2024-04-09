import React, { useState } from 'react'
import { TbBed } from 'react-icons/tb'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { LuBath } from "react-icons/lu";
import { BsBuildings } from "react-icons/bs";
import { useTranslation } from 'react-i18next';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from 'react-router-dom';



const PropertyCard = ({ propertyData }) => {
    const { id, imgUrl, title, description, category, type, price, streetAddress, city, bedrooms, baths, area, sellerName, sellerImg, datePosted } = propertyData;

    const [t] = useTranslation();
    const [favourite, setFavourite] = useState(false)

    const options = {
        loop: true,
        center: true,
        items: 1,
        margin: 0,
        autoplay: false,
        dots: false,
        autoplayTimeout: 8500,
        smartSpeed: 450,
        nav: true,
    };

    return (
        <div className="custom-card property-card">
            <div className="image">
                <OwlCarousel id="" className="owl-carousel owl-theme" {...options}>
                    {
                        imgUrl.map(image => {
                            return (
                                <img src={image} alt="" />
                            )
                        })
                    }
                </OwlCarousel>
                <div className="custom-badge">{type}</div>
                <div className="icon-area">
                    {
                        favourite ? (<FaHeart className='icon favourite-icon filled' onClick={() => { setFavourite(!favourite) }} />) : (<FaRegHeart className='icon favourite-icon' onClick={() => { setFavourite(!favourite) }} />)
                    }

                </div>
            </div>

            <Link to='../property/123'>
                <div className="content">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="card-title">{title && (title.slice(0, 18)) + (title.length > 18 ? "..." : "")}</h1>
                        <h5 className='color-primary'>MAD {price}</h5>
                    </div>
                    <p className='paragraph mb-0 '>{category}, ({area} sq ft)</p>
                    <p className=''>{city}</p>

                    {description && <p className='mb-3 mt-1 color-secondary'>{description.slice(0, 120) + (description.length > 120 ? "..." : "")}</p>}


                    <div className="d-flex justify-content-between align-items-center property-features mb-2">
                        <div className='d-flex align-items-center'>
                            <TbBed className='feature-icon' />
                            <p className="feature-text">{bedrooms} {t("bedrooms")}</p>
                        </div>
                        <div className='d-flex align-items-center'>
                            <LuBath className='feature-icon' />
                            <p className="feature-text">{baths} {t("baths")}</p>
                        </div>
                        <div className='d-flex align-items-center'>
                            <BsBuildings className='feature-icon' />
                            <p className="feature-text">{area} {t("areaUnit")}</p>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center property-features">
                        <div className='d-flex align-items-center'>
                            <p className="feature-text">{t("datePosted")}: {datePosted}</p>
                        </div>
                    </div>
                    <hr className="line-break my-2" />
                    <div className="seller-info">
                        <div className="seller-img">

                        </div>
                        <p>{sellerName}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}


export default PropertyCard
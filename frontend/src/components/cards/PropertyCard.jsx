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



const PropertyCard = ({ id, imgUrl, title, type, price, streetAddress, city, bedrooms, baths, area }) => {
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
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    };

    return (
        <div className="custom-card property-card">

            <OwlCarousel id="customer-testimonoals" className="owl-carousel owl-theme" {...options}>
                {
                    imgUrl.map(image => {
                        return (
                            <img src={image} alt="" />
                        )
                    })
                }
            </OwlCarousel>

            <div className="content">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className='color-primary'>MAD {price}</h5>
                    <div className="custom-badge">{type}</div>
                </div>

                <h3 className="card-title">{title && (title.slice(0, 27)) + (title.length > 37 ? "..." : "")}</h3>
                <p className="street-address">{streetAddress}</p>

                <div className="d-flex justify-content-between align-items-center">
                    <p className='city'>{city}</p>
                    <div className="icon-area">
                        {
                            favourite ? (<FaHeart className='icon favourite-icon filled' onClick={() => { setFavourite(!favourite) }} />) : (<FaRegHeart className='icon favourite-icon' onClick={() => { setFavourite(!favourite) }} />)
                        }

                    </div>
                </div>
                <hr className="line-break my-2" />
                <div className="d-flex justify-content-between align-items-center property-features">
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
            </div>
        </div>
    )
}


export default PropertyCard
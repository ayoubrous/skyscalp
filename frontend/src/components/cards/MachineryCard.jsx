import React, { useState } from 'react'
import { TbBed } from 'react-icons/tb'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { LuBath } from "react-icons/lu";
import { BsBuildings } from "react-icons/bs";
import { useTranslation } from 'react-i18next';
import { FiCalendar } from "react-icons/fi";

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';



import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


const MachineryCard = ({ id, imgUrl, title, description, type, price, modal, condition, category, datePosted, city, sellerName }) => {
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
        <div className="custom-card machinery-card">
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
            <div className="content">
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className="card-title">{title && (title.slice(0, 17)) + (title.length > 17 ? "..." : "")}</h3>
                    <h5 className='color-primary'>MAD {price}</h5>
                </div>

                <p className='fw-bold mb-1'>{t("category")} {category}</p>
                <p className='fw-bold mb-1'>{t("modal")} {modal}</p>
                <p className='fw-bold mb-1'>{t("application")} {modal}</p>
                <p className='fw-bold mb-1'>{t("condition")} {condition}</p>
                <p className='fw-bold'>{city}</p>

                {description && <p className='mb-3 mt-1 color-secondary'>{description.slice(0, 120) + (description.length > 120 ? "..." : "")}</p>}


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
        </div>
    )
}


export default MachineryCard
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


const ConstructionCard = ({ id, imgUrl, title, quantity, price, available, category, datePosted }) => {
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
            <div className="image">
            <OwlCarousel id="customer-testimonoals" className="owl-carousel owl-theme" {...options}>
                {
                    imgUrl.map(image => {
                        return (
                            <img src={image} alt="" />
                        )
                    })
                }
            </OwlCarousel>
            </div>
            <div className="content">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className='color-primary'>MAD {price}</h5>
                    {/* <div className="custom-badge">{type}</div> */}
                </div>

                <h3 className="card-title">{title && (title.slice(0, 27)) + (title.length > 37 ? "..." : "")}</h3>

                <div className="d-flex justify-content-between align-items-center my-2">
                    <p className='color-secondary'>{t("quantity")}: {quantity}</p>
                    <p className='color-secondary'>{t("available")}: {available}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <p className='city'>{t("category")}: {category}</p>
                    <div className="icon-area">
                        {
                            favourite ? (<FaHeart className='icon favourite-icon filled' onClick={() => { setFavourite(!favourite) }} />) : (<FaRegHeart className='icon favourite-icon' onClick={() => { setFavourite(!favourite) }} />)
                        }

                    </div>
                </div>
                <hr className="line-break my-2" />
                <div className="d-flex justify-content-between align-items-center property-features">
                    <div className='d-flex align-items-center'>
                        <FiCalendar className='feature-icon'/>
                        <p className="feature-text">{t("datePosted")}: {datePosted}</p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}


export default ConstructionCard
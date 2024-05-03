import React, { useState } from 'react'
import { TbBed } from 'react-icons/tb'
import { FaHeart, FaPaintBrush, FaRegCheckSquare, FaRegHeart } from "react-icons/fa";
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
import { Link } from 'react-router-dom';
import { IoIosColorPalette, IoIosStats } from 'react-icons/io';
import { FaGuaraniSign, FaRegCalendar } from 'react-icons/fa6';
import CarouselImages from './CarouselImages';
import { GrStatusInfo } from 'react-icons/gr';


const FurnitureCard = ({ id, imgUrl, title, quantity, price, available, category, datePosted, sellerName, city, description }) => {
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
        <div className="custom-card construction-card">
            <div className="image">
                <CarouselImages images={imgUrl} />

                <div className="icon-area">
                    {
                        favourite ? (<FaHeart className='icon favourite-icon filled' onClick={() => { setFavourite(!favourite) }} />) : (<FaRegHeart className='icon favourite-icon' onClick={() => { setFavourite(!favourite) }} />)
                    }

                </div>

            </div>
            <Link to='../furniture/123'>
                <div className="content">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="card-title">{title && (title.slice(0, 17)) + (title.length > 17 ? "..." : "")}</h3>
                        <h5 className='color-primary'>MAD {price}</h5>
                    </div>

                    <p className='paragraph'>{city}</p>
                    <p className=''>{category} (per Unit)</p>
                    <p className='color-secondary'>Finishing, Foundations</p>
                    <p className='color-secondary'>12 KG - 9x4 ft</p>

                    {description && <p className='mb-1 mt-1 color-secondary'>{description.slice(0, 120) + (description.length > 120 ? "..." : "")}</p>}

                    <div className="d-flex justify-content-between align-items-center property-features mb-2">
                        <div className='d-flex align-items-center'>
                            <IoIosColorPalette className='feature-icon' />
                            <p className="feature-text">Brown</p>
                        </div>
                        <div className='d-flex align-items-center'>
                            <FaRegCheckSquare className='feature-icon' />
                            <p className="feature-text">2 Years</p>
                        </div>
                        <div className='d-flex align-items-center'>
                            <GrStatusInfo className='feature-icon' />
                            <p className="feature-text">Excellent</p>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center property-features">
                        <p className="feature-text ms-0">{t("datePosted")}: {datePosted}</p>
                    </div>

                    <hr className="line-break my-2" />
                    <div className="seller-info">
                        <div className="seller-img">

                        </div>
                        <p>{sellerName}</p>
                    </div>
                </div>
            </Link >
        </div >
    )
}


export default FurnitureCard
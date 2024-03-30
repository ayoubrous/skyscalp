import React, { useState } from 'react'
import { TbBed } from 'react-icons/tb'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { LuBath } from "react-icons/lu";
import { BsBuildings } from "react-icons/bs";
import { useTranslation } from 'react-i18next';
import { FiCalendar } from "react-icons/fi";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';


const ConstructionCard = ({ id, imgUrl, title, quantity, price, available, category, datePosted }) => {
    const [t] = useTranslation();
    const [favourite, setFavourite] = useState(false)
    return (
        <div className="custom-card property-card">
            <div className="image">
                {/* <img src={imgUrl} alt="" /> */}
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    modules={[Navigation]}
                    navigation={true}
                >
                    {
                        imgUrl.map(image => {
                            return (
                                <SwiperSlide>
                                    <img src={image} alt="" />
                                </SwiperSlide>
                            )
                        })
                    }

                </Swiper>
            </div>
            <div className="content">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className='color-primary'>MAD {price}</h5>
                    {/* <div className="custom-badge">{type}</div> */}
                </div>

                <h3 className="card-title">{title}</h3>
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
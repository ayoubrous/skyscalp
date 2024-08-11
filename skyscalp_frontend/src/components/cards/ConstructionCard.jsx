import React, { useEffect, useState } from 'react'
import { TbBed } from 'react-icons/tb'
import { FaHeart, FaRegCheckSquare, FaRegHeart } from "react-icons/fa";
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
import formatNumber from '../../utils/formatNumber';
import { formatPrice } from '../../utils/formatPrice';
import handleProductFavourite from '../utils/manangeFavourite';
import { checkInFavourites } from '../../APIs/favourites';


const ConstructionCard = ({ data }) => {
    const { _id, images, title, description, category, budget, color, street, city, country, unit, application, condition, user, createdAt } = data;


    const [t] = useTranslation();
    const [favourite, setFavourite] = useState(false)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            checkInFavourites(user.userID, _id)
                .then(res => {
                    if (!res.status) {
                        setFavourite(false)
                    }
                    else {
                        setFavourite(true)
                    }
                }).catch(err => {
                    console.log(err)
                    setFavourite(false)
                })

        }
    }, [])

    const handleFavourite = () => {
        handleProductFavourite(favourite, setFavourite, _id, true)
    }

    return (
        <div className="custom-card construction-card">
            <div className="image">
                <CarouselImages images={images} />

                <div className="icon-area">
                    {favourite ? (
                        <FaHeart className="icon favourite-icon filled" onClick={handleFavourite} />
                    ) : (
                        <FaRegHeart className="icon favourite-icon" onClick={handleFavourite} />
                    )}
                </div>

            </div>
            <Link to={`../construction/${_id}`}>

                <div className="content">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="card-title">{title && (title.slice(0, 17)) + (title.length > 17 ? "..." : "")}</h3>
                        <h5 className='color-primary'>MAD {formatPrice(budget)}</h5>

                    </div>

                    <p className="paragraph">{city}, {country}</p>
                    <p className='mb-1'>{category} ({unit})</p>
                    <p className='color-secondary'>{application}</p>

                    {description && <p className='mb-2 mt-1 color-secondary' dangerouslySetInnerHTML={{ __html: description.substring(0, 120) }}></p>}

                    <div className="d-flex justify-content-between align-items-center property-features mb-2">

                        {
                            color !== '' && (
                                <div className='d-flex align-items-center'>
                                    <IoIosColorPalette className='feature-icon' />
                                    <p className="feature-text">Green</p>
                                </div>
                            )
                        }
                        {
                            condition !== '' && (
                                <div className='d-flex align-items-center'>
                                    <GrStatusInfo className='feature-icon' />
                                    <p className="feature-text">{condition}</p>
                                </div>
                            )
                        }
                    </div>

                    <div className="d-flex justify-content-between align-items-center property-features">
                        <p className="feature-text ms-0">{t("datePosted")}: {createdAt && new Intl.DateTimeFormat('en-GB').format(new Date(createdAt))}</p>
                    </div>

                    <hr className="line-break my-2" />
                    <div className="seller-info">
                        <div className="seller-img" >
                            <img src={user && user.profileImage} style={{ width: "100%" }} alt="" />
                        </div>
                        <p>{user && user.username}</p>
                    </div>
                </div>
            </Link >
        </div >
    )
}


export default ConstructionCard
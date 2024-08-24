import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegCheckSquare, FaRegHeart } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { IoIosStats } from "react-icons/io";

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';



import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from 'react-router-dom';
import { FaCalendar, FaGuaraniSign, FaRegCalendar } from 'react-icons/fa6';
import CarouselImages from './CarouselImages';
import { GrStatusInfo } from 'react-icons/gr';
import { formatPrice } from '../../utils/formatPrice';
import { checkInFavourites } from '../../APIs/favourites';
import handleProductFavourite from '../utils/manangeFavourite';


const MachineryCard = ({ data }) => {
    const { _id, images, title, description, category, type, budget, street, city, country, unit, model, application, condition, user, createdAt, build, guaranteePeriod } = data;


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
        <div className="custom-card machinery-card">
            <div className="image">
                <CarouselImages images={images} />

                <div className="custom-badge">{type && type === "buy" ? t("buy") : t("rent")}</div>
                <div className="icon-area">
                    {favourite ? (
                        <FaHeart className="icon favourite-icon filled" onClick={handleFavourite} />
                    ) : (
                        <FaRegHeart className="icon favourite-icon" onClick={handleFavourite} />
                    )}
                </div>
            </div>

            <div to='' className="content">
                <Link to={`../machines/${_id}`}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="card-title">{title && (title.slice(0, 17)) + (title.length > 17 ? "..." : "")}</h3>
                        <h5 className='color-primary'>MAD {formatPrice(budget)}</h5>
                    </div>

                    <p className="">{city}, {country}</p>
                    <p className='mb-1'>{t(category)}</p>
                    <p className='color-secondary'>{t(application)}</p>
                    <p className='color-secondary'>{t(condition)}</p>

                    {description && <p className='mb-2 mt-1 color-secondary description' dangerouslySetInnerHTML={{ __html: description.substring(0, 120) }}></p>}



                    <div className="d-flex justify-content-between align-items-center property-features mb-2">
                        {
                            build !== '' && (
                                <div className='d-flex align-items-center gap-1'>
                                    <p className="feature-text  ">Year:</p>
                                    <p className="feature-text ">{build}</p>
                                </div>
                            )
                        }

                        {
                            guaranteePeriod !== '' && (
                                <div className='d-flex align-items-center'>
                                    <FaRegCheckSquare className='feature-icon' />
                                    <p className="feature-text">{t("guarantee")}</p>
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
                </Link>
            </div>
        </div>
    )
}


export default MachineryCard
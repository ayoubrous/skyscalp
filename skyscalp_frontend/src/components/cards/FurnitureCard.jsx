import React, { useEffect, useState } from 'react'
import { TbBed, TbBrandAbstract } from 'react-icons/tb'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { CgStyle } from "react-icons/cg";


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
import handleProductFavourite from '../utils/manangeFavourite';
import { checkInFavourites } from '../../APIs/favourites';
import { formatPrice } from '../../utils/formatPrice';
import { RxDimensions } from "react-icons/rx";
import { GiStarShuriken } from "react-icons/gi";


const FurnitureCard = ({ data }) => {
    const { _id, images, title, description, category, quantity, article, budget, color, street,
        city, country, unit, application, condition, guaranteePeriod, user, createdAt,
        style, dimensions, brand, feature, otherColor, otherBrand, otherFeature } = data;

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
        handleProductFavourite(favourite, setFavourite, _id, true, "materials")
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
            <div className="content">
                <Link to={`../furniture/${_id}`}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="card-title">{title && (title.slice(0, 17)) + (title.length > 17 ? "..." : "")}</h3>
                        <h5 className='color-primary'>MAD {formatPrice(budget)}</h5>

                    </div>

                    <p className="paragraph">{city}{city && ','} {country}</p>
                    <p className=''>{t("quantity")}: {quantity} {quantity > 1 ? 'items' : "item"}</p>
                    <p className='mb-1'>{t(category)}</p>
                    <p className='color-secondary'>{t(article)}</p>

                    {description && <p className='mb-2 mt-1 color-secondary description' dangerouslySetInnerHTML={{ __html: description.substring(0, 120) }}></p>}

                    <div className="characteristics  mb-2">
                        {style !== '' && (
                            <div className="d-flex align-items-center gap-1">
                                <CgStyle className="feature-icon" />
                                <p className="feature-text">{t(style).slice(0, 9)}</p>
                            </div>
                        )}
                        {color !== '' && (
                            <div className="d-flex align-items-center gap-1">
                                <IoIosColorPalette className="feature-icon" />
                                {
                                    color && (
                                        (color.toLowerCase() === "other" || color.toLowerCase() === "others") && otherColor
                                            ? (
                                                <p className="feature-text">{t(otherColor).slice(0, 11)}</p>
                                            ) : (
                                                <p className="feature-text">{t(color).slice(0, 11)}</p>
                                            )
                                    )
                                }
                            </div>
                        )}
                        {brand !== '' && (
                            <div className="d-flex align-items-center gap-1">
                                <TbBrandAbstract className="feature-icon" />
                                {
                                    brand && (
                                        (brand.toLowerCase() === "other" || brand.toLowerCase() === "others") && otherBrand
                                            ? (
                                                <p className="feature-text">{t(otherBrand).slice(0, 11)}</p>
                                            ) : (
                                                <p className="feature-text">{t(brand).slice(0, 11)}</p>
                                            )
                                    )
                                }
                            </div>
                        )}
                        {condition !== '' && (
                            <div className="d-flex align-items-center gap-1">
                                <GrStatusInfo className="feature-icon" />
                                <p className="feature">{t(condition).slice(0, 9)}</p>
                            </div>
                        )}
                        {feature !== '' && (
                            <div className="d-flex align-items-center gap-1">
                                <GiStarShuriken className="feature-icon" />
                                {
                                    feature && (
                                        (feature.toLowerCase() === "other" || feature.toLowerCase() === "others") && otherFeature
                                            ? (
                                                <p className="feature-text">{t(otherFeature).slice(0, 11)}</p>
                                            ) : (
                                                <p className="feature-text">{t(feature).slice(0, 11)}</p>
                                            )
                                    )
                                }
                            </div>
                        )}
                        {dimensions !== '' && (
                            <div className="d-flex align-items-center gap-1">
                                <RxDimensions className="feature-icon" />
                                <p className="feature-text">{t(dimensions).slice(0, 9)}</p>
                            </div>
                        )}
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
                </Link >
            </div>
        </div >
    )
}


export default FurnitureCard
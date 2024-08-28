import React, { useEffect, useState } from 'react'
import { TbBed } from 'react-icons/tb'
import { FaGripLines, FaHeart, FaRegCheckSquare, FaRegHeart } from "react-icons/fa";
import { LuBath, LuBox } from "react-icons/lu";
import { BsBuildings } from "react-icons/bs";
import { useTranslation } from 'react-i18next'; import { SiSymantec } from "react-icons/si";

import { IoConstructOutline } from "react-icons/io5";

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
import { MdCheckBoxOutlineBlank, MdElectricBolt } from 'react-icons/md';
import { RxSize } from 'react-icons/rx';


const ConstructionCard = ({ data }) => {
    const { _id, images, title, description, category, budget, color, street, city, country,
        unit, application, user, createdAt,
        type, material, base, finish, voltage, otherColor, otherType, otherMaterial, otherBase, otherFinish, otherVoltage,
        size, otherSize, thickness, otherThickness } = data;


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

            <div className="content">
                <Link to={`../materials/${_id}`}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="card-title">{title && (title.slice(0, 17)) + (title.length > 17 ? "..." : "")}</h3>
                        <h5 className='color-primary'>MAD {formatPrice(budget)}</h5>

                    </div>

                    <p className="paragraph">{city}{city && ','} {country}</p>
                    <p className='mb-1'>{t(application)} ({unit})</p>
                    <p className='color-secondary'>{t(category)}</p>

                    {description && <p className='mb-2 mt-1 color-secondary description' dangerouslySetInnerHTML={{ __html: description.substring(0, 120) }}></p>}

                    <div className="characteristics mb-2">
                        {type !== '' && (
                            <div className="d-flex align-items-center gap-1">
                                <LuBox className="feature-icon" />
                                {
                                    type && (
                                        (type.toLowerCase() === "other" || type.toLowerCase() === "others") && otherType
                                            ? (
                                                <p className="feature-text">{t(otherType).slice(0, 11)}</p>
                                            ) : (
                                                <p className="feature-text">{t(type).slice(0, 11)}</p>
                                            )
                                    )
                                }
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
                        {material !== '' && (
                            <div className="d-flex align-items-center gap-1">
                                <IoConstructOutline className="feature-icon" />
                                {
                                    material && (
                                        (material.toLowerCase() === "other" || material.toLowerCase() === "others") && otherMaterial
                                            ? (
                                                <p className="feature-text">{t(otherMaterial).slice(0, 11)}</p>
                                            ) : (
                                                <p className="feature-text">{t(material).slice(0, 11)}</p>
                                            )
                                    )
                                }
                            </div>
                        )}
                        {finish !== '' && (
                            <div className="d-flex align-items-center gap-1">
                                <SiSymantec className="feature-icon" />
                                {
                                    finish && (
                                        (finish.toLowerCase() === "other" || finish.toLowerCase() === "others") && otherFinish
                                            ? (
                                                <p className="feature-text">{t(otherFinish).slice(0, 11)}</p>
                                            ) : (
                                                <p className="feature-text">{t(finish).slice(0, 11)}</p>
                                            )
                                    )
                                }
                            </div>
                        )}
                        {voltage !== '' && (
                            <div className="d-flex align-items-center gap-1">
                                <MdElectricBolt className="feature-icon" />
                                <p className="feature-text">{t(voltage).slice(0, 11)}</p>
                                {
                                    voltage && (
                                        (voltage.toLowerCase() === "other" || voltage.toLowerCase() === "others") && otherVoltage
                                            ? (
                                                <p className="feature-text">{t(otherVoltage).slice(0, 11)}</p>
                                            ) : (
                                                <p className="feature-text">{t(voltage).slice(0, 11)}</p>
                                            )
                                    )
                                }
                            </div>
                        )}
                        {base !== '' && (
                            <div className="d-flex align-items-center gap-1">
                                <FaGripLines className="feature-icon" />
                                <p className="feature-text">{t(base).slice(0, 11)}</p>
                                {
                                    base && (
                                        (base.toLowerCase() === "other" || base.toLowerCase() === "others") && otherBase
                                            ? (
                                                <p className="feature-text">{t(otherBase).slice(0, 11)}</p>
                                            ) : (
                                                <p className="feature-text">{t(base).slice(0, 11)}</p>
                                            )
                                    )
                                }
                            </div>
                        )}
                        {thickness !== '' && (
                            <div className="d-flex align-items-center gap-1">
                                <MdCheckBoxOutlineBlank className="feature-icon" />
                                {
                                    thickness && (
                                        (thickness.toLowerCase() === "other" || thickness.toLowerCase() === "others") && otherThickness
                                            ? (
                                                <p className="feature-text">{t(otherThickness).slice(0, 11)}</p>
                                            ) : (
                                                <p className="feature-text">{t(thickness).slice(0, 11)}</p>
                                            )
                                    )
                                }
                            </div>
                        )}
                        {size !== '' && (
                            <div className="d-flex align-items-center gap-1">
                                <RxSize className="feature-icon" />
                                {
                                    size && (
                                        (size.toLowerCase() === "other" || size.toLowerCase() === "others") && otherSize
                                            ? (
                                                <p className="feature-text">{t(otherSize).slice(0, 11)}</p>
                                            ) : (
                                                <p className="feature-text">{t(size).slice(0, 11)}</p>
                                            )
                                    )
                                }
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


export default ConstructionCard
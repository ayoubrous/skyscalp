import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { LuBath } from 'react-icons/lu';
import { MdOutlineGarage, MdOutlinePool } from 'react-icons/md';
import { PiFlowerTulip } from 'react-icons/pi';
import { TbBed, TbCar } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CarouselImages from './CarouselImages';
import { formatPrice } from '../../utils/formatPrice';
import { addToFavourites, checkInFavourites, removeFromFavourites } from '../../APIs/favourites';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast'
import handleProductFavourite from '../utils/manangeFavourite';


const PropertyCard = React.memo(({ propertyData }) => {
    const { _id, images, title, description, category, type, budget, street, city, country, rooms, bathrooms, area, user, createdAt, pool, garage, garden } = propertyData;

    const [favourite, setFavourite] = useState(false);
    const [t] = useTranslation();

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
        handleProductFavourite(favourite, setFavourite, _id, false)
    }

    // const handleFavourite = () => {
    //     setFavourite(!favourite)
    //     if (!favourite) {
    //         // add to fav 
    //         const user = JSON.parse(localStorage.getItem("user"))
    //         if (user) {
    //             addToFavourites(user.userID, _id)
    //                 .then(res => {
    //                     if (!res.status) {
    //                         toast.error(res.message)
    //                         setFavourite(false)
    //                     }
    //                 }).catch(err => {
    //                     console.log(err)
    //                     setFavourite(false)
    //                 })

    //         }
    //         else {
    //             Swal.fire("Login first to add to favourites")
    //             setFavourite(false)
    //         }

    //     }
    //     else {
    //         // remove from favv 
    //         const user = JSON.parse(localStorage.getItem("user"))
    //         if (user) {
    //             removeFromFavourites(user.userID, _id)
    //                 .then(res => {
    //                     if (!res.status) {
    //                         toast.error(res.message)
    //                         setFavourite(true)
    //                     }
    //                 }).catch(err => {
    //                     console.log(err)
    //                     setFavourite(true)
    //                 })

    //         }
    //         else {
    //             Swal.fire("Please login to add to favourites")
    //         }
    //     }
    // };

    return (
        <>
            <Toaster />
            <div className="custom-card property-card">
                <div className="image">
                    <CarouselImages images={images} />
                    {/* <div className="custom-badge">{type && type.charAt(0).toUpperCase() + type.slice(1)}</div> */}
                <div className="custom-badge">{type && type === "buy" ? t("buy") : t("rent")}</div>

                    <div className="icon-area">
                        {favourite ? (
                            <FaHeart className="icon favourite-icon filled" onClick={handleFavourite} />
                        ) : (
                            <FaRegHeart className="icon favourite-icon" onClick={handleFavourite} />
                        )}
                    </div>
                </div>
                <div className="content">
                    <Link to={`../property/${_id}`}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h1 className="card-title">{title && (title.slice(0, 18)) + (title.length > 18 ? "..." : "")}</h1>
                            <h5 className="color-primary">MAD {formatPrice(budget)}</h5>
                        </div>
                        <p className="paragraph mb-0">{category}, ({area} m<sup>2</sup>)</p>
                        <p className="">{city}, {country}</p>
                        {description && <div className='mb-2 mt-1 color-secondary description' dangerouslySetInnerHTML={{ __html: description.substring(0, 120) }}></div>}

                        <div className="d-flex justify-content-between align-items-center property-features mb-3">
                            {rooms > 0 && (
                                <div className="d-flex align-items-center gap-1">
                                    <TbBed className="feature-icon" />
                                    <p className="feature-text">{rooms}</p>
                                </div>
                            )}
                            {bathrooms > 0 && (
                                <div className="d-flex align-items-center">
                                    <LuBath className="feature-icon" />
                                    <p className="feature-text">{bathrooms}</p>
                                </div>
                            )}
                            {pool > 0 && (
                                <div className="d-flex align-items-center">
                                    <MdOutlinePool className="feature-icon" />
                                    <p className="feature-text">{pool}</p>
                                </div>
                            )}
                            {garage > 0 && (
                                <div className="d-flex align-items-center">
                                    <TbCar className="feature-icon" />
                                    <p className="feature-text">{garage}</p>
                                </div>
                            )}
                            {garden > 0 && (
                                <div className="d-flex align-items-center">
                                    <PiFlowerTulip className="feature-icon" />
                                    <p className="feature-text">{garden}</p>
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
                    </Link>
                </div>
            </div>
        </>

    );
});


export default PropertyCard;

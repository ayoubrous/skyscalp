import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegCheckSquare, FaRegHeart } from "react-icons/fa";
import { useTranslation } from 'react-i18next';



import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from 'react-router-dom';
import CarouselImages from './CarouselImages';
import { GrStatusInfo } from 'react-icons/gr';
import { formatPrice } from '../../utils/formatPrice';
import { checkInFavourites } from '../../APIs/favourites';
import handleProductFavourite from '../utils/manangeFavourite';


const AgentCard = ({ data }) => {
    const { _id, images, title, description, category, budget, street, city, country, unit, model, application, condition, user, createdAt, build, guaranteePeriod } = data;

    let demoImages = [
        'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20201203211256/8-Important-Business-Skills-For-an-IT-Professional.png',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTvliJyxqzUC4vp475_zxMo7oI6ovRou42X9NztLui2s7N7GOfnvZbnlIUUpTWwzeN_eI&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVjkcPZvBT4KW0h6s3nGrUWT0CRIEYp33GBg&s',
    ]

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
        <div className="custom-card agent-card">
            <div className="image">
                <CarouselImages images={demoImages} />

                <div className="icon-area">
                    {favourite ? (
                        <FaHeart className="icon favourite-icon filled" onClick={handleFavourite} />
                    ) : (
                        <FaRegHeart className="icon favourite-icon" onClick={handleFavourite} />
                    )}
                </div>
            </div>
            <Link to={`../machinery/${_id}`}>

                <div to='' className="content">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="card-title">{title && (title.slice(0, 30)) + (title.length > 30 ? "..." : "")}</h3>
                        <h5 className='color-primary'>MAD {formatPrice(budget)}</h5>
                    </div>

                    <p className="">{city}, {country}</p>
                    {/* <p className='mb-1'>{specialization}</p> */}
                    <p className=''>Specializtion</p>
                    <p className='mb-1'>Experience 12yr</p>

                    {description && <p className='mb-2 mt-1 color-secondary' dangerouslySetInnerHTML={{ __html: description.substring(0, 170) }}></p>}


                    <div className="d-flex justify-content-between align-items-center property-features">
                        <p className="feature-text ms-0">{t("datePosted")}: {createdAt && new Date(createdAt).toDateString()}</p>
                    </div>
                    <hr className="line-break my-2" />
                    <div className="seller-info">
                        <div className="seller-img" >
                            <img src={user && user.profileImage} style={{ width: "100%" }} alt="" />
                        </div>
                        <p>{user && user.username}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}


export default AgentCard
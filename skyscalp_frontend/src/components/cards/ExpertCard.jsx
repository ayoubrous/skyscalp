import React, { useEffect, useState } from 'react'
import { FaHeart, FaRegCheckSquare, FaRegHeart } from "react-icons/fa";
import { useTranslation } from 'react-i18next';



import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from 'react-router-dom';
import CarouselImages from './CarouselImages';
import { GrStatusInfo, GrUserExpert } from 'react-icons/gr';
import { formatPrice } from '../../utils/formatPrice';
import { checkInFavourites } from '../../APIs/favourites';
import handleProductFavourite from '../utils/manangeFavourite';
import { IoLanguage } from 'react-icons/io5';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa6';
import { MdAccessTime, MdFilterCenterFocus } from 'react-icons/md';
import { GoBriefcase } from "react-icons/go";


const ExpertCard = ({ data }) => {
    const { _id, images, title, description, budget, street, city, country, name, field,
        experty, language, otherLanguage, education, otherEducation, availibility,
        otherAvailibility, filter1, filter2, otherFilter1Value, otherFilter2Value, experience,
        user, createdAt, filter1Data, filter2Data } = data;

    // let filter1Data = JSON.parse(filter1)
    // let filter2Data = JSON.parse(filter2)
    // console.log(filter1Data)

    let filter1Value = filter1Data?.selectedOption
    let filter2Value = filter2Data?.selectedOption

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
        handleProductFavourite(favourite, setFavourite, _id, true, "services")
    }
    return (
        <div className="custom-card agent-card">
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
            <Link to={`../expert/${_id}`}>

                <div to='' className="content">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="card-title">{title && (title.slice(0, 30)) + (title.length > 30 ? "..." : "")}</h3>
                        <h5 className='color-primary'>MAD {formatPrice(budget)}/hr</h5>
                    </div>

                    <p className="color-primary" style={{ fontWeight: "500", fontSize: "17px" }}>{name}</p>
                    <p className="">{city} {city === "" ? "" : ","} {t(country)}</p>
                    {/* <p className='mb-1'>{specialization}</p> */}
                    <p className=''>{t(field)}</p>
                    <p className=''>{t(experty)}</p>
                    {/* {
                        experience !== "" &&
                        (
                            <p className='mb-1'>{t("Experience")} {experience} {t("year")}</p>
                        )
                    } */}

                    {description && <p className='mb-2 mt-1 color-secondary description' dangerouslySetInnerHTML={{ __html: description.substring(0, 170) }}></p>}

                    <div className="characteristics mt-3 mb-2">

                        {language !== null && (
                            <div className="d-flex align-items-center gap-1">
                                <IoLanguage className="feature-icon" />

                                {
                                    language && (
                                        (language.toLowerCase() === "other" || language.toLowerCase() === "others") && otherLanguage
                                            ? (
                                                <p className="feature-text">{t(otherLanguage).slice(0, 11)}</p>
                                            ) : (
                                                <p className="feature-text">{t(language).slice(0, 11)}</p>
                                            )
                                    )
                                }
                            </div>
                        )}

                        {experience !== null && (
                            <div className="d-flex align-items-center gap-1">
                                {
                                    experience && (
                                        <>
                                            <GrUserExpert className="feature-icon" />
                                            <p className="feature-text">{t(experience)} {t("year")}</p>
                                        </>
                                    )
                                }
                            </div>
                        )}

                        {education !== null && (
                            <div className="d-flex align-items-center gap-1">
                                <FaGraduationCap className="feature-icon" />
                                {
                                    education && (
                                        (education.toLowerCase() === "other" || education.toLowerCase() === "others") && otherEducation
                                            ? (
                                                <p className="feature-text">{t(otherEducation).slice(0, 11)}</p>
                                            ) : (
                                                <p className="feature-text">{t(education).slice(0, 11)}</p>
                                            )
                                    )
                                }
                            </div>
                        )}

                        {availibility !== null && (
                            <div className="d-flex align-items-center gap-1">
                                <MdAccessTime className="feature-icon" />
                                {
                                    availibility && (
                                        (availibility.toLowerCase() === "other" || availibility.toLowerCase() === "others") && otherAvailibility
                                            ? (
                                                <p className="feature-text">{t(otherAvailibility).slice(0, 11)}</p>
                                            ) : (
                                                <p className="feature-text">{t(availibility).slice(0, 11)}</p>
                                            )
                                    )
                                }
                            </div>
                        )}

                        {filter1Value !== null && (
                            <div className="d-flex align-items-center gap-1">
                                <GoBriefcase className="feature-icon" />
                                {
                                    filter1Value && (
                                        (filter1Value.toLowerCase() === "other" || filter1Value.toLowerCase() === "others") && otherFilter1Value
                                            ? (
                                                <p className="feature-text">{t(otherFilter1Value).slice(0, 18)}</p>
                                            ) : (
                                                <p className="feature-text">{t(filter1Value).slice(0, 18)}</p>
                                            )
                                    )
                                }
                            </div>
                        )}
                        {filter2Value !== null && (
                            <div className="d-flex align-items-center gap-1">
                                <MdFilterCenterFocus className="feature-icon" />

                                {
                                    filter2Value && (
                                        (filter2Value.toLowerCase() === "other" || filter2Value.toLowerCase() === "others") && otherFilter2Value
                                            ? (
                                                <p className="feature-text">{t(otherFilter2Value).slice(0, 18)}</p>
                                            ) : (
                                                <p className="feature-text">{t(filter2Value).slice(0, 18)}</p>
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
                </div>
            </Link>
        </div>
    )
}


export default ExpertCard
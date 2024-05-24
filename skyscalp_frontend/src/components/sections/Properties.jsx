import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { BsFillBagHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { TbBed } from "react-icons/tb";
import PropertyCard from '../cards/PropertyCard';

export default function Properties({ properties }) {
    const [t] = useTranslation()


    return (
        <section className="properties-section">
            <div className="custom-container">
                <h1 className="color-primary text-uppercase fw-bolder">{t("propertySectionTitle")}</h1>
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className='my-3 fw-bolder w-75'>{t("propertySectionSubTitle")}</h3>
                    <Link to="../properties" className='underlineLink'>{t("seeMore")}</Link>
                </div>

                <div className="cards-grid">
                    {/* Only show 4 cards, 3 will be visible in laptop and 4 on mobile through css */}
                    {
                        properties &&
                        properties
                            .filter(item => item.featured)
                            .map(item => {
                                return (
                                    <PropertyCard key={item._id} propertyData={item} />
                                )
                            })
                    }
                </div>
                <Link to="./properties">
                    <button className="outline-btn d-block mx-auto my-4">{t("viewAllProperty")}</button>
                </Link>
            </div>
        </section>
    )
}

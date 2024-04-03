import React from 'react'
import { BsBuildings } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { FaTools } from 'react-icons/fa';
import { BsTools } from "react-icons/bs";
import { BsBuildingsFill } from "react-icons/bs";
import { RiContactsFill, RiAdvertisementFill } from "react-icons/ri";


export default function FeatureCards() {
    const [t] = useTranslation()

    return (
        <div className='feature-cards'>
            <div className="feature-card">
                <BsBuildingsFill className='icon' />
                <p>{t("featureCard1")}</p>
            </div>
            <div className="feature-card">
                <BsTools className='icon' />
                <p>{t("featureCard2")}</p>
            </div>
            <div className="feature-card">
                <RiContactsFill className='icon' />
                <p className='mt-2'>{t("featureCard3")}</p>
            </div>
            <div className="feature-card">
                <RiAdvertisementFill className='icon' />
                <p className='mt-2'>{t("featureCard4")}</p>
            </div>
        </div>
    )
}

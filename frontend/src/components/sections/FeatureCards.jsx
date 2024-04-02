import React from 'react'
import { BsBuildings } from "react-icons/bs";
import { useTranslation } from "react-i18next";

export default function FeatureCards() {
    const [t] = useTranslation()

    return (
        <div className='feature-cards'>
            <div className="feature-card">
                <BsBuildings className='icon' />
                <p>{t("featureCard1")}</p>
            </div>
            <div className="feature-card">
                <BsBuildings className='icon' />
                <p>{t("featureCard2")}</p>
            </div>
            <div className="feature-card">
                <BsBuildings className='icon' />
                <p className='mt-2'>{t("featureCard3")}</p>
            </div>
            <div className="feature-card">
                <BsBuildings className='icon' />
                <p className='mt-2'>{t("featureCard4")}</p>
            </div>
        </div>
    )
}

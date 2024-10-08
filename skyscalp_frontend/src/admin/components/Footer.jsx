import React from 'react'
import MainFooter from '../../components/sections/Footer'
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'

export default function Footer() {

    const [t] = useTranslation()

    return (
        <>
        
        <div className="py-0 px-6 ">
            <small className="mb-0 color-secondary">{t("allrightsreserved")} - &copy; SkyScalp {new Date().getFullYear()}</small>
        </div>
        {/* <MainFooter /> */}
        </>
    )
}

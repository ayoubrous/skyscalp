import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Breadcrumb from '../components/sections/Breadcrumb'
import { useTranslation } from 'react-i18next'
import ContactUs from '../components/sections/ContactUs'
import Footer from '../components/sections/Footer'
import Estimate from '../components/sections/Estimate'

export default function Contact() {
    const [t] = useTranslation()

    return (
        <>
            <Navbar />
            <Breadcrumb title={t("estimatePropertyOrProduct")} link={t("contact")} />
            <Estimate />
            <ContactUs supportTitle={t("contactSupportTitle")} supportDescription={t("contactSupportDescription")} />
            <Footer />
        </>
    )
}

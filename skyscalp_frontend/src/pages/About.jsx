import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Breadcrumb from '../components/sections/Breadcrumb'
import { useTranslation } from 'react-i18next'
import ContactUs from '../components/sections/ContactUs'
import Testimonials from '../components/sections/Testimonials'
import BlogSection from '../components/sections/BlogSection'
import Footer from '../components/sections/Footer'
import AboutInfo from '../components/sections/AboutInfo'

export default function About() {
    const [t] = useTranslation()

    return (
        <>
            <Navbar />
            <Breadcrumb title={t("aboutSkyScalp")} link={t("about")} />
            <AboutInfo />
            <BlogSection />
            <Testimonials />
            <ContactUs supportTitle={t("aboutSupportTitle")} supportDescription={t("aboutSupportDescription")} />
            <Footer />
        </>
    )
}

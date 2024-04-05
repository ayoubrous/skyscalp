import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Breadcrumb from '../components/sections/Breadcrumb'
import { useTranslation } from 'react-i18next'
import ContactUs from '../components/sections/ContactUs'
import BlogSection from '../components/sections/BlogSection'
import Footer from '../components/sections/Footer'
import AllProperties from '../components/sections/AllProperties'

export default function Properties() {
    const [t] = useTranslation()
  return (
    <>
    <Navbar />
    <Breadcrumb title={t("exploreProperties")} link={t("properties")}/>
    <AllProperties />
    <BlogSection />
    <ContactUs supportTitle={t("propertySupportTitle")} supportDescription={t("propertySupportDescription")} />
    <Footer />
    
    </>
  )
}

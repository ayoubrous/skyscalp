import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Breadcrumb from '../components/sections/Breadcrumb'
import { useTranslation } from 'react-i18next'
import ContactUs from '../components/sections/ContactUs'
import BlogSection from '../components/sections/BlogSection'
import Footer from '../components/sections/Footer'
import AllProperties from '../components/sections/AllProperties'
import AllMachinery from '../components/sections/AllMachinery'
import MachineryCategories from '../components/categories/MachineryCategories'

export default function Machinery() {
    const [t] = useTranslation()
  return (
    <>
    <Navbar />
    <Breadcrumb title={t("exploreMachinery")} link={t("machinery")}/>
    <MachineryCategories />
    <AllMachinery />
    <BlogSection />
    <ContactUs supportTitle={t("machinerySupportTitle")} supportDescription={t("machinerySupportDescription")} />
    <Footer />
    
    </>
  )
}

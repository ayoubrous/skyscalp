import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Breadcrumb from '../components/sections/Breadcrumb'
import { useTranslation } from 'react-i18next'
import ContactUs from '../components/sections/ContactUs'
import BlogSection from '../components/sections/BlogSection'
import Footer from '../components/sections/Footer'
import AllProperties from '../components/sections/AllProperties'
import AllConstruction from '../components/sections/AllConstruction'
import ConstructionCategories from '../components/categories/ConstructionCategories'

export default function Construction() {
  const [t] = useTranslation()
  return (
    <>
      <Navbar />
      <Breadcrumb title={t("exploreConstruction")} link={t("construction")} />
      <ConstructionCategories />
      <AllConstruction />
      <BlogSection />
      <ContactUs supportTitle={t("propertySupportTitle")} supportDescription={t("constructionSupportDescription")} />
      <Footer />

    </>
  )
}

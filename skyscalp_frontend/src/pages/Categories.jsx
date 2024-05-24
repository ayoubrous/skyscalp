import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Breadcrumb from '../components/sections/Breadcrumb'
import { useTranslation } from 'react-i18next'
import ContactUs from '../components/sections/ContactUs'
import BlogSection from '../components/sections/BlogSection'
import Footer from '../components/sections/Footer'
import AllProperties from '../components/sections/AllProperties'
import CategoriesList from '../components/sections/Categories'
import AllConstruction from '../components/sections/AllConstruction'
import ConstructionCategories from '../components/categories/ConstructionCategories'
import ConstructionFilter from '../components/filters/ConstructionFilter'

export default function Categories() {
    const [t] = useTranslation()
    return (
        <>
            <Navbar />
            <Breadcrumb title={t("exploreCategories")} link={t("construction")} />
            <ConstructionCategories activeCategory={'category'}/>
            <CategoriesList />
            <BlogSection />
            <ContactUs supportTitle={t("propertySupportTitle")} supportDescription={t("constructionSupportDescription")} />
            <Footer />

        </>
    )
}

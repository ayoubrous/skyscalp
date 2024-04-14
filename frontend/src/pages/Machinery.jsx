import React, { useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Breadcrumb from '../components/sections/Breadcrumb'
import { useTranslation } from 'react-i18next'
import ContactUs from '../components/sections/ContactUs'
import BlogSection from '../components/sections/BlogSection'
import Footer from '../components/sections/Footer'
import AllProperties from '../components/sections/AllProperties'
import AllMachinery from '../components/sections/AllMachinery'
import MachineryCategories from '../components/categories/MachineryCategories'
import MachineryFilter from '../components/filters/MachineryFilter'
import MachineFilter2 from '../components/filters/MachineFilter2'
import TestNestedDropdown from '../components/filters/TestNestedDropdown'
import FilterTagsBackup from '../components/filters/FilterTagsBackup'

export default function Machinery() {
  const [t] = useTranslation()


  
  return (
    <>
      <Navbar />
      <Breadcrumb title={t("exploreMachinery")} link={t("machinery")} />
      <MachineryCategories />
      <MachineFilter2 />
      <AllMachinery />
      <BlogSection />
      <ContactUs supportTitle={t("machinerySupportTitle")} supportDescription={t("machinerySupportDescription")} />
      <FilterTagsBackup />
      <TestNestedDropdown />
      <Footer />

    </>
  )
}

import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Hero from '../components/sections/Hero'
import FeatureCards from '../components/sections/FeatureCards'
import Properties from '../components/sections/Properties'
import Machinery from '../components/sections/Machinery'
import Construction from '../components/sections/Construction'
import Estimation from '../components/sections/Estimation'
import Publish from '../components/sections/Publish'
import BlogSection from '../components/sections/BlogSection'
import Testimonials from '../components/sections/Testimonials'
import ContactUs from '../components/sections/ContactUs'
import { t } from 'i18next'

export default function Home() {
  return (
    <>
        <Navbar />
        <Hero />
        <FeatureCards />
        <Properties />
        <Machinery />
        <Construction />
        <Estimation />
        <Publish />
        <BlogSection />
        <Testimonials />
        <ContactUs supportTitle={t("homeSupportTitle")} supportDescription={t("homeSupportDescription")} />
    </>
  )
}

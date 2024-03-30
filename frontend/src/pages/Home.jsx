import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Hero from '../components/sections/Hero'
import FeatureCards from '../components/sections/FeatureCards'
import Properties from '../components/sections/Properties'
import Machinery from '../components/sections/Machinery'
import Construction from '../components/sections/Construction'
import Estimation from '../components/sections/Estimation'
import Publish from '../components/sections/Publish'

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
    </>
  )
}

import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Hero from '../components/sections/Hero'
import FeatureCards from '../components/sections/FeatureCards'
import Properties from '../components/sections/Properties'
import Machinery from '../components/sections/Machinery'

export default function Home() {
  return (
    <>
        <Navbar />
        <Hero />
        <FeatureCards />
        <Properties />
        <Machinery />
    </>
  )
}

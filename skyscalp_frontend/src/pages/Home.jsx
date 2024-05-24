import React, { useEffect, useState } from 'react'
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
import Footer from '../components/sections/Footer'
import HomeFilter from '../components/filters/HomeFilter'
import loader from '../assets/images/skyscalp-loader.json'
import Lottie from 'lottie-react'
import toast, { Toaster } from 'react-hot-toast'
import { getLocations } from '../assets/data/locations'

export default function Home() {
  const [properties, setProperties] = useState([])
  const [materials, setMaterials] = useState([])
  const [loading, setLoading] = useState(false)
  const loadData = () => {
    setLoading(true)
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch(`${process.env.REACT_APP_SERVER_URL}/api/getProperties`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoading(false)
        // console.log(result)
        if (result.status) {
          setProperties(result.data.documents)
        }
        else {
          //   toast.error(result.message)
          // console.log(result.message)
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error('Something goes wrong, Try again later')
        console.error(error);
      });

    //getting construction 
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/getProducts`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoading(false)
        // console.log(result)
        if (result.status) {
          setMaterials(result.data.documents)
        }
        else {
          //   toast.error(result.message)
          console.log(result.message)
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }
  useEffect(() => {
    loadData()
  }, [])
  return (
    <>
      <Toaster />
      <div className={`lottie-wrapper ${loading ? 'show' : ''}`}>
        <Lottie className='loader' animationData={loader} loop={true} />
      </div>
      <Navbar />
      <Hero />
      <FeatureCards />
      <HomeFilter />
      <Properties properties={properties} />
      <Machinery data={materials} />
      <Construction data={materials} />
      <Estimation />
      <Publish />
      <BlogSection />
      <Testimonials />
      <ContactUs supportTitle={t("homeSupportTitle")} supportDescription={t("homeSupportDescription")} />
      <Footer />
    </>
  )
}

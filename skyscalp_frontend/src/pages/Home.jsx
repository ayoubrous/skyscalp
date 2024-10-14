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
import { ToastContainer, toast } from 'react-toastify';

import { getLocations } from '../assets/data/locations'
import FurnitureSection from '../components/sections/FurnitureSection'
import ExpertsSection from '../components/sections/ExpertsSection'

export default function Home() {
  const [properties, setProperties] = useState([])
  const [materials, setMaterials] = useState([])
  const [loading, setLoading] = useState(false)
  const loadProperties = async () => {
    setLoading(true);
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/getFeaturedProperties`, requestOptions);
      const result = await response.json();
      if (result.status) {
        setProperties(result.data);
      } else {
        console.log(result.message || 'Failed to load properties');
      }
    } catch (error) {
      toast.error('Something went wrong, try again later');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMaterials = async () => {
    setLoading(true);
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/getFeaturedProducts`, requestOptions);
      const result = await response.json();
      if (result.status) {
        setMaterials(result.data);
      } else {
        toast.error(result.message || 'Failed to load materials');
      }
    } catch (error) {
      toast.error('Something went wrong, try again later');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  let executed = false
  useEffect(() => {
    const loadData = () => {
      // loadProperties();
      loadMaterials();
      executed = true
    }
    if (!executed) {
      // loadData()
    }
  }, []);


  return (
    <>
      <ToastContainer />
      <div className={`lottie-wrapper ${loading ? 'show' : ''}`}>
        <Lottie className='loader' animationData={loader} loop={true} />
      </div>
      <Navbar />
      <Hero />
      <FeatureCards />
      <HomeFilter />
      {/* <Properties properties={properties} /> */}
      <Machinery data={materials} />
      <Construction data={materials} />
      <FurnitureSection />
      <ExpertsSection />
      <Estimation />
      {/* <Publish /> */}
      <BlogSection />
      {/* <Testimonials /> */}
      <ContactUs supportTitle="homeSupportTitle" supportDescription="homeSupportDescription" contactEmail={"help@skyscalp.com"} contactPhone={"+33771759956"} />
      <Footer />
    </>
  )
}

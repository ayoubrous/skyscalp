import React, { useEffect, useState } from 'react'
import map from '../../assets/images/hero-map.png'
import { useTranslation } from "react-i18next";
import { FaArrowUp } from "react-icons/fa";

export default function Hero() {
  const [t] = useTranslation()
  const [showGoToTopArrow, setShowGoToTopArrow] = useState(false)

  // const handleGoToTop = () => {
  //   window.scrollTo(0, 0)
  // }

  // useEffect(() => {
  //   const handleScroll = () => {
  //     let scrollPosition = window.scrollY
  //     if (scrollPosition > 200) {
  //       setShowGoToTopArrow(true)
  //     }
  //     else {
  //       setShowGoToTopArrow(false)
  //     }
  //   }

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [])

  return (
    <>
      <section className="hero">
        <div className="custom-container">
          <h1 className="hero-heading">{t("heroTitle")}</h1>
          <p className="slogan">{t("heroSlogan")}</p>
          <p>{t("heroPara")}</p>
          <img src={map} alt="hero-img" />
        </div>
      </section>
      {/* <div className={`up-arrow ${showGoToTopArrow ? 'show' : ''}`} onClick={handleGoToTop}>
        <FaArrowUp className='icon' />
      </div> */}

    </>

  )
}

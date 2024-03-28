import React from 'react'
import map from '../../assets/images/hero-map.png'
import { useTranslation } from "react-i18next";

export default function Hero() {
  const [t] = useTranslation()

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
    </>

  )
}

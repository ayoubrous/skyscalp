import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import EstimateImg  from '../../assets/images/estimate-section-img.png'

export default function Estimation() {
    const [t] = useTranslation()

  return (
    <section className="estimation flexSection">
        <div className="custom-container">
            <div className="split">
                <div className="image">
                    <img src={EstimateImg} alt="" />
                </div>
                <div className="content">
                    <h1 className='color-primary fw-bolder mb-3'>{t("estimate")}</h1>
                    <p className="paragraph mb-3 mt-5 color-secondary">{t("homeEstimateSectionPara")}</p>
                    <Link to="/">
                        <button className="custom-btn">{t("contactOurExperts")}</button>
                    </Link>
                </div>
            </div>
        </div>
    </section>
  )
}

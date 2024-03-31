import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import publishImg  from '../../assets/images/publish-image.png'

export default function Publish() {
    const [t] = useTranslation()

  return (
    <section className="publishSection flexSection">
        <div className="custom-container">
            <div className="split">
                <div className="image">
                    <img src={publishImg} alt="" />
                </div>
                <div className="content mt-5">
                    <h1 className='color-primary fw-bolder mb-3'>{t("homePublishTitle")}</h1>
                    <p className="paragraph mb-5 mt-5 color-secondary">{t("homePublishSectionPara")}</p>
                    <Link to="/">
                        <button className="custom-btn">{t("buildProperty")}</button>
                    </Link>
                </div>
            </div>
        </div>
    </section>
  )
}

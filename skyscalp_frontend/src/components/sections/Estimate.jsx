import React from 'react'
import estimateImg from '../../assets/images/estimate.png'
import { useTranslation } from 'react-i18next'

export default function Estimate() {
    const [t] = useTranslation()
    return (
        <section className="estimate flexSection flex-reverse">
            <div className="custom-container">
                <div className="split">
                    <div className="image">
                        <img src={estimateImg} alt="" />
                    </div>
                    <div className="content mt-3">
                        <h2 className=' fw-bolder mb-3'>{t("estimateYourProperty")}</h2>
                        <p className="paragraph mb-1 mt-5 color-secondary">{t("estimateDesc1")}</p>
                        <p className="paragraph mb-3 color-secondary">{t("estimateDesc2")}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

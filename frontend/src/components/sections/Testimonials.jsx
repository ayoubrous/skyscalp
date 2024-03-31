import React from 'react'
import { useTranslation } from 'react-i18next';
import clientImg from '../../assets/images/client.png'
import { FaQuoteLeft } from "react-icons/fa6";

export default function Testimonials() {
    const [t] = useTranslation()

  return (
    <section className="testimonials">
        <div className="custom-container">
            <h2 className="fw-bolder my-3 text-center text-white">{t("customerReviews")}</h2>
            <FaQuoteLeft className='text-white text-center mx-auto d-block' style={{fontSize: "33px"}}/>


            <div className="review">
                <p className="paragraph">RealEstateWebsite.com made finding my dream home a breeze. Easy navigation, accurate listings, and great customer service. Highly recommend!</p>
            </div>

            <div className="customers">
                <div className="customer active">
                    <div className="image">
                        <img src={clientImg} alt="" />
                    </div>
                    <div className="info">
                        <p className='fw-bolder'>John Smith</p>
                        <small >Businessman</small>
                    </div>
                </div>

                <div className="customer">
                    <div className="image">
                        <img src={clientImg} alt="" />
                    </div>
                    <div className="info">
                        <p className='fw-bolder'>John Smith</p>
                        <small >Businessman</small>
                    </div>
                </div>

                <div className="customer">
                    <div className="image">
                        <img src={clientImg} alt="" />
                    </div>
                    <div className="info">
                        <p className='fw-bolder'>John Smith</p>
                        <small >Businessman</small>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

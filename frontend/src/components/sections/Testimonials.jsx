import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import clientImg from '../../assets/images/client.png'
import { FaQuoteLeft } from "react-icons/fa6";

export default function Testimonials() {
    const [t] = useTranslation()
    const reviews = [
        {
            "id": 1,
            "name": "John Doe",
            "role": "Marketing Manager",
            "review": "Our experience working with this company has been exceptional. They deliver high-quality results promptly and are very responsive to our needs. I highly recommend their services."
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "role": "CEO",
            "review": "I'm thoroughly impressed with the professionalism and expertise of this company. They helped us streamline our operations and achieve significant cost savings. Looking forward to continuing our partnership."
        },
        {
            "id": 3,
            "name": "David Johnson",
            "role": "IT Director",
            "review": "Working with this company has been a game-changer for our IT department. They implemented robust solutions that greatly improved our efficiency and security. I'm grateful for their dedication and highly recommend them."
        }
    ]

    const [activeReview, setActiveReview] = useState(1)
    return (
        <section className="testimonials">
            <div className="custom-container">
                <h2 className="fw-bolder my-3 text-center text-white">{t("customerReviews")}</h2>
                <FaQuoteLeft className='text-white text-center mx-auto d-block' style={{ fontSize: "33px" }} />


                <div className="review">
                    <p className="paragraph">{
                        activeReview && reviews.find((review) => review.id === activeReview).review
                    }</p>
                </div>

                <div className="customers">
                    {
                        reviews && reviews.map((review) => {
                            return (
                                <div key={review.id} className={`customer ${activeReview=== review.id ? 'active': ''}`} onClick={() => setActiveReview(review.id)}>
                                    <div className="image">
                                        <img src={clientImg} alt="" />
                                    </div>
                                    <div className="info">
                                        <p className='fw-bolder'>{review.name}</p>
                                        <small >{review.role}</small>
                                    </div>
                                </div>
                            )
                        })
                    }
                    
                </div>
            </div>
        </section>
    )
}

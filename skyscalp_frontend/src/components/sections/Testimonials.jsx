import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import clientImg from '../../assets/images/client.png'
import clientImg2 from '../../assets/images/client2.jpg'
import clientImg3 from '../../assets/images/client3.jpg'
import { FaQuoteLeft } from "react-icons/fa6";

export default function Testimonials() {
    const [t] = useTranslation()
    const reviews = [
        {
            "id": 1,
            "name": "John Doe",
            "role": "marketManager",
            "image": clientImg2,
            "review": "review1"
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "role": "ceo",
            "image": clientImg,
            "review": "review2"
        },
        {
            "id": 3,
            "name": "David Johnson",
            "role": "itDirector",
            "image": clientImg3,
            "review": "review3"
        }
    ]

    const [activeReview, setActiveReview] = useState(1)
    return (
        <section className="testimonials">
            <div className="custom-container">
                <h2 className="fw-bolder my-3 text-center text-white">{t("customerReviews")}</h2>
                <FaQuoteLeft className='text-white text-center mx-auto d-block' style={{ fontSize: "33px" }} />

                <div className="review">
                    <p className="paragraph">
                        {activeReview && reviews.length > 0 && (
                            (() => {
                                const review = reviews.find((review) => review.id === activeReview);
                                if (review) {
                                    const { review: reviewText } = review;
                                    if (reviewText.length > 178) {
                                        return t(reviewText).slice(0, 178) + "...";
                                    } else {
                                        return t(reviewText);
                                    }
                                }
                                return ""; 
                            })()
                        )}
                    </p>
                </div>

                <div className="customers">
                    {
                        reviews && reviews.map((review) => {
                            return (
                                <div key={review.id} className={`customer ${activeReview === review.id ? 'active' : ''}`} onClick={() => setActiveReview(review.id)}>
                                    <div className="image">
                                        <img src={review.image} alt="" />
                                    </div>
                                    <div className="info">
                                        <p className='fw-bolder'>{review.name}</p>
                                        <small >{t(review.role)}</small>
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

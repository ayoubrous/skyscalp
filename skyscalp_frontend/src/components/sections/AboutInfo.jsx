import React, { useState } from 'react'
import journeyImg from '../../assets/images/journey.png'
import estimateImg from '../../assets/images/estimate.png'
import dreamImg from '../../assets/images/dream.png'
import { useTranslation } from 'react-i18next'
import AnimatedNumbers from "react-animated-numbers";
import { FaAngleRight } from 'react-icons/fa6'
import Estimate from './Estimate'

export default function AboutInfo() {
    const [t] = useTranslation()

    const [faqs, setFaqs] = useState([
        {
            id: 1,
            question: 'faqQ1',
            answer: "faqA1",
        },
        {
            id: 2,
            question: 'faqQ2',
            answer: "faqA2",
        },
        {
            id: 3,
            question: 'faqQ3',
            answer: 'faqA3',
        },
    ])
    const [showFAQ, setShowFAQ] = useState({});
    const handleToggle = (id) => {
        setShowFAQ((prevShowFAQ) => ({
            ...prevShowFAQ,
            [id]: !prevShowFAQ[id] || false,
        }));
    }
    return (
        <>
            <section className="journey flexSection flex-reverse">
                <div className="custom-container">
                    <div className="split">
                        <div className="image">
                            <img src={journeyImg} alt="" />
                        </div>
                        <div className="content mt-5">
                            <h2 className=' fw-bolder mb-3'>{t("ourJourney")}</h2>
                            <p className="paragraph mb-3 mt-5 color-secondary">{t("journeyDescription")}</p>

                            <div className="achievements">
                                <div className="ach-card">
                                    <h2 className=" d-flex align-items-center">
                                        <AnimatedNumbers
                                            includeComma
                                            transitions={(index) => ({
                                                type: "spring",
                                                duration: index + 1,
                                            })}
                                            animateToNumber={200}
                                            fontStyle={{
                                                fontSize: 27,
                                                color: "white",
                                                fontWeight: "bolder"
                                            }}
                                        />
                                        <span className="ms-2 text-white fw-bolder"> +</span>
                                    </h2>
                                    <p className="">{t("happyCustomers")}</p>
                                </div>
                                <div className="ach-card">
                                    <h2 className=" d-flex align-items-center">
                                        <AnimatedNumbers
                                            includeComma
                                            transitions={(index) => ({
                                                type: "spring",
                                                duration: index + 0.3,
                                            })}
                                            animateToNumber={10}
                                            fontStyle={{
                                                fontSize: 27,
                                                color: "white",
                                                fontWeight: "bolder"
                                            }}
                                        />
                                        <span className="ms-1 text-white fw-bolder">K+</span>
                                    </h2>
                                    <p className="">{t("properties")}</p>
                                </div>
                                <div className="ach-card">
                                    <h2 className=" d-flex align-items-center">
                                        <AnimatedNumbers
                                            includeComma
                                            transitions={(index) => ({
                                                type: "spring",
                                                duration: index + 1,
                                            })}
                                            animateToNumber={10}
                                            fontStyle={{
                                                fontSize: 27,
                                                color: "white",
                                                fontWeight: "bolder"
                                            }}
                                        />
                                        <span className="ms-2 text-white fw-bolder"> +</span>
                                    </h2>
                                    <p className="">{t("experience")}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="dream flexSection">
                <div className="custom-container">
                    <div className="split">
                        <div className="image">
                            <img src={dreamImg} alt="" />
                        </div>
                        <div className="content mt-3">
                            <h2 className=' fw-bolder mb-3'>{t("ourDream")}</h2>
                            <p className="paragraph mb-3 mt-5 color-secondary">{t("dreamDescription")}</p>

                            <div className="list">
                                <li className='mb-2 color-secondary'>{t("dreamList1")}</li>
                                <li className='mb-2 color-secondary'>{t("dreamList2")}</li>
                                <li className='mb-2 color-secondary'>{t("dreamList3")}</li>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Estimate />

            <section className="faq-section">
                <div className="custom-container">
                    <h1 className="fw-bolder text-center mb-4 color-primary">{t("Frequently Asked Questions")}</h1>

                    <div className="faq-container my-5">
                        {faqs.map((faq) => (
                            <div className={`faq ${showFAQ[faq.id] ? 'show' : ''}`} key={faq.id}>
                                <div className="question faq-row" onClick={() => handleToggle(faq.id)}>
                                    <FaAngleRight className='arrow-icon' />
                                    <p className='paragraph text-dark fw-bold'>{t(faq.question)}</p>
                                </div>
                                <p className="answer faq-row paragraph bg-light">{t(faq.answer)}</p>
                            </div>
                        ))}

                    </div>

                </div>
            </section>


        </>
    )
}

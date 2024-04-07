import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Breadcrumb from '../components/sections/Breadcrumb'
import { useTranslation } from 'react-i18next'
import ContactUs from '../components/sections/ContactUs'
import Footer from '../components/sections/Footer'
import Estimate from '../components/sections/Estimate'
import BlogSection from '../components/sections/BlogSection'
import image from '../assets/images/estimate.png'

export default function ViewBlog() {
    const [t] = useTranslation()

    return (
        <>
            <Navbar />
            <Breadcrumb title="FINANCIAL AID FOR YOUR RENOVATION WORK" link={t("blog")} />

            <section className="view-blog">
                <div className="custom-container">
                    <img src={image} alt="" style={{ width: "100%" }} />
                    <small className=" color-secondary text-end float-end">Posted On 22 March 2022</small>

                    <h3 className='fw-bolder mt-5 mb-3'>What Are Experts Saying About the Spring Housing Market?</h3>
                    <p className="color-secondary mb-2">Where we are right now is the best of both worlds. Price increases are slowing, which is good for buyers, and prices are still relatively high, which is good for sellers.”
                        Skylar Olsen, Chief Economist, Zillow</p>
                    <p className="color-secondary mb-2">While mortgage rates remain elevated, home shoppers who are looking to buy this spring could find more affordable homes on the market than they saw at the same time last year. Specifically, there were 20.6% more homes available for sale ranging between $200,000 and $350,000 in February 2024 than a year ago, surpassing growth in other price ranges.</p>
                    <p className="color-secondary mb-2">If you’re planning to move soon, you might be wondering if there’ll be more homes to choose from, where prices and mortgage rates are headed, and how to navigate today’s market. If so, here’s what the professionals are saying about what’s in store for this season.
                        Odeta Kushi, Deputy Chief Economist, First American:</p>
                    <p className="color-secondary mb-2">If you’re planning to move soon, you might be wondering if there’ll be more homes to choose from, where prices and mortgage rates are headed, and how to navigate today’s market. If so, here’s what the professionals are saying about what’s in store for this season.
                        Odeta Kushi, Deputy Chief Economist, First American:</p>
                    <p className="color-secondary mb-2">If you’re planning to move soon, you might be wondering if there’ll be more homes to choose from, where prices and mortgage rates are headed, and how to navigate today’s market. If so, here’s what the professionals are saying about what’s in store for this season.
                        Odeta Kushi, Deputy Chief Economist, First American:</p>

                </div>
            </section>

            <BlogSection />
            <Footer />
        </>
    )
}

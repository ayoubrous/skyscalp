import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Breadcrumb from '../components/sections/Breadcrumb'
import { useTranslation } from 'react-i18next'
import ContactUs from '../components/sections/ContactUs'
import Footer from '../components/sections/Footer'
import Estimate from '../components/sections/Estimate'
import BlogSection from '../components/sections/BlogSection'
import image from '../assets/images/estimate.png'
import { useLocation, useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Lottie from 'lottie-react'
import loader from '../assets/images/skyscalp-loader.json'

export default function ViewBlog() {
    const [t] = useTranslation()

    const [articleID, setArticleID] = useState('')
    const [uploadedImage, setUploadedImage] = useState('')
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const [order, setOrder] = useState()
    const [createdAt, setCreatedAt] = useState()


    const [isLoading, setIsLoading] = useState(false)
    const location = useLocation()

    let params = useParams()
    useEffect(() => {
        setIsLoading(true)
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/getArticleById/${params.id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setIsLoading(false)
                if (result.status) {
                    setArticleID(result.data._id);
                    setTitle(result.data.title);
                    setDescription(result.data.description);
                    setOrder(result.data.order);
                    setUploadedImage(result.data.image)
                    setCreatedAt(result.data.createdAt)
                }
                else {
                    toast.error(result.message)
                }
            })
            .catch((error) => {
                setIsLoading(false);
                console.error(error);
            });

    }, [params])
    return (
        <>
            <Toaster />
            <div className={`lottie-wrapper ${isLoading ? 'show' : ''}`}>
                <Lottie className='loader' animationData={loader} loop={true} />
            </div>
            <Navbar />
            <Breadcrumb title={title} link={t("article")} />

            <section className="view-blog">
                <div className="custom-container">
                    <img src={uploadedImage} alt="" style={{ width: "100%" }} />
                    <small className=" color-secondary text-end float-end">Posted On {createdAt && new Date(createdAt).toDateString()}</small>

                    <h3 className='fw-bolder mt-5 mb-3'>{title}</h3>
                    <div className="color-secondary mb-2" dangerouslySetInnerHTML={{ __html: description }}></div>

                </div>
            </section>

            <BlogSection />
            <Footer />
        </>
    )
}

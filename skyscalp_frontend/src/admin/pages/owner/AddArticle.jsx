import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../../components/owner/Sidebar'
import Header from '../../components/Header'
import { FaXmark } from 'react-icons/fa6'
import { FaCloudUploadAlt, FaEdit, FaTools } from 'react-icons/fa'
import { Link, useLocation, useParams } from 'react-router-dom'
import loader from '../../../assets/images/skyscalp-loader.json'

import toast, { Toaster } from 'react-hot-toast';
import { uploadImage } from '../../utils/uploadImage'
import ClipLoader from "react-spinners/ClipLoader";
import Lottie from 'lottie-react'
import Editor from '../../components/Editor'
import { useTranslation } from 'react-i18next'


export default function AddArticle() {
    const [t] = useTranslation()

    const imageUploadRef = useRef()

    const [articleID, setArticleID] = useState('')
    const [showUploadedImages, setShowUploadedImages] = useState([])
    const [uploadedImage, setUploadedImage] = useState('')
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const [order, setOrder] = useState()


    const [isLoading, setIsLoading] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false)
    const [updatePage, setUpdatePage] = useState(false)
    const location = useLocation()


    const user = localStorage.getItem("user")
    const token = JSON.parse(user).token

    let params = useParams()
    useEffect(() => {
        const { pathname } = location;
        if (pathname !== '/admin/add-article') {
            setIsLoading(true)
            setUpdatePage(true)
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
                    }
                    else {
                        toast.error(t("Error getting data"))
                    }
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.error(error);
                });
        }

    }, [])

    const hanldeUploadClick = () => {
        imageUploadRef.current.click()
    }

    const handleImageChange = async (e) => {
        const files = e.target.files;
        setUploadingImage(true);
        try {
            const response = await uploadImage(files[0])
            setUploadingImage(false);
            if (response.status) {
                setUploadedImage(response.url)
                setShowUploadedImages(true)
            }
            else {
                toast.error(t("Error proceeding request"))
            }
        } catch (error) {
            console.error("Error uploading image:", error);
        }

        setUploadingImage(false);

    };

    const removeImage = () => {
        setUploadedImage('');
    };

    const validateFields = () => {
        if (
            title === "" ||
            description === "" ||
            uploadedImage.length === 0
        ) {
            return false
        }
        else {
            return true
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (!validateFields()) {
            toast.error(t("Fill out all the required fields"))
        }
        else {
            setIsLoading(true)
            const data = {
                image: uploadedImage,
                title: title,
                description: description,
                order: order,
            };


            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${token}`)


            const raw = JSON.stringify(data);

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch(`${process.env.REACT_APP_SERVER_URL}/api/addArticle`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setIsLoading(false)
                    if (result.status) {
                        toast.success(t("Article Published Successfully"))
                    }
                    else {
                        toast.error(t("Error proceeding request"))
                    }
                })
                .catch((error) => {
                    console.error(error)
                    setIsLoading(false)
                });

        }
    }

    const handleUpdate = e => {
        e.preventDefault()

        if (!validateFields()) {
            toast.error(t("Fill out all the required fields"))
        }
        else {
            setIsLoading(true)
            const data = {
                image: uploadedImage,
                title: title,
                description: description,
                order: order,
            };


            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${token}`)

            console.log(data)
            const raw = JSON.stringify(data);

            const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch(`${process.env.REACT_APP_SERVER_URL}/api/updateArticle/${articleID}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setIsLoading(false)
                    if (result.status) {
                        toast.success(t("Article Updated Successfully"))
                    }
                    else {
                        toast.error(t("Error proceeding request"))
                    }
                })
                .catch((error) => {
                    console.error(error)
                    setIsLoading(false)
                });

        }
    }

    const resetAllFields = () => {
        setUploadedImage('');
        setTitle('');
        setDescription('');
        setOrder();
    }


    return (
        <>
            <Toaster />
            <div className={`lottie-wrapper ${isLoading ? 'show' : ''}`}>
                <Lottie className='loader' animationData={loader} loop={true} />
            </div>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">
                <Sidebar />

                <div className="body-wrapper">
                    <Header />
                    <div className="container-fluid">
                        {
                            updatePage ?
                                (
                                    <>
                                        <h2 className='fw-bolder'>{t("Update Article")}</h2>
                                        <small className='mb-3'>{t("Update the desired fields and retain others")}</small>
                                    </>

                                ) :
                                (
                                    <>
                                        <h2 className='fw-bolder'>{t("Publish New Article")} </h2>
                                        <small className='mb-3'>{t("Fill out all the required fields")}</small>
                                    </>
                                )
                        }


                        <div className="d-flex justify-content-end">
                            <a href=""></a>
                            <Link to='/'>
                                {/* <button className="outline-btn py-1 px-2">+ Add New</button> */}
                            </Link>
                        </div>

                        <div className="card px-3 py-4 my-4 publish-form">
                            <form action="" className="form" onSubmit={updatePage ? handleUpdate : handleSubmit}>

                                <div className="row mb-3">
                                    <div className="col-12 images-section">
                                        <div className="upload-image" onClick={hanldeUploadClick}>
                                            <input type="file" accept='image/*' onChange={handleImageChange} name="" id="" className='invisible' ref={imageUploadRef} />
                                            <FaCloudUploadAlt />
                                            <p>{t("Upload Image")}</p>
                                        </div>
                                        {
                                            uploadingImage && (
                                                <>
                                                    <ClipLoader
                                                        color="#076C8F"
                                                        loading={uploadingImage}
                                                        size={20}
                                                        aria-label="Loading Spinner"
                                                        data-testid="loader"
                                                        className='mt-1'
                                                    />
                                                    <p>{t("Uploading Image")} </p>
                                                </>

                                            )
                                        }

                                        <div className={`uploaded-images ${showUploadedImages ? 'show' : ''}`}>
                                            {uploadedImage &&
                                                <div className="image">
                                                    <FaXmark onClick={() => removeImage()} />
                                                    <img src={uploadedImage} alt="" />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="form-group mb-2">
                                        <label htmlFor="" className='mb-1'>{t("Sort Order")}</label>
                                        <input type="number" className="custom-input" onChange={e => setOrder(e.target.value)} value={order} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="" className='mb-1'>{t("title")}*</label>
                                        <input type="text" className="custom-input" onChange={e => setTitle(e.target.value)} value={title} />
                                    </div>
                                </div>


                                <div className="row mb-3">
                                    <div className="form-group col-12">
                                        <label htmlFor="" className='mb-1'>{t("description")}*</label>
                                        <Editor description={description} setDescription={setDescription} />
                                    </div>
                                </div>

                                <div className="row mb-2">
                                    <div className="form-group d-flex align-items-center justify-content-end gap-2">
                                        <div className="outline-btn py-2" onClick={resetAllFields}>{t("resetFields")}</div>
                                        {/* <button className="custom-btn" type='submit'>Publish</button> */}
                                        <button className="custom-btn" type='submit'>
                                            <div className='d-flex align-items-center justify-content-center'>
                                                <ClipLoader
                                                    color="#fff"
                                                    loading={isLoading}
                                                    size={20}
                                                    aria-label="Loading Spinner"
                                                    data-testid="loader"
                                                />
                                                {
                                                    !isLoading && t("publish")
                                                }

                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

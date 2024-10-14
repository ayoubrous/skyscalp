import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { FaBuilding, FaEye, FaRegTrashCan, FaTrash, FaUser } from 'react-icons/fa6'
import { FaEdit, FaTools } from 'react-icons/fa'
import { BsBuildingsFill } from 'react-icons/bs'
import { TbCarCrane } from 'react-icons/tb'
import logo from '../assets/images/profile/user-1.jpg'
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Lottie from 'lottie-react'
import loader from '../../assets/images/skyscalp-loader.json'
import Swal from 'sweetalert2'
import Footer from '../components/Footer'
import { useTranslation } from 'react-i18next'

export default function Messages() {
    const [t] = useTranslation()

    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     setLoading(true)
    //     const requestOptions = {
    //         method: "GET",
    //         redirect: "follow"
    //     };

    //     const user = JSON.parse(localStorage.getItem("user"))

    //     fetch(`${process.env.REACT_APP_SERVER_URL}/api/getMessagesByUserID?id${user.userID}`, requestOptions)
    //         .then((response) => response.json())
    //         .then((result) => {
    //             setLoading(false)
    //             if (result.status) {
    //                 setMessages(result.data)
    //             }
    //             else {
    //                 toast.error(result.message)
    //             }
    //         })
    //         .catch((error) => {
    //             setLoading(false);
    //             console.error(error);
    //         });
    // }, [])

    useEffect(() => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem("user"));
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/getMessagesByUserID?id=${user.userID}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    // console.log(result.data)
                    
                    // Fetch product details for each message
                    const promises = result.data.map(message => {
                        if (message.productID !== null) {
                            return fetchProductDetails(message.productID, message.collectionReference);
                        }
                        return Promise.resolve(null);
                    });

                    Promise.all(promises)
                        .then(details => {
                            // Merge product details with messages

                            const messagesWithDetails = result.data.map((message, index) => {
                                return {
                                    ...message,
                                    details: details[index] === undefined ? 'Product Not Found' : details[index]
                                };
                            });
                            setMessages(messagesWithDetails);
                            setLoading(false);

                        })
                        .catch(error => {
                            console.error("Error fetching product details:", error);
                            toast.error("Error fetching product details");
                        });
                } else {
                    toast.error(result.message);
                }
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
    }, []);

    const fetchProductDetails = async (productID, collectionReference) => {
        // const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/getProductDetails?id=${productID}`);
        // const result = await response.json();
        // if (result.status) {
        //     return result.data;
        // } 


        try {
            if (collectionReference === "properties") {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/getPropertyById/${productID}`);
                const result = await response.json();
                if (result.status) {
                    return { ...result.data, collectionReference: collectionReference };
                } else {
                    return null;
                }
            }
            else if (collectionReference === "materials") {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/getProductById/${productID}`);
                const result = await response.json();
                if (result.status) {
                    // return result.data;
                    return { ...result.data, collectionReference: collectionReference };

                } else {
                    return null;
                }
            }
            else if (collectionReference === "services") {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/getServiceById/${productID}`);
                const result = await response.json();
                if (result.status) {
                    // return result.data;
                    return { ...result.data, collectionReference: collectionReference };

                } else {
                    return null;
                }
            }
        } catch (error) {
            console.error("Error fetching product details:", error);
            return null;
        }
    };


    const handleViewMessage = (id) => {
        const message = messages.find(msg => msg._id === id);

        if (message) {
            // If message is found, display it in SweetAlert2
            Swal.fire({
                title: t('Message Details'),
                html: `
                <div>
                    <p className="mb-1" style={{fontSize: "12px"}}><b>${t("email")}:</b> ${message.email}</p>
                    <p className="mb-1" style={{fontSize: "12px"}}><b>${t("phone")}:</b> ${message.phone}</p>
                    <p className="mb-1" style={{fontSize: "12px"}}><b>${t("message")}:</b></p>
                    <p className="mb-1" style={{fontSize: "12px"}}>${message.message}</p>
                    
                </div>
                `,
                showCloseButton: true,
                showCancelButton: false,
                focusConfirm: false,
                confirmButtonText: t('Close'),
            });
        } else {
            // If message is not found, show error message
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Message not found!',
            });
        }
    }


    return (
        <>
            <Toaster />
            <div className={`lottie-wrapper ${loading ? 'show' : ''}`}>
                <Lottie className='loader' animationData={loader} loop={true} />
            </div>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">
                <Sidebar />

                <div className="body-wrapper">
                    <Header />
                    <div className="container-fluid">
                        <h4 className='fw-bolder mb-3'>{t("messages")}</h4>

                        <div className="d-flex justify-content-end">
                            <a href=""></a>
                            <Link to='/'>
                                {/* <button className="outline-btn py-1 px-2">+ Add New</button> */}
                            </Link>
                        </div>

                        <div className="table-container mt-2">
                            <table className="table dashboard-table">
                                <thead>
                                    <tr>
                                        <th className='col-1'>S. No</th>
                                        <th className='col-2'>{t("User email")}</th>
                                        <th className='col-3'>{t("message")}</th>
                                        <th className='col-2'>{t("received")} {t("on")}</th>
                                        <th className='col-2'>{t("date")}</th>
                                        <th className='col-2'>{t("action")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        messages &&
                                            messages.length > 0 ?
                                            messages.map((data, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{data.email}</td>
                                                        <td>
                                                            {data.message && data.message.length > 0 ?
                                                                (data.message.length > 30 ?
                                                                    data.message.substring(0, 30) + '...' :
                                                                    data.message)
                                                                : ""}
                                                        </td>
                                                        <td>{data?.details?.title ? data?.details?.title : data.details}</td>
                                                        <td>{data.createdAt && new Intl.DateTimeFormat('en-GB').format(new Date(data.createdAt))}</td>
                                                        <td>
                                                            {/* <a href={`mailto:${data.email}`}>
                                                                <button className="custom-btn px-2 py-1" style={{ fontSize: "12px" }}>Reply</button>
                                                            </a> */}
                                                            <button className="custom-btn px-2 py-1 ms-1" style={{ fontSize: "12px" }} onClick={() => handleViewMessage(data._id)}>{t("view")}</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            : (
                                                <tr className='border'>
                                                    <td colSpan="7" className="text-center">{t("noProductsFound")}</td>
                                                </tr>
                                            )
                                    }



                                </tbody>
                            </table>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )
}

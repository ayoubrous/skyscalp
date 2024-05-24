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

export default function Messages() {
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
                    // Fetch product details for each message
                    const promises = result.data.map(message => {
                        if (message.productID !== null) {
                            return fetchProductDetails(message.productID);

                        }
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

    const fetchProductDetails = async (productID) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/getProductDetails?id=${productID}`);
        const result = await response.json();
        if (result.status) {
            return result.data;
        } 
    };


    const handleViewMessage = (id) => {
        const message = messages.find(msg => msg._id === id);

        if (message) {
            // If message is found, display it in SweetAlert2
            Swal.fire({
                title: 'Message Details',
                html: `
                <div>
                    <p className="mb-1" style={{fontSize: "12px"}}><b>Email:</b> ${message.email}</p>
                    <p className="mb-1" style={{fontSize: "12px"}}><b>Phone:</b> ${message.phone}</p>
                    <p className="mb-1" style={{fontSize: "12px"}}><b>Message:</b></p>
                    <p className="mb-1" style={{fontSize: "12px"}}>${message.message}</p>
                    
                </div>
                `,
                showCloseButton: true,
                showCancelButton: false,
                focusConfirm: false,
                confirmButtonText: 'Close',
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
                        <h2 className='fw-bolder mb-3'>Messages Received</h2>

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
                                        <th className='col-2'>User email</th>
                                        <th className='col-3'>Mesasge</th>
                                        <th className='col-2'>Received On</th>
                                        <th className='col-2'>Time</th>
                                        <th className='col-2'>Action</th>
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
                                                        <td>{data.details.title ? data.details.title : data.details}</td>
                                                        <td>{new Date(data.createdAt).toDateString()}</td>
                                                        <td>
                                                            <a href={`mailto:${data.email}`}>
                                                                <button className="custom-btn px-2 py-1" style={{ fontSize: "12px" }}>Reply</button>
                                                            </a>
                                                            <button className="custom-btn px-2 py-1 ms-1" style={{ fontSize: "12px" }} onClick={() => handleViewMessage(data._id)}>View</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            : (
                                                <tr className='border'>
                                                    <td colSpan="7" className="text-center">No Items Found</td>
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

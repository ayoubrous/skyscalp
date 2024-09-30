import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/owner/Sidebar'
import Header from '../../components/Header'
import { FaBuilding, FaEye, FaRegTrashCan, FaTrash, FaUser } from 'react-icons/fa6'
import { FaEdit, FaTools } from 'react-icons/fa'
import { BsBuildingsFill } from 'react-icons/bs'
import { TbCarCrane } from 'react-icons/tb'
import { Link, useLocation } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Lottie from 'lottie-react'
import loader from '../../../assets/images/skyscalp-loader.json'

import { formatPrice } from '../../../utils/formatPrice'
import { useTranslation } from 'react-i18next'

export default function Materials() {

    const [t] = useTranslation()
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [paginationData, setPaginationData] = useState({});
    const [currentPage, setCurrentPage] = useState(1)

    const [activeTab, setActiveTab] = useState('machinery')
    const location = useLocation()

    useEffect(() => {
        location.state &&
            setActiveTab(location.state.activeCat)
    }, [location])


    const handleTabChange = (tab) => {
        setActiveTab(tab)
        // loadData(currentPage)
    }

    const loadData = (page) => {
        const user = localStorage.getItem("user")
        const token = JSON.parse(user).token
        setLoading(true);
        const requestOptions = {
            method: "GET",
            redirect: "follow",
            headers: {
                'Authorization': `Bearer ${token}` // Add the token to the request
            }
        };

        let apiUrl;
        if (activeTab === 'machinery') {
            apiUrl = `${process.env.REACT_APP_SERVER_URL}/api/getMachinery`;
        }
        else if (activeTab === 'materials') {
            apiUrl = `${process.env.REACT_APP_SERVER_URL}/api/getConstruction`;
        }
        else if (activeTab === 'furniture') {
            apiUrl = `${process.env.REACT_APP_SERVER_URL}/api/getFurniture`;
        }

        // fetch(`${process.env.REACT_APP_SERVER_URL}/api/getProducts?page=${page}&limit=15`, requestOptions)
        fetch(`${apiUrl}/?page=${page}&limit=15`, requestOptions)

            .then((response) => response.json())
            .then((result) => {
                setLoading(false);
                if (result.status) {
                    setProducts(result.data.documents);
                    setPaginationData({
                        currentPage: result.data.currentPage,
                        totalPages: result.data.totalPages,
                        hasNextPage: result.data.hasNextPage,
                        hasPrevPage: result.data.hasPrevPage,
                        totalItems: result.data.totalProperties,
                    })
                } else {
                    toast.error(t("Error proceeding request"));
                }
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
    };

    useEffect(() => {
        loadData(1);
    }, [activeTab]);


    const handleNextPage = (page) => {
        loadData(page)
        setCurrentPage(page)
    };

    const handlePrevPage = (page) => {
        loadData(page)
        setCurrentPage(page)
    };

    const handleDelete = (id) => {
        let surity = window.confirm(t("Are you sure to delete this listing?"))
        if (surity) {
            const requestOptions = {
                method: "DELETE",
                redirect: "follow"
            };
            fetch(`${process.env.REACT_APP_SERVER_URL}/api/deleteProduct/${id}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.status) {
                        toast.success(t("Listing deleted successfully"))
                        loadData(currentPage)
                    }
                    else {
                        toast.error(t("Error proceeding request"))
                    }
                })
                .catch((error) => console.error(error));
        }
    }

    const toggleFeatured = (id, e) => {
        setLoading(true);
        const isChecked = e.target.checked;
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/updateProductFeaturedStatus/${id}/${isChecked}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoading(false);

                if (result.status) {
                    toast.success(t("Product Updated Successfully"))

                    loadData(currentPage)
                }
                else {
                    // toast.error("Error getting states data")
                    console.log(result.message)
                }
            })
            .catch((error) => console.error(error));
    };

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
                        <h2 className='fw-bolder mb-3'>{t("Published Materials")}</h2>
                        {/* <div className="tabs">
                            <p>Machinery & Tools</p>
                            <p>Building Materials</p>
                            <p>Furniture & Appliances</p>
                        </div> */}
                        <ul className="nav nav-tabs" style={{ cursor: "pointer" }}>
                            <li className="nav-item">
                                <p className={`nav-link text-dark ${activeTab === "machinery" ? 'active' : ''}`} aria-current="page" onClick={() => handleTabChange('machinery')}>{t("machineryTools")}</p>
                            </li>
                            <li className="nav-item" style={{ cursor: "pointer" }}>
                                <p className={`nav-link text-dark ${activeTab === "materials" ? 'active' : ''}`} aria-current="page" onClick={() => handleTabChange('materials')}>{t("Construction Material")}</p>

                            </li>
                            <li className="nav-item" style={{ cursor: "pointer" }}>
                                <p className={`nav-link text-dark ${activeTab === "furniture" ? 'active' : ''}`} aria-current="page" onClick={() => handleTabChange('furniture')}>{t("furnitureAppliances")}</p>

                            </li>
                        </ul>
                        <div className="table-container mt-2">
                            <table className="table table-bordered table-hover dashboard-table">
                                <thead >
                                    <tr>
                                        <th className='col-2'>{t("user")}</th>
                                        <th className='col-2'>{t("title")}</th>
                                        {/* <th className='col-2'>Address</th> */}
                                        {/* <th className='col-2'>Category</th> */}
                                        <th className='col-2'>{t("budget")}</th>
                                        <th className='col-1'>{t("favourites")}</th>
                                        <th className='col-2'>{t("published")}</th>
                                        <th className='col-2'>{t("Updated At")}</th>
                                        <th className='col-1'>{t("Featured")}</th>
                                        <th className='col-1'>{t("action")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products &&
                                        products.map((data, i) => {
                                            return (
                                                <tr key={data._id}>
                                                    <td>
                                                        <p>{data.user.username}</p>
                                                        <small>{data.user.email}</small>
                                                    </td>
                                                    {/* <td>{data.title}</td> */}
                                                    <td>{data.title && (data.title.slice(0, 20)) + (data.title.length > 20 ? "..." : "")}</td>

                                                    {/* <td><p>{data.city}</p><p>{data.country}</p></td> */}
                                                    {/* <td>{data.materialGroup}</td> */}
                                                    <td>MAD {formatPrice(data.budget)}</td>
                                                    <td>{data.toFavourites && data.toFavourites.length}</td>
                                                    <td>{new Date(data.createdAt).toLocaleString('en-GB', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}</td>
                                                    <td>{new Date(data.updatedAt).toLocaleString('en-GB', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}</td>
                                                    <td>
                                                        <input type="checkbox" checked={data.featured} onChange={(e) => toggleFeatured(data._id, e)} />
                                                    </td>
                                                    <td>
                                                        <FaTrash className='text-danger ms-2' style={{ cursor: "pointer" }} onClick={() => handleDelete(data._id)} />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>

                            <div className="buttons-pagination mb-3">
                                <button className="custom-btn py-1 px-2 btn-sm " disabled={!paginationData.hasPrevPage} onClick={() => handlePrevPage(paginationData.currentPage - 1)}>{t("Previous")}</button>
                                <button className="custom-btn py-1 px-2 btn-sm ms-1" disabled={!paginationData.hasNextPage} onClick={() => handleNextPage(paginationData.currentPage + 1)}>{t("Next")}</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/owner/Sidebar'
import Header from '../../components/Header'
import { FaBuilding, FaEye, FaRegTrashCan, FaTrash, FaUser } from 'react-icons/fa6'
import { FaEdit, FaTools } from 'react-icons/fa'
import { BsBuildingsFill } from 'react-icons/bs'
import { TbCarCrane } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Lottie from 'lottie-react'
import loader from '../../../assets/images/skyscalp-loader.json'

import { formatPrice } from '../../../utils/formatPrice'
import Pagination from '../../../components/utils/Pagination'
import { useTranslation } from 'react-i18next'

export default function Properties() {
    const [t] = useTranslation()

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [paginationData, setPaginationData] = useState({});
    const [currentPage, setCurrentPage] = useState(1)

    const loadData = (page) => {
        setLoading(true);
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/getProperties?page=${page}&limit=15`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoading(false);
                if (result.status) {
                    // console.log(result)
                    setProperties(result.data.documents);
                    setPaginationData({
                        currentPage: result.data.currentPage,
                        totalPages: result.data.totalPages,
                        hasNextPage: result.data.hasNextPage,
                        hasPrevPage: result.data.hasPrevPage,
                        totalItems: result.data.totalProperties,
                    })
                } else {
                    console.log(t("Error proceeding request"));
                }
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
    };

    useEffect(() => {
        loadData(1);
    }, []);


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
            fetch(`${process.env.REACT_APP_SERVER_URL}/api/deleteProperty/${id}`, requestOptions)
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
        const isChecked = e.target.checked;
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/updatePropertyFeaturedStatus/${id}/${isChecked}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
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
                        <h2 className='fw-bolder mb-3'>{t("Published Properties")}</h2>
                        <div className="d-flex justify-content-end mb-3">
                        </div>
                        <div className="table-container mt-2">
                            <table className="table table-bordered table-hover dashboard-table">
                                <thead >
                                    <tr>
                                        <th className='col-2'>{t("user")}</th>
                                        <th className='col-2'>{t("title")}</th>
                                        {/* <th className='col-2'>Address</th> */}
                                        <th className='col-1'>{t("type")}</th>
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
                                        properties &&
                                        properties.map((data, i) => {
                                            return (
                                                <tr key={data._id}>
                                                    <td>
                                                        <p>{data.user.username}</p>
                                                        <small>{data.user.email}</small>
                                                    </td>
                                                    {/* <td>{data.title}</td> */}
                                                    <td>{data.title && (data.title.slice(0, 20)) + (data.title.length > 20 ? "..." : "")}</td>

                                                    {/* <td>{data.city} - {data.country}</td> */}
                                                    <td>{(data.type && data.type.charAt(0).toUpperCase() + data.type.slice(1))}</td>
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
                                <button className="btn btn-outline btn-primary btn-sm " disabled={!paginationData.hasPrevPage} onClick={() => handlePrevPage(paginationData.currentPage - 1)}>{t("Previous")}</button>
                                <button className="btn btn-outline btn-primary btn-sm ms-1" disabled={!paginationData.hasNextPage} onClick={() => handleNextPage(paginationData.currentPage + 1)}>{t("Next")}</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

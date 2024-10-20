import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/owner/Sidebar'
import Header from '../../components/Header'
import { FaBuilding, FaEye, FaRegTrashCan, FaTrash, FaUser } from 'react-icons/fa6'
import { FaEdit, FaTools } from 'react-icons/fa'
import { BsBuildingsFill } from 'react-icons/bs'
import { TbCarCrane } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../../utils/formatPrice'
import toast, { Toaster } from 'react-hot-toast'
import Lottie from 'lottie-react'
import loader from '../../../assets/images/skyscalp-loader.json'
import { useTranslation } from 'react-i18next'
import Pagination from '../../../components/utils/Pagination'

export default function Users() {
    const [t] = useTranslation()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const user = localStorage.getItem("user")
    const token = JSON.parse(user).token
    const [paginationData, setPaginationData] = useState({
        currentPage: 1,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
        totalItems: 0
    });

    const loadData = (pageNumber = 1) => {
        setLoading(true)
        const requestOptions = {
            method: "GET",
            redirect: "follow",
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/getAllUsers?page=${pageNumber}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoading(false)
                if (result.status) {
                    setData(result.data.documents)
                    setPaginationData({
                        currentPage: result.data.currentPage,
                        totalPages: result.data.totalPages,
                        hasNextPage: result.data.hasNextPage,
                        hasPrevPage: result.data.hasPrevPage,
                        totalItems: result.data.totalProperties,
                    });
                }
                else {
                    toast.error(result.message)
                }
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
    }

    const handlePageChange = (pageNumber) => {
        loadData(pageNumber);
    };

    useEffect(() => {
        loadData(1)
    }, [])

    const toggleBlock = (id, status) => {
        let surity = window.confirm(t("Are you sure to block this user?"))
        if (surity) {
            const requestOptions = {
                method: "GET",
                redirect: "follow",
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            };
            fetch(`${process.env.REACT_APP_SERVER_URL}/api/updateUserStatus/${id}/${status}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.status) {
                        toast.success(t("User updated Successfully"))
                        loadData(paginationData.currentPage)
                    }
                    else {
                        toast.error(t("Error proceeding request"))
                    }
                })
                .catch((error) => console.error(error));
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
                        <h2 className='fw-bolder mb-3'>{t("Registered Users")}</h2>

                        <div className="d-flex justify-content-end">
                            <a href=""></a>
                        </div>

                        <div className="table-container mt-2">
                            <table className="table table-bordered dashboard-table">
                                <thead>
                                    <tr>
                                        <th className=''>S. No</th>
                                        <th className=''>{t("username")}</th>
                                        <th className=''>{t("email")}</th>
                                        <th className=''>{t("Verified")}</th>
                                        <th className=''>{t("status")}</th>
                                        <th className=''>{t("action")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className='text-center'>{t("No users found")}</td>
                                        </tr>
                                    )}
                                    {data.map((data, i) => (
                                        <tr key={data._id}>
                                            <td>{((paginationData.currentPage - 1) * 10) + i + 1}</td>
                                            <td>{data.username}</td>
                                            <td>{data.email}</td>
                                            <td>{data.isVerified ? t('Verified') : t('Not Verified')}</td>
                                            <td>
                                                {data.status ? (
                                                    <span className="badge text-bg-success" style={{ fontSize: "12px" }}>{t("active")}</span>
                                                ) : (
                                                    <span className="badge text-bg-danger" style={{ fontSize: "12px" }}>{t("inactive")}</span>
                                                )}
                                            </td>
                                            <td>
                                                {data.status ? (
                                                    <button className="btn btn-danger btn-sm ms-1" onClick={() => toggleBlock(data._id, false)}>{t("Block user")}</button>
                                                ) : (
                                                    <button className="btn btn-success btn-sm ms-1" onClick={() => toggleBlock(data._id, true)}>{t("Unblock user")}</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <Pagination 
                                hasNextPage={paginationData.hasNextPage}
                                hasPrevPage={paginationData.hasPrevPage}
                                onPageChange={handlePageChange}
                                currentPage={paginationData.currentPage}
                                totalPages={paginationData.totalPages}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
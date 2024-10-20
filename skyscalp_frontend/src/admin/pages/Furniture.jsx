import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { FaBuilding, FaEye, FaRegTrashCan, FaTrash, FaUser } from 'react-icons/fa6'
import { FaEdit, FaTools } from 'react-icons/fa'
import { BsBuildingsFill } from 'react-icons/bs'
import { TbCarCrane } from 'react-icons/tb'
import logo from '../assets/images/profile/user-1.jpg'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/formatPrice'
import toast, { Toaster } from 'react-hot-toast'
import Lottie from 'lottie-react'
import loader from '../../assets/images/skyscalp-loader.json'
import Footer from '../components/Footer'
import { useTranslation } from 'react-i18next'
import Pagination from '../../components/utils/Pagination'

export default function Furniture() {
    const [t] = useTranslation()
    const [paginationData, setPaginationData] = useState({
        currentPage: 1,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false,
        totalItems: 0
    });

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const loadData = (pageNumber = 1) => {
        setLoading(true)
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        const user = JSON.parse(localStorage.getItem("user"))

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/getUserProducts/${user.userID}?materialGroup=furniture&page=${pageNumber}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoading(false)
                if (result.status) {
                    setProducts(result.data.documents)
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
                toast.error(t("Error loading data"));
            });
    }

    const handlePageChange = (pageNumber) => {
        loadData(pageNumber);
    };

    useEffect(() => {
        loadData(1);
    }, [])

    const handleDelete = (id) => {
        let surity = window.confirm(t("Are you sure to delete this product?"))
        if (surity) {
            const requestOptions = {
                method: "DELETE",
                redirect: "follow"
            };
            fetch(`${process.env.REACT_APP_SERVER_URL}/api/deleteProduct/${id}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.status) {
                        toast.success(result.message)
                        loadData(paginationData.currentPage)
                    }
                    else {
                        toast.error(t("Error deleting product"))
                    }
                })
                .catch((error) => {
                    console.error(error);
                    toast.error(t("Error deleting product"))
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
                        <h4 className='fw-bolder mb-3'>{t("Published Furniture")}</h4>

                        <div className="d-flex justify-content-end">
                            <Link to='../app/add-furniture'>
                                <button className="outline-btn py-1 px-2">+ {t("publish")} {t("new")}</button>
                            </Link>
                        </div>

                        <div className="table-container mt-2">
                            <table className="table table-bordered table-hover dashboard-table">
                                <thead>
                                    <tr>
                                        {/* <th className=''>S. No</th> */}
                                        <th className='col-3'>{t("title")}</th>
                                        <th className='col-2'>{t("category")}</th>
                                        <th className='col-2'>{t("budget")}</th>
                                        <th className='col-1'>{t("favourites")}</th>
                                        <th className='col-1'>{t("published")}</th>
                                        <th className='col-1'>{t("Updated At")}</th>
                                        <th className='col-1'>{t("status")}</th>
                                        <th className='col-1'>{t("action")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.length === 0 && (
                                        <tr>
                                            <td colSpan={9} className='text-center'>{t("notProductsFound")}</td>
                                        </tr>
                                    )}
                                    {products.map((data, i) => (
                                        <tr key={data._id}>
                                            {/* <td>{((paginationData.currentPage - 1) * 10) + i + 1}</td> */}
                                            <td>{data.title && (data.title.slice(0, 20)) + (data.title.length > 20 ? "..." : "")}</td>
                                            <td>{t(data.category)}</td>
                                            <td>MAD {formatPrice(data.budget)}</td>
                                            <td>{data.toFavourites && data.toFavourites.length}</td>
                                            <td>{data.createdAt && new Intl.DateTimeFormat('en-GB').format(new Date(data.createdAt))}</td>
                                            <td>{data.updatedAt && new Intl.DateTimeFormat('en-GB').format(new Date(data.updatedAt))}</td>
                                            <td>
                                                {data.status ? (
                                                    <span className="badge text-bg-success" style={{ fontSize: "12px" }}>{t("active")}</span>
                                                ) : (
                                                    <span className="badge text-bg-danger" style={{ fontSize: "12px" }}>{t("inactive")}</span>
                                                )}
                                            </td>
                                            <td>
                                                <Link className='mx-1' to={`../furniture/${data._id}`}>
                                                    <FaEye className='color-secondary' />
                                                </Link>
                                                <Link className='mx-1' to={`../app/update-furniture/${data._id}`}>
                                                    <FaEdit className='text-warning' />
                                                </Link>
                                                <Link className='mx-1' onClick={() => handleDelete(data._id)}>
                                                    <FaRegTrashCan className='text-danger' />
                                                </Link>
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
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )
}
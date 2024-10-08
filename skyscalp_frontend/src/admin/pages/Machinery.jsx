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
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'

export default function Machinery() {
    const [t] = useTranslation()


    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)


    const loadData = () => {
        setLoading(true)
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        const user = JSON.parse(localStorage.getItem("user"))

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/getUserProducts/${user.userID}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoading(false)
                // console.log(result)
                if (result.status) {
                    setProducts(result.data)
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
    useEffect(() => {
        loadData()
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
                        loadData()
                    }
                    else {
                        toast.error("Error getting states data")
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
                        <h4 className='fw-bolder mb-1'>{t("Published Machines")}</h4>

                        <div className="d-flex justify-content-end">
                            <a href=""></a>
                            <Link to='../app/add-machines'>
                                <button className="outline-btn py-1 px-2">+ {t("publish")} {t("new")}</button>
                            </Link>
                        </div>

                        <div className="table-container mt-2">
                            <table className="table table-bordered table-hover dashboard-table">
                                <thead>
                                    <tr>
                                        <th className=''>S. No</th>
                                        <th className='col-3'>{t("title")}</th>
                                        <th className='col-2'>{t("application")}</th>
                                        <th className='col-2'>{t("budget")}</th>
                                        <th className='col-1'>{t("favourites")}</th>
                                        <th className='col-1'>{t("published")}</th>
                                        <th className='col-1'>{t("Updated At")}</th>
                                        <th className='col-1'>{t("status")}</th>
                                        <th className='col-1'>{t("action")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products &&
                                        products.length === 0 && (
                                            <tr>
                                                <td colSpan={7} className='text-center'>{t("notProductsFound")}</td>
                                            </tr>
                                        )
                                    }
                                    {
                                        products &&
                                        products.map((data, i) => {
                                            if (data.materialGroup === 'machinery') {
                                                return (
                                                    <tr key={data._id}>
                                                        <td>{i + 1}</td>
                                                        <td>{data.title && (data.title.slice(0, 20)) + (data.title.length > 20 ? "..." : "")}</td>
                                                        <td>{t(data.application)}</td>
                                                        <td>MAD {formatPrice(data.budget)}</td>
                                                        <td>{data.toFavourites && data.toFavourites.length}</td>
                                                        <td>{data.createdAt && new Intl.DateTimeFormat('en-GB').format(new Date(data.createdAt))}</td>
                                                        <td>{data.updatedAt && new Intl.DateTimeFormat('en-GB').format(new Date(data.updatedAt))}</td>
                                                        <td>
                                                            {
                                                                data.status ?
                                                                    (
                                                                        <span className="badge text-bg-success" style={{ fontSize: "12px" }}>{t("active")}</span>
                                                                    ) :
                                                                    (
                                                                        <span className="badge text-bg-danger" style={{ fontSize: "12px" }}>{t("inactive")}</span>
                                                                    )
                                                            }
                                                        </td>
                                                        <td>
                                                            <Link className='mx-1' to={`../machines/${data._id}`}>
                                                                <FaEye className='color-secondary' />
                                                            </Link>
                                                            <Link className='mx-1' to={`../app/update-machine/${data._id}`}>
                                                                <FaEdit className='text-warning' />
                                                            </Link>
                                                            <Link className='mx-1' onClick={() => handleDelete(data._id)}>
                                                                <FaRegTrashCan className='text-danger' />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        })
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

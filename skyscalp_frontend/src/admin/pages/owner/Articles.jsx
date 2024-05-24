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

export default function Articles() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadData = () => {
        setLoading(true);
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/getArticles`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoading(false);
                if (result.status) {
                    setProducts(result.data);
                } else {
                    // toast.error(result.message);
                    console.log(result.message)

                }
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
    };

    useEffect(() => {
        loadData();
    }, []);


    const handleDelete = (id) => {
        let surity = window.confirm("Are you sure to delete this Article?")
        if (surity) {
            const requestOptions = {
                method: "DELETE",
                redirect: "follow"
            };
            fetch(`${process.env.REACT_APP_SERVER_URL}/api/deleteArticle/${id}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.status) {
                        toast.success(result.message)
                        loadData()
                    }
                    else {
                        toast.success(result.message)
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
                        <h2 className='fw-bolder mb-3'>Published Articles</h2>
                        <div className="d-flex justify-content-end">
                            <a href=""></a>
                            <Link to='../admin/add-article'>
                                <button className="outline-btn py-1 px-2">+ Publish New</button>
                            </Link>
                        </div>
                        <div className="table-container mt-2">
                            <table className="table table-bordered table-hover dashboard-table">
                                <thead >
                                    <tr>
                                        <th className='col-1'>S. No</th>
                                        <th className='col-2'>Image</th>
                                        <th className='col-2'>Title</th>
                                        <th className='col-3'>Description</th>
                                        <th className='col-1'>Order</th>
                                        <th className='col-2'>Published On</th>
                                        <th className='col-1'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products &&
                                        products.map((data, i) => {
                                            return (
                                                <tr key={data._id}>
                                                    <td>{i+1}</td>
                                                    <td><img src={data.image} alt="" width={100} /></td>
                                                    <td>{data.title}</td>
                                                    <td><p dangerouslySetInnerHTML={{ __html: data.description.substring(0, 120) }}></p></td>

                                                    <td>{data.order}</td>
                                                    <td>{new Date(data.createdAt).toLocaleString('en-GB', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}</td>
                                                    <td>
                                                        <Link className='mx-1' to={`../article/${data._id}`}>
                                                            <FaEye className='color-secondary' />
                                                        </Link>
                                                        <Link className='mx-1' to={`../admin/update-article/${data._id}`}>
                                                            <FaEdit className='text-warning' />
                                                        </Link>
                                                        <Link className='mx-1' onClick={() => handleDelete(data._id)}>
                                                            <FaRegTrashCan className='text-danger' />
                                                        </Link>

                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

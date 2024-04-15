import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { FaBuilding, FaEye, FaRegTrashCan, FaTrash, FaUser } from 'react-icons/fa6'
import { FaEdit, FaTools } from 'react-icons/fa'
import { BsBuildingsFill } from 'react-icons/bs'
import { TbCarCrane } from 'react-icons/tb'
import logo from '../assets/images/profile/user-1.jpg'
import { Link } from 'react-router-dom'

export default function Properties() {

    return (
        <>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">
                <Sidebar />

                <div className="body-wrapper">
                    <Header />
                    <div className="container-fluid">
                        <h2 className='fw-bolder mb-3'>Published Properties</h2>

                        <div className="d-flex justify-content-end">
                            <a href=""></a>
                            <Link to='/'>
                                <button className="outline-btn py-1 px-2">+ Add New</button>
                            </Link>
                        </div>

                        <div className="table-container mt-2">
                            <table className="table table-bordered dashboard-table">
                                <thead>
                                    <tr>
                                        <th className='col-1'>S. No</th>
                                        <th className='col-2'>Title</th>
                                        <th className='col-2'>Address</th>
                                        <th className='col-1'>Category</th>
                                        <th className='col-1'>Type</th>
                                        <th className='col-1'>Favourites</th>
                                        <th className='col-1'>Status</th>
                                        <th className='col-1'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Title of property</td>
                                        <td>Address of Property</td>
                                        <td>Appartment</td>
                                        <td>Rent</td>
                                        <td>32</td>
                                        <td>
                                            <span class="badge text-bg-warning" style={{ fontSize: "13px" }}>Pending</span>
                                        </td>
                                        <td>
                                            <Link className='mx-1'>
                                                <FaEye className='color-secondary' />
                                            </Link>
                                            <Link className='mx-1'>
                                                <FaEdit className='text-warning' />
                                            </Link>
                                            <Link className='mx-1'>
                                                <FaRegTrashCan className='text-danger' />
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Title of property</td>
                                        <td>Address of Property</td>
                                        <td>Appartment</td>
                                        <td>Rent</td>
                                        <td>32</td>
                                        <td>
                                            <span class="badge text-bg-warning" style={{ fontSize: "13px" }}>Pending</span>
                                        </td>
                                        <td>
                                            <Link className='mx-1'>
                                                <FaEye className='color-secondary' />
                                            </Link>
                                            <Link className='mx-1'>
                                                <FaEdit className='text-warning' />
                                            </Link>
                                            <Link className='mx-1'>
                                                <FaRegTrashCan className='text-danger' />
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Title of property</td>
                                        <td>Address of Property</td>
                                        <td>Appartment</td>
                                        <td>Rent</td>
                                        <td>32</td>
                                        <td>
                                            <span class="badge text-bg-warning" style={{ fontSize: "13px" }}>Pending</span>
                                        </td>
                                        <td>
                                            <Link className='mx-1'>
                                                <FaEye className='color-secondary' />
                                            </Link>
                                            <Link className='mx-1'>
                                                <FaEdit className='text-warning' />
                                            </Link>
                                            <Link className='mx-1'>
                                                <FaRegTrashCan className='text-danger' />
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="py-0 px-6 ">
                            <small className="mb-0 color-secondary">Developed by <a href="" className="pe-1 text-primary text-decoration-underline">MA-Tech</a></small>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

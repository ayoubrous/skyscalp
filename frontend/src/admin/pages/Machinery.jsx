import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { FaBuilding, FaEye, FaRegTrashCan, FaTrash, FaUser } from 'react-icons/fa6'
import { FaEdit, FaTools } from 'react-icons/fa'
import { BsBuildingsFill } from 'react-icons/bs'
import { TbCarCrane } from 'react-icons/tb'
import logo from '../assets/images/profile/user-1.jpg'
import { Link } from 'react-router-dom'

export default function Machinery() {

    return (
        <>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">
                <Sidebar />

                <div className="body-wrapper">
                    <Header />
                    <div className="container-fluid">
                        <h2 className='fw-bolder mb-3'>Published Machinery</h2>

                        <div className="d-flex justify-content-end">
                            <a href=""></a>
                            <Link to='/'>
                                <button className="outline-btn py-1 px-2">+ Add New</button>
                            </Link>
                        </div>

                        <div className="table-container mt-2">
                            <table className="table table-striped dashboard-table">
                                <thead>
                                    <tr>
                                        <th className='col-1'>S. No</th>
                                        <th className='col-2'>Title</th>
                                        <th className='col-2'>Application</th>
                                        <th className='col-1'>Category</th>
                                        <th className='col-1'>Modal</th>
                                        <th className='col-1'>Condtion</th>
                                        <th className='col-1'>Favourites</th>
                                        <th className='col-1'>Status</th>
                                        <th className='col-1'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>4x4 Crane</td>
                                        <td>Earthwork</td>
                                        <td>Cranes</td>
                                        <td>2022</td>
                                        <td>Good</td>
                                        <td>1</td>
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
                                        <td>2</td>
                                        <td>4x4 Crane</td>
                                        <td>Earthwork</td>
                                        <td>Cranes</td>
                                        <td>2022</td>
                                        <td>Good</td>
                                        <td>2</td>
                                        <td>
                                            <span class="badge text-bg-warning" style={{ fontSize: "12px" }}>Pending</span>
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
                                        <td>3</td>
                                        <td>4x4 Crane</td>
                                        <td>Earthwork</td>
                                        <td>Cranes</td>
                                        <td>2022</td>
                                        <td>Good</td>
                                        <td>5</td>
                                        <td>
                                            <span class="badge text-bg-success" style={{ fontSize: "12px" }}>Active</span>
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

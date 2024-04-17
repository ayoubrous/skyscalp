import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { FaBuilding, FaEye, FaRegTrashCan, FaTrash, FaUser } from 'react-icons/fa6'
import { FaEdit, FaTools } from 'react-icons/fa'
import { BsBuildingsFill } from 'react-icons/bs'
import { TbCarCrane } from 'react-icons/tb'
import logo from '../assets/images/profile/user-1.jpg'
import { Link } from 'react-router-dom'

export default function Messages() {

    return (
        <>
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
                            <table className="table table-striped dashboard-table">
                                <thead>
                                    <tr>
                                        <th className='col-1'>S. No</th>
                                        <th className='col-1'>User email</th>
                                        <th className='col-2'>Mesasge</th>
                                        <th className='col-2'>Received On</th>
                                        <th className='col-1'>Time</th>
                                        <th className='col-1'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>email@gmail.com</td>
                                        <td>Hi I want to get the info...</td>
                                        <td>Best Property in your...</td>
                                        <td>12-3-2024</td>
                                        <td>
                                            <button className="custom-btn px-2 py-1" style={{fontSize: "12px"}}>Reply</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>email@gmail.com</td>
                                        <td>Hi I want to get the info...</td>
                                        <td>Best Property in your...</td>
                                        <td>12-3-2024</td>
                                        <td>
                                            <button className="custom-btn px-2 py-1" style={{fontSize: "12px"}}>Reply</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>email@gmail.com</td>
                                        <td>Hi I want to get the info...</td>
                                        <td>Best Property in your...</td>
                                        <td>12-3-2024</td>
                                        <td>
                                            <button className="custom-btn px-2 py-1" style={{fontSize: "12px"}}>Reply</button>
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

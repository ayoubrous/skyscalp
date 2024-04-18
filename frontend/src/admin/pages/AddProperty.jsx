import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { FaBuilding, FaEye, FaRegTrashCan, FaTrash, FaUser } from 'react-icons/fa6'
import { FaEdit, FaTools } from 'react-icons/fa'
import { BsBuildingsFill } from 'react-icons/bs'
import { TbCarCrane } from 'react-icons/tb'
import logo from '../assets/images/profile/user-1.jpg'
import { Link } from 'react-router-dom'

export default function AddProperty() {

    return (
        <>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">
                <Sidebar />

                <div className="body-wrapper">
                    <Header />
                    <div className="container-fluid">
                        <h2 className='fw-bolder'>Publish New Property</h2>
                        <small className='mb-3'>Fill out all the required fields</small>

                        <div className="d-flex justify-content-end">
                            <a href=""></a>
                            <Link to='/'>
                                {/* <button className="outline-btn py-1 px-2">+ Add New</button> */}
                            </Link>
                        </div>

                        <div className="card px-3 py-4 my-4">
                            <form action="" className="form">
                                <div className="row">
                                    <div className="form-group col-6">
                                        <label htmlFor="" className='mb-1'>Title*</label>
                                        <input type="text" className="custom-input" />
                                    </div>
                                    <div className="form-group col-6">
                                        <label htmlFor="" className='mb-1'>Budget (MAD)*</label>
                                        <input type="text" className="custom-input" />
                                    </div>
                                </div>
                            </form>
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

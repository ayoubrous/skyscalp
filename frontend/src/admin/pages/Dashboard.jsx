import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { FaBuilding, FaUser } from 'react-icons/fa6'
import { FaTools } from 'react-icons/fa'
import { BsBuildingsFill } from 'react-icons/bs'
import { TbCarCrane } from 'react-icons/tb'
import logo from '../assets/images/profile/user-1.jpg'

export default function Dashboard() {
  // mongodb+srv://ayoub_skyscalp:sky.scalp.2024@main-skyscalp.aedvf4p.mongodb.net/?retryWrites=true&w=majority&appName=main-skyscalp
  return (
    <>
      <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
        data-sidebar-position="fixed" data-header-position="fixed">
        <Sidebar />

        <div className="body-wrapper">
          <Header />
          <div className="container-fluid">
            <div className="row gap-3">
              <div className="col-4">

                <div className="card overflow-hidden" style={{ borderRight: "2px solid blue" }}>
                  <div className="card-body p-4">
                    <h5 className="card-title mb-9 fw-semibold">Published Properties</h5>
                    <div className="row align-items-center">
                      <div className="d-flex align-items-center justify-content-between">
                        <h1 className="fw-bolder color-primary" style={{ fontSize: "3rem" }}>
                          {3}
                        </h1>
                        <BsBuildingsFill className='color-primary' style={{ fontSize: "3rem" }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card overflow-hidden" style={{ borderRight: "2px solid green" }}>
                  <div className="card-body p-4">
                    <h5 className="card-title mb-9 fw-semibold">Published Machinery</h5>
                    <div className="row align-items-center">
                      <div className="d-flex align-items-center justify-content-between">
                        <h1 className="fw-bolder color-primary" style={{ fontSize: "3rem" }}>
                          {0}
                        </h1>
                        <TbCarCrane className='color-primary' style={{ fontSize: "3rem" }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card overflow-hidden" style={{ borderRight: "2px solid orange" }}>
                  <div className="card-body p-4">
                    <h5 className="card-title mb-9 fw-semibold">Published Consturction</h5>
                    <div className="row align-items-center">
                      <div className="d-flex align-items-center justify-content-between">
                        <h1 className="fw-bolder color-primary" style={{ fontSize: "3rem" }}>
                          {3}
                        </h1>
                        <FaTools className='color-primary' style={{ fontSize: "3rem" }} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className="col-7">
                <div className="card p-4">
                  <h5>Personal Information</h5>

                  <div className="info-wrapper ">
                    <div className="basic-info d-flex align-items-center gap-4 my-3 border p-2">
                      <div className="image" style={{ width: "60px", height: "60px", borderRadius: "50%", overflow: "hidden" }}>
                        {/* <FaUser className='color-primary' style={{ fontSize: "2.4rem" }} /> */}
                        <img src={logo} alt="" style={{ width: "100%" }} />
                      </div>
                      <div>
                        <p className='fw-semibold'>user@account.com</p>
                        <small>+23 334 45 444</small>
                      </div>
                    </div>

                    <form action="">
                      <div className="form-group mb-2">
                        <label htmlFor="">Update Profile Image</label>
                        <input type="file" className='custom-input my-1' id="" accept='image/*' />
                      </div>
                      <div className="form-group mb-2">
                        <label htmlFor="">Phone</label>
                        <input type="text" className='custom-input my-1' readOnly value="+33 223 44 555" />
                      </div>
                      <div className="form-group mb-2">
                        <label htmlFor="">Username</label>
                        <input type="text" className='custom-input my-1' value="allon" />
                      </div>
                      <div className="form-group mb-2">
                        <label htmlFor="">Password</label>
                        <input type="password" className='custom-input my-1' value="123456" />
                      </div>
                      <div className="form-group mb-2">
                        <button className="custom-btn">Update</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
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
